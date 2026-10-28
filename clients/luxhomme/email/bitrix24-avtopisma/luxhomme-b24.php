<?php
/**
 * Plugin Name: Luxhomme → Битрикс24
 * Description: Передаёт заказы, статусы и регистрации WooCommerce в CRM Битрикс24 (контакт + сделка). Письма отправляют роботы Битрикс24.
 *
 * Установка: положить в wp-content/mu-plugins/. В wp-config.php:
 *   define('LUX_B24_WEBHOOK', 'https://b24-nb2uoy.bitrix24.ru/rest/<user>/<token>/'); // входящий вебхук, права CRM
 *   define('LUX_B24_DEAL_CATEGORY', 0);                                             // ID воронки «Заказы с сайта»
 * Перед запуском заполнить LUX_B24_STAGES и коды полей LUX_B24_UF ниже. Проверять на тестовой воронке.
 */

if (!defined('ABSPATH')) exit;

// Статус WooCommerce → код стадии воронки (C{ID}:...). Коды: REST crm.dealcategory.stage.list?id={ID}
const LUX_B24_STAGES = [
    'pending'    => 'C0:NEW',
    'processing' => 'C0:PREPARATION',
    'on-hold'    => 'C0:PREPAYMENT_INVOICE',
    'completed'  => 'C0:WON',
    'cancelled'  => 'C0:LOSE',
    'refunded'   => 'C0:APOLOGY',
    'failed'     => 'C0:LOSE',
];

// Коды пользовательских полей Битрикс24 (CRM → Настройки → Пользовательские поля)
const LUX_B24_UF = [
    'deal_order_id'   => 'UF_CRM_WC_ORDER_ID',
    'deal_items'      => 'UF_CRM_WC_ITEMS',
    'deal_url'        => 'UF_CRM_WC_ORDER_URL',
    'deal_coupon'     => 'UF_CRM_WC_COUPON',
    'contact_consent' => 'UF_CRM_EMAIL_CONSENT',
    'contact_promo'   => 'UF_CRM_PERSONAL_PROMO',
];

// Персональный промокод при регистрации
const LUX_PROMO_PERCENT = 15;  // скидка, %
const LUX_PROMO_DAYS    = 14;  // срок действия, дней

function lux_b24(string $method, array $params) {
    if (!defined('LUX_B24_WEBHOOK')) return null;
    $r = wp_remote_post(trailingslashit(LUX_B24_WEBHOOK) . $method . '.json', ['body' => $params, 'timeout' => 15]);
    if (is_wp_error($r)) {
        error_log("[lux-b24] $method: " . $r->get_error_message());
        return null;
    }
    $body = json_decode(wp_remote_retrieve_body($r), true);
    if (isset($body['error'])) {
        error_log("[lux-b24] $method: " . $body['error'] . ' ' . ($body['error_description'] ?? ''));
        return null;
    }
    return $body['result'] ?? null;
}

/** Найти контакт по email или создать. */
function lux_b24_contact(string $email, array $fields = []) {
    if (!$email) return null;
    $found = lux_b24('crm.duplicate.findbycomm', ['type' => 'EMAIL', 'values' => [$email], 'entity_type' => 'CONTACT']);
    if (!empty($found['CONTACT'][0])) {
        $id = (int) $found['CONTACT'][0];
        if ($fields) lux_b24('crm.contact.update', ['id' => $id, 'fields' => $fields]);
        return $id;
    }
    $fields['EMAIL'] = [['VALUE' => $email, 'VALUE_TYPE' => 'WORK']];
    $fields['SOURCE_ID'] = 'WEB';
    return lux_b24('crm.contact.add', ['fields' => $fields]);
}

// ── Заказ создан (в том числе витриной через REST API) → контакт + сделка. Асинхронно, чтобы не тормозить оформление.
add_action('woocommerce_new_order', function ($order_id) {
    as_enqueue_async_action('lux_b24_order_created', [$order_id], 'lux-b24');
}, 20);

add_action('lux_b24_order_created', function ($order_id) {
    $o = wc_get_order($order_id);
    if (!$o || $o->get_meta('_lux_b24_deal_id')) return;
    $contact = lux_b24_contact($o->get_billing_email(), array_filter([
        'NAME'      => $o->get_billing_first_name(),
        'LAST_NAME' => $o->get_billing_last_name(),
        'PHONE'     => $o->get_billing_phone() ? [['VALUE' => $o->get_billing_phone(), 'VALUE_TYPE' => 'WORK']] : null,
    ]));
    $items = [];
    foreach ($o->get_items() as $item) $items[] = $item->get_name() . ' × ' . $item->get_quantity();
    $deal = lux_b24('crm.deal.add', ['fields' => [
        'TITLE'       => 'Заказ №' . $o->get_order_number() . ' с сайта',
        'CATEGORY_ID' => defined('LUX_B24_DEAL_CATEGORY') ? LUX_B24_DEAL_CATEGORY : 0,
        'STAGE_ID'    => LUX_B24_STAGES[$o->get_status()] ?? LUX_B24_STAGES['pending'],
        'OPPORTUNITY' => (float) $o->get_total(),
        'CURRENCY_ID' => 'RUB',
        'CONTACT_ID'  => $contact,
        'SOURCE_ID'   => 'WEB',
        LUX_B24_UF['deal_order_id'] => $o->get_order_number(),
        LUX_B24_UF['deal_items']    => implode('; ', $items),
        LUX_B24_UF['deal_url']      => $o->get_view_order_url(),
        LUX_B24_UF['deal_coupon']   => implode(', ', $o->get_coupon_codes()),
    ]]);
    if ($deal) {
        $o->update_meta_data('_lux_b24_deal_id', (int) $deal);
        $o->save();
    }
});

// ── Статус заказа сменился → стадия сделки (робот стадии отправит письмо).
add_action('woocommerce_order_status_changed', function ($order_id, $from, $to) {
    as_enqueue_async_action('lux_b24_order_status', [$order_id, $to], 'lux-b24');
}, 10, 3);

add_action('lux_b24_order_status', function ($order_id, $to) {
    $o = wc_get_order($order_id);
    $deal = $o ? (int) $o->get_meta('_lux_b24_deal_id') : 0;
    if (!$deal || empty(LUX_B24_STAGES[$to])) return;
    lux_b24('crm.deal.update', ['id' => $deal, 'fields' => ['STAGE_ID' => LUX_B24_STAGES[$to]]]);
}, 10, 2);

// ── Регистрация покупателя → контакт + персональный одноразовый купон.
// Согласие на рекламу: витрина должна передавать его в мета пользователя 'lux_email_consent' (1/0).
add_action('woocommerce_created_customer', function ($customer_id) {
    as_enqueue_async_action('lux_b24_customer_created', [$customer_id], 'lux-b24');
});

add_action('lux_b24_customer_created', function ($customer_id) {
    $u = get_userdata($customer_id);
    if (!$u || !$u->user_email) return;
    $consent = (bool) get_user_meta($customer_id, 'lux_email_consent', true);
    $fields = array_filter(['NAME' => $u->first_name]);
    $fields[LUX_B24_UF['contact_consent']] = $consent ? 'Y' : 'N';
    if ($consent) {
        $code = 'LUX-' . strtoupper(wp_generate_password(6, false));
        $c = new WC_Coupon();
        $c->set_code($code);
        $c->set_discount_type('percent');
        $c->set_amount(LUX_PROMO_PERCENT);
        $c->set_usage_limit(1);
        $c->set_usage_limit_per_user(1);
        $c->set_email_restrictions([$u->user_email]);
        $c->set_date_expires(time() + LUX_PROMO_DAYS * DAY_IN_SECONDS);
        $c->set_description('Персональный промокод за регистрацию (Битрикс24)');
        $c->save();
        $fields[LUX_B24_UF['contact_promo']] = $code;
    }
    lux_b24_contact($u->user_email, $fields);
});
