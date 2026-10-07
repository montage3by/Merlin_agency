import type { Locale } from "@/lib/content";

// Заголовок с акцентным словом: [до, акцент, после].
export type Accented = [string, string, string];

const ru = {
  metaTitle: "Merlin Agency: платный трафик и SEO, которые приводят клиентов",
  metaDescription:
    "Контекстная реклама, SEO, таргет, маркетплейсы и аналитика. Больше 10 лет в digital-маркетинге, проекты в 14 странах.",
  hero: {
    line1: ["Платный трафик ", "и SEO", ","] as Accented,
    sub: "и аналитика под ключ",
    line2: ["которые приводят ", "клиентов", ""] as Accented,
    text: "Контекстная реклама, SEO, таргет и маркетплейсы в одних руках. Больше 10 лет в digital-маркетинге.",
    cta: "Смотреть кейсы",
    proof: "Проекты в 14 странах",
    proofSub: "от медицины до B2B",
  },
  allCases: "Все кейсы",
  services: {
    label: "Услуги",
    title: ["Трафик, сайт, аналитика. ", "Выберите своё", ""] as Accented,
    sub: [
      "Соберите ",
      "свою",
      " связку из направлений, в которых у нас есть опыт",
    ] as Accented,
  },
  stats: {
    label: "Цифры",
    title: ["Результаты, ", "которые видно", " в отчётах"] as Accented,
  },
  cases: {
    label: "Кейсы",
    title: ["Смотрим не на клики, ", "а на клиентов", ""] as Accented,
    sub: "Ниша, задача, что сделали и что получилось. Цифры из реальных проектов.",
  },
  approach: {
    label: "Подход",
    title: ["Пять шагов ", "от разбора", " до отчёта"] as Accented,
  },
  experience: {
    label: "Опыт",
    title: ["10+ ниш и ", "14 стран", ""] as Accented,
    niches: "Ниши",
    geo: "География",
  },
  audit: {
    label: "Бесплатно",
    title: ["Нужен ", "аудит?", ""] as Accented,
    sub: [
      "Отчёт по конкурентам, SEO и рекламе ",
      "за пару минут",
      "",
    ] as Accented,
    sources:
      "Данные из публичных источников: ваш сайт, органическая выдача Google, Google Ads Transparency Center и Meta Ad Library.",
    button: "Получить аудит",
  },
  contact: {
    title: ["Обсудим ", "ваш", " проект"] as Accented,
    text: "Расскажите о бизнесе и задаче. Разберём текущую рекламу и сайт и предложим, с чего начать.",
  },
  footerPlace: "Батуми. Работаем удалённо",
  header: {
    toTop: "Merlin Agency, наверх",
    sections: "Разделы",
    nav: ["Услуги", "Кейсы", "Подход", "Аудит"],
    write: "Написать",
    langSwitch: "Switch to English",
  },
  picker: {
    title: "Что нужно вашему бизнесу",
    hint: "Отметьте одно или несколько направлений",
    bundle: "Ваша связка",
    empty: "Выберите хотя бы одно направление слева.",
    button: "Обсудить в WhatsApp",
    note: "Список направлений подставится в сообщение.",
    message: "Здравствуйте! Интересует: ",
  },
};

export type FlipCopy = typeof ru;

const en: FlipCopy = {
  metaTitle: "Merlin Agency: paid traffic and SEO that bring in clients",
  metaDescription:
    "Search ads, SEO, paid social, marketplaces and analytics. 10+ years in digital marketing, projects in 14 countries.",
  hero: {
    line1: ["Paid traffic ", "and SEO", ""],
    sub: "plus analytics, end to end",
    line2: ["that bring in ", "clients", ""],
    text: "Search ads, SEO, paid social and marketplaces in one pair of hands. 10+ years in digital marketing.",
    cta: "See our cases",
    proof: "Projects in 14 countries",
    proofSub: "from healthcare to B2B",
  },
  allCases: "All cases",
  services: {
    label: "Services",
    title: ["Traffic, website, analytics. ", "Pick yours", ""],
    sub: [
      "Build ",
      "your own",
      " mix from the services we have real experience in",
    ],
  },
  stats: {
    label: "Numbers",
    title: ["Results ", "you can see", " in the reports"],
  },
  cases: {
    label: "Cases",
    title: ["Not clicks, ", "but clients", ""],
    sub: "Niche, task, what we did and what came out of it. Numbers from real projects.",
  },
  approach: {
    label: "Approach",
    title: ["Five steps ", "from audit", " to report"],
  },
  experience: {
    label: "Experience",
    title: ["10+ niches and ", "14 countries", ""],
    niches: "Niches",
    geo: "Geography",
  },
  audit: {
    label: "Free",
    title: ["Need an ", "audit?", ""],
    sub: [
      "A report on competitors, SEO and ads ",
      "in a couple of minutes",
      "",
    ],
    sources:
      "Public data only: your website, Google organic results, Google Ads Transparency Center and Meta Ad Library. The report is in Russian.",
    button: "Get the audit",
  },
  contact: {
    title: ["Let's talk about ", "your", " project"],
    text: "Tell us about your business and goals. We will review your current ads and website and suggest where to start.",
  },
  footerPlace: "Batumi. Working remotely",
  header: {
    toTop: "Merlin Agency, back to top",
    sections: "Sections",
    nav: ["Services", "Cases", "Approach", "Audit"],
    write: "Message us",
    langSwitch: "Перейти на русский",
  },
  picker: {
    title: "What your business needs",
    hint: "Pick one or more services",
    bundle: "Your mix",
    empty: "Pick at least one service on the left.",
    button: "Discuss on WhatsApp",
    note: "The list of services will be added to the message.",
    message: "Hello! I'm interested in: ",
  },
};

export const FLIP_COPY: Record<Locale, FlipCopy> = { ru, en };
