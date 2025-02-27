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

    assert.shadowDom.equal(
      el,
      `
      <div class="select-wrapper">
        <fieldset
          class="select-input"
          tabindex="0"
          role="button"
          aria-haspopup="listbox"
          aria-labelledby="label"
          aria-expanded="false"
        >
          <legend><span></span></legend>
          <span class="placeholder"></span>
          <span class="label"></span>
          <ul class="selected-options"></ul>
          <span class="additional-selection-count">
            +0
          </span>
          <div class="actions">
          <bl-icon class="dropdown-icon open" name="arrow_up"></bl-icon>
          <bl-icon class="dropdown-icon closed" name="arrow_down"></bl-icon>
          </div>
        </fieldset>
        <div class="popover" tabindex="-1"
          role="listbox"
          aria-multiselectable="false"
          aria-labelledby="label"
        >
          <slot></slot>
        </div>
        <div class="hint"></div>
      </div>
    `
    );
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
  it("should not show popover if there is no option", async () => {
    const el = await fixture<BlSelect>(html`<bl-select></bl-select>`);
    const popover = el.shadowRoot?.querySelector(".popover");

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
  it("should render icon correctly on bl-select if an option selected that has icon", async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option selected icon="info" value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    const selectedOptions = el.shadowRoot?.querySelector<HTMLUListElement>(".selected-options");

    expect(selectedOptions?.children[0].children[0].outerHTML).to.equal("<bl-icon name=\"info\"></bl-icon>");
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

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.focus();

    await sendKeys({
      type: "turkey",
    });

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

    const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

    searchInput?.focus();

    await sendKeys({
      type: "netherlands",
    });

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

    const clearSearchButton = el.shadowRoot?.querySelector<BlButton>(".popover .popover-no-result bl-button");

    clearSearchButton?.click();

    setTimeout(() => expect(searchInput?.value).to.equal(""));
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
      const el = await fixture<BlSelect>(html`<bl-select search-bar>
        <bl-select-option value="tr">Turkey</bl-select-option>
        <bl-select-option value="en">United States of America</bl-select-option>
      </bl-select>`);

      // Set an invalid locale
      document.querySelector("html")?.setAttribute("lang", "invalid-LOCALE");

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();

      await sendKeys({
        type: "turk",
      });

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

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();

      await sendKeys({
        type: "test",
      });

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

      const searchInput = el.shadowRoot?.querySelector<HTMLInputElement>("fieldset input");

      searchInput?.focus();

      await sendKeys({
        type: "test",
      });

      await elementUpdated(el);

      el.options.forEach(option => {
        if (option.innerText === "") {
          expect(option.hidden).to.be.true;
        } else {
          expect(option.hidden).to.be.false;
        }
      });
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

    // Clean up after tests
    afterEach(() => {
      document.documentElement.removeAttribute("lang");
    });
  });
});
