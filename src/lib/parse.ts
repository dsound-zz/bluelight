import { z } from "zod";
import { chat, extractJson } from "./together";
import { parseMessages, sanitizeCopy } from "./prompts";

const parsedSchema = z.object({
  companyName: z.string().default(""),
  roleTitle: z.string().default(""),
  resumeRecommendation: z.enum(["support", "solutions", "none"]),
  resumeReason: z.string().default(""),
});
export type ParsedJob = z.infer<typeof parsedSchema>;

export async function parseJob(jobText: string): Promise<ParsedJob> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await chat(parseMessages(jobText), { json: true, temperature: 0.1 });
      const parsed = parsedSchema.parse(extractJson(raw));
      return { ...parsed, resumeReason: sanitizeCopy(parsed.resumeReason) };
    } catch (e) {
      if (attempt === 1) throw e;
    }
  }
  throw new Error("unreachable");
}
