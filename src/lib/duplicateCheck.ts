import { sql } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";

export type DuplicateMatch = {
  roleTitle: string;
  status: "green" | "yellow" | "red" | null;
  appliedAt: string | null;
};

// Simple case-insensitive substring match on company_name against existing rows.
// Informational only: never blocks, never changes the resume recommendation.
export async function checkDuplicate(companyName: string): Promise<DuplicateMatch[]> {
  const name = companyName.trim();
  if (!name) return [];

  const rows = await db
    .select({
      companyName: applications.companyName,
      roleTitle: applications.roleTitle,
      status: applications.status,
      appliedAt: applications.appliedAt,
    })
    .from(applications)
    .where(
      sql`lower(${applications.companyName}) like ${"%" + name.toLowerCase() + "%"}
          or ${name.toLowerCase()} like '%' || lower(${applications.companyName}) || '%'`,
    )
    .orderBy(sql`${applications.createdAt} desc`);

  return rows.map((r) => ({
    roleTitle: r.roleTitle,
    status: r.status,
    appliedAt: r.appliedAt ? new Date(r.appliedAt).toISOString().slice(0, 10) : null,
  }));
}
