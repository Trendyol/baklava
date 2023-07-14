import { assert, elementUpdated, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlTextarea from './bl-textarea';

describe('bl-textarea', () => {
  it('is defined', () => {
    const el = document.createElement('bl-textarea');
    assert.instanceOf(el, BlTextarea);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea label="Label"></bl-textarea>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="wrapper" style="--row-count:4;">
          <label for="input">Label</label>
          <fieldset class="input-wrapper">
            <legend><span>Label</span></legend>
            <textarea
            id="input"
            name=""
            rows="4"
            spellcheck="false"
            >
            </textarea>
          </fieldset>
          <div class="hint"></div>
        </div>
      `,
      { ignoreAttributes: ['for', 'id'] }
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
    const el = await fixture<BlTextarea>(
      html`<bl-textarea value="abcde" character-counter></bl-textarea>`
    );
    const characterCounter = <HTMLParagraphElement>el.shadowRoot?.querySelector('.counter-text');

    expect(characterCounter?.innerText).to.equal('5');
  });

  it('should set character counter with maxlength', async () => {
    const el = await fixture<BlTextarea>(
      html`<bl-textarea value="abcde" character-counter maxlength="10"></bl-textarea>`
    );
    const characterCounter = <HTMLParagraphElement>el.shadowRoot?.querySelector('.counter-text');

    expect(characterCounter?.innerText).to.equal('5/10');
  });

  it('should increase rows attribute dynamically', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea rows="1"></bl-textarea>`);
    el.setAttribute('rows', '2');

    expect(el?.getAttribute('rows')).to.equal('2');
  });

  it('should decrease rows attribute dynamically', async () => {
    const el = await fixture<BlTextarea>(html`<bl-textarea rows="2"></bl-textarea>`);
    el.setAttribute('rows', '1');

    expect(el?.getAttribute('rows')).to.equal('1');
  });

  it('should expand when input text is longer than one row', async () => {
    const el = await fixture<BlTextarea>(
      html`<bl-textarea
        value="some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text some dummy text"
        expand
        rows="1"
      ></bl-textarea>`
    );

    const height = getComputedStyle(el.validationTarget).height;

    expect(height).to.equal(`${el.validationTarget.scrollHeight}px`);
  });

  it('should have same heights if they have same max-rows', async () => {
    const longText = 'some dummy text some dummy text some dummy text some dummy text';
    const longerText =
      'some dummy text some dummy text some dummy text some dummy text' +
      ' some dummy text some dummy text some dummy text some dummy text' +
      'some dummy text some dummy text some dummy text some dummy text';

    const el = await fixture<BlTextarea>(
      html`<bl-textarea value="${longText}" expand rows="1" max-rows="3"></bl-textarea>`
    );
    const el2 = await fixture<BlTextarea>(
      html`<bl-textarea value="${longerText}" expand rows="1" max-rows="3"></bl-textarea>`
    );

    await elementUpdated(el);
    await elementUpdated(el2);

    const height = getComputedStyle(el.validationTarget).height;
    const heightThreeRows = getComputedStyle(el2.validationTarget).height;

    expect(height).to.equal('56px');
    expect(heightThreeRows).to.equal('56px');
  });

  describe('validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      expect(el.validity.valid).to.be.true;
    });
    it('should be invalid with required attribute', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea required></bl-textarea>`);
      expect(el.validity.valid).to.be.false;
    });
    it('should be valid with required when value is filled', async () => {
      const el = await fixture<BlTextarea>(
        html`<bl-textarea value="some-value" required></bl-textarea>`
      );
      expect(el.validity.valid).to.be.true;
    });
    it('should set custom invalid text', async () => {
      const customErrorMsg = 'This field is mandatory';
      const el = await fixture<BlTextarea>(
        html`<bl-textarea
          invalid-text="${customErrorMsg}"
          maxlength="5"
          value="more than 5 characters"
        ></bl-textarea>`
      );

      el.reportValidity();

      await elementUpdated(el);

      const errorMsgElement = <HTMLParagraphElement>el.shadowRoot?.querySelector('.invalid-text');

      expect(el.validity.valid).to.be.false;

      expect(errorMsgElement).to.exist;
      expect(errorMsgElement.innerText).to.equal(customErrorMsg);
    });
  });

  describe('events', () => {
    it('should fire bl-input event when user enters a value', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      if (textarea) textarea.value = 'some value';

      setTimeout(() => textarea?.dispatchEvent(new Event('input')));

      const ev = await oneEvent(el, 'bl-input');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });
    it('should fire bl-input event when input value changes', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      if (textarea) textarea.value = 'some value';

      setTimeout(() => textarea?.dispatchEvent(new Event('change')));

      const ev = await oneEvent(el, 'bl-change');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });
    it('should fire bl-invalid event when input value not correct', async () => {
      const el = await fixture<BlTextarea>(html`<bl-textarea maxlength="5"></bl-textarea>`);
      const textarea = el.shadowRoot?.querySelector('textarea');

      await textarea?.focus();

      await sendKeys({
        type: 'a text more than five characters',
      });

      setTimeout(() => textarea?.dispatchEvent(new Event('invalid')));

      const ev = await oneEvent(el, 'bl-invalid');
      expect(ev).to.exist;
      expect(ev.detail['tooLong']).to.equal(true);
    });
  });
  describe('form integration', () => {
    it('should show errors when parent form is submitted', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-textarea required></bl-textarea>
      </form>`);
      const blTextarea = form.querySelector<BlTextarea>('bl-textarea');

      form.addEventListener('submit', e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent('submit', { cancelable: true }));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blTextarea?.shadowRoot?.querySelector('.invalid-text')
      );

      expect(blTextarea?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });
  });
});
