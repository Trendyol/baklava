import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { CALENDAR_TYPES } from "../../components/calendar/bl-calendar.constant";
import { CalendarType, DayValues } from "../../components/calendar/bl-calendar.types";

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
   * Defines the unselectable dates for calendar
   */
  @property({ type: Array, attribute: "disabled-dates", reflect: true })
  disabledDates: Date[];
  /**
   * Defines the calendar language
   */
  @property()
  locale: string = document.documentElement.lang;

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
      console.warn("minDate cannot be greater than maxDate.");
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
    if (this._maxDate && this._maxDate >= minDate) {
      console.warn("minDate cannot be greater than maxDate.");
    } else {
      this._minDate = minDate;
    }
  }

  _defaultValue: Date | Date[];

  get defaultValue() {
    return this._defaultValue;
  }

  @property({ attribute: "default-value", reflect: true })
  set defaultValue(defaultValue: Date | Date[]) {
    if (defaultValue) {
      if (this.type === CALENDAR_TYPES.SINGLE && Array.isArray(defaultValue)) {
        console.warn("'defaultValue' must be of type Date for single date selection.");
      } else if (this.type !== CALENDAR_TYPES.SINGLE && !Array.isArray(defaultValue)) {
        console.warn(
          "'defaultValue' must be an array of Date objects for multiple/range selection."
        );
      } else if (
        this.type === CALENDAR_TYPES.RANGE &&
        Array.isArray(defaultValue) &&
        defaultValue.length != 2
      ) {
        console.warn(
          "'defaultValue' must be an array of two Date objects when the date selection mode is set to range."
        );
      } else {
        this._defaultValue = defaultValue;
      }
    }
  }
}
