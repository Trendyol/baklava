import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { event, EventDispatcher } from "../../utilities/event";
import "./bl-stepper-item";
import style from "./bl-stepper.css";

export type StepperType = "dot" | "number" | "icon";
export type StepperDirection = "horizontal" | "vertical";
export type StepperUsage = "clickable" | "non-clickable";

export interface StepperState {
  currentStep: number;
  totalSteps: number;
  activeStep: number;
}

interface BlStepperItemElement extends Element {
  id: string;
  variant: "default" | "active" | "success" | "error";
  stepperType: StepperType;
  direction: StepperDirection;
  showLeadingConnector: boolean;
  showTrailingConnector: boolean;
}

/**
 * @tag bl-stepper
 * @summary Baklava Stepper component for displaying progress through a sequence of steps
 *
 * @slot default - Stepper items
 *
 * @cssproperty [--bl-stepper-spacing=var(--bl-size-m)] Sets the spacing between stepper items
 * @cssproperty [--bl-stepper-line-color=var(--bl-color-neutral-lighter)] Sets the color of connecting lines
 * @cssproperty [--bl-stepper-line-color-completed=var(--bl-color-neutral)] Sets the color of completed connecting lines
 */

@customElement("bl-stepper")
export default class BlStepper extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Defines stepper render style
   */
  @property({ type: String, reflect: true })
  type: StepperType = "dot";

  /**
   * Defines stepper direction is horizontal or vertical
   */
  @property({ type: String, reflect: true })
  direction: StepperDirection = "horizontal";

  /**
   * Defines stepper usage is clickable or non-clickable
   */
  @property({ type: String, reflect: true })
  usage: StepperUsage = "clickable";

  private get stepperItemsArray(): BlStepperItemElement[] {
    return Array.from(this.querySelectorAll("bl-stepper-item")) as BlStepperItemElement[];
  }

  /**
   * Fires when stepper state changes
   */
  @event("bl-stepper-change") private onStepperChange: EventDispatcher<StepperState>;

  private get totalSteps(): number {
    return this.stepperItemsArray.length;
  }

  private get activeStep(): number {
    const items = this.stepperItemsArray;

    return items.findIndex(item => {
      return item.variant === "active";
    });
  }

  private handleItemClick(event: CustomEvent) {
    if (this.usage === "non-clickable") {
      return;
    }

    const clickedItem = event.target as BlStepperItemElement;
    const itemId = clickedItem.id;

    // Update all items based on the clicked item
    const items = this.stepperItemsArray;
    const clickedIndex = items.findIndex(item => item.id === itemId);

    items.forEach((item, index) => {
      if (index < clickedIndex) {
        item.variant = "success";
      } else if (index === clickedIndex) {
        item.variant = "active";
      } else {
        item.variant = "default";
      }
    });

    // Dispatch change event
    this.onStepperChange({
      currentStep: clickedIndex,
      totalSteps: this.totalSteps,
      activeStep: clickedIndex,
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changedProperties);

    // Initialize stepper items
    this.updateStepperItems();

    // Validate maximum items
    if (this.stepperItemsArray.length > 9) {
      console.warn("bl-stepper: Maximum 9 items are allowed in a stepper");
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    // Update stepper items when type changes
    if (changedProperties.has("type")) {
      this.updateStepperItems();
    }
  }

  private updateStepperItems() {
    const items = this.stepperItemsArray;

    items.forEach((item, index) => {
      item.stepperType = this.type;
      item.direction = this.direction;

      // İlk item'da leading connector yok
      item.showLeadingConnector = index > 0;

      // Son item'da trailing connector yok
      item.showTrailingConnector = index < items.length - 1;
    });
  }

  render(): TemplateResult {
    const classes = {
      stepper: true,
      [`type-${this.type}`]: true,
      [`direction-${this.direction}`]: true,
      [`usage-${this.usage}`]: true,
    };

    return html`
      <div
        class="${classMap(classes)}"
        role="progressbar"
        aria-valuenow="${this.activeStep}"
        aria-valuemin="0"
        aria-valuemax="${this.totalSteps - 1}"
      >
        <slot @bl-stepper-item-click="${this.handleItemClick}"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bl-stepper": BlStepper;
  }
}
