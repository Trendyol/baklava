import { expect, fixture, html, defineCE, waitUntil } from '@open-wc/testing';
import { LitElement } from 'lit';
import { event, EventDispatcher } from './event';

class TestComp extends LitElement {
  @event('gr-test') test: EventDispatcher<string>;

  someMethod() {
    this.test.dispatch('test event');
  }

  render() {
    return html`<button @click=${this.someMethod}></button>`;
  }
}

describe('event decorator helpers', () => {
  describe('@event decorator', () => {
    it('should decorate component event', async done => {
      const tag = defineCE(TestComp);
      const el = await fixture<TestComp>(`<${tag}></${tag}>`);

      await waitUntil(
        () => el.shadowRoot?.querySelector('button'),
        'Element did not render children'
      );

      el.addEventListener('test', event => {
        expect(event).equals('test event');
        done();
      });

      el.shadowRoot?.querySelector('button')?.click();
    });
  });
});
