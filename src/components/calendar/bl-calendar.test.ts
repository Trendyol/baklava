import { fixture, expect, html } from "@open-wc/testing";
import "./bl-calendar";
import { BlButton, BlCalendar } from "../../baklava";
import { blCalendarChangedEvent } from "./bl-calendar";
import { blDatepickerClearSelectedDatesEvent } from "../datepicker/bl-datepicker";

describe.only("bl-calendar", () => {
  let element: BlCalendar;

  beforeEach(async () => {
    element = await fixture<BlCalendar>(html`<bl-calendar locale="en"></bl-calendar>`);
  });

  it("should instantiate the component", () => {
    expect(document.createElement("bl-calendar")).instanceOf(HTMLElement);
  });

   it("should render the calendar header", () => {
    const headerButtons = element.shadowRoot?.querySelectorAll(".calendar-header bl-button");

    expect(headerButtons?.length).to.equal(4);
  });

  it("should navigate to the previous month when clicking the left arrow", () => {
    const prevButton = element.shadowRoot?.querySelector(".calendar-header .arrow") as BlButton;
    const currentMonth = element._calendarMonth;

    prevButton?.click();
    expect(element._calendarMonth).to.equal(
      currentMonth === 0 ? 11 : currentMonth - 1
    );
  });

  it("should navigate to the next month when clicking the right arrow", () => {
    const nextButton = element.shadowRoot?.querySelectorAll(".calendar-header .arrow")[1] as BlButton;
    const currentMonth = element._calendarMonth;

    nextButton?.click();
    expect(element._calendarMonth).to.equal(
      currentMonth === 11 ? 0 : currentMonth + 1
    );
  });

   it("should render days of the week", () => {
    const weekDays = element.shadowRoot?.querySelectorAll(".calendar-text.weekday-text");

    expect(weekDays?.length).to.equal(7);
  });

  it("should correctly handle single date selection", async () => {
    const singleTypeCalendar= element = await fixture<BlCalendar>(html`<bl-calendar locale="en" type="single"></bl-calendar>`);

    await singleTypeCalendar.updateComplete;
    const dayButton = element.shadowRoot?.querySelector(".day-wrapper bl-button") as BlButton;

    dayButton?.click();
    expect(element._selectedDates.length).to.equal(1);
    expect(element.checkIfSelectedDate(element._selectedDates[0])).to.be.true;
  });

   it("should correctly handle multiple date selection", async () => {
     const multipleTypeCalendar= element = await fixture<BlCalendar>(html`<bl-calendar locale="en" type="multiple"></bl-calendar>`);

    await multipleTypeCalendar.updateComplete;
     const dayButtons = Array.from(element.shadowRoot?.querySelectorAll(".day-wrapper bl-button") || []) as BlButton[];

    dayButtons[0].click();
    dayButtons[1].click();
    expect(element._selectedDates.length).to.equal(2);
  });

  it("should fire bl-calendar-change event when dates are selected", async () => {
    const singleTypeCalendar= await fixture<BlCalendar>(html`<bl-calendar locale="en" type="single"></bl-calendar>`);

    await singleTypeCalendar.updateComplete;
    let selectedDates:Date[] = [];

    const onBlCalendarChanged: EventListener = (e: Event) => {
      const customEvent = e as CustomEvent<Date[]>;

      selectedDates = customEvent.detail;
    };

    singleTypeCalendar.addEventListener(blCalendarChangedEvent, onBlCalendarChanged);
    const daysButtons = Array.from(singleTypeCalendar.shadowRoot?.querySelectorAll(".day-wrapper bl-button") || []) as BlButton[];

    daysButtons[0].click();
    expect(selectedDates.length).to.equal(1);
    expect(selectedDates[0]).to.equal(singleTypeCalendar._selectedDates[0]);

  });

  it("should clear selected dates on receiving blDatepickerClearSelectedDatesEvent",async () => {
    element._selectedDates = [new Date()];
    window.dispatchEvent(new CustomEvent(blDatepickerClearSelectedDatesEvent));
    expect(element._selectedDates.length).to.equal(0);
  });

   it("should disable dates outside min/max date range", async () => {
    const minDate = new Date(2023, 0, 1);
    const maxDate = new Date(2023, 11, 31);

    element.minDate = minDate;
    element.maxDate = maxDate;

    await element.updateComplete;

     const days = Array.from(element.shadowRoot?.querySelectorAll(".day-wrapper bl-button") || []) as BlButton[];

    days?.forEach((day) => {
      const date = new Date(Number(day.id));

      if (date < minDate || date > maxDate) {
        expect(day.disabled).to.be.true;
      } else {
        expect(day.disabled).to.be.false;
      }
    });
  });
});
