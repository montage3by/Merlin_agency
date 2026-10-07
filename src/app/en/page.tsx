import type { Metadata } from "next";
import { AgencyLanding } from "@/components/agency/AgencyLanding";
import { AGENCY_COPY } from "@/components/agency/copy";

const t = AGENCY_COPY.en;

export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
};

export default function Page() {
  return <AgencyLanding locale="en" />;
}
