import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/ai/CaseDetail";
import { CASES, CONTACTS, SHOW_CLIENT_NAMES } from "@/lib/agency-content.en";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/en/cases/[slug]">): Promise<Metadata> {
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
}: PageProps<"/en/cases/[slug]">) {
  const { slug } = await params;
  const index = CASES.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  return (
    <CaseDetail
      c={CASES[index]}
      index={index}
      showNames={SHOW_CLIENT_NAMES}
      contactHref={CONTACTS.telegram.href}
      locale="en"
    />
  );
}
