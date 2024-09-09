import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import DatepickerCalendarMixin from "../../mixins/datepicker-calendar-mixin/datepicker-calendar-mixin";
import { event, EventDispatcher } from "../../utilities/event";
import "../calendar/bl-calendar";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import { CalendarDate } from "../calendar/bl-calendar.types";
import "../input/bl-input";
import BlInput from "../input/bl-input";
import "../tooltip/bl-tooltip";
import style from "./bl-datepicker.css";

export const blDatepickerTag = "bl-datepicker";
export const blDatepickerClearSelectedDatesEvent = "clear-datepicker-event";
export const blDatepickerChangedEvent = "bl-datepicker-change";

/**
 * @tag bl-datepicker
 * @summary Baklava DatePicker component
 **/
@customElement(blDatepickerTag)
export default class BlDatepicker extends DatepickerCalendarMixin {
  /**
   * Defines the datepicker input placeholder
   */
  @property()
  placeholder: string;
  /**
   * Defines the datepicker input label
   */
  @property()
  label: string;
  /**
   * Defines the custom formatter function
   */
  @property({ type: Function })
  valueFormatter: ((dates: CalendarDate[], type: string) => string) | null = null;
  /**
   * Sets calendar to disabled
   */
  @property({ type: Boolean })
  disabled: boolean;
  /**
   * Defines invalid text to datepicker input
   */
  @property()
  invalidText: string;
  /**
   * Defines help text to datepicker input for users
   */
  @property()
  helpText: string;

  @state()
  private _isPopoverOpen = false;

  @state()
  private _value = "";

  @state()
  private _selectedDates: CalendarDate[] = [];
  @state()
  private _floatingDateCount: number = 0;
  @state()
  private _fittingDateCount: number = 0;

  @query(".popover")
  private _popover: HTMLElement;

  // Query the bl-input component
  @query("bl-input") inputElement!: BlInput;
  static get styles(): CSSResultGroup {
    return [style];
  }
  /**
   * Fires when date selection is cleared
   */
  @event(blDatepickerClearSelectedDatesEvent) private _onBlDatepickerCleared: EventDispatcher<[]>;
  /**
   * Fires when date selection is changed
   */
  @event(blDatepickerChangedEvent) private _onBlDatepickerChanged: EventDispatcher<Date[]>;

  private _defaultValueFormatter() {
    this.setFloatingDates();
    if (this.type === CALENDAR_TYPES.SINGLE) {
      this._value = this.formatDate(this._selectedDates[0]);
      this.closePopoverWithTimeout();
    } else if (this.type === CALENDAR_TYPES.MULTIPLE) {
      const values = this._selectedDates
        .slice(0, this._fittingDateCount)
        .map(date => this.formatDate(date));

      this._value = values.join(",") + (this._floatingDateCount > 0 ? " ,..." : "");
    } else if (this.type === CALENDAR_TYPES.RANGE) {
      this._value = `${this.formatDate(this._selectedDates[0]) || ""}-${
        this.formatDate(this._selectedDates[1]) || ""
      }`;
      if (this._selectedDates.length === 2) this.closePopoverWithTimeout();
    }
  }

  closePopoverWithTimeout() {
    setTimeout(() => this.closePopover(), 400);
  }

  setFloatingDates() {
    const datepickerInput = this.shadowRoot?.getElementById("datepicker-input");
    const iconsContainer = this.shadowRoot?.getElementById("icon-container");
    const datesTextTotalWidth =
      (datepickerInput?.offsetWidth ?? 0) - (iconsContainer?.offsetWidth ?? 0);

    this._fittingDateCount = Math.floor(datesTextTotalWidth / 90);
    this._floatingDateCount = this._selectedDates.length - this._fittingDateCount;
  }

  setDatePickerInput(dates: Date[] | []) {
    if (!dates.length) {
      this._value = "";
    } else {
      this._selectedDates = dates;
      if (this.valueFormatter) {
        this._value = this.valueFormatter(this._selectedDates, this.type);
      } else {
        this._defaultValueFormatter();
      }
    }

    this._onBlDatepickerChanged(this._selectedDates);
  }

  formatDate(date: Date) {
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${date.getFullYear()}`;
  }
  clearDatepicker() {
    this._onBlDatepickerCleared([]);
    this._selectedDates = [];
    this._value = "";
    this._floatingDateCount = 0;
  }

  openPopover() {
    document.activeElement?.shadowRoot?.querySelector("bl-input")?.focus();

    this._isPopoverOpen = true;
    document.addEventListener("click", this._interactOutsideHandler, true);
    document.addEventListener("focus", this._interactOutsideHandler, true);
  }

  closePopover() {
    this._isPopoverOpen = false;

    document.removeEventListener("click", this._interactOutsideHandler, true);
    document.removeEventListener("focus", this._interactOutsideHandler, true);
    this.shadowRoot?.getElementById("datepicker-input")?.blur();
  }

  private _interactOutsideHandler = (event: MouseEvent | FocusEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath?.find(el => el.tagName === "BL-DATEPICKER")?.contains(this)) {
      this.closePopover();
    }
  };

  private _togglePopover() {
    this._isPopoverOpen ? this.closePopover() : this.openPopover();
  }

  firstUpdated() {
    const element = this.shadowRoot?.getElementById("datepicker-input");

    element?.addEventListener("mousedown", event => {
      event.preventDefault();
    });

    document.addEventListener("mousedown", event => {
      const path = event.composedPath();

      if (path.includes(this._popover) || (element && path.includes(element))) {
        event.preventDefault();

        element?.focus();
      }
    });
  }

  formatAdditionalDates(str: string): TemplateResult[] {
    const parts = str.split(",");

    return parts.reduce<TemplateResult[]>((acc, part, index) => {
      if (index > 0 && index % 3 === 0) {
        acc.push(html`<br />`);
      }
      acc.push(html`<span>${part.trim()}, </span>`);
      return acc;
    }, []);
  }

  render() {
    const renderCalendar = html`
      <bl-calendar
        type=${this.type}
        .minDate=${this.minDate}
        .maxDate="${this.maxDate}"
        .startOfWeek="${this.startOfWeek}"
        .disabledDates="${this.disabledDates}"
        class=${classMap({
          "popover": true,
          "show-popover": this._isPopoverOpen,
        })}
        .defaultValue=${[new Date(2024, 8, 12), new Date(2024, 8, 15)]}
        tabindex="${ifDefined(this._isPopoverOpen ? undefined : "-1")}"
        @bl-calendar-change="${(event: CustomEvent) => this.setDatePickerInput(event.detail)}"
      ></bl-calendar>
    `;

    const additionalDates = this._selectedDates
      .slice(this._fittingDateCount)
      .map(date => {
        return this.formatDate(date);
      })
      .join(",");

    const formattedAdditionalDates = this.formatAdditionalDates(additionalDates);

    const additionalDatesView =
      this._floatingDateCount > 0
        ? html`<bl-tooltip placement="top">
            <span slot="tooltip-trigger">+${this._floatingDateCount}</span>
            <div>${formattedAdditionalDates}</div>
          </bl-tooltip>`
        : "";

    const clearDatepickerButton =
      this._selectedDates.length > 0
        ? html`<bl-button
              size="small"
              variant="tertiary"
              kind="neutral"
              icon=${ifDefined(this._selectedDates.length ? "close" : undefined)}
              @click=${() => this.clearDatepicker()}
            ></bl-button>
            <div class="action-divider"></div>`
        : "";

    return html`
      <div class="datepicker-content" id="datepicker-content" tabindex="-1">
        <bl-input
          value="${this._value}"
          label="${this.label}"
          placeholder="${this.placeholder}"
          class="datepicker-input"
          role="button"
          id="datepicker-input"
          aria-haspopup="listbox"
          aria-expanded="${this._isPopoverOpen}"
          aria-labelledby="label"
          @click=${this._togglePopover}
          help-text=${this.helpText}
          .customInvalidText=${this.invalidText}
          ?disabled=${this.disabled}
          readOnly
        >
          <div slot="icon" class="icon-container" id="icon-container">
            ${additionalDatesView} ${clearDatepickerButton}
            <bl-icon name="calendar" size="small" class="calendarIcon"></bl-icon>
          </div>
        </bl-input>
        ${renderCalendar}
      </div>
    `;
  }
}
