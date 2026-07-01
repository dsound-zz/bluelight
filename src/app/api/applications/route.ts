import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { generateDrafts } from "@/lib/drafts";
import { TogetherError } from "@/lib/together";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  companyName: z.string(),
  roleTitle: z.string(),
  jobText: z.string(),
  jobUrl: z.string().optional(),
  resumeRecommendation: z.enum(["support", "solutions", "none"]),
  resumeReason: z.string().default(""),
  resumeUsed: z.enum(["support", "solutions", "none"]),
  status: z.enum(["green", "yellow", "red"]),
});

export async function POST(req: Request) {
  const body = bodySchema.parse(await req.json());
  const overridden = body.resumeUsed !== body.resumeRecommendation;

  let drafts: { coverLetter: string; whyThisCompany: string; linkedinNote: string } | null = null;
  if (body.status !== "red") {
    if (body.resumeUsed === "none") {
      return NextResponse.json(
        { error: "Pick a resume before proceeding with a green or yellow status." },
        { status: 400 },
      );
    }
    try {
      drafts = await generateDrafts({
        jobText: body.jobText,
        companyName: body.companyName,
        roleTitle: body.roleTitle,
        resumeUsed: body.resumeUsed,
        overriding: false,
      });
    } catch (e) {
      const msg = e instanceof TogetherError ? e.message : "Draft generation failed.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  const [row] = await db
    .insert(applications)
    .values({
      companyName: body.companyName,
      roleTitle: body.roleTitle,
      jobText: body.jobText,
      jobUrl: body.jobUrl || null,
      resumeRecommendation: body.resumeRecommendation,
      resumeReason: body.resumeReason,
      resumeUsed: body.resumeUsed,
      overridden,
      status: body.status,
      coverLetter: drafts?.coverLetter || null,
      whyThisCompany: drafts?.whyThisCompany || null,
      linkedinNote: drafts?.linkedinNote || null,
    })
    .returning();

  return NextResponse.json({ application: row });
}
