import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const stolzl = localFont({
  variable: "--font-stolzl",
  src: [
    { path: "../fonts/stolzl/stolzl_thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/stolzl/stolzl_light.otf", weight: "300", style: "normal" },
    { path: "../fonts/stolzl/stolzl_book.otf", weight: "350", style: "normal" },
    { path: "../fonts/stolzl/stolzl_regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/stolzl/stolzl_medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/stolzl/stolzl_bold.otf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Бесплатный digital-аудит — Merlin Studio",
  description:
    "Автоматический аудит вашего сайта и конкурентов: SEO, контекстная и таргетированная реклама. Готовый отчёт с рекомендациями за пару минут.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${stolzl.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
