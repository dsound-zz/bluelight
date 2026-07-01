// Thin client over Together AI's OpenAI-compatible chat completions endpoint.
const BASE_URL = "https://api.together.xyz/v1/chat/completions";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export class TogetherError extends Error {}

export function hasApiKey(): boolean {
  return Boolean(process.env.TOGETHER_API_KEY);
}

export async function chat(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number; json?: boolean } = {},
): Promise<string> {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new TogetherError(
      "TOGETHER_API_KEY is not set. Add it to .env.local to enable evaluation.",
    );
  }
  const model = process.env.TOGETHER_MODEL;
  if (!model) {
    throw new TogetherError("TOGETHER_MODEL is not set. Add it to .env.local.");
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts.temperature ?? 0.4,
      max_tokens: opts.maxTokens ?? 2048,
      ...(opts.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new TogetherError(`Together AI request failed (${res.status}): ${text.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new TogetherError("Together AI returned an empty response.");
  return content;
}

// Parse a JSON object out of an LLM response, tolerating code fences / stray prose.
export function extractJson<T>(raw: string): T {
  let s = raw.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) s = s.slice(start, end + 1);
  return JSON.parse(s) as T;
}
