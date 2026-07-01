import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchJobText } from "@/lib/fetchJob";
import { parseJob } from "@/lib/parse";
import { checkDuplicate } from "@/lib/duplicateCheck";

const bodySchema = z.object({
  jobText: z.string().optional(),
  jobUrl: z.string().optional(),
});

export async function POST(req: Request) {
  const body = bodySchema.parse(await req.json());
  let jobText = body.jobText?.trim() ?? "";

  if (!jobText && body.jobUrl) {
    const fetched = await fetchJobText(body.jobUrl);
    if (!fetched.ok) {
      return NextResponse.json({ needsPaste: true, reason: fetched.reason }, { status: 200 });
    }
    jobText = fetched.text;
  }

  if (!jobText) {
    return NextResponse.json(
      { error: "Paste a job description or provide a URL." },
      { status: 400 },
    );
  }

  try {
    const parsed = await parseJob(jobText);
    const duplicates = await checkDuplicate(parsed.companyName);
    return NextResponse.json({ jobText, ...parsed, duplicates });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to parse job description." },
      { status: 500 },
    );
  }
}
