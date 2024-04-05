import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import { Calendar, Month } from "./bl-calendar.types";

/**
 * @tag bl-calendar
 * @summary Baklava Calendar component
 **/

@customElement("bl-calendar")
export default class BlCalendar extends LitElement {
  /**
   *Defines the calendar types, available types are single,multiple and range
   */
  @property()
  type: Calendar = "single";

  /**
   *Defines the minimum date value for the calendar
   */
  @property()
  minDate?: Date | string;

  /**
   * Defines the maximum date value for the calendar
   */
  @property()
  maxDate?: Date | string;

  /**
   * Defines the default selected date value for the calendar
   */
  @property({ type: Array, attribute: "default-value", reflect: true })
  defaultValue?: Date | Date[];

  /**
   * Defines the start day of the calendar (1 defines monday)
   */
  @property({ type: Number, attribute: "start-of-week", reflect: true })
  startOfWeek?: number = 1;

  @property()
  locale?: string = document.documentElement.lang;

  /**
   * Defines the unselectable dates for calendar
   */
  @property({ type: Array })
  disabledDates?: Date | Date[];

  @state()
  private _month: Month = MONTHS[new Date().getMonth()];

  @state()
  private _year: number = new Date().getFullYear();

  static get styles(): CSSResultGroup {
    return [style];
  }
  setMonth(monthIndex: number) {
    this._month = MONTHS[monthIndex];
  }
  getDayNumInAMonth() {
    return new Date(this._month.value + 1, this._year, 0).getDate();
  }
  getWeekDayOfDate() {
    return new Date(this._year, this._month.value, 1).getDay();
  }
  setPreviousMonth() {
    if (this._month.value === MONTHS[0].value) {
      this.setMonth(MONTHS[11].value);
      this._year -= 1;
    } else this.setMonth(this._month.value - 1);
  }
  setNextMonth() {
    if (this._month.value === MONTHS[11].value) {
      this.setMonth(MONTHS[0].value);
      this._year += 1;
    } else this.setMonth(this._month.value + 1);
  }
  createCalendarDays() {
    const currentMonthCalendar: Map<number, (number | string)[]> = new Map();
    let dayOfTheWeek = 0;
    let iteratedDay = 1;
    const currentMonthTotalCalendarCellCount = this.getDayNumInAMonth() + this.getWeekDayOfDate();

    for (
      let currentMonthCalendarCellIterator = 0;
      currentMonthCalendarCellIterator < currentMonthTotalCalendarCellCount;
      currentMonthCalendarCellIterator += 1
    ) {
      const mod = dayOfTheWeek % 7;

      if (currentMonthCalendarCellIterator < this.getWeekDayOfDate()) {
        currentMonthCalendar.set(mod, [""]);
      } else if (currentMonthCalendar.get(mod)) {
        currentMonthCalendar.get(mod)?.push(iteratedDay);
        iteratedDay += 1;
      } else {
        currentMonthCalendar.set(mod, [iteratedDay]);
        iteratedDay += 1;
      }
      dayOfTheWeek += 1;
    }
    return currentMonthCalendar;
  }

  render() {
    const calendarDays = this.createCalendarDays();
    const calendarView = [...calendarDays.entries()].map(([key, value]) => {
      return html`<div class="calendar-column">
        <div class="weekday-text calendar-cell">${DAYS[key]}</div>
        ${value.map(day => {
          return html` <div class="day-text calendar-cell">${day}</div>`;
        })}
      </div>`;
    });

    return html`<div>
      <div class="calendar-content">
        <div class="selected-month-year-content">
          <bl-button
            class="arrows"
            icon="arrow_left"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setPreviousMonth()}"
          ></bl-button>
          <div class="selected-month-year">
            <span class="day-text">${this._month.name}</span>
            <span class="day-text">${this._year}</span>
          </div>
          <bl-button
            class="arrows"
            icon="arrow_right"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setNextMonth()}"
          ></bl-button>
        </div>
        <div class="weekdays">${calendarView}</div>
      </div>
    </div> `;
  }
}
