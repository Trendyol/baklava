import { assert, expect, fixture, oneEvent, html, elementUpdated } from '@open-wc/testing';
import BlInput from './bl-input';

describe('bl-input', () => {
  it('is defined', () => {
    const el = document.createElement('bl-input');
    assert.instanceOf(el, BlInput);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="wrapper">
        <div class="input-wrapper">
          <input
            aria-invalid="false"
            id="input"
            type="text"
          >
          <div class="icon">
            <bl-icon
              class="error-icon"
              name="alert"
            >
            </bl-icon>
          </div>
        </div>
        <div class="hint"></div>
      </div>
    `
    );
  });

  it('should set type number', async () => {
    const el = await fixture<BlInput>(html`<bl-input type="number"></bl-input>`);
    expect(el.type).to.equal('number');
    expect(el.shadowRoot?.querySelector('input')?.getAttribute('type')).to.equal('number');
  });

  it('should set type password', async () => {
    const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
    expect(el.type).to.equal('password');
    expect(el.shadowRoot?.querySelector('input')?.getAttribute('type')).to.equal('password');
  });

  it('should set label', async () => {
    const labelText = 'Some Label';
    const el = await fixture<BlInput>(html`<bl-input label="${labelText}"></bl-input>`);
    const label = el.shadowRoot?.querySelector('label');
    expect(label).to.exist;
    expect(label?.innerText).to.equal(labelText);
  });

  it('should set help text', async () => {
    const helpText = 'Some help text';
    const el = await fixture<BlInput>(html`<bl-input help-text="${helpText}"></bl-input>`);
    const helpMessage = <HTMLParagraphElement>el.shadowRoot?.querySelector('.help-text');
    expect(helpMessage).to.exist;
    expect(helpMessage?.innerText).to.equal(helpText);
  });

  describe('input with icon', () => {
    it('should show custom icon', async () => {
      const el = await fixture<BlInput>(html`<bl-input icon="info"></bl-input>`);
      const customIcon = el.shadowRoot?.querySelector('bl-icon.custom-icon');
      expect(customIcon).to.exist;
      expect(customIcon?.getAttribute('name')).to.equal('info');
    });

    it('should show reveal button on password type', async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const revealButton = el.shadowRoot?.querySelector('bl-button.reveal-button:not(.hide)');
      expect(revealButton).to.exist;
      expect(revealButton?.getAttribute('icon')).to.equal('eye_on');
    });

    it('should toggle reveal icon on click', async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const revealButton = el?.shadowRoot?.querySelector(
        'bl-button.reveal-button:not(.hide)'
      ) as HTMLElement | null;
      expect(revealButton).to.exist;
      expect(revealButton?.getAttribute('icon')).to.eq('eye_on');

      revealButton?.click();
      await elementUpdated(el);

      expect(el?.shadowRoot?.querySelector('bl-button.reveal-button:not(.hide)')?.getAttribute('icon')).to.eq('eye_off');
    });
  });

  describe('validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);

      expect(el.validity.valid).to.be.true;
    });

    it('should be invalid with required attribute', async () => {
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);

      expect(el.validity.valid).to.be.false;
    });

    it('should set invalid text', async () => {
      const errorMessage = 'This field is mandatory';
      const el = await fixture<BlInput>(
        html`<bl-input required invalid-text="${errorMessage}"></bl-input>`
      );

      el.reportValidity();

      await elementUpdated(el);

      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector('.invalid-text')
      );

      expect(el.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
      expect(errorMessageElement?.innerText).to.equal(errorMessage);
    });

    it('should show error when reportValidity method called', async () => {
      const el = await fixture<BlInput>(html`<bl-input required></bl-input>`);
      el.reportValidity();

      await elementUpdated(el);

      expect(el.validity.valid).to.be.false;
      const errorMessageElement = <HTMLParagraphElement>(
        el.shadowRoot?.querySelector('.invalid-text')
      );
      expect(errorMessageElement).to.visible;
    });
  });

  describe('events', () => {
    it('should fire bl-input event when user enters a value', async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      const input = el.shadowRoot?.querySelector('input');

      if (input) {
        input.value = 'some value';
      }

      setTimeout(() => input?.dispatchEvent(new Event('input')));

      const ev = await oneEvent(el, 'bl-input');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });

    it('should toggle input type on eye icon click', async () => {
      const el = await fixture<BlInput>(html`<bl-input type="password"></bl-input>`);
      const input = el?.shadowRoot?.querySelector('input');
      const revealButton = el?.shadowRoot?.querySelector(
        'bl-button.reveal-button:not(.hide)'
      ) as HTMLElement | null;

      expect(input?.type).to.equal('password');
      expect(revealButton).to.exist;

      revealButton?.click();
      await elementUpdated(el);

      expect(input?.type).to.equal('text');
    });

    it('should fire bl-input event when input value changes', async () => {
      const el = await fixture<BlInput>(html`<bl-input></bl-input>`);
      const input = el.shadowRoot?.querySelector('input');

      if (input) {
        input.value = 'some value';
      }

      setTimeout(() => input?.dispatchEvent(new Event('change')));

      const ev = await oneEvent(el, 'bl-change');
      expect(ev).to.exist;
      expect(ev.detail).to.be.equal('some value');
    });
  });

  describe('form integration', () => {
    it('should show errors when parent form is submitted', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-input required></bl-input>
      </form>`);

      const blInput = form.querySelector<BlInput>('bl-input');

      form.addEventListener('submit', e => e.preventDefault());

      form.dispatchEvent(new SubmitEvent('submit', {cancelable: true}));

      await elementUpdated(form);

      const errorMessageElement = <HTMLParagraphElement>(
        blInput?.shadowRoot?.querySelector('.invalid-text')
      );

      expect(blInput?.validity.valid).to.be.false;

      expect(errorMessageElement).to.exist;
    });

    it('should submit parent form when pressed Enter key', async () => {
      const form = await fixture<HTMLFormElement>(html`<form novalidate>
        <bl-input name="user" value="name"></bl-input>
        <button type="submit">Submit</button>
      </form>`);

      const blInput = form.querySelector<BlInput>('bl-input');

      await elementUpdated(form);

      const submitEvent = new Promise(resolve => {
        function listener(ev: SubmitEvent) {
          ev.preventDefault();
          resolve(ev);
          form.removeEventListener('submit', listener);
        }
        form.addEventListener('submit', listener);
      });

      const enterEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
        cancelable: true
      });

      blInput?.dispatchEvent(enterEvent);

      const ev = await submitEvent;
      expect(ev).to.exist;
    });
  });
});
