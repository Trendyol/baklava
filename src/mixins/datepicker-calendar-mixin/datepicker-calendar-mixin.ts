import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { CALENDAR_TYPES } from "../../components/calendar/bl-calendar.constant";
import { CalendarType, DayValues } from "../../components/calendar/bl-calendar.types";
import { stringToDateArray } from "../../utilities/string-to-date-converter";

export default class DatepickerCalendarMixin extends LitElement {
  /**
   * Defines the calendar types, available types are single, multiple and range
   */
  @property()
  type: CalendarType;
  /**
   * Defines the start day of the calendar (1 defines monday)
   */
  @property({ type: Number, attribute: "start-of-week", reflect: true })
  startOfWeek: DayValues = 0;
  /**
   * Defines the calendar language
   */
  @property()
  locale: string = document.documentElement.lang || "en-EN";
  @state()
  _selectedDates: Date[] = [];

  /**
   * Defines the unselectable dates for calendar
   */
  protected _disabledDates: Date[] = [];

  get disabledDates(): Date[] {
    return this._disabledDates;
  }

  @property({
    attribute: "disabled-dates",
    type: Array,
    reflect: true,
  })
  set disabledDates(disabledDates: Date[] | string) {
    // Now we are using 1.6.0 version of @lit/reactive-elements and in this version even if our property has property decorator it doesn't run request update inside.
    // We added similar implementations to update when there is a change.
    // When we update the lit to 2.0 or upper versions we can remove the requestUpdate here

    let newVal: Date[] = [];

    if (typeof disabledDates === "string") {
      newVal = stringToDateArray(disabledDates);
    } else if (Array.isArray(disabledDates)) {
      newVal = disabledDates.filter(d => !isNaN(d.getTime()));
    }

    this.requestUpdate("disabledDates", newVal);
    this._disabledDates = newVal;
  }

  /**
   * Defines the maximum date value for the calendar
   */
  _maxDate: Date;

  get maxDate() {
    return this._maxDate;
  }

  @property({ type: Date, attribute: "max-date", reflect: true })
  set maxDate(maxDate: Date) {
    if (this._minDate && this._minDate >= maxDate) {
      console.warn("maxDate cannot be smaller than minDate.");
    } else {
      this._maxDate = maxDate;
    }
  }

  /**
   * Defines the minimum date value for the calendar
   */
  _minDate: Date;

  get minDate() {
    return this._minDate;
  }

  @property({ type: Date, attribute: "min-date", reflect: true })
  set minDate(minDate: Date) {
    if (this._maxDate && this._maxDate <= minDate) {
      console.warn("minDate cannot be greater than maxDate.");
    } else {
      this._minDate = minDate;
    }
  }

  /**
   * Target elements state
   */
  protected _value: Date | Date[] | string;

  /**
   * Sets the target element of the popover to align and trigger.
   * It can be a string id of the target element or can be a direct Element reference of it.
   */
  get value() {
    return this._value;
  }

  @property({ attribute: "value", reflect: true })
  set value(value: string | Date | Date[]) {
    if (value) {
      const oldValue = this._value;
      let tempVal: Date[] = [];

      if (typeof value === "string") {
        tempVal = stringToDateArray(value);
      } else if (value instanceof Date) {
        tempVal.push(value);
      } else if (Array.isArray(value)) {
        tempVal = value;
      }

      if (tempVal.length > 0) {
        if (this.type === CALENDAR_TYPES.SINGLE && tempVal.length > 1) {
          console.warn("'value' must be a single Date for single type selection.");
        } else if (
          this.type === CALENDAR_TYPES.RANGE &&
          Array.isArray(tempVal) &&
          tempVal.length != 2
        ) {
          console.warn(
            "'value' must be an array of two Date objects when the type selection mode is set to range."
          );
        } else {
          this._value = value;
          this._selectedDates = tempVal;
        }
      }

      this.requestUpdate("value", oldValue);
    }
  }
}
