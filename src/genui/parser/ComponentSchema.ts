/**
 * Immutable data model for one node in the GenUI JSON tree.
 *
 * LLM example output:
 * ```json
 * {
 *   "type": "BlButton",
 *   "props": { "variant": "primary", "label": "Submit" },
 *   "children": [],
 *   "eventHandlers": { "onClick": "submitForm" }
 * }
 * ```
 */
export interface ComponentSchema {
  readonly type: string;
  readonly props?: Record<string, unknown>;
  readonly children?: ComponentSchema[];
  readonly eventHandlers?: Record<string, string>;
}
