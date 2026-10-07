import type { Metadata } from "next";
import { AiLanding } from "@/components/ai/AiLanding";
import { AI_COPY } from "@/components/ai/copy";

const t = AI_COPY.en;

export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
};

export default function Page() {
  return <AiLanding locale="en" />;
}
