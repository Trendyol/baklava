import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
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
   * Defines the calendar language
   */
  @property()
  locale: string = document.documentElement.lang || "en-EN";
  @state()
  _selectedDates: Date[] = [];

  /**
   * Defines the unselectable dates for calendar
   */
  _disabledDates: Date[] = [];

  get disabledDates(): Date[] {
    return this._disabledDates;
  }

  @property({ attribute: "disabled-dates", reflect: true })
  set disabledDates(disabledDates: Date[] | string) {
    if (typeof disabledDates === "string") {
      const splitDisabledDates = disabledDates.split(",");

      splitDisabledDates?.forEach(disabledDate => {
        const date = new Date(`${disabledDate}T00:00:00`);

        if (!isNaN(date.getTime())) this._disabledDates.push(date);
      });
    } else if (Array.isArray(disabledDates)) {
      disabledDates.forEach(disabledDate => {
        if (!isNaN(disabledDate.getTime())) this._disabledDates.push(disabledDate);
      });
    }
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

  @state() _value: Date | Date[] | string;
  /**
   * Sets the target element of the popover to align and trigger.
   * It can be a string id of the target element or can be a direct Element reference of it.
   */
  @property()
  get value(): string | Date | Date[] {
    return this._value;
  }

  set value(val: string | Date | Date[]) {
    if (val) {
      let tempVal: Date[] = [];

      if (typeof val === "string") {
        const splitDates = val.split(",");

        splitDates?.forEach(date => {
          const isDate = new Date(`${date}T00:00:00`);

          if (!isNaN(isDate.getTime())) {
            tempVal.push(isDate);
          }
        });
      } else if (val instanceof Date) {
        tempVal.push(val);
      } else if (Array.isArray(val)) {
        if (this.type === CALENDAR_TYPES.SINGLE && Array.isArray(val)) {
          console.warn("'value' must be of type Date for single date selection.");
        } else if (this.type === CALENDAR_TYPES.RANGE && Array.isArray(val) && val.length != 2) {
          console.warn(
            "'value' must be an array of two Date objects when the date selection mode is set to range."
          );
        } else {
          tempVal = val;
        }
      }
      if (tempVal.length) {
        this._value = val;
        this._selectedDates.splice(0, this._selectedDates.length, ...tempVal);
      }
    }
  }
}
