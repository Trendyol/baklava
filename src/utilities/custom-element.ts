import { customElement } from "lit/decorators.js";

/**
 * Class decorator factory that defines the decorated class as a custom element, unless its tag
 * name is already registered.
 *
 * In a microfrontend setup several bundles ship their own copy of the same component library.
 * Every copy runs `customElements.define` for the same tag name and all but the first one throw
 * an uncaught `DOMException` ("has already been used with this registry"). The first bundle wins,
 * which is the wanted behaviour, so the duplicate registration is skipped instead of crashing.
 *
 * ```js
 * @guardedCustomElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 */
export function guardedCustomElement(tagName: string): ReturnType<typeof customElement> {
  return classOrDescriptor => {
    if (customElements.get(tagName)) {
      return;
    }

    customElement(tagName)(classOrDescriptor);
  };
}
