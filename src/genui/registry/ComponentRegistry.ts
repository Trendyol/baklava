import React from "react";
import type { ComponentSchema } from "../parser/ComponentSchema";

export type ComponentBuilder = (schema: ComponentSchema, renderChild: (s: ComponentSchema) => React.ReactNode) => React.ReactNode;

/**
 * OCP: Core'a dokunmadan yeni Baklava component'i eklemek için
 * sadece `registry.register("BlSlider", builder)` çağırmak yeterli.
 */
export class ComponentRegistry {
  private readonly builders = new Map<string, ComponentBuilder>();

  register(type: string, builder: ComponentBuilder): this {
    this.builders.set(type, builder);
    return this;
  }

  resolve(type: string): ComponentBuilder | undefined {
    return this.builders.get(type);
  }
}
