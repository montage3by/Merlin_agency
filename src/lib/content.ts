import * as ru from "./agency-content";
import * as en from "./agency-content.en";

export type Locale = "ru" | "en";
export type Content = typeof ru;

// The English file must stay in the same shape as the Russian one.
const enContent: Content = en;

export const CONTENT: Record<Locale, Content> = { ru, en: enContent };

export const LOCALE_PATH: Record<Locale, string> = { ru: "/", en: "/en" };
