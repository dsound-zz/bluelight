import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { generateDrafts } from "@/lib/drafts";
import { TogetherError } from "@/lib/together";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  status: z.enum(["green", "yellow", "red"]),
  resumeUsed: z.enum(["support", "solutions"]).optional(),
});

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const appId = Number(id);
  if (!Number.isInteger(appId)) {
    return NextResponse.json({ error: "Invalid application id." }, { status: 400 });
  }

  const body = bodySchema.parse(await request.json());

  const [existing] = await db.select().from(applications).where(eq(applications.id, appId));
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const resumeUsed = body.resumeUsed ?? existing.resumeUsed;
  if (!resumeUsed || resumeUsed === "none") {
    return NextResponse.json(
      { error: "Pick a resume before proceeding with a green or yellow status." },
      { status: 400 },
    );
  }
  const overridden = resumeUsed !== existing.resumeRecommendation;

  // Only the red -> green/yellow transition generates fresh drafts, reusing the original
  // resume recommendation and reason (resume fit depends on the JD, not on whether the
  // candidate is proceeding anyway).
  const isOverrideProceed = existing.status === "red" && body.status !== "red";

  let drafts: { coverLetter: string; whyThisCompany: string; linkedinNote: string } | null = null;
  if (isOverrideProceed) {
    try {
      drafts = await generateDrafts({
        jobText: existing.jobText,
        companyName: existing.companyName,
        roleTitle: existing.roleTitle,
        resumeUsed,
        overriding: true,
      });
    } catch (e) {
      const msg = e instanceof TogetherError ? e.message : "Draft generation failed.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  const [row] = await db
    .update(applications)
    .set({
      status: body.status,
      resumeUsed,
      overridden,
      updatedAt: new Date(),
      ...(drafts
        ? {
            coverLetter: drafts.coverLetter,
            whyThisCompany: drafts.whyThisCompany,
            linkedinNote: drafts.linkedinNote,
          }
        : {}),
    })
    .where(eq(applications.id, appId))
    .returning();

  return NextResponse.json({ application: row });
}
