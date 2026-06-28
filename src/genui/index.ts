// Core
export { GenUiEngine } from "./GenUiEngine";
export { GenUiView, baklavaRegistry } from "./GenUiView";

// Transport — Strategy pattern
export type { GenUiTransportAdapter } from "./transport/GenUiTransportAdapter";
export { OpenAiAdapter } from "./transport/OpenAiAdapter";
export { ClaudeAdapter } from "./transport/ClaudeAdapter";
export { OpenRouterAdapter } from "./transport/OpenRouterAdapter";

// Parser
export type { ComponentSchema } from "./parser/ComponentSchema";
export { SchemaParser } from "./parser/SchemaParser";

// Registry / Renderer (extension points)
export { ComponentRegistry } from "./registry/ComponentRegistry";
export { DynamicRenderer } from "./renderer/DynamicRenderer";

// Hook
export { useGenUi } from "./hooks/useGenUi";
