import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { CSSResultGroup } from "lit/development";
import { BlAccordion } from "../../baklava";
import style from "./bl-accordion-group.css";

/**
 * @tag bl-accordion-group
 * @summary Baklava Accordion Group component
 *
 * @slot - Default slot for bl-accordion elements
 */
@customElement("bl-accordion-group")
export default class BlAccordionGroup extends LitElement {
  /**
   * Allow multiple accordions to be open at once
   */
  @property({ reflect: true, type: Boolean })
  multiple = false;

  @queryAssignedElements({ selector: "bl-accordion" })
  accordions: BlAccordion[];

  static get styles(): CSSResultGroup {
    return [style];
  }

  handleToggleAccordions(e: CustomEvent<boolean>) {
    const target = e.target as BlAccordion;

    if (!this.multiple && e.detail) {
      this.accordions.forEach(a => {
        if (target !== a) {
          a.collapse();
        }
      });
    }
  }

  render(): TemplateResult {
    return html`<div class="accordion-group" @bl-toggle=${this.handleToggleAccordions}>
      <slot></slot>
    </div>`;
  }
}
