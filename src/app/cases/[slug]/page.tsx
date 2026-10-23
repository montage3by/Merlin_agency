import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/ai/CaseDetail";
import { CASES, CONTACTS, SHOW_CLIENT_NAMES } from "@/lib/agency-content";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.hook,
    description: c.headlineLabel,
  };
}

export default async function CasePage({
  params,
}: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <CaseDetail
      c={c}
      showNames={SHOW_CLIENT_NAMES}
      contactHref={CONTACTS.telegram.href}
      locale="ru"
    />
  );
}
