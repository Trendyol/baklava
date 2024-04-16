import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import { Calendar, CalendarView, Month, SelectedDate } from "./bl-calendar.types";

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
  private _selectedDates: SelectedDate[] = [];

  @state()
  private _calendarMonth: Month = MONTHS[new Date().getMonth()];

  @state()
  private _calendarYear: number = new Date().getFullYear();

  @state()
  private _calendarView: CalendarView = "days";

  @state()
  private _calendarYears: number[] = [];

  /**
   * Fires when date selection changes
   */
  @event("bl-calendar") private _onBlCalendarChange: EventDispatcher<Date | Date[]>;
  static get styles(): CSSResultGroup {
    return [style];
  }
  getDayNumInAMonth() {
    return new Date(this._calendarMonth.value + 1, this._calendarYear, 0).getDate();
  }
  getWeekDayOfDate() {
    return new Date(this._calendarYear, this._calendarMonth.value, 1).getDay();
  }
  setPreviousCalendarView() {
    if (this._calendarView === "days") {
      if (this._calendarMonth.value === MONTHS[0].value) {
        this._calendarMonth = MONTHS[11];
        this._calendarYear -= 1;
      } else this._calendarMonth = MONTHS[this._calendarMonth.value - 1];
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
      if (this._calendarMonth.value === MONTHS[11].value) {
        this._calendarMonth = MONTHS[0];
        this._calendarYear += 1;
      } else this._calendarMonth = MONTHS[this._calendarMonth.value + 1];
    } else if (this._calendarView === "years") {
      const fromYear = this._calendarYears[11];

      this._calendarYears = [];
      for (let i = 1; i <= 12; i++) {
        this._calendarYears.push(fromYear + i);
      }
    }
  }
  setMonthAndCalendarView(index: number) {
    this._calendarMonth = MONTHS[index];
    this._calendarView = "days";
  }
  setYearAndCalendarView(year: number) {
    this._calendarYear = year;
    this._calendarView = "days";
  }

  createCalendarYears() {
    if (this._calendarYears.length === 0) {
      for (let i = 4; i >= 0; i--) this._calendarYears.push(this._calendarYear - i);
      for (let i = 1; i <= 7; i++) this._calendarYears.push(this._calendarYear + i);
    }
  }
  setOrClearDate(day: number) {
    const date = { day, month: this._calendarMonth.value, year: this._calendarYear };

    if (this.type === "single") {
      this._selectedDates.splice(0, 1);
      this._selectedDates.push(date);
    } else if (this.type === "multiple") {
      const dateExist = this._selectedDates.find(function (selectedDate) {
        return (
          selectedDate.day === date.day &&
          selectedDate.month === date.month &&
          selectedDate.year === date.year
        );
      });

      if (dateExist) this._selectedDates.splice(this._selectedDates.indexOf(date), 1);
      else this._selectedDates.push(date);
    }
    this._onBlCalendarChange(
      this._selectedDates.map(date => {
        return new Date(date.month + 1, date.year, date.day);
      })
    );
    this.requestUpdate();
  }
  checkIfSelectedDate(day: number) {
    return this._selectedDates.find(date => {
      return (
        date.day === day &&
        date.month === this._calendarMonth.value &&
        date.year === this._calendarYear
      );
    });
  }
  checkIfDateIsToday(day: number) {
    const today = new Date();

    return (
      this._calendarMonth.value === today.getMonth() &&
      this._calendarYear === today.getFullYear() &&
      day === today.getDate()
    );
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
    const getCalendarView = (calendarView: CalendarView) => {
      if (calendarView === "days") {
        const calendarDays = this.createCalendarDays();

        return html`<div class="days-view">
          ${[...calendarDays.entries()].map(([key, value]) => {
            return html` <div class="day-column">
              <div class="weekday-text day-cell">${DAYS[key]}</div>
              ${value.map(day => {
                const isSelectedDay = this.checkIfSelectedDate(Number(day));
                const isToday = this.checkIfDateIsToday(Number(day));

                return html` <div
                  class="day-cell ${isToday && "today-day"} ${isSelectedDay && "selected-day"}"
                  @click="${() => this.setOrClearDate(Number(day))}"
                >
                  ${day}
                </div>`;
              })}
            </div>`;
          })}
        </div>`;
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
        this.createCalendarYears();
        return html`<div class="months-view">
          ${this._calendarYears.map(year => {
            return html`<bl-button
              variant="tertiary"
              kind="neutral"
              class="day-text"
              @click="${() => this.setYearAndCalendarView(year)}"
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
              @click="${() => (this._calendarView = "months")}"
              >${this._calendarMonth.name}</bl-button
            >
            <bl-button
              variant="tertiary"
              kind="neutral"
              class="day-text"
              @click="${() => (this._calendarView = "years")}"
              >${this._calendarYear}</bl-button
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
        <div>${getCalendarView(this._calendarView)}</div>
      </div>
    </div> `;
  }
}
