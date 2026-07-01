import { desc } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";

export type DuplicateMatch = {
  roleTitle: string;
  status: "green" | "yellow" | "red" | null;
  appliedAt: string | null;
};

// Simple case-insensitive substring match on company_name against existing rows.
// Informational only: never blocks, never changes the resume recommendation.
// Matching happens in JS (not a SQL LIKE) so a blank stored company_name, which the parse
// step can produce when it fails to extract one, can never trivially match everything.
export async function checkDuplicate(companyName: string): Promise<DuplicateMatch[]> {
  const name = companyName.trim().toLowerCase();
  if (!name) return [];

  const rows = await db
    .select({
      companyName: applications.companyName,
      roleTitle: applications.roleTitle,
      status: applications.status,
      appliedAt: applications.appliedAt,
    })
    .from(applications)
    .orderBy(desc(applications.createdAt));

  return rows
    .filter((r) => {
      const other = r.companyName.trim().toLowerCase();
      return other.length > 0 && (other.includes(name) || name.includes(other));
    })
    .map((r) => ({
      roleTitle: r.roleTitle,
      status: r.status,
      appliedAt: r.appliedAt ? new Date(r.appliedAt).toISOString().slice(0, 10) : null,
    }));
}
