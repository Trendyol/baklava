import { oneEvent, fixture, html, expect } from '@open-wc/testing';
import BlTab from './bl-tab';
import BlIcon from '../../icon/bl-icon';
import '../../icon/bl-icon';

describe('bl-tab', function () {
  it('should defined', async function () {
    const el = document.createElement('bl-tab');
    expect(el).to.be.an.instanceof(BlTab);
  });

  it('renders with default values', async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test"></bl-tab>`);
    const expected = `
      <button
        role="tab"
        class="container"
      >
        <div class="title-container">
          <div class="title">
            <slot></slot>
          </div>
        </div>
      </button>
    `;
    expect(el).to.be.shadowDom.equal(expected);
  });

  it('renders with a badge', async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test" badge="New"></bl-tab>`);
    const badgeEl = el.shadowRoot?.querySelector('bl-badge');
    expect(badgeEl).is.exist;
  });

  it('renders with a help text', async () => {
    const helpText = 'Help Me!';
    const el = await fixture<BlTab>(html` <bl-tab name="test" help-text=${helpText}></bl-tab>`);
    const helpContainer = el.shadowRoot?.querySelector<HTMLDivElement>('.help-container');
    expect(helpContainer?.innerText).to.equal(helpText);
  });

  it('renders with icon', async () => {
    const icon = 'heart';
    const el = await fixture<BlTab>(html` <bl-tab name="test" icon="${icon}"></bl-tab>`);
    const iconEl = el.shadowRoot?.querySelector<BlIcon>('bl-icon');
    expect(iconEl).is.exist;
  });

  it('should create custom event on handle click function', async () => {
    const el = await fixture<BlTab>(html` <bl-tab name="test"></bl-tab>`);
    const clickButton = () => el.shadowRoot?.querySelector('button')?.click();
    setTimeout(clickButton);
    const listener = await oneEvent(el, 'bl-tab-selected');
    const { detail } = await listener;

    expect(detail).is.equal('test');
  });

  it('should set caption', async function () {
    const el = await fixture<BlTab>(html`<bl-tab caption="test caption"></bl-tab>`);
    const caption = el.shadowRoot?.querySelector('.caption');

    expect(caption).is.exist;
  });

  it('should has correct panel name when name is given', async function () {
    const el = await fixture<BlTab>(html`<bl-tab name="test-tab"></bl-tab>`);
    expect(el.panel).to.equal('test-tab');
  });
});
