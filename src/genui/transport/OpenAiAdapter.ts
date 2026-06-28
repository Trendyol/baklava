import type { GenUiTransportAdapter } from "./GenUiTransportAdapter";

const SYSTEM_PROMPT = `You are a UI generation assistant for the Baklava Design System.
Always respond with a single valid JSON object (no markdown, no prose).
The root object must have a "type" field matching a Baklava component tag,
optional "props" object, optional "children" array, optional "eventHandlers" object.
Supported types: BlButton, BlInput, BlTextarea, BlSelect, BlCheckbox, BlSwitch,
BlBadge, BlAlert, BlCard (layout wrapper using BkColumn/BkRow), BkColumn, BkRow, BkText.`;

export interface OpenAiAdapterOptions {
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export class OpenAiAdapter implements GenUiTransportAdapter {
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor({ apiKey, model = "gpt-4o", baseUrl = "https://api.openai.com/v1" }: OpenAiAdapterOptions) {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async complete(prompt: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.choices[0].message.content as string;
  }
}
