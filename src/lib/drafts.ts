import { z } from "zod";
import { chat, extractJson } from "./together";
import { draftMessages, sanitizeCopy, capChars, formatCoverLetter } from "./prompts";
import type { ResumeKey } from "./resumes";

const draftSchema = z.object({
  coverLetter: z.string().default(""),
  whyThisCompany: z.string().default(""),
  linkedinNote: z.string().default(""),
});
export type Drafts = z.infer<typeof draftSchema>;

export async function generateDrafts(params: {
  jobText: string;
  companyName: string;
  roleTitle: string;
  resumeUsed: ResumeKey;
  overriding: boolean;
}): Promise<Drafts> {
  const raw = await chat(draftMessages(params), { json: true, temperature: 0.5, maxTokens: 1600 });
  const parsed = draftSchema.parse(extractJson(raw));
  return {
    coverLetter: formatCoverLetter(parsed.coverLetter),
    whyThisCompany: sanitizeCopy(parsed.whyThisCompany),
    linkedinNote: capChars(parsed.linkedinNote, 300),
  };
}
