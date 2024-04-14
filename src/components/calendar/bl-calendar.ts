import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import { Calendar, CalendarView, Month } from "./bl-calendar.types";

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
  private _day: number;

  @state()
  private _month: Month = MONTHS[new Date().getMonth()];

  @state()
  private _year: number = new Date().getFullYear();

  @state()
  private _calendarView: CalendarView = "days";

  @state()
  private _calendarYears: number[] = [];

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
  setPreviousCalendarView() {
    if (this._calendarView === "days") {
      if (this._month.value === MONTHS[0].value) {
        this.setMonth(MONTHS[11].value);
        this._year -= 1;
      } else this.setMonth(this._month.value - 1);
    } else if (this._calendarView === "years") {
      const fromYear = this._calendarYears[0];

      this._calendarYears = [];
      for (let i = 12; i > 0; i--) {
        this._calendarYears.push(fromYear - i);
      }
    }
  }
  setNextCalendarView() {
    if (this._calendarView === "days") {
      if (this._month.value === MONTHS[11].value) {
        this.setMonth(MONTHS[0].value);
        this._year += 1;
      } else this.setMonth(this._month.value + 1);
    } else if (this._calendarView === "years") {
      const fromYear = this._calendarYears[11];

      this._calendarYears = [];
      for (let i = 1; i <= 12; i++) {
        this._calendarYears.push(fromYear + i);
      }
    }
  }

  setCalendarView(calendarView: CalendarView) {
    this._calendarView = calendarView;
  }

  setMonthAndCalendarView(index: number) {
    this.setMonth(index);
    this.setCalendarView("years");
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
    const setCalendarView = (calendarView: CalendarView) => {
      if (calendarView === "days") {
        const today = new Date();
        const showTodayDay =
          this._month.value === today.getMonth() && this._year === today.getFullYear();
        const calendarDays = this.createCalendarDays();

        return html`<div class="days-view">
          ${[...calendarDays.entries()].map(([key, value]) => {
            return html` <div class="day-column">
              <div class="weekday-text day-cell">${DAYS[key]}</div>
              ${value.map(day => {
                return html` <div
                  class="day-cell ${showTodayDay && day === today.getDate() && "today-day"} ${this
                    ._day === day &&
                  showTodayDay &&
                  "selected-day"}"
                  @click="${() => (this._day = Number(day))}"
                >
                  ${day}
                </div>`;
              })}
            </div>`;
          })}
        </div>`;

        // selected day'i objec gibi tutabilirim {day,month,year}
      } else if (calendarView === "months") {
        return html`<div class="months-view">
          ${MONTHS.map((month, index) => {
            return html`<bl-button
              variant="tertiary"
              kind="neutral"
              class="day-text"
              @click="${() => this.setMonthAndCalendarView(index)}"
              >${month.name}</bl-button
            >`;
          })}
        </div>`;
      } else {
        if (this._calendarYears.length === 0) {
          for (let i = 4; i >= 0; i--) this._calendarYears.push(this._year - i);
          for (let i = 1; i <= 7; i++) this._calendarYears.push(this._year + i);
        }
        return html`<div class="months-view">
          ${this._calendarYears.map(year => {
            return html`<bl-button variant="tertiary" kind="neutral" class="day-text"
              >${year}</bl-button
            >`;
          })}
        </div>`;
      }
    };

    return html`<div>
      <div class="calendar-content">
        <div class="selected-month-year-content">
          <bl-button
            class="arrows"
            icon="arrow_left"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setPreviousCalendarView()}"
          ></bl-button>
          <div class="selected-month-year">
            <bl-button
              variant="tertiary"
              kind="neutral"
              class="day-text"
              @click="${() => this.setCalendarView("months")}"
              >${this._month.name}</bl-button
            >
            <bl-button
              variant="tertiary"
              kind="neutral"
              class="day-text"
              @click="${() => this.setCalendarView("years")}"
              >${this._year}</bl-button
            >
          </div>
          <bl-button
            class="arrows"
            icon="arrow_right"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setNextCalendarView()}"
          ></bl-button>
        </div>
        <div>${setCalendarView(this._calendarView)}</div>
      </div>
    </div> `;
  }
}
