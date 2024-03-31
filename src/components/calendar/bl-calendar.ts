import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../button/bl-button";
import "../icon/bl-icon";
import { DAYS, MONTHS } from "./bl-calendar.constant";
import style from "./bl-calendar.css";
import { TCalendarTypes, TMonth } from "./bl-calendar.types";

@customElement("bl-calendar")
export default class BlCalendar extends LitElement {
  @property()
  type: TCalendarTypes = "single";

  @property()
  minDate?: Date | string;

  @property()
  maxDate?: Date | string;

  @property({ type: Array, attribute: "default-value", reflect: true })
  defaultValue?: Date | Date[];

  @property({ type: Number, attribute: "start-of-week", reflect: true })
  startOfWeek?: number = 1;

  @property()
  locale?: string = document.documentElement.lang;

  @property({ type: Array })
  disabledDates?: Date | Date[];

  @state()
  private day: number;

  @state()
  private month: TMonth = MONTHS[new Date().getMonth()];

  @state()
  private year: number = new Date().getFullYear();

  @state()
  private dayCountInSelectedMonth: number;

  static get styles(): CSSResultGroup {
    return [style];
  }
  render() {
    this.getWeekDayOfDate();
    const calendarDays = this.createCalendarDays();

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
            <span class="day-text">${this.month.name}</span>
            <span class="day-text">${this.year}</span>
          </div>
          <bl-button
            class="arrows"
            icon="arrow_right"
            variant="tertiary"
            kind="neutral"
            @click="${() => this.setNextMonth()}"
          ></bl-button>
        </div>
        <div class="weekdays">
          ${Array.from(calendarDays).map(([key, value]) => {
            return html`<div class="calendar-column">
              <div class="weekday-text calendar-cell">${DAYS[key]}</div>
              ${value.map(day => {
                return html` <div class="day-text calendar-cell">${day}</div>`;
              })}
            </div>`;
          })}
        </div>
      </div>
    </div> `;
  }
  setMonth(monthIndex: number) {
    this.month = MONTHS[monthIndex];
  }

  setYear(year: number) {
    this.year = year;
  }

  createCalendarDays() {
    const weekDayNums: Map<number, (number | string)[]> = new Map();
    let i = 0;
    let k = 0;
    let days = 1;

    for (; i < this.getDayNumInAMonth() + this.getWeekDayOfDate(); i += 1) {
      const mod = k % 7;

      if (i < this.getWeekDayOfDate()) {
        weekDayNums.set(mod, [""]);
      } else if (weekDayNums.get(mod)) {
        weekDayNums.get(mod)?.push(days);
        days += 1;
      } else {
        weekDayNums.set(mod, [days]);
        days += 1;
      }
      k += 1;
    }
    return weekDayNums;
  }
  getDayNumInAMonth() {
    return new Date(this.month.value + 1, this.year, 0).getDate();
  }

  getWeekDayOfDate() {
    return new Date(this.year, this.month.value, 1).getDay();
  }

  setPreviousMonth() {
    if (this.month.value === 0) {
      this.setMonth(MONTHS[11].value);
      this.setYear(this.year - 1);
    } else this.setMonth(this.month.value - 1);
  }
  setNextMonth() {
    if (this.month.value === 11) {
      this.setMonth(MONTHS[0].value);
      this.setYear(this.year + 1);
    } else this.setMonth(this.month.value + 1);
  }
}
