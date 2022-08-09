import { expect, fixture, html } from '@open-wc/testing';
import BlTabPanel from './bl-tab-panel';

describe('bl-tab-panel', function () {
  it('should defined', function () {
    const el = document.createElement('bl-tab-panel');
    expect(el).to.be.instanceof(BlTabPanel);
  });

  it('should render with default values', async function () {
    const el = await fixture<BlTabPanel>(html` <bl-tab-panel tab="test-panel"></bl-tab-panel>`);
    const expected = `
      <slot></slot>
    `;
    expect(el).to.be.shadowDom.equal(expected);
  });

  it('should set name property', async function () {
    const name = 'test-panel';
    const el = await fixture<BlTabPanel>(html` <bl-tab-panel tab="${name}"></bl-tab-panel>`);
    expect(el.tab).to.be.equal(name);
  });
});
