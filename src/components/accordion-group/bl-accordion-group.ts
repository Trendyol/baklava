import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { BlAccordion } from "../../baklava";
import style from "./bl-accordion-group.css";

type AccordionVariant = "standalone" | "list";

@customElement("bl-accordion-group")
export default class BlAccordionGroup extends LitElement {
  /**
   * Sets accordion variant
   */
  @property({ reflect: true })
  variant: AccordionVariant = "standalone";

  @property({ reflect: true, attribute: "auto-collapse", type: Boolean })
  autoCollapse = true;

  @queryAssignedElements({ selector: "bl-accordion" })
  accordions: BlAccordion[];

  static get styles(): CSSResultGroup {
    return [style];
  }

  handleToggleAccordions(e: CustomEvent<boolean>) {
    const target = e.target as BlAccordion;

    if (this.autoCollapse && e.detail) {
      this.accordions.forEach(a => {
        if (target !== a) {
          a.collapse();
        }
      });
    }
  }

  protected render(): TemplateResult {
    return html`<div
      class="accordion-group ${this.variant}"
      @bl-accordion-toggle=${this.handleToggleAccordions}
    >
      <slot></slot>
    </div>`;
  }
}
