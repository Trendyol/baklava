/** @jsx React.createElement */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GenUiView } from "./GenUiView";
import { GenUiEngine } from "./GenUiEngine";
import { OpenRouterAdapter } from "./transport/OpenRouterAdapter";
import type { GenUiTransportAdapter } from "./transport/GenUiTransportAdapter";
import type { ComponentSchema } from "./parser/ComponentSchema";

// ── Statik adapter — LLM çağrısı yapmadan offline test ───────────────────────
class StaticAdapter implements GenUiTransportAdapter {
  constructor(private readonly schema: ComponentSchema) {}
  async complete(): Promise<string> {
    return JSON.stringify(this.schema);
  }
}

const loginSchema: ComponentSchema = {
  type: "BkColumn",
  props: { spacing: 16 },
  children: [
    { type: "BkText", props: { label: "Sign In", size: "var(--bl-font-size-2xl)", weight: "var(--bl-font-weight-bold)" } },
    { type: "BlInput", props: { label: "Email", type: "email", placeholder: "you@example.com" } },
    { type: "BlInput", props: { label: "Password", type: "password" } },
    {
      type: "BkRow",
      props: { spacing: 8, justify: "flex-end" },
      children: [
        { type: "BlButton", props: { label: "Cancel", variant: "secondary" } },
        { type: "BlButton", props: { label: "Sign In", variant: "primary" } },
      ],
    },
  ],
};

const productSchema: ComponentSchema = {
  type: "BkColumn",
  props: { spacing: 12 },
  children: [
    {
      type: "BkRow",
      props: { spacing: 8, justify: "space-between" },
      children: [
        { type: "BkText", props: { label: "Baklava Pro T-Shirt", size: "var(--bl-font-size-l)", weight: "var(--bl-font-weight-semibold)" } },
        { type: "BlBadge", props: { label: "In Stock", variant: "success" } },
      ],
    },
    { type: "BkText", props: { label: "$29.99", size: "var(--bl-font-size-2xl)", weight: "var(--bl-font-weight-bold)", color: "var(--bl-color-primary)" } },
    { type: "BlAlert", props: { variant: "info", description: "Free shipping on orders over $50." } },
    {
      type: "BkRow",
      props: { spacing: 8 },
      children: [
        { type: "BlButton", props: { label: "Add to Cart", variant: "primary" } },
        { type: "BlButton", props: { label: "Wishlist", variant: "secondary" } },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: "GenUI/GenUiView",
  parameters: { layout: "padded" },
};
export default meta;

// ── Story 1: Statik login formu ───────────────────────────────────────────────
export const LoginForm: StoryObj = {
  name: "Login Form (static)",
  render: () => (
    <GenUiView
      engine={new GenUiEngine(new StaticAdapter(loginSchema))}
      prompt="static"
      style={{ maxWidth: 400 }}
    />
  ),
};

// ── Story 2: Statik ürün kartı ────────────────────────────────────────────────
export const ProductCard: StoryObj = {
  name: "Product Card (static)",
  render: () => (
    <GenUiView
      engine={new GenUiEngine(new StaticAdapter(productSchema))}
      prompt="static"
      style={{ maxWidth: 480 }}
    />
  ),
};

// ── Story 3: Canlı OpenRouter prompt ─────────────────────────────────────────
export const LiveOpenRouter: StoryObj = {
  name: "Live — OpenRouter (API key gerekli)",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [prompt, setPrompt] = useState(
      "Build a newsletter subscription form with an email input and a Subscribe button.",
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitted, setSubmitted] = useState(prompt);

    const engine = new GenUiEngine(
      new OpenRouterAdapter({
        apiKey: import.meta.env.VITE_OPENROUTER_API_KEY ?? "",
        model: "openrouter/free",
        siteName: "BaklavaGenUI",
      }),
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ padding: 8, fontFamily: "inherit", fontSize: 14, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button onClick={() => setSubmitted(prompt)} style={{ alignSelf: "flex-start" }}>
          Generate UI
        </button>
        <hr />
        <GenUiView
          key={submitted}
          engine={engine}
          prompt={submitted}
          loadingSlot={<p>⏳ Generating…</p>}
        />
      </div>
    );
  },
};
