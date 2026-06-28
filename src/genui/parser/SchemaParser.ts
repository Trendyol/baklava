import type { ComponentSchema } from "./ComponentSchema";

/**
 * SRP: Sadece ham LLM metnini → ComponentSchema'ya çevirir.
 * Markdown fences, prose prefix, trailing text — hepsini temizler.
 */
export class SchemaParser {
  parse(rawResponse: string): ComponentSchema {
    const json = this.extractJson(rawResponse);
    try {
      return JSON.parse(json) as ComponentSchema;
    } catch {
      throw new Error(`[GenUI] SchemaParser: JSON parse başarısız.\nGirdi: ${json}`);
    }
  }

  private extractJson(text: string): string {
    // ```json ... ``` veya ``` ... ``` fences
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) return fenceMatch[1].trim();

    // İlk { ile son } arasını al
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end > start) return text.slice(start, end + 1);

    return text.trim();
  }
}
