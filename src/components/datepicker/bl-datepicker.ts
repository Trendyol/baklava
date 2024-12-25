import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { BlCalendar, BlPopover } from "../../baklava";
import DatepickerCalendarMixin from "../../mixins/datepicker-calendar-mixin/datepicker-calendar-mixin";
import { event, EventDispatcher } from "../../utilities/event";
import "../calendar/bl-calendar";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import "../input/bl-input";
import BlInput, { InputSize } from "../input/bl-input";
import "../tooltip/bl-tooltip";
import style from "./bl-datepicker.css";

/**
 * @tag bl-datepicker
 * @summary Baklava DatePicker component
 *
 * @cssproperty [--bl-datepicker-input-width] - Sets the width of datepicker input
 **/
@customElement("bl-datepicker")
export default class BlDatepicker extends DatepickerCalendarMixin {
  /**
   * Defines the datepicker input placeholder
   */
  @property({ type: String, attribute: "placeholder", reflect: true })
  placeholder: string;
  /**
   * Sets input size.
   */
  @property({ type: String, reflect: true })
  size?: InputSize = "medium";

  /**
   * Makes datepicker input label as fixed positioned
   */
  @property({ type: Boolean, attribute: "label-fixed", reflect: true })
  labelFixed = false;
  /**
   * Defines the datepicker input label
   */
  @property({ type: String, attribute: "label", reflect: true })
  label: string;
  /**
   * Defines the custom formatter function
   */
  @property({ type: Function, attribute: "value-formatter" })
  valueFormatter: ((dates: Date[]) => string) | null = null;
  /**
   * Sets datepicker to disabled
   */
  @property({ type: Boolean })
  disabled: boolean;
  /**
   * Defines help text to datepicker input for users
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText: string;

  @state()
  _inputValue = "";

  @state()
  _selectedDates: Date[] = [];

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

  private _onCalendarMouseDown!: (event: MouseEvent) => void;
  private _onInputMouseDown!: (event: MouseEvent) => void;

  /**
   * Fires when date selection is changed
   */
  @event("bl-datepicker-change") private _onBlDatepickerChange: EventDispatcher<Date[]>;

  static get styles(): CSSResultGroup {
    return [style];
  }

  defaultInputValueFormatter() {
    if (this.type === CALENDAR_TYPES.SINGLE) {
      this._inputValue = this.formatDate(this._selectedDates[0]);
      this.closePopoverWithTimeout();
    } else if (this.type === CALENDAR_TYPES.MULTIPLE) {
      this.setFloatingDates();
      const values = this._selectedDates
        .slice(0, this._fittingDateCount)
        .map(date => this.formatDate(date));

      this._inputValue = values.join(",") + (this._floatingDateCount > 0 ? " ,..." : "");
    } else if (this.type === CALENDAR_TYPES.RANGE) {
      if (this._selectedDates[0]) this._inputValue = this.formatDate(this._selectedDates[0]);
      if (this._selectedDates[1])
        this._inputValue = `${this._inputValue}-${this.formatDate(this._selectedDates[1])}`;
      if (this._selectedDates[0] && this._selectedDates[1]) this.closePopoverWithTimeout();
    }
  }

  closePopoverWithTimeout() {
    setTimeout(() => {
      this.closePopover();
      this._inputEl.blur();
    }, 200);
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
      this._inputValue = "";
    } else {
      this._selectedDates = dates;
      if (this.valueFormatter) {
        this._inputValue = this.valueFormatter(this._selectedDates);
      } else {
        this.defaultInputValueFormatter();
      }
    }

    this._onBlDatepickerChange(this._selectedDates);
  }

  formatDate(date: Date): string {
    return `${String(date?.getDate()).padStart(2, "0")}/${String(date?.getMonth() + 1).padStart(
      2,
      "0"
    )}/${date?.getFullYear()}`;
  }

  clearDatepicker() {
    this._calendarEl.handleClearSelectedDates();
    this._selectedDates = [];
    this._inputValue = "";
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
    this._onCalendarMouseDown = event => {
      event.preventDefault();
      this._inputEl?.focus();
    };

    this._onInputMouseDown = event => {
      event.preventDefault();
      this._inputEl?.focus();
    };

    this._calendarEl?.addEventListener("mousedown", this._onCalendarMouseDown);
    this._inputEl?.addEventListener("mousedown", this._onInputMouseDown);

    if (this._selectedDates) {
      this.setDatePickerInput(this._selectedDates);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._calendarEl?.removeEventListener("mousedown", this._onCalendarMouseDown);
    this._inputEl?.removeEventListener("mousedown", this._onInputMouseDown);
  }

  render() {
    const renderCalendar = html`
      <bl-popover target="datepicker-content" placement="bottom-start">
        <bl-calendar
          type=${this.type}
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .startOfWeek=${this.startOfWeek}
          .disabledDates=${this.disabledDates}
          .value=${this.value}
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
        ? html` <bl-tooltip>
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
          .value="${this._inputValue}"
          label="${this.label}"
          placeholder="${this.placeholder}"
          class="datepicker-input"
          role="button"
          id="datepicker-input"
          aria-haspopup="listbox"
          aria-labelledby="label"
          @click=${this._togglePopover}
          help-text=${this.helpText}
          ?disabled=${this.disabled}
          .size=${this.size}
          .labelFixed=${this.labelFixed}
          readonly
        >
          <div slot="icon" class="icon-container" id="icon-container">
            ${additionalDatesView} ${clearDatepickerButton}
            <bl-icon name="calendar" size="small" class="calendar-icon"></bl-icon>
          </div>
        </bl-input>
        ${renderCalendar}
      </div>
    `;
  }
}
