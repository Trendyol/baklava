import { CSSResultGroup, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { autoUpdate, computePosition, flip, MiddlewareState, offset, size } from "@floating-ui/dom";
import DatepickerCalendarMixin from "../../mixins/datepicker-calendar-mixin/datepicker-calendar-mixin";
import { event, EventDispatcher } from "../../utilities/event";
import "../calendar/bl-calendar";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import { CalendarDate } from "../calendar/bl-calendar.types";
import "../input/bl-input";
import { CleanUpFunction } from "../select/bl-select";
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

  private _cleanUpPopover: CleanUpFunction | null = null;

  @query(".popover")
  private _popover: HTMLElement;

  @query(".datepicker-input")
  private _selectInput: HTMLElement;
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

  private _defaultValueFormatter(dates: CalendarDate[]) {
    if (this.type === CALENDAR_TYPES.SINGLE && this._selectedDates.length === 1) {
      this._value = `${this.formatDate(this._selectedDates[0])}`;
    } else if (this.type === CALENDAR_TYPES.MULTIPLE) {
      const values: string[] = [];

      this._selectedDates.slice(0, this._fittingDateCount).forEach(date => {
        values.push(this.formatDate(date));
      });
      this._value = values.join(",") + (this._floatingDateCount >= 0 ? " ,..." : "");
    } else if (this.type === CALENDAR_TYPES.RANGE && dates.length === 2) {
      this._value = `${this.formatDate(this._selectedDates[0])} - ${this.formatDate(
        this._selectedDates[1]
      )}`;
    }
  }

  setDatePickerInput(dates: Date[] | []) {
    if (!dates.length) {
      this._value = "";
    } else {
      this._selectedDates = dates;

      if (this.valueFormatter) {
        this._value = this.valueFormatter(this._selectedDates, this.type);
      } else {
        this._defaultValueFormatter(this._selectedDates);
      }
    }

    this._onBlDatepickerChanged(this._selectedDates);
    this.requestUpdate();
  }

  formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  clearDatepicker() {
    this._onBlDatepickerCleared([]);
  }

  openPopover() {
    setTimeout(() => {
      document.activeElement?.shadowRoot?.querySelector("bl-input")?.focus();
    }, 100);

    this._isPopoverOpen = true;
    this._setupPopover();
    document.addEventListener("click", this._interactOutsideHandler, true);
    document.addEventListener("focus", this._interactOutsideHandler, true);
  }

  closePopover() {
    this._isPopoverOpen = false;
    this._cleanUpPopover && this._cleanUpPopover();

    document.removeEventListener("click", this._interactOutsideHandler, true);
    document.removeEventListener("focus", this._interactOutsideHandler, true);
  }
  private _interactOutsideHandler = (event: MouseEvent | FocusEvent) => {
    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath?.find(el => el.tagName === "BL-DATEPICKER")?.contains(this)) {
      this.closePopover();
    }
  };

  private _setupPopover() {
    this._cleanUpPopover = autoUpdate(this._selectInput, this._popover, () => {
      computePosition(this._selectInput, this._popover, {
        placement: "bottom",
        strategy: "fixed",
        middleware: [
          flip(),
          offset(8),
          size({
            apply(args: MiddlewareState) {
              Object.assign(args.elements.floating.style, {
                width: `${args.elements.reference.getBoundingClientRect().width}px`,
              });
            },
          }),
        ],
      }).then(({ x, y }) => {
        this._popover.style.setProperty("--left", `${x}px`);
        this._popover.style.setProperty("--top", `${y}px`);
      });
    });
  }
  private _togglePopover() {
    this._isPopoverOpen ? this.closePopover() : this.openPopover();
  }

  firstUpdated() {
    const element = this.shadowRoot?.getElementById("datepicker-input");

    element?.addEventListener("mousedown", event => {
      event.preventDefault(); // Prevent focus from causing text selection
    });

    // If input loses focus and the calendar is clicked, prevent the focus loss
    document.addEventListener("mousedown", event => {
      const path = event.composedPath();

      if (path.includes(this._popover) || (element && path.includes(element))) {
        event.preventDefault();

        element?.focus();
      }
    });
  }

  formatStringWithLineBreaks(str: string) {
    const parts = str.split(",");

    // Create an array of elements
    return parts.reduce((acc, part, index) => {
      if (index > 0 && index % 3 === 0) {
        acc.push(html`<br />`);
      }
      acc.push(html`<span>${part}, </span>`);
      return acc;
    }, []);
  }
  render() {
    const datepickerInput = this.shadowRoot?.getElementById("datepicker-input");
    const iconsContainer = this.shadowRoot?.getElementById("icon-container");
    const datesTextTotalWidth =
      (datepickerInput?.offsetWidth as number) - (iconsContainer?.offsetWidth as number);

    this._fittingDateCount = parseInt(String(datesTextTotalWidth / 90));

    this._floatingDateCount = this._selectedDates.length - this._fittingDateCount;

    const renderCalendar = html`
      <div
        class=${classMap({
          "popover": true,
          "show-popover": this._isPopoverOpen,
        })}
        tabindex="${ifDefined(this._isPopoverOpen ? undefined : "-1")}"
      >
        <bl-calendar
          type="${this.type}"
          .minDate=${this.minDate}
          .maxDate="${this.maxDate}"
          .startOfWeek="${this.startOfWeek}"
          .disabledDates="${this.disabledDates}"
          @bl-calendar-change="${(event: CustomEvent) => this.setDatePickerInput(event.detail)}"
        ></bl-calendar>
      </div>
    `;

    const additionalDates = this._selectedDates
      .slice(this._fittingDateCount)
      .map(date => {
        return this.formatDate(date);
      })
      .join(",");

    const formattedAdditionalDates = this.formatStringWithLineBreaks(additionalDates);

    const additionalDatesView =
      this._floatingDateCount > 0
        ? html`<bl-tooltip placement="top">
            <span slot="tooltip-trigger">+${this._floatingDateCount}</span>
            <div>${formattedAdditionalDates}</div>
          </bl-tooltip>`
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
          readOnly
        >
          <div slot="icon" class="icon-container" id="icon-container">
            ${additionalDatesView}
            <bl-button
              size="small"
              variant="tertiary"
              kind="neutral"
              icon="close"
              @click=${() => this.clearDatepicker()}
            ></bl-button>
            <bl-icon name="calendar" size="small" class="calendarIcon"></bl-icon>
          </div>
        </bl-input>
        ${renderCalendar}
      </div>
    `;
  }
}
