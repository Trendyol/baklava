import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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
   * Defines the calendar types, available types are single, multiple and range
   */
  @property()
  type: CalendarType = CALENDAR_TYPES.SINGLE;

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

  @state()
  private _selectedDates: CalendarDate[] = [];

  @state()
  private _selectedRangeDates: RangePickerDates = { startDate: undefined, endDate: undefined };

  @state()
  private today = new Date();

  @state()
  private _calendarMonth: number = this.today.getMonth();

  @state()
  private _calendarYear: number = this.today.getFullYear();

  @state()
  private _calendarView: CalendarView = CALENDAR_VIEWS.DAYS;

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
    if (this.type === CALENDAR_TYPES.SINGLE && Array.isArray(defaultValue)) {
      console.warn("Invalid prop value for defaultValue");
    } else if (this.defaultValue) {
      if (Array.isArray(this.defaultValue)) {
        this._selectedDates = { ...this.defaultValue };
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
  @event("bl-calendar-change") private _onBlCalendarChange: EventDispatcher<Date[]>;
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

      this._calendarYears = [];
      for (let i = 12; i > 0; i--) {
        this._calendarYears.push(fromYear - i);
      }
    }
    if (this.type === CALENDAR_TYPES.RANGE) {
      this.setHoverClass();
    }
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

      this._calendarYears = [];
      for (let i = 1; i <= 12; i++) {
        this._calendarYears.push(fromYear + i);
      }
    }
    if (this.type === CALENDAR_TYPES.RANGE) {
      this.setHoverClass();
    }
  }

  setCurrentCalendarView(view: CalendarView) {
    if (this._calendarView !== view) {
      this._calendarView = view;
    } else this._calendarView = CALENDAR_VIEWS.DAYS;
    this.setHoverClass();
  }

  setMonthAndCalendarView(month: number) {
    this._calendarMonth = month;
    this._calendarView = CALENDAR_VIEWS.DAYS;
    if (this.type === CALENDAR_TYPES.RANGE) {
      this.setHoverClass();
    }
  }
  setYearAndCalendarView(year: number) {
    this._calendarYear = year;
    this._calendarView = CALENDAR_VIEWS.DAYS;
    if (this.type === CALENDAR_TYPES.RANGE) {
      this.setHoverClass();
    }
  }

  generateSurroundingYears() {
    if (this._calendarYears.length === 0) {
      this._calendarYears = Array.from(
        { length: 12 },
        (_, index) => this._calendarYear - 4 + index
      );
    }
  }
  clearRangePickerStyles() {
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
    if (this.type !== CALENDAR_TYPES.RANGE) {
      if (date.getMonth() < this._calendarMonth) {
        this.setPreviousCalendarView();
      } else if (date.getMonth() > this._calendarMonth) {
        this.setNextCalendarView();
      }
    }

    if (this.type === CALENDAR_TYPES.SINGLE) {
      this.handleSingleSelectCalendar(date);
    } else if (this.type === CALENDAR_TYPES.MULTIPLE) {
      this.handleMultipleSelectCalendar(date);
    } else if (this.type === CALENDAR_TYPES.RANGE) {
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

    if (dateExist)
      this._selectedDates.splice(
        this._selectedDates.findIndex(date => date.getTime() === calendarDate.getTime()),
        1
      );
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
    const day = this._selectedDates.find(selectedDate => {
      return calendarDate.getTime() === selectedDate.getTime();
    });

    return !!day;
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
      const day = this.disabledDates.find(disabledDate => {
        return calendarDate.getTime() === new Date(disabledDate).getTime();
      });

      return !!day;
    }
    return false;
  }

  setHoverClass() {
    this.clearRangePickerStyles();

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
        const rangeDays = [...this.createCalendarDays().values()]
          .flat()
          .filter(
            date =>
              date.getTime() > (this._selectedRangeDates?.startDate?.getTime() || 0) &&
              date.getTime() < (this._selectedRangeDates?.endDate?.getTime() || 0)
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
      if (calendarView === CALENDAR_VIEWS.DAYS) {
        const calendarDays = this.createCalendarDays();
        const valuesArray = Array.from(calendarDays.values());

        return html`<div class="week-row">
          ${[...calendarDays.keys()].map(key => {
            return html` <div class="calendar-text weekday-text">${key}</div> `;
          })}</div>
        <div class="days-wrapper">
        ${[...Array(valuesArray[0].length).keys()].map(key => {
          return html`<div class="week-row">
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
      } else if (calendarView === CALENDAR_VIEWS.MONTHS) {
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
        this.generateSurroundingYears();
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
      this._calendarView === CALENDAR_VIEWS.MONTHS ? "header-text-hover" : "";
    const showYearSelected = this._calendarView === CALENDAR_VIEWS.YEARS ? "header-text-hover" : "";
    const buttonLabel = this._calendarView === CALENDAR_VIEWS.DAYS ? "Month" : "Year";

    return html`<div>
      <div class="calendar-content">
        <div class="calendar-header">
          <bl-button
            class="arrow"
            label="Previous ${buttonLabel}"
            icon="arrow_left"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setPreviousCalendarView()}"
          >
          </bl-button>
          <bl-button
            variant="tertiary"
            kind="neutral"
            class="header-text ${showMonthSelected}"
            @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.MONTHS)}"
            >${this.months[this._calendarMonth].name}</bl-button
          >
          <bl-button
            variant="tertiary"
            kind="neutral"
            class="header-text ${showYearSelected}"
            @click="${() => this.setCurrentCalendarView(CALENDAR_VIEWS.YEARS)}"
            >${this._calendarYear}</bl-button
          >
          <bl-button
            class="arrow"
            icon="arrow_right"
            label="Next ${buttonLabel}"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setNextCalendarView()}"
          >
          </bl-button>
        </div>
        <div class="calendar">${getCalendarView(this._calendarView)}</div>
      </div>
    </div> `;
  }
}
