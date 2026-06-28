/** @jsx React.createElement */
import React from "react";
import type { ComponentSchema } from "../parser/ComponentSchema";
import type { ComponentRegistry } from "../registry/ComponentRegistry";

/**
 * SRP: Sadece ComponentSchema ağacını React node ağacına çevirir.
 * DIP: ComponentRegistry'ye bağımlı, hiçbir Baklava widget'ına doğrudan import yok.
 */
export class DynamicRenderer {
  constructor(private readonly registry: ComponentRegistry) {}

  render(schema: ComponentSchema): React.ReactNode {
    const builder = this.registry.resolve(schema.type);
    if (!builder) return <UnknownComponent type={schema.type} />;
    return builder(schema, (child) => this.render(child));
  }
}

const UnknownComponent: React.FC<{ type: string }> = ({ type }) => (
  <div
    style={{
      border: "1px dashed var(--bl-color-warning-highlight, orange)",
      padding: "8px 12px",
      borderRadius: 4,
      fontSize: 12,
      color: "var(--bl-color-warning-highlight, orange)",
    }}
  >
    ⚠ Unknown component: <strong>{type}</strong>
  </div>
);
