import { expect, fixture, html } from "@open-wc/testing";
import "./bl-calendar";
import { BlButton, BlCalendar } from "../../baklava";
import { CALENDAR_TYPES, CALENDAR_VIEWS, FIRST_MONTH_INDEX, LAST_MONTH_INDEX } from "./bl-calendar.constant";
import sinon from "sinon";

describe("bl-calendar", () => {
  let element: BlCalendar;
  let consoleWarnSpy: sinon.SinonSpy;

  beforeEach(async () => {
    element = await fixture<BlCalendar>(html`
      <bl-calendar locale="en"></bl-calendar>`);
    consoleWarnSpy = sinon.spy(console, "warn");

  });

  afterEach(() => {
    consoleWarnSpy.restore();
  });

  it("should instantiate the element", () => {
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
    const singleTypeCalendar = element = await fixture<BlCalendar>(html`
      <bl-calendar locale="en" type="single"></bl-calendar>`);

    await singleTypeCalendar.updateComplete;
    const dayButton = element.shadowRoot?.querySelector(".day-wrapper bl-button") as BlButton;

    dayButton?.click();
    expect(element._selectedDates.length).to.equal(1);
    expect(element.checkIfSelectedDate(element._selectedDates[0])).to.be.true;
  });

  it("should correctly handle multiple date selection", async () => {
    const multipleTypeCalendar = element = await fixture<BlCalendar>(html`
      <bl-calendar locale="en" type="multiple"></bl-calendar>`);

    await multipleTypeCalendar.updateComplete;
    const dayButtons = Array.from(element.shadowRoot?.querySelectorAll(".day-wrapper bl-button") || []) as BlButton[];

    dayButtons[0].click();
    dayButtons[1].click();
    expect(element._selectedDates.length).to.equal(2);
  });

  it("should fire bl-calendar-change event when dates are selected", async () => {
    const singleTypeCalendar = await fixture<BlCalendar>(html`
      <bl-calendar locale="en" type="single"></bl-calendar>`);

    await singleTypeCalendar.updateComplete;
    let selectedDates: Date[] = [];

    const onBlCalendarChanged: EventListener = (e: Event) => {
      const customEvent = e as CustomEvent<Date[]>;

      selectedDates = customEvent.detail;
    };

    singleTypeCalendar.addEventListener("bl-calendar-change", onBlCalendarChanged);
    const daysButtons = Array.from(singleTypeCalendar.shadowRoot?.querySelectorAll(".day-wrapper bl-button") || []) as BlButton[];

    daysButtons[0].click();
    expect(selectedDates.length).to.equal(1);
    expect(selectedDates[0]).to.equal(singleTypeCalendar._selectedDates[0]);

  });

  it("should not allow selection of dates before minDate", async () => {
    element.minDate = new Date(2023, 0, 15);
    element._calendarMonth = 0;
    element._calendarYear = 2023;

    await element.updateComplete;

    const calendarDay = Array.from(
      element.shadowRoot?.querySelectorAll("bl-button") || []
    ).find(button => button?.textContent?.trim() === "10");

    expect(calendarDay?.hasAttribute("disabled")).to.be.true;
  });

  it("should not allow selection of dates after maxDate", async () => {
    element.maxDate = new Date(2023, 0, 15);
    element._calendarMonth = 0;
    element._calendarYear = 2023;

    await element.updateComplete;

    const calendarDay = Array.from(
      element.shadowRoot?.querySelectorAll("bl-button") || []
    ).find(button => button?.textContent?.trim() === "20");

    expect(calendarDay?.hasAttribute("disabled")).to.be.true;
  });

  it("should switch to month view when the month button is clicked", async () => {
    const monthButton = element.shadowRoot?.querySelector(".header-text") as BlButton;

    monthButton?.click();

    expect(element._calendarView).to.equal(CALENDAR_VIEWS.MONTHS);
  });

  it("should select a date range correctly", async () => {
    const startDate = new Date(2023, 1, 10);
    const endDate = new Date(2023, 1, 20);

    element.handleRangeSelectCalendar(startDate);
    element.handleRangeSelectCalendar(endDate);

    expect(element._selectedDates[0]).to.deep.equal(startDate);
    expect(element._selectedDates[1]).to.deep.equal(endDate);
  });

  it("should render month names in the correct locale", async () => {
    element = await fixture<BlCalendar>(html`
      <bl-calendar locale="fr"></bl-calendar>`);

    const monthName = new Date().toLocaleString("fr", { month: "long" });
    const firstMonth = element.shadowRoot?.querySelector(".header-text")?.textContent?.trim();

    expect(firstMonth).to.equal(monthName);
  });

  it("should switch to the year view and render years", async () => {
    const yearButton = (element.shadowRoot?.querySelectorAll(".header-text")[1]) as BlButton;

    yearButton?.click();

    await element.updateComplete;

    expect(element._calendarView).to.equal(CALENDAR_VIEWS.YEARS);
    const yearButtons = element.shadowRoot?.querySelectorAll(".grid-item");

    expect(yearButtons?.length).to.equal(12);
  });

  it("should update the calendar month and view when setMonthAndCalendarView is called", async () => {
    const setHoverClassSpy = sinon.spy(element, "setHoverClass");
    const testMonth = 5;

    element.setMonthAndCalendarView(testMonth);

    expect(element._calendarMonth).to.equal(testMonth);
    expect(element._calendarView).to.equal(CALENDAR_VIEWS.DAYS);
    expect(setHoverClassSpy.calledOnce).to.be.false;

    element.type = CALENDAR_TYPES.RANGE;
    element.setMonthAndCalendarView(testMonth);

    expect(setHoverClassSpy.calledOnce).to.be.true;
  });

  it("should update the calendar year and view when setYearAndCalendarView is called", async () => {
    const setHoverClassSpy = sinon.spy(element, "setHoverClass");
    const testYear = 2025;

    element.setYearAndCalendarView(testYear);

    expect(element._calendarYear).to.equal(testYear);
    expect(element._calendarView).to.equal(CALENDAR_VIEWS.DAYS);
    expect(setHoverClassSpy.calledOnce).to.be.false;

    element.type = CALENDAR_TYPES.RANGE;
    element.setYearAndCalendarView(testYear);

    expect(setHoverClassSpy.calledOnce).to.be.true;
  });

  it("should return true if calendarDate is in disabledDates", () => {
    const calendarDate = new Date(2023, 9, 18);

    element.disabledDates = [new Date(2023, 9, 18), new Date(2023, 9, 20)];

    const result = element.checkIfDateIsDisabled(calendarDate);

    expect(result).to.be.true;
  });

  it("should return false if calendarDate is not in disabledDates", () => {
    const calendarDate = new Date(2023, 9, 19);

    element.disabledDates = [new Date(2023, 9, 18), new Date(2023, 9, 20)];

    const result = element.checkIfDateIsDisabled(calendarDate);

    expect(result).to.be.false;
  });

  it("should return false if calendarDate is not disabled", () => {
    const calendarDate = new Date(2023, 9, 19);

    const result = element.checkIfDateIsDisabled(calendarDate);

    expect(result).to.be.false;
  });

  it("should wrap value in an array if it is a single date", async () => {
    const calendar = new BlCalendar();

    calendar.value = new Date("2023-09-18");
    calendar.type = CALENDAR_TYPES.SINGLE;

    expect(calendar._selectedDates).to.deep.equal([new Date("2023-09-18")], {});
  });

  it("should set startDate and endDate in selectedDays when type is range", async () => {
    const defaultDate1 = new Date(2023, 9, 18);
    const defaultDate2 = new Date(2023, 9, 19);

    element.value = [defaultDate1, defaultDate2];
    element.type = CALENDAR_TYPES.RANGE;

    expect(element._selectedDates[0]).to.be.equal(defaultDate1);
    expect(element._selectedDates[1]).to.be.equal(defaultDate2);
  });

  it("should navigate to the previous month in DAYS view", async () => {
    element._calendarView = CALENDAR_VIEWS.DAYS;
    element._calendarMonth = 5;
    element._calendarYear = 2023;

    element.setPreviousCalendarView();
    await element.updateComplete;

    expect(element._calendarMonth).to.equal(4);
    expect(element._calendarYear).to.equal(2023);
  });

  it("should navigate to December of the previous year if on January in DAYS view", async () => {
    element._calendarView = CALENDAR_VIEWS.DAYS;
    element._calendarMonth = FIRST_MONTH_INDEX;
    element._calendarYear = 2023;

    element.setPreviousCalendarView();
    await element.updateComplete;

    expect(element._calendarMonth).to.equal(LAST_MONTH_INDEX);
    expect(element._calendarYear).to.equal(2022);
  });

  it("should navigate to the previous year in MONTHS view", async () => {
    element._calendarView = CALENDAR_VIEWS.MONTHS;
    element._calendarYear = 2023;

    element.setPreviousCalendarView();
    await element.updateComplete;

    expect(element._calendarYear).to.equal(2022);
  });

  it("should generate the previous 12 years when in YEARS view", async () => {
    element._calendarView = CALENDAR_VIEWS.YEARS;
    element._calendarYears = [2023];

    element.setPreviousCalendarView();
    await element.updateComplete;

    expect(element._calendarYears.length).to.equal(12);
    expect(element._calendarYears).to.deep.equal([
      2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011
    ]);
  });

  it("should update calendar when in DAYS view and month is December", async () => {
    element._calendarView = CALENDAR_VIEWS.DAYS;
    element._calendarMonth = 11;
    element._calendarYear = 2023;

    element.setNextCalendarView();
    await element.updateComplete;

    expect(element._calendarMonth).to.equal(0);
    expect(element._calendarYear).to.equal(2024);
  });

  it("should update calendar when in DAYS view and month is not December", async () => {
    element._calendarView = CALENDAR_VIEWS.DAYS;
    element._calendarMonth = 5;
    element._calendarYear = 2023;

    element.setNextCalendarView();
    await element.updateComplete;

    expect(element._calendarMonth).to.equal(6);
    expect(element._calendarYear).to.equal(2023);
  });

  it("should update year when in MONTHS view", async () => {
    element._calendarView = CALENDAR_VIEWS.MONTHS;
    element._calendarYear = 2023;

    element.setNextCalendarView();
    await element.updateComplete;

    expect(element._calendarYear).to.equal(2024);
  });

  it("should update calendar years when in YEARS view", async () => {
    element._calendarView = CALENDAR_VIEWS.YEARS;
    element._calendarYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

    element.setNextCalendarView();
    await element.updateComplete;

    expect(element._calendarYears.length).to.equal(12);
    expect(element._calendarYears).to.deep.equal([
      2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043
    ]);
  });

  it("should set both startDate and endDate when endDate is not set and calendarDate is earlier than startDate", () => {
    const startDate = new Date(2023, 0, 5);
    const calendarDate = new Date(2023, 0, 1);

    element._selectedDates[0] = startDate;

    element.handleRangeSelectCalendar(calendarDate);

    expect(element._selectedDates).to.deep.equal([calendarDate, startDate]);
  });

  it("should reset to only startDate when both startDate and endDate are set", () => {
    const calendarDate = new Date(2023, 0, 10);
    const startDate = new Date(2023, 0, 5);
    const endDate = new Date(2023, 0, 15);

    element._selectedDates = [startDate, endDate];

    element.handleRangeSelectCalendar(calendarDate);

    expect(element._selectedDates).to.deep.equal([calendarDate]);
  });

  it("should remove the date if it already exists in _selectedDates", () => {
    const calendarDate = new Date(2023, 0, 5);

    element._selectedDates.push(calendarDate);

    element.handleMultipleSelectCalendar(calendarDate);

    expect(element._selectedDates).to.not.include(calendarDate);
    expect(element._selectedDates).to.have.lengthOf(0);
  });

  it("should add the date if it does not exist in selectedDates", () => {
    const calendarDate = new Date(2023, 0, 5);

    element.handleMultipleSelectCalendar(calendarDate);

    expect(element._selectedDates).to.include(calendarDate);
    expect(element._selectedDates).to.have.lengthOf(1);
  });

  it("should call handleRangeSelectCalendar when type is RANGE", () => {
    const calendarDate = new Date(2023, 6, 15);

    element.type = CALENDAR_TYPES.RANGE;

    const handleRangeSelectCalendarStub = sinon.stub(element, "handleRangeSelectCalendar");

    element.handleDate(calendarDate);

    expect(handleRangeSelectCalendarStub).to.have.been.calledWith(calendarDate);
  });


  it("should add range-start-day class to the start date element", async () => {
    element._selectedDates = [new Date(element.today.getFullYear(), element.today.getMonth(), 1),
      new Date(element.today.getFullYear(), element.today.getMonth(), 5)
    ];

    element.setHoverClass();

    await new Promise((resolve) => setTimeout(resolve, 200));
    const startDateElement = element.shadowRoot?.getElementById(
      `${element._selectedDates[0]?.getTime()}`
    )?.parentElement;

    expect(startDateElement?.classList.contains("range-start-day")).to.be.true;
  });

  it("should add range-end-day class to the end date element", async () => {
    element._selectedDates = [new Date(element.today.getFullYear(), element.today.getMonth(), 1),
      new Date(element.today.getFullYear(), element.today.getMonth(), 5)
    ];

    element.setHoverClass();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const endDateElement = element.shadowRoot?.getElementById(
      `${element._selectedDates[1]?.getTime()}`
    )?.parentElement;

    expect(endDateElement?.classList.contains("range-end-day")).to.be.true;
  });

  it("should correctly calculate lastMonthDaysCount when currentMonthStartWeekDay smaller startOfWeek", () => {

    element._calendarYear = 2024;
    element._calendarMonth = 9;

    element.startOfWeek = 1;
    const currentMonthStartWeekDay = 0;

    element.getWeekDayOfDate = () => currentMonthStartWeekDay;

    element.getDayNumInAMonth = (_year, month) => (month === 8 ? 30 : 31);

    element.createCalendarDays();

    const expectedLastMonthDaysCount = 7 - (element.startOfWeek - currentMonthStartWeekDay);

    expect(element.getDayNumInAMonth(2024, 8)).to.equal(30);
    expect(element.getWeekDayOfDate(2024, 9)).to.equal(currentMonthStartWeekDay);
    expect(expectedLastMonthDaysCount).to.equal(6);
  });

  it("should correctly calculate lastMonthDaysCount when currentMonthStartWeekDay bigger than startOfWeek", () => {
    element.startOfWeek = 1;
    const currentMonthStartWeekDay = 2;

    element.getWeekDayOfDate = () => currentMonthStartWeekDay;

    element.getDayNumInAMonth = (_year, month) => (month === 8 ? 30 : 31);

    element.createCalendarDays();

    const expectedLastMonthDaysCount = currentMonthStartWeekDay - element.startOfWeek;

    expect(expectedLastMonthDaysCount).to.equal(1);
  });

  it("should call setHoverClass when type is RANGE", () => {

    element.type = CALENDAR_TYPES.RANGE;

    const setHoverClassSpy = sinon.spy(element, "setHoverClass");

    element._calendarView = CALENDAR_VIEWS.DAYS;
    element._calendarMonth = FIRST_MONTH_INDEX;
    element._calendarYear = 2024;
    element._calendarYears = [2023, 2024, 2025];

    element.setPreviousCalendarView();

    expect(setHoverClassSpy).to.have.been.called;

    setHoverClassSpy.restore();
  });

  it("should not call setHoverClass when type is not RANGE", () => {

    element.type = CALENDAR_TYPES.SINGLE;

    const setHoverClassSpy = sinon.spy(element, "setHoverClass");

    element.setPreviousCalendarView();

    expect(setHoverClassSpy).to.not.have.been.called;

    setHoverClassSpy.restore();
  });

  it("should set calendarView to CALENDAR_VIEWS.DAYS when current view is CALENDAR_VIEWS.DAYS", () => {

    element._calendarView = CALENDAR_VIEWS.DAYS;

    const setHoverClassSpy = sinon.spy(element, "setHoverClass");

    element.setCurrentCalendarView(CALENDAR_VIEWS.DAYS);

    expect(element._calendarView).to.equal(CALENDAR_VIEWS.DAYS);

    expect(setHoverClassSpy).to.have.been.called;

    setHoverClassSpy.restore();
  });

  it("should set calendarView to the provided view if it is different from the current view", () => {

    element._calendarView = CALENDAR_VIEWS.MONTHS;

    const setHoverClassSpy = sinon.spy(element, "setHoverClass");

    element.setCurrentCalendarView(CALENDAR_VIEWS.DAYS);

    expect(element._calendarView).to.equal(CALENDAR_VIEWS.DAYS);

    expect(setHoverClassSpy).to.have.been.called;

    setHoverClassSpy.restore();
  });

  it("should call setNextCalendarView when date month is greater than calendarMonth", () => {
    element._calendarMonth = 0;
    element.type = CALENDAR_TYPES.SINGLE;

    const setNextCalendarViewSpy = sinon.spy(element, "setNextCalendarView");

    element.handleDate(new Date(2024, 2, 15));

    expect(setNextCalendarViewSpy).to.have.been.called;

    setNextCalendarViewSpy.restore();
  });

  it("should not call setNextCalendarView when calendar type is RANGE", () => {
    element._calendarMonth = 0;
    element.type = CALENDAR_TYPES.RANGE;

    const setNextCalendarViewSpy = sinon.spy(element, "setNextCalendarView");

    element.handleDate(new Date(2024, 2, 15));

    expect(setNextCalendarViewSpy).to.not.have.been.called;

    setNextCalendarViewSpy.restore();
  });

  it("should not call setNextCalendarView when date month is less than or equal to calendarMonth", () => {
    element._calendarMonth = 0;
    element._calendarMonth = 3;

    const setNextCalendarViewSpy = sinon.spy(element, "setNextCalendarView");

    element.handleDate(new Date(2024, 2, 15));

    expect(setNextCalendarViewSpy).to.not.have.been.called;

    setNextCalendarViewSpy.restore();
  });

  it("should add classes when both startDate and endDate are defined", () => {

    element._selectedDates = [new Date(2024, 0, 10), new Date(2024, 0, 15)];

    const setTimeoutSpy = sinon.spy(window, "setTimeout");

    element.setHoverClass();

    expect(setTimeoutSpy).to.have.been.calledOnce;
  });
});
