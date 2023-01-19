import {assert, elementUpdated, expect, fixture, html, oneEvent} from "@open-wc/testing";
import BlTextarea from "./bl-textarea";
import {sendKeys} from "@web/test-runner-commands";

describe('bl-textarea', () => {
  it('is defined', () => {
    const el = document.createElement('bl-textarea');
    assert.instanceOf(el, BlTextarea);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="wrapper" style="--row-count:4;">
        <textarea
        id="bl-text-area"
        name=""
        rows="4"
        >
        </textarea>
        </div>
        <div hidden><slot></slot></div>
        <div class="brief"></div>
      `,
      {
        ignoreAttributes:['style']
      }
    );
  });

  it('should set label', async () => {
    const labelText = 'Some Label';
    const el = await fixture<BlTextarea>(html`<bl-textarea label="${labelText}"></bl-textarea>`);
    const label = el.shadowRoot?.querySelector('label');
    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });

  it('should set help text', async () => {
    const helpText = 'Some help text';
    const el = await fixture<BlTextarea>(html`<bl-textarea help-text="${helpText}"></bl-textarea>`);
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector('.help-text');
    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  it('should set character counter', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea value="abcde" character-counter maxlength="10"></bl-textarea>`);
    const characterCounter = <HTMLParagraphElement>el.shadowRoot?.querySelector('.counter-text');

    expect(characterCounter?.innerText).to.equal("5/10");
  });

  it('should expand when input text is longer than one row', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea value="some dummy text" expand rows="1"></bl-textarea>`);
    const textarea = el.shadowRoot?.querySelector('textarea');

    await textarea?.focus();

    await sendKeys({
      type: 'some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text'
    });

    const height = getComputedStyle(el.validationTarget).height;

    expect(height).to.equal(`${el.validationTarget.scrollHeight}px`);
  });

  it('should have same heights if they have same max-rows', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea value="some dummy text" expand rows="1" max-row="3"></bl-textarea>`);
    const el2 = await fixture<BlTextarea>(html`<bl-textarea value="some dummy text" expand rows="1" max-row="3"></bl-textarea>`);
    const textarea = el.shadowRoot?.querySelector('textarea');
    const textarea2 = el2.shadowRoot?.querySelector('textarea');

    await textarea?.focus();

    await sendKeys({
      type: 'some dummy text some dummy text some dummy text some dummy text' +
        ' some dummy text some dummy text some dummy text some dummy text' +
        'some dummy text some dummy text some dummy text some dummy text'
    });

    await textarea2?.focus();

    await sendKeys({
      type: 'some dummy text some dummy text some dummy text some dummy text'
    });

    const height = getComputedStyle(el.validationTarget).height;
    const heightThreeRows = getComputedStyle(el2.validationTarget).height;

    expect(height).to.equal(heightThreeRows);
  });

  describe('validation', () => {
    it('should be valid by default',async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      expect(el.validity.valid).to.be.true;
    });
    it('should be invalid with required attribute',async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);
      expect(el.validity.valid).to.be.false;
    });
    it('should be valid with required when value is filled',async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea value="some-value" required></bl-textarea>`);
      expect(el.validity.valid).to.be.true;
    });
    it('should be valid with required when slot is filled',async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea required>some-value</bl-textarea>`);
      expect(el.validity.valid).to.be.true;
    });
    it('should set custom invalid text', async () => {
      const customErrorMsg = 'This field is mandatory';
      const el = await fixture<BlTextarea>(
        html`<bl-textarea invalid-text="${customErrorMsg}" maxlength="5" value="more than 5 characters"></bl-textarea>`
      );

      el.reportValidity();

      await elementUpdated(el);

      const errorMsgElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector('.invalid-text')
      );

      expect(el.validity.valid).to.be.false;

      expect(errorMsgElement).to.exist;
      expect(errorMsgElement.innerText).to.equal(customErrorMsg);
    });
  });

  describe('events', () => {
    it('should fire bl-input event when user enters a value', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      if (textarea)
        textarea.value = 'some value';

      setTimeout(() => textarea?.dispatchEvent(new Event('input')));

      const ev = await oneEvent(el,'bl-input');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });
    it('should fire bl-input event when input value changes', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      if (textarea)
        textarea.value = 'some value';

      setTimeout(() => textarea?.dispatchEvent(new Event('change')));

      const ev = await oneEvent(el,'bl-change');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });
    it('should fire bl-invalid event when input value not correct', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="5"></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      await textarea?.focus();

      await sendKeys({
        type: 'a text more than five characters'
      });

      setTimeout(() => textarea?.dispatchEvent(new Event('invalid')));

      const ev = await oneEvent(el,'bl-invalid');
      expect(ev).to.exist;
      expect(ev.detail['rangeOverflow'] ).to.equal(true);
    });
  });
  describe('form integration', () => {
    it('should show errors when parent form is submitted', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-textarea required></bl-textarea>
      </form>`);
      const blTextarea = form.querySelector<BlTextarea>('bl-textarea');

      form.addEventListener('submit', e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent('submit', {cancelable:true}));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(blTextarea?.shadowRoot?.querySelector('.invalid-text'));

      expect(blTextarea?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });
  });
})
