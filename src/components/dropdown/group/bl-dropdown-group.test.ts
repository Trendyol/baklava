import BlDropdownGroup from './bl-dropdown-group';
import {
    assert,
    fixture,
    html,
  } from '@open-wc/testing';

import type typeOfBlDropdownGroup from './bl-dropdown-group';

describe('bl-dropdown-group', () => {
  it('is defined', () => {
    const el = document.createElement('bl-dropdown-group');
    assert.instanceOf(el, BlDropdownGroup);
  });

  it('should render with the default values', async () => {
    const el = await fixture<typeOfBlDropdownGroup>(html`<bl-dropdown-group></bl-dropdown-group>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="dropdown-group" role="group"><slot></slot></div>
    `
    );
  });
  it('should render with caption', async () => {
    const el = await fixture<typeOfBlDropdownGroup>(html`<bl-dropdown-group caption="caption"></bl-dropdown-group>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="dropdown-group" role="group" aria-labelledby="caption"><span class="caption">caption</span><slot></slot></div>
    `
    );
  });
});
