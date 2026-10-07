import type { Metadata } from "next";
import { FlipLanding } from "@/components/flip/FlipLanding";
import { FLIP_COPY } from "@/components/flip/copy";

const t = FLIP_COPY.en;

export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
};

export default function Page() {
  return <FlipLanding locale="en" />;
}
