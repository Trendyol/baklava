import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import BlCheckboxGroup from './bl-checkbox-group';
import './checkbox/bl-checkbox';

describe('bl-checkbox-group', () => {
  it('should be defined checkbox group instance', () => {
    //when
    const el = document.createElement('bl-checkbox-group');

    //then
    expect(el).instanceOf(BlCheckboxGroup);
  });

  it('should be rendered with default values', async () => {
    //when
    const el = await fixture<BlCheckboxGroup>(
      html`<bl-checkbox-group label="Choose sports you like">
        <bl-checkbox value="basketball">Basketball</bl-checkbox>
        <bl-checkbox value="football">Football</bl-checkbox>
      </bl-checkbox-group>`
    );

    //then
    expect(el).shadowDom.equal(
      `
      <fieldset role="group" aria-labelledby="label" aria-required="false">
        <legend id="label">Choose sports you like</legend>
        <div class="options">
          <slot></slot>
        </div>
      </fieldset>
      `
    );
  });

  it('should set correct options checked with a value', async () => {
    //when
    const el = await fixture<BlCheckboxGroup>(
      html`<bl-checkbox-group label="Choose sports you like" .value=${['basketball', 'tennis']}>
        <bl-checkbox value="basketball">Basketball</bl-checkbox>
        <bl-checkbox value="football">Football</bl-checkbox>
        <bl-checkbox value="tennis">Tennis</bl-checkbox>
      </bl-checkbox-group>`
    );

    //then
    expect(el.options[0].checked).to.be.true;
    expect(el.options[1].checked).to.be.false;
    expect(el.options[2].checked).to.be.true;
  });

  describe('keyboard navigation', () => {
    it('should focus first option with tab key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[0]);
    });

    it('should focus next option with right arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'ArrowRight',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[1]);
    });

    it('should focus next option with down arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'ArrowDown',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[1]);
    });

    it('should focus previous option with up arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'ArrowDown',
      });
      await sendKeys({
        press: 'ArrowUp',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[0]);
    });

    it('should focus previous option with left arrow key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'ArrowRight',
      });
      await sendKeys({
        press: 'ArrowLeft',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[0]);
    });

    it('should select current option with space key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: ' ',
      });

      //then
      expect(checkboxGroup?.value.length).to.equal(1);
      expect(checkboxGroup?.value[0]).to.equal('basketball');
    });

    it('should focus the next option with Tab key & previous option with Shift+Tab key', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Tab',
      });
      // Shift+Tab
      await sendKeys({
        down: 'Shift',
      });
      await sendKeys({
        press: 'Tab',
      });

      await sendKeys({
        up: 'Shift',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[0]);
    });

    it('should focus out of the group with tab key when the last element is active', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'Tab',
      });

      //then
      expect(document.activeElement).to.equal(el.querySelector<HTMLInputElement>('#nextinput'));
    });

    it('should not respond any other keys', async () => {
      //when
      const el = await fixture(
        html`<div>
          <input id="previnput" />
          <bl-checkbox-group label="Choose sports you like">
            <bl-checkbox value="basketball">Basketball</bl-checkbox>
            <bl-checkbox value="football">Football</bl-checkbox>
            <bl-checkbox value="tennis">Tennis</bl-checkbox>
          </bl-checkbox-group>
          ><input id="nextinput" />
        </div>`
      );

      await elementUpdated(el);

      el.querySelector<HTMLInputElement>('#previnput')?.focus();

      const checkboxGroup = el.querySelector('bl-checkbox-group');

      //given
      await sendKeys({
        press: 'Tab',
      });
      await sendKeys({
        press: 'A',
      });

      //then
      expect(document.activeElement).to.equal(checkboxGroup?.options[0]);
    });
  });
});
