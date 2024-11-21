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
   * Defines the calendar language
   */
  @property()
  locale: string = document.documentElement.lang || "en-EN";

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
        this._disabledDates.push(disabledDate);
      });
    } else {
      console.warn("invalid disabledDate format.DisabledDates should be string or Date array.");
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

  _defaultValue: Date | Date[];

  get defaultValue() {
    return this._defaultValue;
  }

  @property({ attribute: "default-value", reflect: true })
  set defaultValue(defaultValue: Date | Date[]) {
    //başta bir type controlü yapalım string 23.04.2021,24.04.2021 2024-11-06 gelirse date array paslayalım ,date[] gelirse dümdüz kullanalım
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
