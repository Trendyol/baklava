import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
import {
  Calendar,
  CalendarDate,
  CalendarType,
  CalendarView,
  CalendarDay,
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
  type: CalendarType = CALENDAR_TYPES.single;

  /**
   *Defines the minimum date value for the calendar
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

  @state()
  private _selectedDates: CalendarDate[] = [];

  @state()
  private _selectedRangeDates: RangePickerDates = { startDate: undefined, endDate: undefined };

  @state()
  private _calendarMonth: number = new Date().getMonth();

  @state()
  private _calendarYear: number = new Date().getFullYear();

  @state()
  private _calendarView: CalendarView = CALENDAR_VIEWS.days;

  @state()
  private _calendarYears: number[] = [];

  @state()
  private _calendarDays: CalendarDay[] = [];

  private _defaultValue: Date | Date[];

  /**
   * Defines the default selected date value for the calendar
   */
  @property({ type: Array, attribute: "default-value", reflect: true })
  get defaultValue(): Date | Date[] {
    return this._defaultValue;
  }
  set defaultValue(defaultValue) {
    if (this.type === CALENDAR_TYPES.single && Array.isArray(defaultValue)) {
      console.warn("Invalid prop value for defaultValue");
    } else if (this.defaultValue) {
      if (Array.isArray(this.defaultValue)) {
        this._selectedDates = this.defaultValue;
      } else this._selectedDates = [this.defaultValue];
    }
  }
  get months() {
    return [...Array(12).keys()].map(month => {
      return {
        name: new Date(0, month + 1, 0).toLocaleString(this.locale, {
          month: "long",
        }),
        value: month,
      };
    });
  }
  get days() {
    return [...Array(7).keys()].map(day => {
      return {
        name: new Date(0, 0, day).toLocaleString(this.locale, { weekday: "short" }),
        value: day,
      };
    });
  }
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
    this.clearHoverClassesFromShadowRoot();
    if (this._calendarView === CALENDAR_VIEWS.days) {
      if (this._calendarMonth === FIRST_MONTH_INDEX) {
        this._calendarMonth = LAST_MONTH_INDEX;
        this._calendarYear -= 1;
      } else this._calendarMonth -= 1;
    } else if (this._calendarView === CALENDAR_VIEWS.months) {
      this._calendarYear -= 1;
    } else if (this._calendarView === CALENDAR_VIEWS.years) {
      const fromYear = this._calendarYears[0];

      this._calendarYears = [];
      for (let i = 12; i > 0; i--) {
        this._calendarYears.push(fromYear - i);
      }
    }
    if (this.type === CALENDAR_TYPES.range) {
      this.setHoverClass();
    }
  }
  setNextCalendarView() {
    this.clearHoverClassesFromShadowRoot();
    if (this._calendarView === CALENDAR_VIEWS.days) {
      if (this._calendarMonth === LAST_MONTH_INDEX) {
        this._calendarMonth = FIRST_MONTH_INDEX;
        this._calendarYear += 1;
      } else this._calendarMonth += 1;
    } else if (this._calendarView === CALENDAR_VIEWS.months) {
      this._calendarYear += 1;
    } else if (this._calendarView === CALENDAR_VIEWS.years) {
      const fromYear = this._calendarYears[11];

      this._calendarYears = [];
      for (let i = 1; i <= 12; i++) {
        this._calendarYears.push(fromYear + i);
      }
    }
    if (this.type === CALENDAR_TYPES.range) {
      this.setHoverClass();
    }
  }

  setCurrentCalendarView(view: CalendarView) {
    if (this._calendarView !== view) {
      this._calendarView = view;
    } else this._calendarView = CALENDAR_VIEWS.days;
  }

  setMonthAndCalendarView(month: number) {
    this._calendarMonth = month;
    this._calendarView = CALENDAR_VIEWS.days;
    if (this.type === CALENDAR_TYPES.range) {
      this.setHoverClass();
    }
  }
  setYearAndCalendarView(year: number) {
    this._calendarYear = year;
    this._calendarView = CALENDAR_VIEWS.days;
    if (this.type === CALENDAR_TYPES.range) {
      this.setHoverClass();
    }
  }

  createCalendarYears() {
    if (this._calendarYears.length === 0) {
      for (let i = 4; i >= 0; i--) this._calendarYears.push(this._calendarYear - i);
      for (let i = 1; i <= 7; i++) this._calendarYears.push(this._calendarYear + i);
    }
  }
  clearHoverClassesFromShadowRoot() {
    this.shadowRoot?.querySelectorAll(".range-day").forEach(day => {
      day.classList.remove("range-day");
    });
    this.shadowRoot?.querySelectorAll(".range-start-day").forEach(day => {
      day.classList.remove("range-start-day");
    });
    this.shadowRoot?.querySelectorAll(".range-end-day").forEach(day => {
      day.classList.remove("range-end-day");
    });
  }
  handleDate(date: CalendarDate) {
    if (this.type !== CALENDAR_TYPES.range) {
      if (date.getMonth() < this._calendarMonth) {
        this.setPreviousCalendarView();
      } else if (date.getMonth() > this._calendarMonth) {
        this.setNextCalendarView();
      }
    }

    if (this.type === CALENDAR_TYPES.single) {
      this.handleSingleSelectCalendar(date);
    } else if (this.type === CALENDAR_TYPES.multiple) {
      this.handleMultipleSelectCalendar(date);
    } else if (this.type === CALENDAR_TYPES.range) {
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
    } else if (this._selectedRangeDates.startDate && this._selectedRangeDates.endDate) {
      this._selectedRangeDates.startDate = calendarDate;
      this._selectedRangeDates.endDate = undefined;
      this._selectedDates.splice(0, this._selectedDates.length, this._selectedRangeDates.startDate);
    }
    this.setHoverClass();
  }

  checkIfSelectedDate(calendarDate: CalendarDate) {
    return this._selectedDates.find(selectedDate => {
      return calendarDate.getTime() === selectedDate.getTime();
    });
  }
  checkIfDateIsToday(calendarDate: CalendarDate) {
    const today = new Date();

    return (
      today.getDate() === calendarDate.getDate() &&
      today.getMonth() === calendarDate.getMonth() &&
      today.getFullYear() === calendarDate.getFullYear()
    );
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
        return calendarDate.getTime() === new Date(disabledDate).getTime();
      });
    }
    return false;
  }

  setHoverClass() {
    this.clearHoverClassesFromShadowRoot();

    if (this._selectedRangeDates.startDate && this._selectedRangeDates.endDate) {
      setTimeout(() => {
        const startDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.startDate?.getTime()}`
        )?.parentElement;

        startDateParentElement?.classList.add("range-start-day");

        const endDateParentElement = this.shadowRoot?.getElementById(
          `${this._selectedRangeDates.endDate?.getTime()}`
        )?.parentElement;

        endDateParentElement?.classList.add("range-end-day");
        const rangeDays = [...this.createCalendarDays().values()].flat().filter(
          date =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            date.getTime() > this._selectedRangeDates?.startDate?.getTime() &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            date.getTime() < this._selectedRangeDates?.endDate?.getTime()
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
  render() {
    const getCalendarView = (calendarView: CalendarView) => {
      if (calendarView === CALENDAR_VIEWS.days) {
        const calendarDays = this.createCalendarDays();

        return html` ${[...calendarDays.entries()].map(([key, value]) => {
          return html` <div class="day-column">
              <div class="day calendar-text weekday-text">${key}</div>
              ${value.map(date => {
                const isSelectedDay = this.checkIfSelectedDate(date);
                const isDayToday = this.checkIfDateIsToday(date);
                const isDisabledDay = this.checkIfDateIsDisabled(date);

                return html` <div class="day-wrapper">
                  <div
                    id=${date.getTime()}
                    class="day calendar-text ${isDayToday ? "today-day" : ""} ${isSelectedDay
                      ? "selected-day"
                      : ""} ${date.getMonth() !== this._calendarMonth
                      ? "other-month-day"
                      : ""}  ${isDisabledDay ? "disabled-day" : ""}"
                    @click="${() => !isDisabledDay && this.handleDate(date)}"
                  >
                    ${date.getDate()}
                  </div>
                </div>`;
              })}
            </div> </div>`;
        })}`;
      } else if (calendarView === CALENDAR_VIEWS.months) {
        return html`<div class="grid-content">
          ${this.months.map((month, index) => {
            const variant = month.value === this._calendarMonth ? "primary" : "tertiary";
            const neutral = month.value === this._calendarMonth ? "default" : "neutral";

            return html`<bl-button
              variant=${variant}
              kind=${neutral}
              class="grid-item"
              size="small"
              @click="${() => this.setMonthAndCalendarView(index)}"
              ><span class="calendar-text">${month.name}</span></bl-button
            >`;
          })}
        </div>`;
      } else {
        this.createCalendarYears();
        return html`<div class="grid-content">
          ${this._calendarYears.map(year => {
            const variant = year === this._calendarYear ? "primary" : "tertiary";
            const neutral = year === this._calendarYear ? "default" : "neutral";

            return html`<bl-button
              variant=${variant}
              kind=${neutral}
              class="grid-item"
              @click="${() => this.setYearAndCalendarView(year)}"
              ><span class="calendar-text">${year}</span></bl-button
            >`;
          })}
        </div>`;
      }
    };
    const showMonthSelected =
      this._calendarView === CALENDAR_VIEWS.months ? "header-text-hover" : "";
    const showYearSelected = this._calendarView === CALENDAR_VIEWS.years ? "header-text-hover" : "";

    return html`<div>
      <div class="content">
        <div class="header">
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
            @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.months)}"
            >${this.months[this._calendarMonth].name}</bl-button
          >
          <bl-button
            variant="tertiary"
            kind="neutral"
            class="header-text ${showYearSelected}"
            @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.years)}"
            >${this._calendarYear}</bl-button
          >
          <bl-button
            class="arrow"
            icon="arrow_right"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setNextCalendarView()}"
          ></bl-button>
        </div>
        <div class="calendar">${getCalendarView(this._calendarView)}</div>
      </div>
    </div> `;
  }
}
