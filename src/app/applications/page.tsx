import Link from "next/link";
import { desc, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { RESUMES } from "@/lib/resumes";

export const dynamic = "force-dynamic";

const FILTERS = ["all", "green", "yellow", "red", "untriaged"] as const;

const statusBadge: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  yellow: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
};

function resumeLabel(key: string | null): string {
  if (!key) return "—";
  if (key === "none") return "None";
  return RESUMES[key as "support" | "solutions" | "sde" | "ai_sde"]?.label ?? key;
}

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "all" } = await searchParams;
  const filter = FILTERS.includes(status as (typeof FILTERS)[number]) ? status : "all";

  const where =
    filter === "untriaged"
      ? isNull(applications.status)
      : filter !== "all"
        ? eq(applications.status, filter as "green" | "yellow" | "red")
        : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(applications)
      .where(where)
      .orderBy(desc(applications.createdAt)),
    db.select({ total: sql<number>`count(*)::int` }).from(applications).where(where),
  ]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
        <p className="mt-1 text-sm text-slate-500">
          {total.toLocaleString()} matching.
        </p>
      </div>

      <form className="flex flex-wrap items-center gap-2" action="/applications">
        <select
          name="status"
          defaultValue={filter}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm capitalize outline-none focus:border-slate-900"
        >
          {FILTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Filter
        </button>
        {filter !== "all" && (
          <Link href="/applications" className="text-sm text-slate-500 hover:underline">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-2.5 font-medium">Company</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">Resume used</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Applied</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  No applications match.
                </td>
              </tr>
            ) : (
              rows.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-medium text-slate-800">{a.companyName}</td>
                  <td className="max-w-xs truncate px-4 py-2.5 text-slate-600">{a.roleTitle}</td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {resumeLabel(a.resumeUsed)}
                    {a.overridden && <span className="ml-1.5 text-xs text-slate-400">(overridden)</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    {a.status ? (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge[a.status]}`}
                      >
                        {a.status}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                        Not yet triaged
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-400">
                    {a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
