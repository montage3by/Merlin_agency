import { NextResponse } from "next/server";
import { z } from "zod";
import { runAudit } from "@/lib/audit/engine";
import { renderAuditReportPdf } from "@/lib/pdf/render";

export const maxDuration = 60;

const domainRegex = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i;

const requestSchema = z.object({
  domain: z
    .string()
    .trim()
    .toLowerCase()
    .transform((value) => value.replace(/^https?:\/\//, "").replace(/\/$/, ""))
    .refine((value) => domainRegex.test(value), "Некорректный домен"),
  businessName: z.string().trim().min(1).max(200).optional(),
  niche: z.string().trim().min(1).max(200).optional(),
  city: z.string().trim().min(1).max(200).optional(),
  contactName: z.string().trim().min(1).max(200).optional(),
  contactEmail: z.string().trim().email(),
  knownCompetitors: z.array(z.string().trim().min(1)).max(5).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные формы", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const report = await runAudit(parsed.data);
    const pdf = await renderAuditReportPdf(report);
    const filename = `merlin-audit-${parsed.data.domain}.pdf`;

    return new NextResponse(new Blob([new Uint8Array(pdf)]), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Audit generation failed", error);
    return NextResponse.json(
      { error: "Не удалось сформировать отчёт. Попробуйте ещё раз позже." },
      { status: 500 },
    );
  }
}
