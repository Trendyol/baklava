import { expect, fixture, html, defineCE, waitUntil } from '@open-wc/testing';
import { LitElement } from 'lit';
import { event, EventDispatcher } from './event';

class EventCustomNameComp extends LitElement {
  @event('gr-test') test: EventDispatcher<string>;

  render() {
    return html`<button @click=${() => this.test('test event')}></button>`;
  }
}

class EventDefaultNameComp extends LitElement {
  @event() test: EventDispatcher<string>;

  render() {
    return html`<button @click=${() => this.test('test')}></button>`;
  }
}

class MyFile {
  constructor(public file: string, public size: number) {}
}

class EventCustomTypeComp extends LitElement {
  @event() uploadDone: EventDispatcher<MyFile>;

  render() {
    const file = new MyFile('abc.js', 21312312);
    return html`<button @click=${() => this.uploadDone(file)}></button>`;
  }
}

describe('event decorator helpers', () => {
  describe('@event decorator', () => {
    it('should decorate component event with default name', async () => {
      const tag = defineCE(EventDefaultNameComp);
      const el = await fixture<EventDefaultNameComp>(`<${tag}></${tag}>`);

      await waitUntil(
        () => el.shadowRoot?.querySelector('button'),
        'Element did not render children'
      );

      el.addEventListener('test', ((testEvent: CustomEvent<string>) => {
        expect(testEvent.detail).equals('test');
      }) as EventListener);

      el.shadowRoot?.querySelector('button')?.click();
    });

    it('should decorate component event with custom name', async () => {
      const tag = defineCE(EventCustomNameComp);
      const el = await fixture<EventCustomNameComp>(`<${tag}></${tag}>`);

      await waitUntil(
        () => el.shadowRoot?.querySelector('button'),
        'Element did not render children'
      );

      el.addEventListener('gr-test', ((testEvent: CustomEvent<string>) => {
        expect(testEvent.detail).equals('test event');
      }) as EventListener);

      el.shadowRoot?.querySelector('button')?.click();
    });

    it('should decorate component event with custom type', async () => {
      const tag = defineCE(EventCustomTypeComp);
      const el = await fixture<EventCustomTypeComp>(`<${tag}></${tag}>`);

      await waitUntil(
        () => el.shadowRoot?.querySelector('button'),
        'Element did not render children'
      );

      el.addEventListener('uploadDone', ((testEvent: CustomEvent<MyFile>) => {
        expect(testEvent.detail).instanceOf(MyFile);
      }) as EventListener);

      el.shadowRoot?.querySelector('button')?.click();
    });
  });
});
