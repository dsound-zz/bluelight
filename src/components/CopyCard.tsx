"use client";

import { useState } from "react";

export function CopyCard({
  title,
  text,
  meta,
}: {
  title: string;
  text: string;
  meta?: string;
}) {
  const [copied, setCopied] = useState(false);
  if (!text) return null;

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {meta && <span className="text-xs text-slate-400">{meta}</span>}
        </div>
        <button
          onClick={copy}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}
