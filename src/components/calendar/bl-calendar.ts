import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, FIRST_MONTH_INDEX, LAST_MONTH_INDEX, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import {
  Calendar,
  CalendarDate,
  CalendarType,
  CalendarView,
  Day,
  DayValues,
  RangePickerDates,
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
  minDate: Date;

  /**
   * Defines the maximum date value for the calendar
   */
  @property({ attribute: false, reflect: true })
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
  startOfWeek: DayValues = 0;

  @property()
  locale: string = document.documentElement.lang;

  /**
   * Defines the unselectable dates for calendar
   */
  @property({ type: Array })
  disabledDates: Date | Date[];

  @state()
  private _selectedDates: CalendarDate[] = [];

  @state()
  private _selectedRangeDates: RangePickerDates = { startDate: undefined, endDate: undefined };

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
  clearHoverClassesFromShadowRoot() {
    this.shadowRoot?.querySelectorAll(".hover-day").forEach(day => {
      day.classList.remove("hover-day");
    });
    this.shadowRoot?.querySelectorAll(".hover-start-day").forEach(day => {
      day.classList.remove("hover-start-day");
    });
    this.shadowRoot?.querySelectorAll(".hover-end-day").forEach(day => {
      day.classList.remove("hover-end-day");
    });
  }
  handleDate(date: CalendarDate) {
    if (date.getMonth() < this._calendarMonth) {
      this.setPreviousCalendarView();
    } else if (date.getMonth() > this._calendarMonth) {
      this.setNextCalendarView();
    }

    if (this.type === "single") {
      this.handleSingleSelectCalendar(date);
    } else if (this.type === "multiple") {
      this.handleMultipleSelectCalendar(date);
    } else if (this.type === "range") {
      this.handleRangeSelectCalendar(date);
    }

    this._onBlCalendarChange(this._selectedDates);
    this.requestUpdate();
  }
  handleSingleSelectCalendar(calendarDate: CalendarDate) {
    this._selectedDates.splice(0, 1);
    this._selectedDates.push(calendarDate);
  }
  handleMultipleSelectCalendar(calendarDate: CalendarDate) {
    const dateExist = this._selectedDates.find(function (selectedDate) {
      return selectedDate.getTime() === calendarDate.getTime();
    });

    if (dateExist) this._selectedDates.splice(this._selectedDates.indexOf(calendarDate), 1);
    else this._selectedDates.push(calendarDate);
  }
  handleRangeSelectCalendar(calendarDate: CalendarDate) {
    if (!this._selectedRangeDates.startDate) {
      this._selectedRangeDates.startDate = calendarDate;
      this._selectedDates.push(calendarDate);
    } else if (this._selectedRangeDates.startDate && !this._selectedRangeDates.endDate) {
      if (calendarDate.getTime() > this._selectedRangeDates.startDate.getTime()) {
        this._selectedRangeDates.endDate = calendarDate;
        this._selectedDates.push(calendarDate);
      } else if (calendarDate.getTime() < this._selectedRangeDates.startDate.getTime()) {
        const temp = this._selectedRangeDates.startDate;

        this._selectedRangeDates.startDate = calendarDate;
        this._selectedRangeDates.endDate = temp;
        this._selectedDates.splice(
          0,
          this._selectedDates.length,
          this._selectedRangeDates.startDate,
          this._selectedRangeDates.endDate
        );
      }
      const endDateParentElement = this.shadowRoot?.getElementById(
        `${this._selectedRangeDates.endDate?.getTime()}`
      )?.parentElement;

      endDateParentElement?.classList.remove("hover-day");
      endDateParentElement?.classList.add("hover-end-day");
    } else if (this._selectedRangeDates.startDate && this._selectedRangeDates.endDate) {
      if (calendarDate.getTime() > this._selectedRangeDates.endDate.getTime()) {
        this._selectedDates.splice(1, this._selectedDates.length, calendarDate);
        this._selectedRangeDates.endDate = calendarDate;
        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.endDate?.getTime()}`
        )?.parentElement;
        endDateParentElement?.classList.add("hover-end-day");
      } else if (calendarDate.getTime() < this._selectedRangeDates.endDate.getTime()) {
        this._selectedDates.splice(1, this._selectedDates.length, calendarDate);
        this._selectedRangeDates.endDate = calendarDate;
        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.endDate?.getTime()}`
        )?.parentElement;
        endDateParentElement?.classList.add("hover-end-day");
        this.shadowRoot?.querySelectorAll(".hover-day-light").forEach(day => {
          day.classList.remove("hover-day-light");
        });
        this.shadowRoot?.querySelectorAll(".hover-end-day-light ").forEach(day => {
          day.classList.remove("hover-end-day-light");
        });
      }
    } else {
      this.clearHoverClassesFromShadowRoot();
      this._selectedRangeDates.startDate = calendarDate;
      this._selectedRangeDates.endDate = undefined;
      this._selectedDates.splice(0, this._selectedDates.length, this._selectedRangeDates.startDate);
    }
  }

  checkIfSelectedDate(calendarDate: CalendarDate) {
    return this._selectedDates.find(selectedDate => {
      return calendarDate.getTime() === selectedDate.getTime();
    });
  }
  checkIfDateIsToday(calendarDate: CalendarDate) {
    const today = new Date();

    return today.getTime() === calendarDate.getTime();
  }
  checkIfDateIsDisabled(calendarDate: CalendarDate) {
    if (
      calendarDate.getTime() < this.minDate?.getTime() ||
      calendarDate.getTime() > this.maxDate?.getTime()
    ) {
      return true;
    }

    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.find(disabledDate => {
        return calendarDate.getTime() === disabledDate.getTime();
      });
    } else if (this.disabledDates) {
      if (calendarDate.getTime() === this.disabledDates.getTime()) return true;
    }
    return false;
  }

  setHoverClass(calendarDate: CalendarDate) {
    if (!this._selectedRangeDates.startDate && !this._selectedRangeDates.endDate)
      this.clearHoverClassesFromShadowRoot();
    if (
      this.type === "range" &&
      this._selectedRangeDates.startDate &&
      !this._selectedRangeDates.endDate
    ) {
      const startDateParentElement = this.shadowRoot?.getElementById(
        `${this._selectedRangeDates.startDate?.getTime()}`
      )?.parentElement;

      startDateParentElement?.classList.add("hover-start-day");

      const min = Math.min(this._selectedRangeDates.startDate?.getTime(), calendarDate.getTime());
      const max = Math.max(this._selectedRangeDates.startDate?.getTime(), calendarDate.getTime());

      const rangeDays = [...this.createCalendarDays().values()]
        .flat()
        .filter(date => date.getTime() > min && date.getTime() <= max);

      for (let i = 0; i < rangeDays.length; i++) {
        const element = this.shadowRoot?.getElementById(`${rangeDays[i].getTime()}`);

        element?.classList?.add("hover-day");
      }
    } else if (
      this.type === "range" &&
      this._selectedRangeDates.startDate &&
      this._selectedRangeDates.endDate
    ) {
      if (calendarDate.getTime() > this._selectedRangeDates.endDate.getTime()) {
        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.endDate?.getTime()}`
        )?.parentElement;
        endDateParentElement?.classList?.remove("hover-end-day");

        endDateParentElement?.classList?.add("hover-day");

        const rangeDays = [...this.createCalendarDays().values()]
          .flat()
          .filter(
            date =>
              date.getTime() > this._selectedRangeDates?.endDate?.getTime() &&
              date.getTime() <= calendarDate.getTime()
          );

        for (let i = 0; i < rangeDays.length; i++) {
          const element = this.shadowRoot?.getElementById(`${rangeDays[i].getTime()}`);

          element?.classList?.add("hover-day");
        }
      } else if (
        calendarDate.getTime() < this._selectedRangeDates.endDate.getTime() &&
        calendarDate.getTime() > this._selectedRangeDates.startDate.getTime()
      ) {
        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.endDate?.getTime()}`
        )?.parentElement;
        endDateParentElement?.classList?.remove("hover-end-day");
        endDateParentElement?.classList?.add("hover-end-day-light");

        const rangeDays = [...this.createCalendarDays().values()]
          .flat()
          .filter(
            date =>
              date.getTime() > calendarDate.getTime() &&
              date.getTime() < this._selectedRangeDates?.endDate?.getTime()
          );

        for (let i = 0; i < rangeDays.length; i++) {
          const element = this.shadowRoot?.getElementById(`${rangeDays[i].getTime()}`);
          element?.classList?.remove("hover-day");

          element?.classList?.add("hover-day-light");
        }
      }
    }
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
      const date = new Date(
        this._calendarYear,
        this._calendarMonth - 1,
        previousMonthDayCount - lastMonthDaysIterator + 1
      );

      calendar.set(DAYS[mod].name, [date]);

      dayOfTheWeek += 1;
    }
    for (
      let currentMonthDaysIterator = 1;
      currentMonthDaysIterator <= currentMonthDayCount;
      currentMonthDaysIterator++
    ) {
      const mod = dayOfTheWeek % 7;
      const day = new Date(this._calendarYear, this._calendarMonth, currentMonthDaysIterator);

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
        const date = new Date(this._calendarYear, this._calendarMonth + 1, nextMonthDaysIterator);

        calendar.get(DAYS[mod].name)?.push(date);

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

                return html` <div>
                  <div
                    id=${date.getTime()}
                    @mouseover="${() => this.setHoverClass(date)}"
                    class="day-cell ${isDayToday && "today-day"} ${isSelectedDay &&
                    "selected-day"} ${date.getMonth() !== this._calendarMonth &&
                    "other-month-day"}  ${isDisabledDay && "disabled-day"}"
                    @click="${() => !isDisabledDay && this.handleDate(date)}"
                  >
                    ${date.getDate()}
                  </div>
                </div>`;
              })}
            </div> </div>`;
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
