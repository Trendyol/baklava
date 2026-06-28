import type { GenUiTransportAdapter } from "./GenUiTransportAdapter";

const SYSTEM_PROMPT = `You are a UI generation assistant for the Baklava Design System.
Respond with a single valid JSON object (wrapped in \`\`\`json fences).
Root: { "type", "props"?, "children"?, "eventHandlers"? }.
Supported types: BlButton, BlInput, BlTextarea, BlSelect, BlCheckbox, BlSwitch,
BlBadge, BlAlert, BkColumn, BkRow, BkText.`;

export interface OpenRouterAdapterOptions {
  apiKey: string;
  model?: string;
  siteUrl?: string;
  siteName?: string;
}

export class OpenRouterAdapter implements GenUiTransportAdapter {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly siteUrl?: string;
  private readonly siteName?: string;
  private readonly baseUrl = "https://openrouter.ai/api/v1";

  constructor({ apiKey, model = "anthropic/claude-haiku-4-5-20251001", siteUrl, siteName }: OpenRouterAdapterOptions) {
    this.apiKey = apiKey;
    this.model = model;
    this.siteUrl = siteUrl;
    this.siteName = siteName;
  }

  async complete(prompt: string): Promise<string> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
    if (this.siteUrl) headers["HTTP-Referer"] = this.siteUrl;
    if (this.siteName) headers["X-Title"] = this.siteName;

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenRouter error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.choices[0].message.content as string;
  }
}
