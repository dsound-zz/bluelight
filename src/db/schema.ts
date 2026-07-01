import { pgTable, serial, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const resumeEnum = pgEnum("resume_choice", ["support", "solutions", "sde", "ai_sde", "none"]);
export const statusEnum = pgEnum("status", ["green", "yellow", "red"]);

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  roleTitle: text("role_title").notNull(),
  jobText: text("job_text").notNull(),
  jobUrl: text("job_url"),
  resumeRecommendation: resumeEnum("resume_recommendation").notNull(),
  resumeReason: text("resume_reason").notNull().default(""),
  resumeUsed: resumeEnum("resume_used"),
  overridden: boolean("overridden").notNull().default(false),
  status: statusEnum("status"),
  appliedAt: timestamp("applied_at", { withTimezone: true }),
  coverLetter: text("cover_letter"),
  whyThisCompany: text("why_this_company"),
  linkedinNote: text("linkedin_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
