import { CSSResultGroup, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import DatepickerCalendarMixin from "../../mixins/datepicker-calendar-mixin/datepicker-calendar-mixin";
import { event, EventDispatcher } from "../../utilities/event";
import "../button/bl-button";
import "../icon/bl-icon";
import {
  CALENDAR_TYPES,
  CALENDAR_VIEWS,
  FIRST_MONTH_INDEX,
  LAST_MONTH_INDEX,
} from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import { Calendar, CalendarDay, CalendarView } from "./bl-calendar.types";

/**
 * @tag bl-calendar
 * @summary Baklava Calendar component
 **/
@customElement("bl-calendar")
export default class BlCalendar extends DatepickerCalendarMixin {
  @state()
  today = new Date();
  @state()
  _calendarMonth: number = this.today.getMonth();
  @state()
  _calendarYear: number = this.today.getFullYear();
  @state()
  _calendarView: CalendarView = CALENDAR_VIEWS.DAYS;
  @state()
  _calendarYears: number[] = [];
  @state()
  _calendarDays: CalendarDay[] = [];
  /**
   * Fires when date selection changes
   */
  @event("bl-calendar-change") _onBlCalendarChange: EventDispatcher<Date[]>;

  static get styles(): CSSResultGroup {
    return [style];
  }

  get months() {
    return [...Array(12).keys()].map(month => ({
      name: new Date(0, month + 1, 0).toLocaleString(this.locale, { month: "long" }),
      value: month,
    }));
  }

  get days() {
    return [...Array(7).keys()].map(day => ({
      name: new Date(0, 0, day).toLocaleString(this.locale, { weekday: "short" }),
      value: day,
    }));
  }

  public handleClearSelectedDates = () => {
    this._selectedDates = [];
    this._onBlCalendarChange([]);
    this.clearRangePickerStyles();
  };

  getDayNumInAMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getWeekDayOfDate(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }

  setPreviousCalendarView() {
    this.clearRangePickerStyles();
    if (this._calendarView === CALENDAR_VIEWS.DAYS) {
      if (this._calendarMonth === FIRST_MONTH_INDEX) {
        this._calendarMonth = LAST_MONTH_INDEX;
        this._calendarYear -= 1;
      } else this._calendarMonth -= 1;
    } else if (this._calendarView === CALENDAR_VIEWS.MONTHS) {
      this._calendarYear -= 1;
    } else if (this._calendarView === CALENDAR_VIEWS.YEARS) {
      const fromYear = this._calendarYears[0];

      this._calendarYears = Array.from({ length: 12 }, (_, i) => fromYear - (i + 1));
    }
    if (this.type === CALENDAR_TYPES.RANGE) this.setHoverClass();
  }

  setNextCalendarView() {
    this.clearRangePickerStyles();
    if (this._calendarView === CALENDAR_VIEWS.DAYS) {
      if (this._calendarMonth === LAST_MONTH_INDEX) {
        this._calendarMonth = FIRST_MONTH_INDEX;
        this._calendarYear += 1;
      } else this._calendarMonth += 1;
    } else if (this._calendarView === CALENDAR_VIEWS.MONTHS) {
      this._calendarYear += 1;
    } else if (this._calendarView === CALENDAR_VIEWS.YEARS) {
      const fromYear = this._calendarYears[11];

      this._calendarYears = Array.from({ length: 12 }, (_, i) => fromYear + (i + 1));
    }
    this.setHoverClass();
  }

  setCurrentCalendarView(view: CalendarView) {
    this._calendarView = this._calendarView !== view ? view : CALENDAR_VIEWS.DAYS;
    this.setHoverClass();
  }

  setMonthAndCalendarView(month: number) {
    this._calendarMonth = month;
    this._calendarView = CALENDAR_VIEWS.DAYS;
    if (this.type === CALENDAR_TYPES.RANGE) this.setHoverClass();
  }

  setYearAndCalendarView(year: number) {
    this._calendarYear = year;
    this._calendarView = CALENDAR_VIEWS.DAYS;
    if (this.type === CALENDAR_TYPES.RANGE) this.setHoverClass();
  }

  generateSurroundingYears() {
    if (!this._calendarYears.length) {
      this._calendarYears = Array.from({ length: 12 }, (_, i) => this._calendarYear - 4 + i);
    }
  }

  clearRangePickerStyles() {
    this.shadowRoot
      ?.querySelectorAll(".range-day, .range-start-day, .range-end-day")
      .forEach(day => day.classList.remove("range-day", "range-start-day", "range-end-day"));
  }

  handleDate(date: Date) {
    if (this.type !== CALENDAR_TYPES.RANGE) {
      const isDateBeforeThanCalendar =
        date.getFullYear() < this._calendarYear ||
        (date.getFullYear() === this._calendarYear && date.getMonth() < this._calendarMonth);

      const isDateAfterThanCalendar =
        date.getFullYear() > this._calendarYear ||
        (date.getFullYear() === this._calendarYear && date.getMonth() > this._calendarMonth);

      if (isDateBeforeThanCalendar) {
        this.setPreviousCalendarView();
      } else if (isDateAfterThanCalendar) {
        this.setNextCalendarView();
      }
    }

    switch (this.type) {
      case CALENDAR_TYPES.SINGLE:
        this.handleSingleSelectCalendar(date);
        break;
      case CALENDAR_TYPES.MULTIPLE:
        this.handleMultipleSelectCalendar(date);
        break;
      case CALENDAR_TYPES.RANGE:
        this.handleRangeSelectCalendar(date);
        break;
    }

    this._onBlCalendarChange(this._selectedDates);
    this.requestUpdate();
  }

  handleSingleSelectCalendar(calendarDate: Date) {
    this._selectedDates = [calendarDate];
  }

  handleMultipleSelectCalendar(calendarDate: Date) {
    const dateExist = this._selectedDates?.some(d => d.getTime() === calendarDate.getTime());

    dateExist
      ? this._selectedDates?.splice(
          this._selectedDates?.findIndex(d => d.getTime() === calendarDate.getTime()),
          1
        )
      : this._selectedDates.push(calendarDate);
  }

  handleRangeSelectCalendar(calendarDate: Date) {
    if (!this._selectedDates[0]) {
      this._selectedDates[0] = calendarDate;
    } else if (!this._selectedDates[1]) {
      if (calendarDate.getTime() > this._selectedDates[0].getTime()) {
        this._selectedDates[1] = calendarDate;
      } else {
        const tempEndDate = this._selectedDates[0];

        this._selectedDates[0] = calendarDate;
        this._selectedDates[1] = tempEndDate;
      }
    } else {
      this._selectedDates = [];
      this._selectedDates[0] = calendarDate;
    }
    this.setHoverClass();
  }

  checkIfSelectedDate(calendarDate: Date) {
    return this._selectedDates?.some(date => date?.getTime() === calendarDate.getTime());
  }

  checkIfDateIsToday(calendarDate: Date) {
    const today = this.today;

    return (
      today.getDate() === calendarDate.getDate() &&
      today.getMonth() === calendarDate.getMonth() &&
      today.getFullYear() === calendarDate.getFullYear()
    );
  }

  checkIfDateIsDisabled(calendarDate: Date) {
    if (
      calendarDate.getTime() < this.minDate?.getTime() ||
      calendarDate.getTime() > this.maxDate?.getTime()
    ) {
      return true;
    }
    if (this.disabledDates.length > 0) {
      return this.disabledDates.some(disabledDate => {
        return (
          calendarDate.getDate() === disabledDate.getDate() &&
          calendarDate.getMonth() === disabledDate.getMonth() &&
          calendarDate.getFullYear() === disabledDate.getFullYear()
        );
      });
    }
    return false;
  }

  setHoverClass() {
    this.clearRangePickerStyles();

    if (this._selectedDates[0] && this._selectedDates[1]) {
      setTimeout(() => {
        const startDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedDates[0]?.getTime()}`
        )?.parentElement;

        startDateParentElement?.classList.add("range-start-day");

        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedDates[1]?.getTime()}`
        )?.parentElement;

        endDateParentElement?.classList.add("range-end-day");
        const rangeDays = [...this.createCalendarDays().values()]
          .flat()
          .filter(
            date =>
              date.getTime() > this._selectedDates[0]!.getTime() &&
              date.getTime() < this._selectedDates[1]!.getTime()
          );

        for (let i = 0; i < rangeDays.length; i++) {
          const element = this.shadowRoot?.getElementById(
            `${rangeDays[i].getTime()}`
          )?.parentElement;

          element?.classList?.add("range-day");
        }
      });
    }
  }

  createCalendarDays() {
    const calendar: Calendar = new Map();

    this._calendarDays = this.days
      .slice(this.startOfWeek)
      .concat(this.days.slice(0, this.startOfWeek));

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

      calendar.set(this.days[mod].name, [date]);

      dayOfTheWeek += 1;
    }
    for (
      let currentMonthDaysIterator = 1;
      currentMonthDaysIterator <= currentMonthDayCount;
      currentMonthDaysIterator++
    ) {
      const mod = dayOfTheWeek % 7;
      const day = new Date(this._calendarYear, this._calendarMonth, currentMonthDaysIterator);

      if (calendar.get(this.days[mod].name)) {
        calendar.get(this.days[mod].name)?.push(day);
      } else {
        calendar.set(this.days[mod].name, [day]);
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

        calendar.get(this.days[mod].name)?.push(date);

        dayOfTheWeek += 1;
      }
    }
    return calendar;
  }

  renderCalendarHeader() {
    const showMonthSelected =
      this._calendarView === CALENDAR_VIEWS.MONTHS ? "header-text-hover" : "";
    const showYearSelected = this._calendarView === CALENDAR_VIEWS.YEARS ? "header-text-hover" : "";

    return html`
      <div class="calendar-header">
        <bl-button
          class="arrow"
          icon="arrow_left"
          variant="tertiary"
          kind="neutral"
          @click="${() => this.setPreviousCalendarView()}"
        ></bl-button>
        <bl-button
          variant="tertiary"
          kind="neutral"
          class="header-text ${showMonthSelected}"
          @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.MONTHS)}"
          >${this.months[this._calendarMonth].name}
        </bl-button>
        <bl-button
          variant="tertiary"
          kind="neutral"
          class="header-text ${showYearSelected}"
          @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.YEARS)}"
          >${this._calendarYear}
        </bl-button>
        <bl-button
          class="arrow"
          icon="arrow_right"
          variant="tertiary"
          kind="neutral"
          @click="${() => this.setNextCalendarView()}"
        ></bl-button>
      </div>
    `;
  }

  renderCalendarDays() {
    const calendarDays = this.createCalendarDays();
    const valuesArray = Array.from(calendarDays.values());

    return html`
      <div class="week-row">
        ${[...calendarDays.keys()].map(key => {
          return html` <div class="calendar-text weekday-text">${key}</div> `;
        })}
      </div>
      <div class="days-wrapper">
        ${[...Array(valuesArray[0].length).keys()].map(key => {
          return html` <div class="week-row">
            ${valuesArray.map(values => {
              const date = values[key];
              const isSelectedDay = this.checkIfSelectedDate(date);
              const isDayToday = this.checkIfDateIsToday(date);
              const isDisabledDay = this.checkIfDateIsDisabled(date);

              const classes = classMap({
                "day": true,
                "calendar-text": true,
                "today-day": isDayToday,
                "selected-day": isSelectedDay,
                "other-month-day": values[key].getMonth() !== this._calendarMonth,
                "disabled-day": isDisabledDay,
              });

              return html`
                <div class="day-wrapper">
                  <bl-button
                    id=${date.getTime()}
                    variant="tertiary"
                    kind="neutral"
                    size="small"
                    class=${classes}
                    ?disabled=${isDisabledDay}
                    @click="${() => !isDisabledDay && this.handleDate(date)}"
                  >
                    ${date.getDate()}
                  </bl-button>
                </div>
              `;
            })}
          </div>`;
        })}
      </div>
      </div>`;
  }

  renderCalendarMonths() {
    return html` <div class="grid-content">
      ${this.months.map((month, index) => {
        const variant = month.value === this._calendarMonth ? "primary" : "tertiary";
        const neutral = month.value === this._calendarMonth ? "default" : "neutral";

        return html` <bl-button
          variant=${variant}
          kind=${neutral}
          class="grid-item"
          size="small"
          @click="${() => this.setMonthAndCalendarView(index)}"
          ><span class="calendar-text">${month.name}</span></bl-button
        >`;
      })}
    </div>`;
  }

  renderCalendarYears() {
    this.generateSurroundingYears();
    return html` <div class="grid-content">
      ${this._calendarYears.map(year => {
        const variant = year === this._calendarYear ? "primary" : "tertiary";
        const neutral = year === this._calendarYear ? "default" : "neutral";

        return html` <bl-button
          variant=${variant}
          kind=${neutral}
          class="grid-item"
          @click="${() => this.setYearAndCalendarView(year)}"
          ><span class="calendar-text">${year}</span></bl-button
        >`;
      })}
    </div>`;
  }

  render() {
    return html`
      <div>
        <div class="calendar-content">
          <div class="calendar">
            ${this.renderCalendarHeader()}
            ${this._calendarView === CALENDAR_VIEWS.DAYS ? this.renderCalendarDays() : ""}
            ${this._calendarView === CALENDAR_VIEWS.MONTHS ? this.renderCalendarMonths() : ""}
            ${this._calendarView === CALENDAR_VIEWS.YEARS ? this.renderCalendarYears() : ""}
          </div>
        </div>
      </div>
    `;
  }
}
