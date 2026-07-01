import { RESUMES, resumeOptionsSummary, type ResumeKey } from "./resumes";

// ---------- Formatting rules + post-processor ----------

export const FORMATTING_RULES = `STRICT WRITING RULES for any text you generate:
- Never use the cliche AI trope "it's not X, it's Y" (in any phrasing).
- Do not use dashes anywhere. No em dashes, no en dashes, no " - " as punctuation. Use commas instead.
- Write plainly and specifically. No flattery, no filler.
- Never invent skills, metrics, or experience that are not present in the resume text provided.`;

// Normalize generated copy to honor the no-dashes rule and trim whitespace.
// Intra-word hyphens (e.g. "full-stack") are preserved; dash punctuation becomes a comma.
export function sanitizeCopy(input: string | null | undefined): string {
  if (!input) return "";
  let s = String(input);
  s = s.replace(/\s*[—–]\s*/g, ", "); // em/en dash -> comma
  s = s.replace(/\s+-\s+/g, ", "); // spaced hyphen used as punctuation -> comma
  s = s.replace(/,\s*,/g, ", "); // collapse doubled commas
  s = s.replace(/[ \t]+\n/g, "\n").trim();
  return s;
}

export function capChars(input: string, max: number): string {
  const s = sanitizeCopy(input);
  if (s.length <= max) return s;
  // Trim to last sentence/word boundary under the limit.
  const cut = s.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf("."), cut.lastIndexOf(" "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop) : cut).trim();
}

// Force the closing onto its own line regardless of how the model formatted it, the prompt
// asks for "Kind Regards," on its own line but the model sometimes glues it to the prior
// sentence instead.
export function formatCoverLetter(input: string): string {
  let s = sanitizeCopy(input);
  s = s.replace(/\s*Kind Regards,?\s*\n?\s*Demian Sims\s*$/i, "").trimEnd();
  return `${s}\n\nKind Regards,\nDemian Sims`;
}

// ---------- Parse + resume-recommend prompt ----------

export function parseMessages(jobText: string) {
  return [
    {
      role: "system" as const,
      content: `You extract structured data from job descriptions and recommend which of the candidate's two resumes fits best. Respond with a single JSON object and nothing else.

The candidate has two resumes:

${resumeOptionsSummary()}`,
    },
    {
      role: "user" as const,
      content: `Read the job description below and respond as JSON:
{
  "companyName": string,   // best guess of the hiring company, "" if unknown
  "roleTitle": string,     // "" if unknown
  "resumeRecommendation": "support" | "solutions" | "none",
  "resumeReason": string   // 2-3 sentences citing the specific signal in the JD that drove the choice
}

Recommend "none" only for a clear mismatch: a licensed profession, a role requiring years of
experience far beyond a bootcamp-trained engineer with roughly 4-5 years of professional
experience, or a fully unrelated technical domain (embedded systems, hardware, etc). Otherwise
pick whichever of "support" or "solutions" fits better.

Job description:
"""
${jobText.slice(0, 12000)}
"""`,
    },
  ];
}

// ---------- Draft-generation prompt ----------

export function draftMessages(params: {
  jobText: string;
  companyName: string;
  roleTitle: string;
  resumeUsed: ResumeKey;
  overriding: boolean;
}) {
  const resume = RESUMES[params.resumeUsed];
  return [
    {
      role: "system" as const,
      content: `You write application materials for the candidate below. Use ONLY the resume text
provided as ground truth about their skills and experience. Respond with a single JSON object
and nothing else.

${FORMATTING_RULES}

RESUME BEING USED FOR THIS APPLICATION (${resume.label}):
${resume.text}`,
    },
    {
      role: "user" as const,
      content: `Company: ${params.companyName || "unknown"}
Role: ${params.roleTitle || "unknown"}
${
  params.overriding
    ? "\nNote: the candidate is proceeding with this application despite an earlier fit concern. Do not re-litigate that concern, just help them apply effectively.\n"
    : ""
}
Job description:
"""
${params.jobText.slice(0, 8000)}
"""

Respond as JSON:
{
  "coverLetter": string,      // exactly 3 short paragraphs, under 250 words total. Opens with
                              // "Dear Hiring Team," on its own line, closes with "Kind Regards,"
                              // on its own line then "Demian Sims" on the next line.
  "whyThisCompany": string,   // 3-5 sentences, specific to this company and role, not generic flattery
  "linkedinNote": string      // under 300 characters
}`,
    },
  ];
}
