import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import { BlButton, BlDatePicker } from "../../baklava";
import { CALENDAR_TYPES } from "../calendar/bl-calendar.constant";
import sinon from "sinon";
import "./bl-datepicker";

describe("BlDatepicker", () => {
  let element: BlDatePicker;
  let getElementByIdStub: sinon.SinonStub;
  let consoleWarnSpy: sinon.SinonSpy;


  beforeEach(async () => {
    element = await fixture<BlDatePicker>(html`
      <bl-datepicker type="single" locale="en"></bl-datepicker>`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getElementByIdStub = sinon.stub(element.shadowRoot, "getElementById").callsFake((id) => {
      if (id === "datepicker-input") {
        return { offsetWidth: 300 };
      }
      if (id === "icon-container") {
        return { offsetWidth: 60 };
      }
      return null;
    });

    consoleWarnSpy = sinon.spy(console, "warn");

    await element.updateComplete;
  });

  afterEach(() => {
    getElementByIdStub.restore();
    consoleWarnSpy.restore();
  });

  it("should instantiate the component", () => {
    expect(document.createElement("bl-datepicker")).instanceOf(HTMLElement);
  });

  it("should render the datepicker component", () => {
    expect(element).to.exist;
    expect(element.shadowRoot).to.exist;
  });

  it("should have default empty value", () => {
    expect(element._inputValue).to.equal("");
  });

  it("should set placeholder correctly", async () => {
    element.placeholder = "Select a date";
    await element.updateComplete;

    expect(element._inputEl?.placeholder).to.equal("Select a date");
  });

  it("should open the popover when input is clicked", async () => {

    element._inputEl?.click();
    await element.updateComplete;

    expect(element._popoverEl).to.exist;
    expect(element._popoverEl?.visible).to.be.true;
  });

  it("should clear selected dates when clear button is clicked", async () => {
    element.addEventListener("bl-datepicker-change", (event) => {
      const customEvent = event as CustomEvent;

      expect(customEvent).to.exist;
      expect(customEvent.detail).to.deep.equal([]);

    });

    const clearButton = element.shadowRoot?.querySelector("bl-button") as BlButton;

    clearButton?.click();
    await element.updateComplete;


    expect(element._calendarEl?._dates).to.deep.equal([]);
    expect(element._inputValue).to.equal("");
  });

  it("should disable the input when 'disabled' is set", async () => {
    element.disabled = true;
    await element.updateComplete;

    const input = element._inputEl;

    expect(input?.hasAttribute("disabled")).to.be.true;
  });

   it("should use custom value formatter when provided", async () => {
    const testDate = new Date(2023, 1, 1);

    element.valueFormatter = (dates: Date[]) => `Custom format: ${dates[0].toDateString()}`;
    element._calendarEl._dates=[testDate];
    element.setDatePickerInput();
    await element._calendarEl.updateComplete;
    element._calendarEl.requestUpdate();

    expect(element._inputValue).to.equal(`Custom format: ${testDate.toDateString()}`);
  });

  it("should clear the datepicker even if no dates are selected", async () => {
    element.clearDatepicker();
    await element.updateComplete;

    expect(element._calendarEl?._dates).to.deep.equal([]);
    expect(element._inputValue).to.equal("");
  });

  it("should display help text when provided", async () => {
    element.helpText = "Please select a valid date.";
    await element.updateComplete;

    const input = element._inputEl;

    expect(input?.getAttribute("help-text")).to.equal("Please select a valid date.");
  });

  it("should close the popover after timeout", async () => {
    element._inputEl?.click();
    await element.updateComplete;

    element.closePopoverWithTimeout();
    await aTimeout(300);

    expect(element._popoverEl.visible).to.be.false;
  });

  it("should insert a <br /> after every third item", () => {
    const inputString = "Item1, Item2, Item3, Item4";
    const result = element.formatAdditionalDates(inputString);

    expect(result[3].strings).to.include("<br />");
  });

  it("should render the tooltip when floatingDateCount > 0", async () => {
    element._floatingDateCount = 2;
    element.requestUpdate();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector("bl-tooltip");

    expect(tooltip).to.not.be.null;

    const trigger = tooltip?.querySelector("[slot=\"tooltip-trigger\"]");

    expect(trigger).to.not.be.null;
    expect(trigger?.textContent).to.equal("+2");
  });

  it("should include ',...' when floatingDateCount is greater than 0 for MULTIPLE type", () => {

    element.type = CALENDAR_TYPES.MULTIPLE;
    element._calendarEl._dates = [new Date("2024-01-01"), new Date("2024-01-02"), new Date("2024-01-03")];
    element.setFloatingDates();
    element.defaultInputValueFormatter();
    expect(element._inputValue).to.include(" ,...");
  });

  it("should not include \" ,...\" when floatingDateCount is 0 for MULTIPLE type", () => {

    element.type = CALENDAR_TYPES.MULTIPLE;
    element._calendarEl._dates = [new Date("2024-01-01")];

    element.setFloatingDates();

    element.defaultInputValueFormatter();
    expect(element._inputValue).to.not.include(" ,...");
  });

  it("should format a date correctly", () => {
    const testDate = new Date(2024, 9, 8);
    const formattedDate = element.formatDate(testDate);

    expect(formattedDate).to.equal("08/10/2024");
  });

  it("should handle single-digit days and months correctly", () => {
    const testDate = new Date(2024, 0, 5);
    const formattedDate = element.formatDate(testDate);

    expect(formattedDate).to.equal("05/01/2024");
  });

  it("should call openPopover when popoverEl is not visible", () => {
    const openPopoverSpy = sinon.spy(element, "openPopover");

    element._togglePopover();

    expect(openPopoverSpy).to.have.been.calledOnce;
    expect(element._popoverEl.visible).to.be.true;
    openPopoverSpy.restore();
  });

  it("should call closePopover when popoverEl is visible", () => {
    element._popoverEl.show();
    const closePopoverSpy = sinon.spy(element, "closePopover");

    element._togglePopover();

    expect(closePopoverSpy).to.have.been.calledOnce;
    expect(element._popoverEl.visible).to.be.false;
    closePopoverSpy.restore();
  });

  it("should return a single date when value is a single Date", () => {
    const date = new Date("2024-01-01");

    element.value = date;
    expect(element.value).to.equal(date);
  });

  it("should return an array of dates when value is an array of Dates", () => {
    const dates = [new Date("2024-01-01"), new Date("2024-02-01")];

    element.type=CALENDAR_TYPES.MULTIPLE;
    element.value = dates;

    expect(element.value).to.equal(dates);
  });

  it("should not warn when value is an array for multiple/range selection", () => {
    element.type = CALENDAR_TYPES.MULTIPLE;
    element.value = [new Date(), new Date()];

    element.firstUpdated();

    expect(consoleWarnSpy.called).to.be.false;
  });

  it("should not warn when 'value' is an array of exactly two Date objects in RANGE mode", () => {
    element.type = CALENDAR_TYPES.RANGE;
    element.value = [new Date(), new Date()];

    element.firstUpdated();

    expect(consoleWarnSpy.called).to.be.false;
  });

  it("should warn if minDate is greater than or equal to maxDate", async () => {

    element.maxDate = new Date(2023, 0, 1);
    await element.updateComplete;

    element.minDate = new Date(2023, 0, 2);
    await element.updateComplete;

    expect(consoleWarnSpy.calledWith("minDate cannot be greater than maxDate.")).to.be.true;
  });

  it("should warn if maxDate is less than or equal to minDate", async () => {

    element.minDate = new Date(2023, 0, 2);
    await element.updateComplete;

    element.maxDate = new Date(2023, 0, 1);
    await element.updateComplete;

    expect(consoleWarnSpy.calledWith("maxDate cannot be smaller than minDate.")).to.be.true;
  });


  it("should focus the input element on calendar mouse down", async () => {
    const focusSpy = sinon.spy(element._inputEl, "focus");
    const preventDefaultSpy = sinon.spy();

    element._inputEl.focus = focusSpy;

    const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, composed: true });

    mouseDownEvent.preventDefault = preventDefaultSpy;

    element._inputEl.dispatchEvent(mouseDownEvent);

    expect(preventDefaultSpy).to.have.been.calledOnce;

    expect(focusSpy).to.have.been.calledOnce;
  });

  it("should focus the input element on input mouse down", async () => {
    // Create spies for the methods we want to check
    const focusSpy = sinon.spy(element._inputEl, "focus");
    const preventDefaultSpy = sinon.spy();

    element._inputEl.focus = focusSpy;

    const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, composed: true });

    mouseDownEvent.preventDefault = preventDefaultSpy;

    element._inputEl.dispatchEvent(mouseDownEvent);

    expect(preventDefaultSpy).to.have.been.calledOnce;

    expect(focusSpy).to.have.been.calledOnce;
  });

  it("should focus the input element on calendar mouse down", async () => {
    const focusSpy = sinon.spy(element._inputEl, "focus");
    const preventDefaultSpy = sinon.spy();

    const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, composed: true });

    mouseDownEvent.preventDefault = preventDefaultSpy;

    element._calendarEl.dispatchEvent(mouseDownEvent);

    expect(preventDefaultSpy.called).to.be.true;

    expect(focusSpy.called).to.be.true;
  });

});
