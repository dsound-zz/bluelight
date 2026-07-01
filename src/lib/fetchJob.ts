import * as cheerio from "cheerio";

// Best-effort fetch + readable-text extraction of a job posting page.
// Many job boards (LinkedIn, Greenhouse, Lever) block bots or require JS, so this
// can legitimately fail. Callers should fall back to asking the user to paste.
export async function fetchJobText(
  url: string,
): Promise<{ ok: true; text: string } | { ok: false; reason: string }> {
  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return { ok: false, reason: "That does not look like a valid URL." };
  }
  if (!/^https?:$/.test(target.protocol)) {
    return { ok: false, reason: "Only http and https URLs are supported." };
  }

  let res: Response;
  try {
    res = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return { ok: false, reason: "Could not reach that URL. Paste the description instead." };
  }

  if (!res.ok) {
    return {
      ok: false,
      reason: `The site returned ${res.status}. It likely blocks automated fetching, so paste the description instead.`,
    };
  }

  const html = await res.text();
  const $ = cheerio.load(html);
  $("script, style, noscript, svg, header, footer, nav, form").remove();

  // Prefer a main/article container if present.
  const container = $("main").first().length
    ? $("main").first()
    : $("article").first().length
      ? $("article").first()
      : $("body");

  const text = container
    .text()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (text.length < 200) {
    return {
      ok: false,
      reason: "The page had little readable text (likely rendered by JavaScript). Paste the description instead.",
    };
  }

  return { ok: true, text: text.slice(0, 20000) };
}
