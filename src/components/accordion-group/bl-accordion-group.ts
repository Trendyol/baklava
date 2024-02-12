import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import style from "./bl-accordion-group.css";

type AccordionVariant = "standalone" | "list";

@customElement("bl-accordion-group")
export default class BlAccordionGroup extends LitElement {
  /**
   * Sets accordion variant
   */
  @property({ reflect: true })
  variant: AccordionVariant = "standalone";

  static get styles(): CSSResultGroup {
    return [style];
  }

  protected render(): TemplateResult {
    return html`<div class="accordion-group ${this.variant}">
      <slot></slot>
    </div>`;
  }
}
