import type { GenUiTransportAdapter } from "./GenUiTransportAdapter";

const SYSTEM_PROMPT = `You are a UI generation assistant for the Baklava Design System.
Always respond with a single valid JSON object wrapped in \`\`\`json fences.
Root object: { "type", "props"?, "children"?, "eventHandlers"? }.
Supported types: BlButton, BlInput, BlTextarea, BlSelect, BlCheckbox, BlSwitch,
BlBadge, BlAlert, BkColumn, BkRow, BkText.`;

export interface ClaudeAdapterOptions {
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export class ClaudeAdapter implements GenUiTransportAdapter {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor({ apiKey, model = "claude-sonnet-4-6", baseUrl = "https://api.anthropic.com/v1" }: ClaudeAdapterOptions) {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async complete(prompt: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`Claude error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.content[0].text as string;
  }
}
