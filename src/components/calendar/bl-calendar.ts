import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, FIRST_MONTH_INDEX, LAST_MONTH_INDEX, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import {
  Calendar,
  CalendarDay,
  CalendarType,
  CalendarView,
  Day,
  SelectedDate,
} from "./bl-calendar.types";

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
  type: CalendarType = "single";

  /**
   *Defines the minimum date value for the calendar
   */
  @property({ attribute: false, reflect: true })
  minDate: Date = new Date(2024, 2, 3);

  /**
   * Defines the maximum date value for the calendar
   */
  @property({ attribute: false, reflect: true })
  maxDate: Date = new Date(2024, 5, 3);

  /**
   * Defines the default selected date value for the calendar
   */
  @property({ type: Array, attribute: "default-value", reflect: true })
  defaultValue: Date | Date[];

  /**
   * Defines the start day of the calendar (1 defines monday)
   */
  @property({ type: Number, attribute: "start-of-week", reflect: true })
  startOfWeek: number = 3;

  @property()
  locale: string = document.documentElement.lang;

  /**
   * Defines the unselectable dates for calendar
   */
  @property({ type: Array })
  disabledDates: Date | Date[];

  @state()
  private _selectedDates: SelectedDate[] = [];

  @state()
  private _calendarMonth: number = new Date().getMonth();

  @state()
  private _calendarYear: number = new Date().getFullYear();

  @state()
  private _calendarView: CalendarView = "days";

  @state()
  private _calendarYears: number[] = [];

  @state()
  private _calendarDays: Day[] = [];

  /**
   * Fires when date selection changes
   */
  @event("bl-calendar") private _onBlCalendarChange: EventDispatcher<Date | Date[]>;
  static get styles(): CSSResultGroup {
    return [style];
  }
  getDayNumInAMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
  getWeekDayOfDate(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }
  setPreviousCalendarView() {
    if (this._calendarView === "days") {
      if (this._calendarMonth === FIRST_MONTH_INDEX) {
        this._calendarMonth = LAST_MONTH_INDEX;
        this._calendarYear -= 1;
      } else this._calendarMonth -= 1;
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
      if (this._calendarMonth === LAST_MONTH_INDEX) {
        this._calendarMonth = FIRST_MONTH_INDEX;
        this._calendarYear += 1;
      } else this._calendarMonth += 1;
    } else if (this._calendarView === "years") {
      const fromYear = this._calendarYears[11];

      this._calendarYears = [];
      for (let i = 1; i <= 12; i++) {
        this._calendarYears.push(fromYear + i);
      }
    }
  }
  setMonthAndCalendarView(month: number) {
    this._calendarMonth = month;
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
  handleDate(date: CalendarDay) {
    if (date.month < this._calendarMonth) {
      this.setPreviousCalendarView();
    } else if (date.month > this._calendarMonth) {
      this.setNextCalendarView();
    }

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
  checkIfSelectedDate(calendarDay: CalendarDay) {
    return this._selectedDates.find(selectedDate => {
      return (
        selectedDate.day === calendarDay.day &&
        selectedDate.month === this._calendarMonth &&
        selectedDate.year === this._calendarYear &&
        calendarDay.month === this._calendarMonth
      );
    });
  }
  checkIfDateIsToday(calendarDay: CalendarDay) {
    const today = new Date();

    return (
      today.getMonth() === calendarDay.month &&
      today.getFullYear() === calendarDay.year &&
      today.getDate() === calendarDay.day
    );
  }
  checkIfDateIsDisabled(calendarDay: CalendarDay) {
    const date = new Date(calendarDay.year, calendarDay.month, calendarDay.day);

    if (date < this.minDate || date > this.maxDate) {
      return true;
    }

    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.find(disabledDate => {
        return date.toDateString() === disabledDate.toDateString();
      });
    } else if (this.disabledDates) {
      if (date.toDateString() === this.disabledDates.toString()) return true;
    }
    return false;
  }

  createCalendarDays() {
    const calendar: Calendar = new Map();

    this._calendarDays = DAYS.slice(this.startOfWeek).concat(DAYS.slice(0, this.startOfWeek));

    const currentMonthStartWeekDay = this.getWeekDayOfDate(this._calendarYear, this._calendarMonth); // 1

    const lastMonthDaysCount =
      currentMonthStartWeekDay < this.startOfWeek
        ? 7 - (this.startOfWeek - currentMonthStartWeekDay)
        : currentMonthStartWeekDay - this.startOfWeek;

    const previousMonthDayCount = this.getDayNumInAMonth(
      this._calendarYear,
      this._calendarMonth - 1
    );

    const currentMonthDayCount = this.getDayNumInAMonth(this._calendarYear, this._calendarMonth);

    let dayOfTheWeek = this.startOfWeek; // from sunday

    for (
      let lastMonthDaysIterator = lastMonthDaysCount;
      lastMonthDaysIterator > 0;
      lastMonthDaysIterator--
    ) {
      const mod = dayOfTheWeek % 7;

      calendar.set(DAYS[mod].name, [
        {
          day: previousMonthDayCount - lastMonthDaysIterator + 1,
          month: this._calendarMonth - 1,
          year: this._calendarYear,
        },
      ]);

      dayOfTheWeek += 1;
    }
    for (
      let currentMonthDaysIterator = 1;
      currentMonthDaysIterator <= currentMonthDayCount;
      currentMonthDaysIterator++
    ) {
      const mod = dayOfTheWeek % 7;
      const day = {
        day: currentMonthDaysIterator,
        month: this._calendarMonth,
        year: this._calendarYear,
      };

      if (calendar.get(DAYS[mod].name)) {
        calendar.get(DAYS[mod].name)?.push(day);
      } else {
        calendar.set(DAYS[mod].name, [day]);
      }
      dayOfTheWeek += 1;
    }

    const index = this._calendarDays.findIndex(day => day.value === dayOfTheWeek % 7);

    if (index !== 0) {
      for (
        let nextMonthDaysIterator = 1;
        nextMonthDaysIterator <= this._calendarDays.length - index;
        nextMonthDaysIterator++
      ) {
        const mod = dayOfTheWeek % 7;
        const day = {
          day: nextMonthDaysIterator,
          month: this._calendarMonth + 1,
          year: this._calendarYear,
        };

        calendar.get(DAYS[mod].name)?.push(day);

        dayOfTheWeek += 1;
      }
    }
    return calendar;
  }
  render() {
    const getCalendarView = (calendarView: CalendarView) => {
      if (calendarView === "days") {
        const calendarDays = this.createCalendarDays();

        return html`<div class="days-view">
          ${[...calendarDays.entries()].map(([key, value]) => {
            return html` <div class="day-column">
              <div class="weekday-text day-cell">${key}</div>
              ${value.map(date => {
                const isSelectedDay = this.checkIfSelectedDate(date);
                const isDayToday = this.checkIfDateIsToday(date);
                const isDisabledDay = this.checkIfDateIsDisabled(date);

                //console.log(isDisabledDay, date);
                return html` <div
                  class="day-cell ${isDayToday && "today-day"} ${isSelectedDay &&
                  "selected-day"} ${isDisabledDay && "disabled-day"} ${date.month !==
                    this._calendarMonth && "other-month-day"}"
                  @click="${() => !isDisabledDay && this.handleDate(date)}"
                >
                  ${date.day}
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
              >${MONTHS[this._calendarMonth].name}</bl-button
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
