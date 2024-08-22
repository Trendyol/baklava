import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { CalendarType, DayValues } from "../../components/calendar/bl-calendar.types";

export default class DatepickerCalendarMixin extends LitElement {
  /**
   * Defines the calendar types, available types are single, multiple and range
   */
  @property()
  type: CalendarType;

  /**
   * Defines the minimum date value for the calendar
   */
  @property({ type: Date, attribute: "min-date", reflect: true })
  minDate: Date;

  /**
   * Defines the maximum date value for the calendar
   */
  @property({ type: Date, attribute: "max-date", reflect: true })
  maxDate: Date;

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

  _defaultValue: Date | Date[];

  get defaultValue() {
    return this._defaultValue;
  }
}
