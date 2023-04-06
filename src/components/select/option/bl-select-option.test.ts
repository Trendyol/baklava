import { assert, elementUpdated, fixture, expect, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlSelectOption from './bl-select-option';

describe('bl-select', () => {
  it('is defined', () => {
    const el = document.createElement('bl-select-option');
    assert.instanceOf(el, BlSelectOption);
  });

  describe('keyboard navigation', () => {
    it('should get focus', async () => {
      //when
      const el = await fixture<BlSelectOption>(
        html`<bl-select-option value="basketball">Basketball</bl-select-option>`
      );

      await elementUpdated(el);

      //given
      el.focus();

      await elementUpdated(el);

      //then
      expect(document.activeElement).to.equal(el);
    });

    it('should select with Space key', async () => {
      //when
      const el = await fixture<BlSelectOption>(
        html`<bl-select-option value="basketball">Basketball</bl-select-option>`
      );

      await elementUpdated(el);

      //given
      el.focus();

      await elementUpdated(el);

      sendKeys({
        press: 'Space',
      });

      //then
      const event = await oneEvent(el, 'bl-select-option');

      expect(event).to.exist;
      expect(event.detail).to.equal('basketball');
    });
  });
});
