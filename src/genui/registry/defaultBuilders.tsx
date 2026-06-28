/**
 * OCP: Her builder bağımsız bir fonksiyon. Yeni Baklava bileşeni eklemek için
 * bu dosyaya bir satır eklenir ve core'a dokunulmaz.
 *
 * baklava-react.ts'deki component isimleri `npm run analyze` ile üretilir.
 * Bu dosya `analyze` çıktısına bağımlıdır; build pipeline değişirse bu
 * import path'leri de güncellenmeli.
 */
/** @jsx React.createElement */
import React from "react";
import type { ComponentBuilder } from "./ComponentRegistry";
import type { ComponentSchema } from "../parser/ComponentSchema";

// ─── Baklava React wrappers ──────────────────────────────────────────────────
// baklava-react.ts npm run analyze ile oluşturulur.
// `@trendyol/baklava/react` paket aliası da çalışır; burada src path kullanıyoruz.
import {
  BlButton,
  BlInput,
  BlTextarea,
  BlSelect,
  BlSelectOption,
  BlCheckbox,
  BlSwitch,
  BlBadge,
  BlAlert,
  BlSpinner,
  BlIcon,
} from "../baklava-react";

// ─── Layout primitives (plain React, Baklava token'larıyla) ─────────────────
const BkColumn: React.FC<{ spacing?: number; children?: React.ReactNode }> = ({
  spacing = 12,
  children,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: `${spacing}px` }}>
    {children}
  </div>
);

const BkRow: React.FC<{ spacing?: number; justify?: string; children?: React.ReactNode }> = ({
  spacing = 8,
  justify = "flex-start",
  children,
}) => (
  <div style={{ display: "flex", flexDirection: "row", gap: `${spacing}px`, justifyContent: justify }}>
    {children}
  </div>
);

const BkText: React.FC<{ label?: string; size?: string; weight?: string; color?: string }> = ({
  label = "",
  size = "var(--bl-font-size-m)",
  weight = "var(--bl-font-weight-regular)",
  color,
}) => (
  <span style={{ fontSize: size, fontWeight: weight, color }}>
    {label}
  </span>
);

// ─── Builder helpers ──────────────────────────────────────────────────────────
type RenderChild = (s: ComponentSchema) => React.ReactNode;

function children(schema: ComponentSchema, render: RenderChild): React.ReactNode[] {
  return (schema.children ?? []).map((c, i) => (
    <React.Fragment key={i}>{render(c)}</React.Fragment>
  ));
}

function p<T>(schema: ComponentSchema, key: string, fallback: T): T {
  return (schema.props?.[key] as T) ?? fallback;
}

// ─── Default builders ────────────────────────────────────────────────────────
export const defaultBuilders: Record<string, ComponentBuilder> = {
  BlButton: (schema) => (
    <BlButton
      variant={p(schema, "variant", "primary")}
      kind={p(schema, "kind", "default")}
      size={p(schema, "size", "medium")}
      disabled={p(schema, "disabled", false)}
    >
      {p<string>(schema, "label", "")}
    </BlButton>
  ),

  BlInput: (schema) => (
    <BlInput
      label={p(schema, "label", "")}
      placeholder={p(schema, "placeholder", "")}
      type={p(schema, "type", "text")}
      disabled={p(schema, "disabled", false)}
      required={p(schema, "required", false)}
      helpText={p(schema, "helpText", undefined)}
    />
  ),

  BlTextarea: (schema) => (
    <BlTextarea
      label={p(schema, "label", "")}
      placeholder={p(schema, "placeholder", "")}
      disabled={p(schema, "disabled", false)}
      required={p(schema, "required", false)}
      rows={p(schema, "rows", 4)}
    />
  ),

  BlSelect: (schema, render) => (
    <BlSelect
      label={p(schema, "label", "")}
      placeholder={p(schema, "placeholder", "")}
      required={p(schema, "required", false)}
    >
      {children(schema, render)}
    </BlSelect>
  ),

  BlSelectOption: (schema) => (
    <BlSelectOption value={p(schema, "value", "")}>
      {p<string>(schema, "label", "")}
    </BlSelectOption>
  ),

  BlCheckbox: (schema) => (
    <BlCheckbox
      checked={p(schema, "checked", false)}
      disabled={p(schema, "disabled", false)}
      required={p(schema, "required", false)}
    >
      {p<string>(schema, "label", "")}
    </BlCheckbox>
  ),

  BlSwitch: (schema) => (
    <BlSwitch checked={p(schema, "checked", false)} disabled={p(schema, "disabled", false)}>
      {p<string>(schema, "label", "")}
    </BlSwitch>
  ),

  BlBadge: (schema) => (
    <BlBadge variant={p(schema, "variant", "neutral")} size={p(schema, "size", "medium")}>
      {p<string>(schema, "label", "")}
    </BlBadge>
  ),

  BlAlert: (schema) => (
    <BlAlert variant={p(schema, "variant", "info")} description={p(schema, "description", "")} closable={p(schema, "closable", false)}>
      {p<string>(schema, "caption", undefined)}
    </BlAlert>
  ),

  BlSpinner: (schema) => (
    <BlSpinner size={p(schema, "size", "medium")} />
  ),

  BlIcon: (schema) => (
    <BlIcon name={p(schema, "name", "info")} />
  ),

  // Layout primitives
  BkColumn: (schema, render) => (
    <BkColumn spacing={p(schema, "spacing", 12)}>
      {children(schema, render)}
    </BkColumn>
  ),

  BkRow: (schema, render) => (
    <BkRow spacing={p(schema, "spacing", 8)} justify={p(schema, "justify", "flex-start")}>
      {children(schema, render)}
    </BkRow>
  ),

  BkText: (schema) => (
    <BkText
      label={p(schema, "label", "")}
      size={p(schema, "size", undefined)}
      weight={p(schema, "weight", undefined)}
      color={p(schema, "color", undefined)}
    />
  ),
};
