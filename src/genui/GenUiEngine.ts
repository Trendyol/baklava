import type { GenUiTransportAdapter } from "./transport/GenUiTransportAdapter";
import { SchemaParser } from "./parser/SchemaParser";
import type { ComponentSchema } from "./parser/ComponentSchema";

/**
 * SRP: Pipeline koordinasyonu — prompt → adapter → parser → ComponentSchema.
 * Render'dan habersiz; test edilmesi kolay.
 */
export class GenUiEngine {
  private readonly parser: SchemaParser;

  constructor(
    private readonly adapter: GenUiTransportAdapter,
    parser?: SchemaParser,
  ) {
    this.parser = parser ?? new SchemaParser();
  }

  async generate(prompt: string): Promise<ComponentSchema> {
    const raw = await this.adapter.complete(prompt);
    return this.parser.parse(raw);
  }
}
