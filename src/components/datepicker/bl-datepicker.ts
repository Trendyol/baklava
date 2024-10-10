import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { BlCalendar, BlPopover } from "../../baklava";
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
  @property({ type: String, attribute: "placeholder", reflect: true })
  placeholder: string;
  /**
   * Defines the datepicker input label
   */
  @property({ type: String, attribute: "label", reflect: true })
  label: string;
  /**
   * Defines the custom formatter function
   */
  @property({ type: Function, attribute: "value-formatter", reflect: true })
  valueFormatter: ((dates: CalendarDate[]) => string) | null = null;
  /**
   * Sets datepicker to disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean;
  /**
   * Defines invalid text to datepicker input
   */
  @property({ type: String, attribute: "invalid-text", reflect: true })
  invalidText: string;
  /**
   * Defines help text to datepicker input for users
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText: string;
  /**
   * Defines input width of datepicker
   */
  @property({ type: Number, attribute: "input-width", reflect: true })
  inputWidth: number;

  @state()
  _value = "";

  @state()
  _selectedDates: CalendarDate[] = [];

  @state()
  _floatingDateCount: number = 0;

  @state()
  _fittingDateCount: number = 0;

  @query("bl-calendar")
  _calendarEl: BlCalendar;

  @query("bl-popover")
  _popoverEl: BlPopover;

  @query("bl-input")
  _inputEl!: BlInput;
  /**
   * Fires when date selection is cleared
   */
  @event(blDatepickerClearSelectedDatesEvent) private _onBlDatepickerCleared: EventDispatcher<[]>;
  /**
   * Fires when date selection is changed
   */
  @event(blDatepickerChangedEvent) private _onBlDatepickerChanged: EventDispatcher<Date[]>;

  static get styles(): CSSResultGroup {
    return [style];
  }

  _defaultValueFormatter() {
    if (this.type === CALENDAR_TYPES.SINGLE) {
      this._value = this.formatDate(this._selectedDates[0]);
      this.closePopoverWithTimeout();
    } else if (this.type === CALENDAR_TYPES.MULTIPLE) {
      this.setFloatingDates();
      const values = this._selectedDates
        .slice(0, this._fittingDateCount)
        .map(date => this.formatDate(date));

      this._value = values.join(",") + (this._floatingDateCount > 0 ? " ,..." : "");
    } else if (this.type === CALENDAR_TYPES.RANGE) {
      this._selectedDates[0] && (this._value = this.formatDate(this._selectedDates[0]));
      this._selectedDates[1] &&
        (this._value = `${this._value}-${this.formatDate(this._selectedDates[1])}`);
      if (this._selectedDates.length === 2) this.closePopoverWithTimeout();
    }
  }

  closePopoverWithTimeout() {
    setTimeout(() => this.closePopover(), 200);
  }

  setFloatingDates() {
    const datepickerInput = this.shadowRoot?.getElementById("datepicker-input");
    const iconsContainer = this.shadowRoot?.getElementById("icon-container");
    const datesTextTotalWidth = datepickerInput!.offsetWidth! - iconsContainer!.offsetWidth!;

    this._fittingDateCount = Math.floor(datesTextTotalWidth / 90);

    this._floatingDateCount = this._selectedDates.length - this._fittingDateCount;
  }

  setDatePickerInput(dates: Date[] | []) {
    if (!dates.length) {
      this._value = "";
    } else {
      this._selectedDates = dates;
      if (this.valueFormatter) {
        this._value = this.valueFormatter(this._selectedDates);
      } else {
        this._defaultValueFormatter();
      }
    }

    this._onBlDatepickerChanged(this._selectedDates);
  }

  formatDate(date: Date): string {
    return `${String(date?.getDate()).padStart(2, "0")}/${String(date?.getMonth() + 1).padStart(
      2,
      "0"
    )}/${date?.getFullYear()}`;
  }

  clearDatepicker() {
    this._onBlDatepickerCleared([]);
    this._selectedDates = [];
    this._value = "";
    this._floatingDateCount = 0;
  }

  openPopover() {
    this._popoverEl.target = this._inputEl;
    this._popoverEl.show();
  }

  closePopover() {
    this._popoverEl.hide();
  }

  _togglePopover() {
    this._popoverEl.visible ? this.closePopover() : this.openPopover();
  }

  formatAdditionalDates(str: string): TemplateResult[] {
    const parts = str.split(",");

    return parts.reduce<TemplateResult[]>((acc, part, index) => {
      if (index > 0 && index % 3 === 0) {
        acc.push(html`<br />`);
      }
      acc.push(html`<span>${part.trim()}${index < parts.length - 1 ? ", " : ""}</span>`);
      return acc;
    }, []);
  }

  async firstUpdated() {
    this._inputEl?.style.setProperty("width", `${this.inputWidth}px`, "important");

    this._inputEl?.addEventListener("mousedown", event => {
      event.preventDefault();
    });

    document.addEventListener("mousedown", event => {
      const path = event.composedPath();

      if (path.includes(this._calendarEl) || (this._inputEl && path.includes(this._inputEl))) {
        event.preventDefault();

        this._inputEl?.focus();
      }
    });
    if (this._defaultValue) {
      Array.isArray(this._defaultValue)
        ? (this._selectedDates = this._defaultValue)
        : (this._selectedDates = [new Date(this._defaultValue)]);
      this.setDatePickerInput(this._selectedDates);
    }
  }

  render() {
    const renderCalendar = html`
      <bl-popover target="datepicker-content">
        <bl-calendar
          type=${this.type}
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .startOfWeek=${this.startOfWeek}
          .disabledDates=${this.disabledDates}
          .defaultValue=${this._defaultValue}
          .locale=${this.locale}
          @bl-calendar-change="${(event: CustomEvent) => this.setDatePickerInput(event.detail)}"
        ></bl-calendar>
      </bl-popover>
    `;
    const additionalDates = this._selectedDates
      ?.slice(this._fittingDateCount)
      .map(date => {
        return this.formatDate(date);
      })
      .join(",");

    const formattedAdditionalDates = this.formatAdditionalDates(additionalDates);

    const additionalDatesView =
      this._floatingDateCount > 0
        ? html` <bl-tooltip placement="bottom-start">
            <span slot="tooltip-trigger">+${this._floatingDateCount}</span>
            <div>${formattedAdditionalDates}</div>
          </bl-tooltip>`
        : "";

    const clearDatepickerButton =
      this._selectedDates.length > 0
        ? html` <bl-button
              size="small"
              variant="tertiary"
              kind="neutral"
              icon="close"
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
          aria-labelledby="label"
          @click=${this._togglePopover}
          help-text=${this.helpText}
          .customInvalidText=${this.invalidText}
          ?disabled=${this.disabled}
          readonly
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
