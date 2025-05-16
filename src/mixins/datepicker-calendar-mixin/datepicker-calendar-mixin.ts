import { LitElement } from "lit";
import { property } from "lit/decorators.js";
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

  /**
   * Defines the unselectable dates for calendar
   */
  protected _disabledDates: Date[] = [];

  get disabledDates(): Date[] {
    return this._disabledDates;
  }

  @property({
    attribute: "disabled-dates",
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
    if (maxDate && isNaN(new Date(maxDate).getTime())) {
      console.warn("Invalid maxDate value.");
      return;
    }
    if (this._minDate && this._minDate > maxDate) {
      console.warn("maxDate cannot be smaller than minDate.");
    } else {
      this._maxDate = new Date(maxDate);
      this.requestUpdate("maxDate", maxDate);
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
    if (minDate && isNaN(new Date(minDate).getTime())) {
      console.warn("Invalid minDate value.");
      return;
    }
    if (this._maxDate && this._maxDate < minDate) {
      console.warn("minDate cannot be greater than maxDate.");
    } else {
      this._minDate = new Date(minDate);
      this.requestUpdate("minDate", minDate);
    }
  }

  @property({ attribute: "value", reflect: true })
  set value(value: string | Date | Date[]) {
    const oldValue = this._value;

    this._value = value;
    this.requestUpdate("value", oldValue);
  }

  get value(): string | Date | Date[] {
    return this._value;
  }

  _value: string | Date | Date[] = [];
}
