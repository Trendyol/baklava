import { assert, elementUpdated, expect, fixture, html, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import BlButton from "../button/bl-button";
import "../checkbox-group/checkbox/bl-checkbox";
import BlCheckbox from "../checkbox-group/checkbox/bl-checkbox";
import BlSelect from "./bl-select";
import type BlSelectOption from "./option/bl-select-option";

describe("bl-select", () => {
  it("is defined", () => {
    const el = document.createElement("bl-select");

    assert.instanceOf(el, BlSelect);
  });

  it("renders with default values", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
    </bl-select>`);

    const selectWrapper = el.shadowRoot?.querySelector(".select-wrapper");
    const selectInput = el.shadowRoot?.querySelector(".select-input");
    const popover = el.shadowRoot?.querySelector("bl-popover");

    expect(selectWrapper).to.exist;
    expect(selectInput).to.exist;
    expect(popover).to.exist;
    expect(selectInput?.getAttribute("aria-haspopup")).to.equal("listbox");
    expect(selectInput?.getAttribute("aria-expanded")).to.equal("false");
  });
  it("should set label", async () => {
    const labelText = "Some Label";
    const el = await fixture<BlSelect>(html`<bl-select label="${labelText}"></bl-select>`);
    const label = el.shadowRoot?.querySelector("label");

    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });
  it("should set help text", async () => {
    const helpText = "Some help text";
    const el = await fixture<BlSelect>(html`<bl-select help-text="${helpText}"></bl-select>`);
    const helpMessage = el.shadowRoot?.querySelector<HTMLParagraphElement>(".help-text");

    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  it("should set size to small", async () => {
    const el = await fixture<BlSelect>(html`<bl-select size="small"></bl-select>`);

    expect(el.size).to.equal("small");
    expect(el.getAttribute("size")).to.equal("small");
  });

  it("should set size to medium by default", async () => {
    const el = await fixture<BlSelect>(html`<bl-select></bl-select>`);

    expect(el.size).to.equal("medium");
  });

  it("should set size to large", async () => {
    const el = await fixture<BlSelect>(html`<bl-select size="large"></bl-select>`);

    expect(el.size).to.equal("large");
    expect(el.getAttribute("size")).to.equal("large");
  });

  it("should update size dynamically", async () => {
    const el = await fixture<BlSelect>(html`<bl-select size="small"></bl-select>`);

    expect(el.size).to.equal("small");

    el.size = "large";
    await elementUpdated(el);

    expect(el.size).to.equal("large");
    expect(el.getAttribute("size")).to.equal("large");
  });
  it("should not show popover if there is no option", async () => {
    const el = await fixture<BlSelect>(html`<bl-select></bl-select>`);
    const popover = el.shadowRoot?.querySelector("bl-popover");

    expect(popover).to.have.style("display", "none");
  });
  it("should render bl-select-options", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
  });
  it("should render bl-select-options when multiple options is true", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
  });
  it("should render bl-select-options when there is a selected option", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1" selected>Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(1);
  });
  it("should render bl-select-option label correctly on bl-select", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option selected label="custom-label-1" value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    const selectedOptions = el.shadowRoot?.querySelector<HTMLUListElement>(".selected-options");

    expect(selectedOptions?.children[0].textContent).to.equal("custom-label-1");
  });
  it("should render bl-select-option label(s) correctly on bl-select when select is multiple", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option selected label="custom-label-1" value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
      <bl-select-option selected value="3">Option 3</bl-select-option>
      <bl-select-option value="4" label="custom-label-4">Option 4</bl-select-option>
    </bl-select>`);

    const selectedOptions = el.shadowRoot?.querySelector<HTMLUListElement>(".selected-options");

    expect(selectedOptions?.textContent).contains("custom-label-1");
    expect(selectedOptions?.textContent).contains("Option 3");
  });
  it("should open select menu", async () => {
    const el = await fixture<BlSelect>(html`<bl-select><bl-select-option value="1">Option 1</bl-select-option></bl-select>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>(".select-input");

    selectInput?.click();

    expect(el.opened).to.true;
  });
  it("should close select menu", async () => {
    const el = await fixture<BlSelect>(html`<bl-select><bl-select-option value="1">Option 1</bl-select-option></bl-select>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>(".select-input");

    selectInput?.click();
    selectInput?.click();

    expect(el.opened).to.false;
  });
  it("should close select menu when click outside & run validations", async () => {
    const el = await fixture<BlSelect>(html`<body>
      <bl-select required invalid-text="This field is mandatory"><bl-select-option value="1">Option 1</bl-select-option></bl-select>
    </body>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>(".select-input");

    selectInput?.click();

    const body = el.closest<HTMLBodyElement>("body");

    body?.click();

    await elementUpdated(el);

    const invalidText = el.shadowRoot?.querySelector<HTMLParagraphElement>(".invalid-text");

    expect(el.opened).to.false;
    expect(el.checkValidity()).to.false;
    expect(invalidText).to.exist;
  });
  it('should render "remove all" button on clearable attribute is given', async () => {
    const el = await fixture<BlSelect>(html`
      <bl-select clearable>
        <bl-select-option value="1">Option 1</bl-select-option>
        <bl-select-option value="2" selected>Option 2</bl-select-option>
      </bl-select>
    `);
    const removeAll = el.shadowRoot?.querySelector<BlButton>(".remove-all");

    expect(removeAll).to.exist;
  });
  it("should remove selected option on remove all click on single select with clearable prop", async () => {
    const el = await fixture<BlSelect>(html`<bl-select clearable>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);
    const removeAll = el.shadowRoot?.querySelector<BlButton>(".remove-all");

    setTimeout(() => removeAll?.click());

    const event = await oneEvent(el, "bl-select");

    expect(removeAll).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.eql(null);
    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(0);
    expect(el.value).to.null;
  });
  it("should remove selected options", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const removeAll = el.shadowRoot?.querySelector<BlButton>(".remove-all");

    setTimeout(() => removeAll?.click());

    const event = await oneEvent(el, "bl-select");

    expect(removeAll).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.eql([]);
    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(0);
    expect(el.value).to.null;
  });
  it("should keep selected disabled options when remove all clicked", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1" disabled selected>Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const removeAll = el.shadowRoot?.querySelector<BlButton>(".remove-all");

    setTimeout(() => removeAll?.click());

    const event = await oneEvent(el, "bl-select");

    expect(el.shadowRoot?.querySelector<BlButton>(".remove-all")).to.not.exist;
    expect(event).to.exist;
    expect(event.detail).to.deep.eq([
      {
        selected: true,
        text: "Option 1",
        value: "1",
      }
    ]);
    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(1);
    expect(el.value).to.deep.eq(["1"]);
  });
  it("should hide remove icon button on single required selection", async () => {
    const el = await fixture<BlSelect>(html`<bl-select required>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    expect(el.shadowRoot?.querySelector(".remove-all")).not.to.exist;
  });
  it("should fire event when click select option when it is not selected", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="1"]');

    const selectOptionCheckbox = selectOption?.shadowRoot?.querySelector<BlCheckbox>("bl-checkbox");
    const checkboxEvent = new CustomEvent("bl-checkbox-change", {
      detail: true,
    });

    selectOptionCheckbox?.dispatchEvent(checkboxEvent);

    expect(el.selectedOptions.length).to.equal(2);
  });
  it("should fire event when click select option", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="1"]');
    const selectOptionDiv =
      selectOption?.shadowRoot?.querySelector<HTMLDivElement>(".single-option");

    setTimeout(() => selectOptionDiv?.click());
    const event = await oneEvent(el, "bl-select");

    expect(event).to.exist;
    expect(event.detail).to.exist;
    expect(el.selectedOptions.length).to.equal(1);
  });
  it("should remove selected item if it is already selected", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="2"]');
    const selectOptionCheckbox = selectOption?.shadowRoot?.querySelector<BlCheckbox>("bl-checkbox");
    const checkboxEvent = new CustomEvent("bl-checkbox-change", {
      detail: false,
    });

    selectOptionCheckbox?.dispatchEvent(checkboxEvent);

    expect(el.selectedOptions.length).to.equal(0);
  });
  it("should clear connected options & selected items when multiple property has changed", async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    el.removeAttribute("multiple");

    await elementUpdated(el);

    const selectOption = el.querySelector<BlSelectOption>("bl-select-option[selected]");

    expect(selectOption).is.not.exist;
  });

  it("should show search input if search-bar attribute is given", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    expect(searchInput).to.exist;
  });

  it("should search 'Turkey' when 'turkey' is typed", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    // Open the select first (search bar is only visible when opened)
    const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

    selectInput?.click();
    await elementUpdated(el);

    // Manual search trigger
    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

    expect(searchInput).to.exist;

    if (searchInput) {
      searchInput.value = "turkey";
      searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }

    await elementUpdated(el);

    el.options.forEach(option => {
      if (option.innerText === "Turkey") {
        expect(option.hidden).to.be.false;
      } else {
        expect(option.hidden).to.be.true;
      }
    });
  });

  it("should open the popover and show loading icon when the search loading state is true", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar search-bar-loading-state>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.focus();

    await sendKeys({
      type: "turk",
    });

    el.open();
    await elementUpdated(el);

    expect(el.opened).to.be.true;

    const loadingSpinner = el.shadowRoot?.querySelector("fieldset div.actions bl-spinner");

    expect(loadingSpinner).to.exist;
    expect(loadingSpinner?.getAttribute("size")).to.equal("var(--bl-font-size-m)");
  });

  it("should be displayed a 'no result' message  if the searched term does not match with any option", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    // Open the select first
    const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

    selectInput?.click();
    await elementUpdated(el);

    // Manual search trigger
    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

    if (searchInput) {
      searchInput.value = "netherlands";
      searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }

    await elementUpdated(el);

    const noResultContainer = el.shadowRoot?.querySelector<HTMLInputElement>(".popover .popover-no-result");
    const noResultMessage = el.shadowRoot?.querySelector<HTMLInputElement>(".popover .popover-no-result span")?.innerText;

    el.options.forEach(option => {
      expect(option.hidden).to.be.true;
    });

    expect(noResultContainer).to.exist;
    expect(noResultMessage).to.equal("No Data Found");
  });

  it("should be cleared the search input if the user click on the clear search button", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.focus();

    await sendKeys({
      type: "netherlands",
    });

    await elementUpdated(el);

    const clearSearchButton = el.shadowRoot?.querySelector<BlButton>(".popover .popover-no-result bl-button");

    clearSearchButton?.click();

    await elementUpdated(el);

    expect(searchInput?.value).to.equal("");

    // All options should be visible after clearing search
    el.options.forEach(option => {
      expect(option.hidden).to.be.false;
    });
  });

  it("should call _clearSearch method when clear button is clicked", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.focus();

    await sendKeys({
      type: "xyz",
    });

    await elementUpdated(el);

    // Verify no result found state
    expect(el.options.every(opt => opt.hidden)).to.be.true;

    // Test _clearSearch method directly
    (el as unknown as { _clearSearch: () => void })._clearSearch();

    await elementUpdated(el);

    // All options should be visible again
    expect(el.options.every(opt => !opt.hidden)).to.be.true;
  });

  it("should focus if one or more option selected already", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    const dropdownIcon = el.shadowRoot?.querySelector<HTMLDivElement>(".dropdown-icon");

    dropdownIcon?.click();

    await(()=> expect(document.activeElement).to.equal(el));
  });

  it("should not close popover when search is focused and user presses space key", async () => {
    const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.click();
    searchInput?.focus();

    await sendKeys({
      press: "Space",
    });

    await elementUpdated(el);

    expect(el.opened).to.true;
  });

  describe("additional selection counter", () => {
    let el: BlSelect;

    beforeEach(async () => {
      el = await fixture<BlSelect>(html`<bl-select multiple>
        <bl-select-option value="1">Option 1</bl-select-option>
        <bl-select-option value="2" selected
          >Option 2 with a very long label to fill out the selected option label</bl-select-option
        >
        <bl-select-option value="3" selected>Option 3</bl-select-option>
        <bl-select-option value="4" selected>Option 4</bl-select-option>
        <bl-select-option value="5" selected>Option 5</bl-select-option>
      </bl-select>`);

      await elementUpdated(el);
    });

    it("should render bl-select-options when multiple options is true and there are selected options", async () => {
      expect(el.options.length).to.equal(5);
      expect(el.selectedOptions.length).to.equal(4, "selectedOptions count is wrong");
      expect(el.additionalSelectedOptionCount).to.equal(
        3,
        "non visible selected option count is wrong"
      );
    });

    it("should show additional selection number", async () => {
      const inputWrapper = el.shadowRoot?.querySelector(".select-input");

      expect(inputWrapper?.classList.contains("has-overflowed-options")).to.be.true;
    });

    it("should clear additional selection number when value set", async () => {
      el.value = [];

      await elementUpdated(el);

      const inputWrapper = el.shadowRoot?.querySelector(".select-input");

      expect(inputWrapper?.classList.contains("has-overflowed-options")).to.be.false;
    });
  });

  describe("value attribute", () => {
    describe("initial value", () => {
      it("should set correct option as selected when value is simple string", async () => {
        const el = await fixture<BlSelect>(html`<bl-select name="test" value="2">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value="1"]')?.selected).to.be
          .false;
        expect(el.querySelector<BlSelectOption>('bl-select-option[value="2"]')?.selected).to.be
          .true;
      });

      it("should be overriden by the selected attribute of options", async () => {
        const el = await fixture<BlSelect>(html`<bl-select name="test" value="2">
          <bl-select-option value="1" selected>Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value="1"]')?.selected).to.be
          .true;
        expect(el.querySelector<BlSelectOption>('bl-select-option[value="2"]')?.selected).to.be
          .false;
        expect(el.value).to.equal("1");
      });
    });
    describe("no initial value", () => {
      it("should not set empty option as selected when multiple and no value", async () => {
        const el = await fixture<BlSelect>(html`<bl-select multiple name="test">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value=""></bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value=""]')?.selected).to.be
          .false;

      });

      it("should not set empty option as selected when multiple, empty string value, selected option", async () => {
        const el = await fixture<BlSelect>(html`<bl-select multiple name="test" value="">
          <bl-select-option value="1" selected>Option 1</bl-select-option>
          <bl-select-option value=""></bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value=""]')?.selected).to.be
          .false;
        expect(el.querySelector<BlSelectOption>('bl-select-option[value="1"]')?.selected).to.be
          .true;

      });

      it("should not set empty option as selected when no value", async () => {
        const el = await fixture<BlSelect>(html`<bl-select name="test">
          <bl-select-option value="1">Option 1</bl-select-option>
          <bl-select-option value=""></bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value=""]')?.selected).to.be
          .false;
      });
    });
  });

  describe("form integration", () => {
    it("should show errors when parent form is submitted", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-select required></bl-select>
      </form>`);

      const blSelect = form.querySelector<BlSelect>("bl-select");

      form.addEventListener("submit", e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent("submit", { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blSelect?.shadowRoot?.querySelector(".invalid-text")
      );

      expect(blSelect?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });

    it("should return the initial value when form reset called", async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-select name="country" value="tr">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">Netherlands</bl-select-option>
        </bl-select>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>`);

      const blSelect = form.querySelector<BlSelect>("bl-select");

      await elementUpdated(form);

      form.querySelector('bl-select-option[value="nl"]')?.dispatchEvent(
        new CustomEvent("bl-select-option", {
          bubbles: true,
          detail: "nl",
        })
      );

      await elementUpdated(form);

      expect(blSelect?.value).to.equal("nl");

      form.querySelector<HTMLButtonElement>('button[type="reset"]')?.click();

      await elementUpdated(form);

      expect(blSelect?.value).to.equal("tr");
    });
  });

  describe("keyboard navigation", () => {
    let el: HTMLDivElement, blSelect: BlSelect;
    const tabKey =
      navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("HeadlessChrome")
        ? "Alt+Tab"
        : "Tab";

    beforeEach(async () => {
      //when
      el = await fixture(html`<div>
        <input id="previnput" />
        <bl-select label="Choose sports you like">
          <bl-select-option value="basketball">Basketball</bl-select-option>
          <bl-select-option value="football">Football</bl-select-option>
          <bl-select-option value="tennis">Tennis</bl-select-option>
          <bl-select-option value="boxing">Boxing</bl-select-option>
          <bl-select-option value="hockey" disabled>Hockey</bl-select-option>
        </bl-select>
        <input id="nextinput" />
      </div>`);

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>("#previnput")?.focus();

      blSelect = el.querySelector("bl-select") as BlSelect;
    });

    it("should get focus with tab key", async () => {
      //given
      await sendKeys({
        press: tabKey,
      });

      //then
      expect(document.activeElement).to.equal(blSelect);
    });

    it("should not get focus if it is disabled", async () => {
      blSelect.disabled = true;

      // given
      await sendKeys({
        press: tabKey,
      });

      // then
      expect(document.activeElement).to.not.equal(blSelect);
    });


    it("should not open popover if it is disabled", async () => {
      // if it is disabled, it should not open popover and return from function
      blSelect.disabled = true;

      // given

      await sendKeys({
        press: tabKey,
      });

      await sendKeys({
        press: "Space",
      });

      // then
      expect(blSelect.opened).to.equal(false);
    });

    ["Space", "Enter", "ArrowDown", "ArrowUp"].forEach(keyCode => {
      it(`should open popover with ${keyCode} key`, async () => {
        //given
        await sendKeys({
          press: tabKey,
        });
        await sendKeys({
          press: keyCode,
        });

        //then
        expect(blSelect?.opened).to.equal(true);
      });
    });

    ["Space", "Enter", "Escape"].forEach(keyCode => {
      it(`should close popover with ${keyCode} key`, async () => {
        // when
        blSelect?.open();

        //given
        await sendKeys({
          press: tabKey,
        });
        await sendKeys({
          press: keyCode,
        });

        //then
        expect(blSelect?.opened).to.equal(false);
      });
    });

    it("should focus first option with arrow down key", async () => {
      const firstOption = el.querySelector<BlSelectOption>("bl-select-option");

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: "Space",
      });
      await sendKeys({
        press: "ArrowDown",
      });

      //then
      expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });

    it("should focus previous option with arrow up key", async () => {
      const firstOption = el.querySelector<BlSelectOption>("bl-select-option");

      //given
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: "Space",
      });
      await sendKeys({
        press: "ArrowDown",
      });
      await sendKeys({
        press: "ArrowDown",
      });
      await sendKeys({
        press: "ArrowUp",
      });

      //then
      expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });

    it("should focus the first matching option when typing a single character", async () => {
      const firstOption = el.querySelector<BlSelectOption>("bl-select-option");

       //given
       await sendKeys({
         press: tabKey,
       });
       await sendKeys({
        press: "Space",
      });
       await sendKeys({
         press: "b",
       });

       //then
       expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });

    it("should focus the first matching option when typing a single character with uppercase", async () => {
      const firstOption = el.querySelector<BlSelectOption>("bl-select-option");

       //given
       await sendKeys({
         press: tabKey,
       });
       await sendKeys({
        press: "Space",
      });
       await sendKeys({
         press: "B",
       });

       //then
       expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });

    it("should focus the first matching option when typing two characters", async () => {
      const fourthOption = el.querySelector<BlSelectOption>("bl-select-option:nth-child(4)");

       //given
       await sendKeys({
         press: tabKey,
       });
       await sendKeys({
        press: "Space",
      });
       await sendKeys({
         press: "b",
       });
       await sendKeys({
        press: "o",
      });

       //then
       expect((document.activeElement as BlSelectOption).value).to.equal(fourthOption?.value);
    });

    it("should reset typed characters after an interval of inactivity", async () => {
      const secondOption = el.querySelector<BlSelectOption>("bl-select-option:nth-child(2)");

      // when
      await sendKeys({
        press: tabKey,
      });
      await sendKeys({
        press: "Space",
      });
      await sendKeys({
        press: "b",
      });
      // Wait for an interval of inactivity
      await new Promise(resolve => setTimeout(resolve, 600));

      await sendKeys({
        press: "f",
      });

      //then
      expect((document.activeElement as BlSelectOption).value).to.equal(secondOption?.value);
    });

    it("should not focus on the disabled option even if it matches the typed character", async () => {
      const focusedOptions = el.querySelectorAll("bl-select-option:focus");

       //given
       await sendKeys({
         press: tabKey,
       });
       await sendKeys({
        press: "Space",
      });
       await sendKeys({
         press: "h",
       });

       //then
       expect(focusedOptions.length).to.equal(0);
    });
  });

  describe("select all", () => {
    it("should select all options", async () => {
      const el = await fixture<BlSelect>(html`<bl-select multiple view-select-all>
        <bl-select-option value="1">Option 1</bl-select-option>
        <bl-select-option value="2">Option 2</bl-select-option>
        <bl-select-option value="3">Option 3</bl-select-option>
        <bl-select-option value="4">Option 4</bl-select-option>
        <bl-select-option value="5">Option 5</bl-select-option>
      </bl-select>`);


      const selectAll = el.shadowRoot!.querySelector<BlCheckbox>(".select-all")!;

      setTimeout(() => selectAll.dispatchEvent(
        new CustomEvent("bl-checkbox-change", { detail: true }))
      );
      const event = await oneEvent(el, "bl-select");

      expect(event).to.exist;
      expect(event.detail.length).to.equal(5);
      expect(el.selectedOptions.length).to.equal(5);
    });

    it("should deselect all options", async () => {
      const el = await fixture<BlSelect>(html`<bl-select multiple view-select-all .value=${["1", "2", "3", "4", "5"]}>
        <bl-select-option value="1">Option 1</bl-select-option>
        <bl-select-option value="2">Option 2</bl-select-option>
        <bl-select-option value="3">Option 3</bl-select-option>
        <bl-select-option value="4">Option 4</bl-select-option>
        <bl-select-option value="5">Option 5</bl-select-option>
      </bl-select>`);

      expect(el.selectedOptions.length).to.equal(5);

      const selectAll = el.shadowRoot!.querySelector<BlCheckbox>(".select-all")!;

      setTimeout(() => selectAll.dispatchEvent(
        new CustomEvent("bl-checkbox-change", { detail: false }))
      );

      const event = await oneEvent(el, "bl-select");

      expect(event).to.exist;
      expect(event.detail.length).to.equal(0);
      expect(el.selectedOptions.length).to.equal(0);
    });

    it("should not act on disabled options", async () => {
      const el = await fixture<BlSelect>(html`<bl-select multiple view-select-all>
        <bl-select-option value="1" disabled>Option 1</bl-select-option>
        <bl-select-option value="2">Option 2</bl-select-option>
        <bl-select-option value="3">Option 3</bl-select-option>
        <bl-select-option value="4">Option 4</bl-select-option>
        <bl-select-option value="5">Option 5</bl-select-option>
      </bl-select>`);

      const selectAll = el.shadowRoot!.querySelector<BlCheckbox>(".select-all")!;

      setTimeout(() => selectAll.dispatchEvent(
        new CustomEvent("bl-checkbox-change", { detail: true }))
      );

      const event = await oneEvent(el, "bl-select");

      expect(event).to.exist;
      expect(event.detail.length).to.equal(4);
      expect(el.selectedOptions.length).to.equal(4);
      expect(el.selectedOptions[0].value).to.equal("2");
    });

    it("should display indeterminate state when some options are selected", async () => {
      const el = await fixture<BlSelect>(html`<bl-select multiple view-select-all>
        <bl-select-option value="1" selected>Option 1</bl-select-option>
        <bl-select-option value="2">Option 2</bl-select-option>
        <bl-select-option value="3">Option 3</bl-select-option>
        <bl-select-option value="4">Option 4</bl-select-option>
        <bl-select-option value="5">Option 5</bl-select-option>
      </bl-select>`);

      const selectAll = el.shadowRoot!.querySelector<BlCheckbox>(".select-all")!;

      expect(selectAll.indeterminate).to.be.true;
      expect(selectAll.checked).to.be.false;
    });

    it('should uncheck "select all" checkbox when all available options are selected', async () => {
      const el = await fixture<BlSelect>(html`<bl-select multiple view-select-all>
        <bl-select-option value="1" disabled>Option 1</bl-select-option>
        <bl-select-option value="2" selected>Option 2</bl-select-option>
        <bl-select-option value="3" selected>Option 3</bl-select-option>
        <bl-select-option value="4" selected>Option 4</bl-select-option>
        <bl-select-option value="5" selected>Option 5</bl-select-option>
      </bl-select>`);

      const selectAll = el.shadowRoot!.querySelector<BlCheckbox>(".select-all")!;

      expect(selectAll.indeterminate).to.be.true;
      expect(selectAll.checked).to.be.false;

      setTimeout(() => selectAll.dispatchEvent(
        new CustomEvent("bl-checkbox-change", { detail: true }))
      );

      const event = await oneEvent(el, "bl-select");

      expect(event).to.exist;
      expect(event.detail.length).to.equal(0);
      expect(el.selectedOptions.length).to.equal(0);

      expect(selectAll.indeterminate).to.be.false;
      expect(selectAll.checked).to.be.false;
    });
  });

  describe("events", () => {
    it("should fire search event when 'turkey' is typed", async () => {
        const el = await fixture<BlSelect>(html`<bl-select search-bar>
      <bl-select-option value="tr">Turkey</bl-select-option>
      <bl-select-option value="en">United States of America</bl-select-option>
    </bl-select>`);

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      if (searchInput) {
        searchInput.focus();

        searchInput.value = "turkey";
      }

      setTimeout(() => searchInput?.dispatchEvent(new Event("input")));

      const event = await oneEvent(el, "bl-search");

      expect(event).to.exist;
      expect(event.detail).to.equal("turkey");
    });
  });

  describe("search functionality", () => {
    it("should handle search with different locales", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="tr">İstanbul</bl-select-option>
        <bl-select-option value="en">Istanbul</bl-select-option>
      </bl-select>`);

      document.querySelector("html")?.setAttribute("lang", "tr-TR");

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();

      await sendKeys({
        type: "istanbul",
      });

      await elementUpdated(el);

      el.options.forEach(option => {
        if (option.innerText.toLowerCase().includes("istanbul")) {
          expect(option.hidden).to.be.false;
        }
      });
    });

    it("should fallback to basic toLowerCase when locale is not supported", async () => {
      // Set an invalid locale
      document.querySelector("html")?.setAttribute("lang", "invalid-LOCALE");

      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="tr">Turkey</bl-select-option>
        <bl-select-option value="en">United States of America</bl-select-option>
      </bl-select>`);

      // Open the select first
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Manual search trigger
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "turk";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      el.options.forEach(option => {
        if (option.innerText === "Turkey") {
          expect(option.hidden).to.be.false;
        } else {
          expect(option.hidden).to.be.true;
        }
      });
    });

    it("should handle search when no HTML lang attribute is set", async () => {
      document.querySelector("html")?.removeAttribute("lang");

      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="tr">Test</bl-select-option>
        <bl-select-option value="en">Testing</bl-select-option>
      </bl-select>`);

      // Open the select first
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Manual search trigger
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "test";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      el.options.forEach(option => {
        expect(option.hidden).to.be.false;
      });
    });

    it("should handle empty or null textContent in options during search", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="empty"></bl-select-option>
        <bl-select-option value="normal">Test</bl-select-option>
      </bl-select>`);

      // Open the select first
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Get search input and trigger search manually
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "test";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      // Verify: empty option should be hidden, "Test" option should be visible
      const emptyOption = el.options.find(opt => opt.value === "empty");
      const testOption = el.options.find(opt => opt.value === "normal");

      expect(emptyOption?.hidden, "Empty option should be hidden when searching for 'test'").to.be.true;
      expect(testOption?.hidden, "'Test' option should be visible when searching for 'test'").to.be.false;
    });

    it("should add 'no-border-bottom' class to the last visible option after search", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="1">Apple</bl-select-option>
        <bl-select-option value="2">Apricot</bl-select-option>
        <bl-select-option value="3">Banana</bl-select-option>
        <bl-select-option value="4">Cherry</bl-select-option>
      </bl-select>`);

      // Open the select
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Search for "ap" - should match Apple and Apricot
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "ap";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      // Find visible options
      const visibleOptions = el.options.filter(opt => !opt.hidden);
      const lastVisibleOption = visibleOptions[visibleOptions.length - 1];

      // Check that only the last visible option has no-border-bottom class
      el.options.forEach(option => {
        const borderElement = option.shadowRoot?.querySelector("div");

        if (option === lastVisibleOption) {
          expect(borderElement?.classList.contains("no-border-bottom"),
            `Last visible option (${option.textContent?.trim()}) should have 'no-border-bottom' class`
          ).to.be.true;
        } else if (!option.hidden) {
          expect(borderElement?.classList.contains("no-border-bottom"),
            `Non-last visible option (${option.textContent?.trim()}) should NOT have 'no-border-bottom' class`
          ).to.be.false;
        }
      });
    });

    it("should update 'no-border-bottom' class when search changes", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="1">Apple</bl-select-option>
        <bl-select-option value="2">Apricot</bl-select-option>
        <bl-select-option value="3">Banana</bl-select-option>
      </bl-select>`);

      // Open the select
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      // First search: "ap" - matches Apple and Apricot
      if (searchInput) {
        searchInput.value = "ap";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }
      await elementUpdated(el);

      const apricotOption = el.options.find(opt => opt.value === "2");
      let borderElement = apricotOption?.shadowRoot?.querySelector("div");

      expect(borderElement?.classList.contains("no-border-bottom")).to.be.true;

      // Second search: "apple" - matches only Apple
      if (searchInput) {
        searchInput.value = "apple";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }
      await elementUpdated(el);

      const appleOption = el.options.find(opt => opt.value === "1");

      borderElement = appleOption?.shadowRoot?.querySelector("div");

      expect(borderElement?.classList.contains("no-border-bottom")).to.be.true;

      // Apricot should no longer have the class
      const apricotBorder = apricotOption?.shadowRoot?.querySelector("div");

      expect(apricotBorder?.classList.contains("no-border-bottom")).to.be.false;
    });

    it("should handle case when all options are hidden (no border class needed)", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="1">Apple</bl-select-option>
        <bl-select-option value="2">Banana</bl-select-option>
      </bl-select>`);

      // Open the select
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Search for something that doesn't match
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "xyz";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      // All options should be hidden, no option should have no-border-bottom
      el.options.forEach(option => {
        expect(option.hidden).to.be.true;
        const borderElement = option.shadowRoot?.querySelector("div");

        expect(borderElement?.classList.contains("no-border-bottom")).to.be.false;
      });
    });

    it("should handle option without borderElement gracefully (early return)", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="1">Apple</bl-select-option>
        <bl-select-option value="2">Banana</bl-select-option>
      </bl-select>`);

      // Open the select
      const selectInput = el.shadowRoot?.querySelector<HTMLElement>(".select-input");

      selectInput?.click();
      await elementUpdated(el);

      // Mock an option without borderElement to test the early return (line 681)
      const firstOption = el.options[0];
      const originalQuerySelector = firstOption.shadowRoot?.querySelector.bind(firstOption.shadowRoot);

      // Temporarily mock querySelector to return null
      if (firstOption.shadowRoot) {
        firstOption.shadowRoot.querySelector = () => null;
      }

      // Trigger search to call _handleLastVisibleSearchedOption
      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>(".search-bar-input");

      if (searchInput) {
        searchInput.value = "ban";
        searchInput.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }

      await elementUpdated(el);

      // Should not throw error - early return should handle null borderElement
      // Banana should still be processed correctly
      const bananaOption = el.options.find(opt => opt.textContent?.includes("Banana"));

      expect(bananaOption?.hidden).to.be.false;

      // Restore original querySelector
      if (firstOption.shadowRoot && originalQuerySelector) {
        firstOption.shadowRoot.querySelector = originalQuerySelector;
      }
    });
  });

  describe("search functionality fallback", () => {
    let originalToLocaleLowerCase: (locale?: string | string[]) => string;

    beforeEach(() => {
      // Store original method before each test
      originalToLocaleLowerCase = String.prototype.toLocaleLowerCase;
    });

    afterEach(() => {
      // Restore original method after each test
      String.prototype.toLocaleLowerCase = originalToLocaleLowerCase;
    });

    it("should handle multiple options with fallback search", async () => {
      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="option1">Test Option</bl-select-option>
          <bl-select-option value="option2">Another Test</bl-select-option>
          <bl-select-option value="option3">No Match</bl-select-option>
        </bl-select>
      `);

      // Mock toLocaleLowerCase to throw an error
      String.prototype.toLocaleLowerCase = () => {
        throw new Error("Locale not supported");
      };

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();
      searchInput!.value = "test";
      searchInput?.dispatchEvent(new Event("input"));

      await el.updateComplete;

      // Check that options with "test" are visible and others are hidden
      el.options.forEach(option => {
        if (option.textContent?.toLowerCase().includes("test")) {
          expect(option.hidden).to.be.false;
        } else {
          expect(option.hidden).to.be.true;
        }
      });
    });

    it("should handle empty search text with fallback", async () => {
      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="option1">Test Option</bl-select-option>
          <bl-select-option value="option2">Another Option</bl-select-option>
        </bl-select>
      `);

      // Mock toLocaleLowerCase to throw an error
      String.prototype.toLocaleLowerCase = () => {
        throw new Error("Locale not supported");
      };

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();
      searchInput!.value = "";
      searchInput?.dispatchEvent(new Event("input"));

      await el.updateComplete;

      // All options should be visible with empty search
      el.options.forEach(option => {
        expect(option.hidden).to.be.false;
      });
    });

    it("should handle null textContent with fallback search", async () => {
      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="option1"></bl-select-option>
          <bl-select-option value="option2">Test Option</bl-select-option>
        </bl-select>
      `);

      // Mock toLocaleLowerCase to throw an error
      String.prototype.toLocaleLowerCase = () => {
        throw new Error("Locale not supported");
      };

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();
      searchInput!.value = "test";
      searchInput?.dispatchEvent(new Event("input"));

      await el.updateComplete;

      // Empty option should be hidden, test option should be visible
      const [emptyOption, testOption] = el.options;

      expect(emptyOption.hidden).to.be.true;
      expect(testOption.hidden).to.be.false;
    });

    it("should maintain search state after multiple searches with fallback", async () => {
      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="option1">Test Option</bl-select-option>
          <bl-select-option value="option2">Another Option</bl-select-option>
        </bl-select>
      `);

      // Mock toLocaleLowerCase to throw an error
      String.prototype.toLocaleLowerCase = () => {
        throw new Error("Locale not supported");
      };

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();

      // First search
      searchInput!.value = "test";
      searchInput?.dispatchEvent(new Event("input"));
      await el.updateComplete;

      // Second search
      searchInput!.value = "another";
      searchInput?.dispatchEvent(new Event("input"));
      await el.updateComplete;

      // Check final state
      const [testOption, anotherOption] = el.options;

      expect(testOption.hidden).to.be.true;
      expect(anotherOption.hidden).to.be.false;
    });
  });

  describe("search localization", () => {
    it("should search text with user locale", async () => {
      // Set up with Turkish locale where 'i'.toLocaleLowerCase() => 'i' (not 'ı')
      document.documentElement.setAttribute("lang", "tr");

      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="1">İstanbul</bl-select-option>
          <bl-select-option value="2">Izmir</bl-select-option>
        </bl-select>
      `);

      await elementUpdated(el);

      // Simulate search input
      const searchInput = el.shadowRoot?.querySelector(".search-bar-input") as HTMLInputElement;

      searchInput.value = "i";
      searchInput.dispatchEvent(new InputEvent("input"));

      await elementUpdated(el);

      // Both options should be visible since 'i' matches both 'İstanbul' and 'Izmir' in Turkish
      const hiddenOptions = el.options.filter(option => option.hidden);

      expect(hiddenOptions.length).to.equal(0);
    });

    it("should fallback to basic toLowerCase when locale is not supported", async () => {
      // Set an invalid locale
      document.documentElement.setAttribute("lang", "xx");

      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="1">Test Option</bl-select-option>
          <bl-select-option value="2">Another Option</bl-select-option>
        </bl-select>
      `);

      await elementUpdated(el);

      // Simulate search input
      const searchInput = el.shadowRoot?.querySelector(".search-bar-input") as HTMLInputElement;

      searchInput.value = "test";
      searchInput.dispatchEvent(new InputEvent("input"));

      await elementUpdated(el);

      // Only "Test Option" should be visible
      const visibleOptions = el.options.filter(option => !option.hidden);

      expect(visibleOptions.length).to.equal(1);
      expect(visibleOptions[0].textContent?.trim()).to.equal("Test Option");
    });

    it("should normalize text correctly with _normalizeText method", async () => {
      document.documentElement.setAttribute("lang", "en");

      const el = await fixture<BlSelect>(html`
        <bl-select search-bar>
          <bl-select-option value="1">Test</bl-select-option>
        </bl-select>
      `);

      // Access private method through type casting for testing
      const normalizeText = (el as unknown as { _normalizeText: (text: string) => string })._normalizeText.bind(el);

      expect(normalizeText("HELLO")).to.equal("hello");
      expect(normalizeText("World")).to.equal("world");
      expect(normalizeText("TeSt")).to.equal("test");
    });

    // Clean up after tests
    afterEach(() => {
      document.documentElement.removeAttribute("lang");
    });
  });

  describe("dropdown icon behavior", () => {
    it("should toggle popover when closed dropdown icon is clicked", async () => {
      const el = await fixture<BlSelect>(html`<bl-select>
        <bl-select-option value="1">Option 1</bl-select-option>
      </bl-select>`);

      expect(el.opened).to.be.false;

      const closedDropdownIcon = el.shadowRoot?.querySelector(".closed.dropdown-icon") as HTMLElement;

      closedDropdownIcon.click();

      expect(el.opened).to.be.true;
    });

    it("should toggle popover when open dropdown icon is clicked", async () => {
      const el = await fixture<BlSelect>(html`<bl-select>
        <bl-select-option value="1">Option 1</bl-select-option>
      </bl-select>`);

      // First open it
      el.open();
      await elementUpdated(el);
      expect(el.opened).to.be.true;

      // Then close it via the open icon
      const openDropdownIcon = el.shadowRoot?.querySelector(".open.dropdown-icon") as HTMLElement;

      openDropdownIcon.click();

      expect(el.opened).to.be.false;
    });

    it("should toggle popover when dropdown icons are clicked in search mode", async () => {
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="1">Option 1</bl-select-option>
      </bl-select>`);

      expect(el.opened).to.be.false;

      // Click closed icon to open
      const closedDropdownIcon = el.shadowRoot?.querySelector(".closed.dropdown-icon") as HTMLElement;

      closedDropdownIcon.click();

      expect(el.opened).to.be.true;

      // Click open icon to close
      const openDropdownIcon = el.shadowRoot?.querySelector(".open.dropdown-icon") as HTMLElement;

      openDropdownIcon.click();

      expect(el.opened).to.be.false;
    });
  });
});
