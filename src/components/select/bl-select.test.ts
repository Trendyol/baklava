import { assert, elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';

import BlSelect from './bl-select';
import type BlSelectOption from './option/bl-select-option';
import type BlButton from '../button/bl-button';

import BlCheckbox from '../checkbox-group/checkbox/bl-checkbox';
import { sendKeys } from '@web/test-runner-commands';

describe('bl-select', () => {
  it('is defined', () => {
    const el = document.createElement('bl-select');
    assert.instanceOf(el, BlSelect);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlSelect>(html`<bl-select></bl-select>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="select-wrapper">
        <div
          class="select-input"
          tabindex="0"
        >
          <span class="placeholder"></span>
          <ul class="selected-options"></ul>
          <span class="additional-selection-count">
            +0
          </span>
          <div class="actions">
          <bl-icon class="dropdown-icon open" name="arrow_up"></bl-icon>
          <bl-icon class="dropdown-icon closed" name="arrow_down"></bl-icon>
          </div>
        </div>
        <div class="popover" tabindex="-1">
          <slot></slot>
        </div>
        <div class="hint"></div>
      </div>
    `
    );
  });
  it('should set label', async () => {
    const labelText = 'Some Label';
    const el = await fixture<BlSelect>(html`<bl-select label="${labelText}"></bl-select>`);
    const label = el.shadowRoot?.querySelector('label');

    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });
  it('should set help text', async () => {
    const helpText = 'Some help text';
    const el = await fixture<BlSelect>(html`<bl-select help-text="${helpText}"></bl-select>`);
    const helpMessage = el.shadowRoot?.querySelector<HTMLParagraphElement>('.help-text');

    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });
  it('should render bl-select-options', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
  });
  it('should render bl-select-options when multiple options is true', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
  });
  it('should render bl-select-options when there is a selected option', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1" selected>Option 1</bl-select-option>
      <bl-select-option value="2">Option 2</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(1);
  });
  it('should render bl-select-options when multiple options is true and there are selected options', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
      <bl-select-option value="3" selected>Option 3</bl-select-option>
      <bl-select-option value="4" selected>Option 4</bl-select-option>
      <bl-select-option value="5" selected>Option 5</bl-select-option>
    </bl-select>`);

    expect(el.options.length).to.equal(5);
    expect(el.selectedOptions.length).to.equal(4);
    expect(el.additionalSelectedOptionCount).to.equal(1);
  });
  it('should open select menu', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>button</bl-select>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>('.select-input');
    selectInput?.click();

    expect(el.opened).to.true;
  });
  it('should close select menu', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>button</bl-select>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>('.select-input');
    selectInput?.click();
    selectInput?.click();

    expect(el.opened).to.false;
  });
  it('should close select menu when click outside & run validations', async () => {
    const el = await fixture<BlSelect>(html`<body>
      <bl-select required invalid-text="This field is mandatory"></bl-select>
    </body>`);

    const selectInput = el.shadowRoot?.querySelector<HTMLDivElement>('.select-input');
    selectInput?.click();

    const body = el.closest<HTMLBodyElement>('body');
    body?.click();

    await elementUpdated(el);

    const invalidText = el.shadowRoot?.querySelector<HTMLParagraphElement>('.invalid-text');

    expect(el.opened).to.false;
    expect(el.checkValidity()).to.false;
    expect(invalidText).to.exist;
  });
  it('should remove selected options', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const removeAll = el.shadowRoot?.querySelector<BlButton>('.remove-all');
    setTimeout(() => removeAll?.click());

    const event = await oneEvent(el, 'bl-select');

    expect(removeAll).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.eql([]);
    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(0);
    expect(el.value).to.null;
  });
  it('should hide remove icon button on single selection', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    expect(el.shadowRoot?.querySelector('.remove-all')).not.to.exist;
  });
  it('should fire event when click select option when it is not selected', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="1"]');

    const selectOptionCheckbox = selectOption?.shadowRoot?.querySelector<BlCheckbox>('bl-checkbox');
    const checkboxEvent = new CustomEvent('bl-checkbox-change', {
      detail: true,
    });
    selectOptionCheckbox?.dispatchEvent(checkboxEvent);

    expect(el.selectedOptions.length).to.equal(2);
  });
  it('should fire event when click select option', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="1"]');
    const selectOptionDiv =
      selectOption?.shadowRoot?.querySelector<HTMLDivElement>('.single-option');

    setTimeout(() => selectOptionDiv?.click());
    const event = await oneEvent(el, 'bl-select');

    expect(event).to.exist;
    expect(event.detail.length).to.equal(1);
    expect(el.selectedOptions.length).to.equal(1);
  });
  it('should remove selected item if it is already selected', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[value="2"]');
    const selectOptionCheckbox = selectOption?.shadowRoot?.querySelector<BlCheckbox>('bl-checkbox');
    const checkboxEvent = new CustomEvent('bl-checkbox-change', {
      detail: false,
    });
    selectOptionCheckbox?.dispatchEvent(checkboxEvent);

    expect(el.selectedOptions.length).to.equal(0);
  });
  it('should clear connected options & selected items when multiple property has changed', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    el.removeAttribute('multiple');

    await elementUpdated(el);

    const selectOption = el.querySelector<BlSelectOption>('bl-select-option[selected]');

    expect(selectOption).is.not.exist;
  });

  describe('value attribute', () => {
    describe('initial value', () => {
      it('should set correct option as selected when value is simple string', async () => {
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

      it('should be overriden by the selected attribute of options', async () => {
        const el = await fixture<BlSelect>(html`<bl-select name="test" value="2">
          <bl-select-option value="1" selected>Option 1</bl-select-option>
          <bl-select-option value="2">Option 2</bl-select-option>
        </bl-select>`);

        await elementUpdated(el);

        expect(el.querySelector<BlSelectOption>('bl-select-option[value="1"]')?.selected).to.be
          .true;
        expect(el.querySelector<BlSelectOption>('bl-select-option[value="2"]')?.selected).to.be
          .false;
        expect(el.value).to.equal('1');
      });
    });
  });

  describe('form integration', () => {
    it('should show errors when parent form is submitted', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-select required></bl-select>
      </form>`);

      const blSelect = form.querySelector<BlSelect>('bl-select');

      form.addEventListener('submit', e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent('submit', { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blSelect?.shadowRoot?.querySelector('.invalid-text')
      );

      expect(blSelect?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });

    it('should return the initial value when form reset called', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-select name="country" value="tr">
          <bl-select-option value="tr">Turkiye</bl-select-option>
          <bl-select-option value="nl">Netherlands</bl-select-option>
        </bl-select>

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>`);

      const blSelect = form.querySelector<BlSelect>('bl-select');

      await elementUpdated(form);

      form.querySelector('bl-select-option[value="nl"]')?.dispatchEvent(
        new CustomEvent('bl-select-option', {
          bubbles: true,
          detail: 'nl',
        })
      );

      await elementUpdated(form);

      expect(blSelect?.value).to.equal('nl');

      form.querySelector<HTMLButtonElement>('button[type="reset"]')?.click();

      await elementUpdated(form);

      expect(blSelect?.value).to.equal('tr');
    });
  });

  describe('keyboard navigation', () => {
    let el: HTMLDivElement, blSelect: BlSelect;

    beforeEach(async () => {
      //when
      el = await fixture(html`<div>
        <input id="previnput" />
        <bl-select label="Choose sports you like">
          <bl-select-option value="basketball">Basketball</bl-select-option>
          <bl-select-option value="football">Football</bl-select-option>
          <bl-select-option value="tennis">Tennis</bl-select-option>
        </bl-select>
        <input id="nextinput" />
      </div>`);

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      blSelect = el.querySelector('bl-select') as BlSelect;
    });

    it('should get focus with tab key', async () => {
      //given
      await sendKeys({
        press: 'Tab',
      });

      //then
      expect(document.activeElement).to.equal(blSelect);
    });

    it('should not get focus if it is disabled', async () => {
      blSelect.disabled = true;

      // given
      await sendKeys({
        press: 'Tab',
      });

      // then
      expect(document.activeElement).to.not.equal(blSelect);
    });

    ['Space', 'Enter', 'ArrowDown', 'ArrowUp'].forEach(keyCode => {
      it(`should open popover with ${keyCode} key`, async () => {
        //given
        await sendKeys({
          press: 'Tab',
        });
        await sendKeys({
          press: keyCode,
        });

        //then
        expect(blSelect?.opened).to.equal(true);
      });
    });

    ['Space', 'Enter', 'Escape'].forEach(keyCode => {
      it(`should close popover with ${keyCode} key`, async () => {
        // when
        blSelect?.open();

        //given
        await sendKeys({
          press: 'Tab',
        });
        await sendKeys({
          press: keyCode,
        });

        //then
        expect(blSelect?.opened).to.equal(false);
      });
    });

    it('should focus first option with arrow down key', async () => {
      const firstOption = el.querySelector<BlSelectOption>('bl-select-option');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Space',
      });
      await sendKeys({
        press: 'ArrowDown',
      });

      //then
      expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });

    it('should focus previous option with arrow up key', async () => {
      const firstOption = el.querySelector<BlSelectOption>('bl-select-option');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Space',
      });
      await sendKeys({
        press: 'ArrowDown',
      });
      await sendKeys({
        press: 'ArrowDown',
      });
      await sendKeys({
        press: 'ArrowUp',
      });

      //then
      expect((document.activeElement as BlSelectOption).value).to.equal(firstOption?.value);
    });
  });

  // describe('validation', () => {
  //   it('should ')
  // });
});
