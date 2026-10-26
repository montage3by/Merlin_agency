#!/usr/bin/env python3
"""Запись alt в медиатеку luxhomme.store через REST API WordPress.

По умолчанию — только просмотр (dry-run): показывает, что изменится. Запись — с флагом --apply.
Перед записью сохраняет прежние значения в seo/logs/ — откат флагом --rollback <лог>.

  python3 clients/luxhomme/seo/scripts/wp_apply.py alt --only 5674421            # что изменится
  python3 clients/luxhomme/seo/scripts/wp_apply.py alt --only 5674421 --apply    # записать 1 файл
  python3 clients/luxhomme/seo/scripts/wp_apply.py alt --apply                   # записать весь план
  python3 clients/luxhomme/seo/scripts/wp_apply.py --rollback seo/logs/alt-....json

Доступ: LUXHOMME_WP_USER, LUXHOMME_WP_APP_PASSWORD (пароль приложения).
"""
import argparse, base64, datetime, json, os, sys, time, urllib.request

BASE = "https://luxhomme.store/wp-json/wp/v2"
HERE = os.path.dirname(os.path.abspath(__file__))
SEO = os.path.dirname(HERE)
PLAN = os.path.join(SEO, "alt-plan-2026-10.json")
LOGS = os.path.join(SEO, "logs")
AUTH = "Basic " + base64.b64encode(
    f"{os.environ['LUXHOMME_WP_USER']}:{os.environ['LUXHOMME_WP_APP_PASSWORD']}".encode()).decode()


def call(method, path, data=None):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(BASE + path, data=body, method=method,
                                 headers={"Authorization": AUTH, "Content-Type": "application/json"})
    for i in range(4):
        try:
            return json.load(urllib.request.urlopen(req, timeout=90))
        except urllib.error.HTTPError as e:
            sys.exit(f"HTTP {e.code} {path}: {e.read()[:300]!r}")
        except Exception:
            time.sleep(2 * (i + 1))
    sys.exit(f"нет ответа: {path}")


def get_alt(mid):
    return call("GET", f"/media/{mid}?context=edit&_fields=id,alt_text")["alt_text"]


def set_alt(mid, alt):
    got = call("POST", f"/media/{mid}?_fields=id,alt_text", {"alt_text": alt})["alt_text"]
    if got != alt:
        sys.exit(f"{mid}: записалось не то: {got!r}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("what", nargs="?", choices=["alt"])
    ap.add_argument("--only", help="ID файлов через запятую")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--rollback")
    a = ap.parse_args()

    if a.rollback:
        log = json.load(open(a.rollback))
        for r in log:
            set_alt(r["id"], r["before"])
            print(f"откат {r['id']}: {r['before']!r}")
        return

    plan = json.load(open(PLAN))
    if a.only:
        ids = {int(x) for x in a.only.split(",")}
        plan = [r for r in plan if r["id"] in ids]
    changes = []
    for r in plan:
        before = get_alt(r["id"])
        if before == r["new"]:
            continue
        changes.append({"id": r["id"], "before": before, "after": r["new"]})
        print(f"{r['id']}: {before!r} → {r['new']!r}")
    print(f"к изменению: {len(changes)} из {len(plan)}")
    if not a.apply or not changes:
        return
    os.makedirs(LOGS, exist_ok=True)
    path = os.path.join(LOGS, f"alt-{datetime.datetime.now():%Y%m%d-%H%M%S}.json")
    json.dump(changes, open(path, "w"), ensure_ascii=False, indent=1)
    for c in changes:
        set_alt(c["id"], c["after"])
    print(f"записано: {len(changes)}. Лог для отката: {os.path.relpath(path)}")


if __name__ == "__main__":
    main()
