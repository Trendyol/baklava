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
  @property()
  minDate: Date;

  /**
   * Defines the maximum date value for the calendar
   */
  @property()
  maxDate: Date;

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
  handleDate(calendarDay: CalendarDay) {
    const date = { day: calendarDay.day, month: this._calendarMonth, year: this._calendarYear };

    if (calendarDay.belongsToPrevMonth) {
      this.setPreviousCalendarView();
    } else if (calendarDay.belongsToNextMonth) {
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
  checkIfSelectedDate(day: CalendarDay) {
    return this._selectedDates.find(date => {
      return (
        date.day === day.day &&
        date.month === this._calendarMonth &&
        date.year === this._calendarYear &&
        day.belongsToCurrentMonth
      );
    });
  }
  checkIfDateIsToday(day: number) {
    const today = new Date();

    return (
      this._calendarMonth === today.getMonth() &&
      this._calendarYear === today.getFullYear() &&
      day === today.getDate()
    );
  }
  checkIfDateIsDisabled(day: number) {
    const date = new Date(this._calendarYear, this._calendarMonth, day);

    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.find(disabledDate => {
        return date.toDateString() === disabledDate.toDateString();
      });
    } else if (this.disabledDates) {
      return date.toDateString() === this.disabledDates.toDateString();
    } else if (this.minDate && this.maxDate) {
      return date < this.minDate || date > this.maxDate;
    } else if (this.minDate) {
      return date < this.minDate;
    } else if (this.maxDate) return date > this.maxDate;
    else return false;
  }
  createCalendarDays() {
    const currentMonthCalendar: Calendar = new Map();
    let dayOfTheWeek = 0; // from sunday
    let iteratedDay = 1;
    let currentMonthCalendarCellIterator = 0;
    const dateAndYear = { month: this._calendarMonth, year: this._calendarYear };
    const currentMonthStartWeekDay = this.getWeekDayOfDate(this._calendarYear, this._calendarMonth);

    const previousMonthDayCount = this.getDayNumInAMonth(
      this._calendarYear,
      this._calendarMonth - 1
    );
    const currentMonthTotalCalendarCellCount =
      this.getDayNumInAMonth(this._calendarYear, this._calendarMonth) + currentMonthStartWeekDay;

    for (
      currentMonthCalendarCellIterator;
      currentMonthCalendarCellIterator < currentMonthTotalCalendarCellCount;
      currentMonthCalendarCellIterator += 1
    ) {
      const mod = dayOfTheWeek % 7;

      if (currentMonthCalendarCellIterator < currentMonthStartWeekDay) {
        currentMonthCalendar.set(DAYS[mod], [
          {
            day:
              previousMonthDayCount -
              (currentMonthStartWeekDay - currentMonthCalendarCellIterator - 1),
            belongsToPrevMonth: true,
            ...dateAndYear,
          },
        ]);
      } else if (currentMonthCalendar.get(DAYS[mod])) {
        currentMonthCalendar.get(DAYS[mod])?.push({
          day: iteratedDay,
          belongsToCurrentMonth: true,
          ...dateAndYear,
        });
        iteratedDay += 1;
      } else {
        currentMonthCalendar.set(DAYS[mod], [
          {
            day: iteratedDay,
            belongsToCurrentMonth: true,
            ...dateAndYear,
          },
        ]);
        iteratedDay += 1;
      }
      dayOfTheWeek += 1;
    }
    let nearestMultipleOfSeven = currentMonthCalendarCellIterator;

    if (currentMonthCalendarCellIterator % 7 > 0)
      nearestMultipleOfSeven =
        currentMonthCalendarCellIterator + (7 - (currentMonthCalendarCellIterator % 7));

    for (
      let nextMonthDaysIterator = 1;
      nextMonthDaysIterator <= nearestMultipleOfSeven - currentMonthCalendarCellIterator;
      nextMonthDaysIterator++
    ) {
      const mod = (currentMonthCalendarCellIterator + nextMonthDaysIterator - 1) % 7;

      currentMonthCalendar.get(DAYS[mod])?.push({
        day: nextMonthDaysIterator,
        belongsToNextMonth: true,
        ...dateAndYear,
      });
    }
    return currentMonthCalendar;
  }
  reArrangeCalendarForStartOfWeek(map: Calendar) {
    const newMap: Calendar = new Map();
    const keys = Array.from(map.keys());
    const index = keys.indexOf(DAYS[this.startOfWeek]);

    for (let i = 0; i < keys.length; i++) {
      const newIndex = (index + i) % keys.length;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const temp = map.get(keys[newIndex]) as CalendarDay[];

      if (!temp[0].belongsToCurrentMonth) {
        const firstElement = temp.shift();

        if (firstElement) temp.push(firstElement);
      }
      newMap.set(DAYS[newIndex], temp);
    }

    return newMap;
  }
  render() {
    const getCalendarView = (calendarView: CalendarView) => {
      if (calendarView === "days") {
        const calendarDays = this.createCalendarDays();
        const reArrangeCalendarForStartOfWeek = this.reArrangeCalendarForStartOfWeek(calendarDays);

        return html`<div class="days-view">
          ${[...reArrangeCalendarForStartOfWeek.entries()].map(([key, value]) => {
            return html` <div class="day-column">
              <div class="weekday-text day-cell">${key}</div>
              ${value.map(date => {
                const isSelectedDay = this.checkIfSelectedDate(date);
                const isDayToday = this.checkIfDateIsToday(date.day);
                const isDisabledDay = this.checkIfDateIsDisabled(date.day);

                return html` <div
                  class="day-cell ${isDayToday && "today-day"} ${isSelectedDay &&
                  "selected-day"} ${isDisabledDay && "disabled-day"} ${(date.belongsToNextMonth ||
                    date.belongsToPrevMonth) &&
                  "other-month-day"}"
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
