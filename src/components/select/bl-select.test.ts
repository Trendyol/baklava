import BlSelect from './bl-select';
import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { BlIcon, BlSelectOption } from '../../baklava';
import BlCheckbox from '../checkbox-group/checkbox/bl-checkbox';

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
      <div tabindex="-1" class=" select-wrapper ">
        <div class="select-input">
          <span class="placeholder"></span>
          <ul class="selected-options"></ul>
          <div class="actions">
          <bl-icon class="dropdown-icon open" name="arrow_up"></bl-icon>
          <bl-icon class="dropdown-icon closed" name="arrow_down"></bl-icon>
          </div>
        </div>
        <div class="popover">
           <div class="options-container">
           <slot>
           </slot>
           <div class="not-found">
             <slot name="search-not-found">
               Not Found
             </slot>
           </div>
         </div>
        </div>
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
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector('.help-text');

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

    const selectInput = <HTMLDivElement>el.shadowRoot?.querySelector('.select-input');
    selectInput?.click();

    expect(el.opened).to.true;
  });
  it('should close select menu', async () => {
    const el = await fixture<BlSelect>(html`<bl-select>button</bl-select>`);

    const selectInput = <HTMLDivElement>el.shadowRoot?.querySelector('.select-input');
    selectInput?.click();
    selectInput?.click();

    expect(el.opened).to.false;
  });
  it('should close select menu when click outside & run validations', async () => {
    const el = await fixture<BlSelect>(html`<body>
      <bl-select required invalid-text="This field is mandatory"></bl-select>
    </body>`);

    const selectInput = <HTMLDivElement>el.shadowRoot?.querySelector('.select-input');
    selectInput?.click();

    const body = <HTMLBodyElement>el.closest('body');
    body.click();

    setTimeout(() => {
      const invalidText = <HTMLParagraphElement>el.shadowRoot?.querySelector('.invalid-text');

      expect(el.opened).to.false;
      expect(el.isInvalid).to.true;
      expect(invalidText).to.exist;
    });
  });
  it('should remove selected options', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const removeAll = <BlIcon>el.shadowRoot?.querySelector('.remove-all');
    setTimeout(() => removeAll?.click());

    const event = await oneEvent(el, 'bl-select');

    expect(removeAll).to.exist;
    expect(event).to.exist;
    expect(event.detail).to.eql([]);
    expect(el.options.length).to.equal(2);
    expect(el.selectedOptions.length).to.equal(0);
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

    const selectOption = <BlSelectOption>el.querySelector('bl-select-option[value="1"]');

    const selectOptionCheckbox = <BlCheckbox>selectOption.shadowRoot?.querySelector('bl-checkbox');
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

    const selectOption = <BlSelectOption>el.querySelector('bl-select-option[value="1"]');
    const selectOptionDiv = <HTMLDivElement>(
      selectOption.shadowRoot?.querySelector('.single-option')
    );

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

    const selectOption = <BlSelectOption>el.querySelector('bl-select-option[value="2"]');
    const selectOptionCheckbox = <BlCheckbox>selectOption.shadowRoot?.querySelector('bl-checkbox');
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
    setTimeout(() => {
      const selectOption = <BlSelectOption>el.querySelector('bl-select-option[selected]');

      expect(selectOption).is.not.exist;
    });
  });

  it('should show search bar when searchBar is true', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple search-bar>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    assert.shadowDom.equal(
      el,
      `<div
          class="select-wrapper selected"
          tabindex="-1"
        >
          <div class="select-input">
            <ul class="selected-options">
              <li>
                Option 2
              </li>
            </ul>
            <div class="actions">
              <bl-button
                class="remove-all"
                icon="close"
                kind="neutral"
                size="small"
                variant="tertiary"
              >
              </bl-button>
              <bl-icon
                class="dropdown-icon open"
                name="arrow_up"
              >
              </bl-icon>
              <bl-icon
                class="closed dropdown-icon"
                name="arrow_down"
              >
              </bl-icon>
            </div>
          </div>
          <div class="popover">
            <div class="search-container">
              <div class="search-wrapper">
                <bl-input
                  class="search-input"
                  placeholder=""
                >
                </bl-input>
                <div class="search-icon">
                  <bl-icon name="search">
                  </bl-icon>
                </div>
              </div>
            </div>
            <div class="options-container">
              <slot>
              </slot>
            </div>
          </div>
        </div>`
    )
  });

  it('should show loading state', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple search-bar search-bar-loading-state>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const blIconLoading = el.shadowRoot?.querySelector('bl-icon.loading');
    expect(blIconLoading).to.exist;
  });


  it('should search input text 2 and show clear button when clear event', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple search-bar>
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector('bl-input.search-input');
    setTimeout(() => searchInput?.dispatchEvent(new CustomEvent('bl-input', {detail: "2"})));

    await oneEvent(searchInput!, 'bl-input');
    const blButtonClear = el.shadowRoot?.querySelector('bl-button.search-input-clear');
    const optionItems = el.options.filter(item => item.style.display === "block")

    expect(optionItems.length).to.equal(1);
    expect(blButtonClear).to.exist;



    setTimeout(() => blButtonClear?.dispatchEvent(new Event('click', {})))
    const ev = await oneEvent(blButtonClear!, 'click');
    expect(ev).to.exist;
  });

  it('should search input text when show notFound', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple search-bar search-not-found-text="searchNotFoundText">
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const searchInput = el.shadowRoot?.querySelector('bl-input.search-input');
    setTimeout(() => searchInput?.dispatchEvent(new CustomEvent('bl-input', {detail: "customEvent"})));

    await oneEvent(searchInput!, 'bl-input');

    const notFoundText = el.shadowRoot?.querySelector(".not-found")
    expect(notFoundText).to.exist;
    expect(notFoundText?.textContent?.trim()).to.equal('searchNotFoundText')
  });

  it('should open select menu with search attribute when detect input focus', async () => {
    const el = await fixture<BlSelect>(html`<bl-select multiple search-bar search-not-found-text="searchNotFoundText">
      <bl-select-option value="1">Option 1</bl-select-option>
      <bl-select-option value="2" selected>Option 2</bl-select-option>
    </bl-select>`);

    const selectInput = <HTMLDivElement>el.shadowRoot?.querySelector('.select-input');
    selectInput?.click();
  });
});
