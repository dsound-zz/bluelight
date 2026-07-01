"use client";

import { useEffect, useState } from "react";
import { CopyCard } from "@/components/CopyCard";

type ResumeKey = "support" | "solutions" | "sde" | "ai_sde" | "none";

type DuplicateMatch = {
  roleTitle: string;
  status: "green" | "yellow" | "red" | null;
  appliedAt: string | null;
};

type ParseResult = {
  jobText: string;
  companyName: string;
  roleTitle: string;
  resumeRecommendation: ResumeKey;
  resumeReason: string;
  duplicates: DuplicateMatch[];
};

type SavedApplication = {
  id: number;
  status: "green" | "yellow" | "red";
  resumeUsed: ResumeKey;
  overridden: boolean;
  coverLetter: string | null;
  whyThisCompany: string | null;
  linkedinNote: string | null;
};

const resumeLabel: Record<ResumeKey, string> = {
  support: "Technical Support Resume",
  solutions: "Solutions Engineer Resume",
  sde: "Fullstack SDE Resume",
  ai_sde: "AI-Focused SDE Resume",
  none: "Neither, likely mismatch",
};

const resumeShortLabel: Record<Exclude<ResumeKey, "none">, string> = {
  support: "Support",
  solutions: "Solutions",
  sde: "SDE",
  ai_sde: "AI SDE",
};

const statusMeta = {
  green: { label: "Green", className: "bg-emerald-600 hover:bg-emerald-500" },
  yellow: { label: "Yellow", className: "bg-amber-500 hover:bg-amber-400" },
  red: { label: "Red", className: "bg-red-600 hover:bg-red-500" },
} as const;

export default function HomePage() {
  const [mode, setMode] = useState<"text" | "url">("text");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pasteHint, setPasteHint] = useState<string | null>(null);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [resumeUsed, setResumeUsed] = useState<ResumeKey>("none");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedApplication | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  async function submit() {
    setLoading(true);
    setError(null);
    setPasteHint(null);
    setResult(null);
    setSaved(null);
    setSaveError(null);
    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "url" ? { jobUrl: value } : { jobText: value }),
      });
      const data = await res.json();
      if (data.needsPaste) {
        setMode("text");
        setPasteHint(data.reason);
        return;
      }
      if (!res.ok) throw new Error(data.error || "Could not parse that job description.");
      setResult(data);
      setResumeUsed(data.resumeRecommendation);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not parse that job description.");
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(status: "green" | "yellow" | "red") {
    if (!result) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: result.companyName,
          roleTitle: result.roleTitle,
          jobText: result.jobText,
          resumeRecommendation: result.resumeRecommendation,
          resumeReason: result.resumeReason,
          resumeUsed,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save this application.");
      setSaved(data.application);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Could not save this application.");
    } finally {
      setSaving(false);
    }
  }

  function startNext() {
    setNotice(`Saved ${result?.companyName || "this application"}.`);
    setResult(null);
    setSaved(null);
    setSaveError(null);
    setValue("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New application</h1>
        <p className="mt-1 text-sm text-slate-500">
          Paste a job description or a link. Bluelight will pick which resume fits and tell you why.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 inline-flex rounded-lg border border-slate-200 p-0.5 text-sm">
          {(["text", "url"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 font-medium transition ${
                mode === m ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {m === "text" ? "Paste text" : "From link"}
            </button>
          ))}
        </div>

        {mode === "url" ? (
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://company.com/careers/role"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste the full job description here…"
            rows={10}
            className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
          />
        )}

        {pasteHint && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{pasteHint}</p>
        )}

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={submit}
            disabled={loading || value.trim().length < 5}
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Reading…" : "Get recommendation"}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>
      )}

      {result && result.duplicates.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-medium">
            You have {result.duplicates.length} prior application
            {result.duplicates.length > 1 ? "s" : ""} with a similarly named company.
          </p>
          <ul className="mt-1.5 space-y-0.5 text-xs">
            {result.duplicates.map((d, i) => (
              <li key={i}>
                {d.roleTitle} — status: {d.status ?? "not yet triaged"}
                {d.appliedAt ? `, applied ${d.appliedAt}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span>Company: {result.companyName || "unknown"}</span>
              <span>Role: {result.roleTitle || "unknown"}</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Recommended resume
              </span>
              <span className="text-sm font-medium text-slate-800">
                {resumeLabel[result.resumeRecommendation]}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">{result.resumeReason}</p>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Resume to use
              </span>
              <div className="mt-2 inline-flex flex-wrap rounded-lg border border-slate-200 p-0.5 text-sm">
                {(["support", "solutions", "sde", "ai_sde"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setResumeUsed(k)}
                    disabled={!!saved}
                    title={resumeLabel[k]}
                    className={`rounded-md px-3 py-1.5 font-medium transition disabled:opacity-50 ${
                      resumeUsed === k ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {resumeShortLabel[k]}
                  </button>
                ))}
              </div>
              {resumeUsed !== result.resumeRecommendation && (
                <p className="mt-1.5 text-xs text-slate-500">
                  Overriding the recommendation ({resumeLabel[result.resumeRecommendation]}).
                </p>
              )}
            </div>
          </div>

          {!saved ? (
            <div className="flex flex-wrap items-center gap-3">
              {(["green", "yellow", "red"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  disabled={saving || (s !== "red" && resumeUsed === "none")}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-50 ${statusMeta[s].className}`}
                >
                  {saving ? "Saving…" : statusMeta[s].label}
                </button>
              ))}
              {resumeUsed === "none" && (
                <span className="text-sm text-slate-500">Pick a resume to proceed with green or yellow.</span>
              )}
              {saveError && <span className="text-sm text-red-600">{saveError}</span>}
            </div>
          ) : (
            <div className="space-y-5">
              <div
                className={`rounded-xl border p-4 text-sm ${
                  saved.status === "green"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : saved.status === "yellow"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                Saved as {statusMeta[saved.status].label}
                {saved.overridden ? ", resume overridden" : ""}.
              </div>

              {(saved.coverLetter || saved.whyThisCompany || saved.linkedinNote) && (
                <div className="grid gap-4">
                  <CopyCard title="Cover letter" text={saved.coverLetter ?? ""} />
                  <CopyCard title="Why this company" text={saved.whyThisCompany ?? ""} />
                  <CopyCard
                    title="LinkedIn note"
                    text={saved.linkedinNote ?? ""}
                    meta={`${(saved.linkedinNote ?? "").length}/300 chars`}
                  />
                </div>
              )}

              <button
                onClick={startNext}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Start next application
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
