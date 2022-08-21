import { assert, fixture, html, elementUpdated, expect } from '@open-wc/testing';
import BlCheckboxGroup from './bl-checkbox-group';

describe('bl-checkbox', () => {
  it('should be defined checkbox group instance', () => {
    const el = document.createElement('bl-checkbox-group');
    assert.instanceOf(el, BlCheckboxGroup);
  });

  it('should be rendered with default values', async () => {
    const el = await fixture(html`<bl-checkbox-group></bl-checkbox-group>`);

    assert.shadowDom.equal(
      el,
      `
      <div class="container">
        <bl-checkbox
            checked
            id="parent-checkbox"
            indeterminateAllowed
            label>
        </bl-checkbox>
        <div class="container">
          <slot></slot>
        </div>
      </div>
      `
    );
  });

  it('should be rendered with correct label attribute', async () => {
    const el = await fixture(html`<bl-checkbox-group label="test label"></bl-checkbox-group>`);

    expect(el.shadowRoot?.querySelector('bl-checkbox')).to.exist;
    expect(el.getAttribute('label')).to.eq('test label');
  });

  it('should be rendered with correct label attribute when label attribute was changed', async () => {
    const el = await fixture(html`<bl-checkbox-group label="test label"></bl-checkbox-group>`);
    el.setAttribute('label', 'new test label');

    await elementUpdated(el);

    expect(el.getAttribute('label')).to.eq('new test label');

    const blCheckboxEl = el.shadowRoot?.querySelector('bl-checkbox');
    expect(blCheckboxEl?.getAttribute('label')).to.eq('new test label');
  });

  it('should be rendered with indeterminate icon when slot checkbox states are proper', async () => {
    const el = await fixture(
      html`
        <bl-checkbox-group label="test label">
          <bl-checkbox checked label="child 1"></bl-checkbox>
          <bl-checkbox label="child 2"></bl-checkbox>
          <bl-checkbox label="child 3"></bl-checkbox>
        </bl-checkbox-group>
        `
    );
    const parentCheckboxEl = el.shadowRoot?.querySelector('#parent-checkbox');
    const blIconEl = parentCheckboxEl?.shadowRoot?.querySelector('bl-icon');

    expect(blIconEl).to.have.attribute('name', 'minus');
  });
  it('should be rendered with false indeterminate state when all slot checkboxes are unchecked', async () => {
    const el = await fixture(
      html`
      <bl-checkbox-group label="test label">
        <bl-checkbox label="child 1"></bl-checkbox>
        <bl-checkbox label="child 2"></bl-checkbox>
        <bl-checkbox label="child 3"></bl-checkbox>
      </bl-checkbox-group>
        `
    );
    const parentCheckboxEl = el.shadowRoot?.querySelector('#parent-checkbox');

    expect(parentCheckboxEl).not.to.have.attribute('checked');
    expect((parentCheckboxEl as HTMLInputElement).indeterminate).to.eq(false);
  });

  describe('attributes', () => {
    it('should be rendered with indeterminateAllowed attribute', async () => {
      const el = await fixture(html`<bl-checkbox-group></bl-checkbox-group>`);
      const parentCheckboxEl = el.shadowRoot?.querySelector('#parent-checkbox');

      expect(parentCheckboxEl).to.have.attribute('indeterminateAllowed');
    });

    it('should be rendered with indeterminate attribute when slot checkbox states are proper', async () => {
      const el = await fixture(
        html`
          <bl-checkbox-group label="test label">
              <bl-checkbox checked label="child 1"></bl-checkbox>
              <bl-checkbox label="child 2"></bl-checkbox>
              <bl-checkbox label="child 3"></bl-checkbox>
          </bl-checkbox-group>
        `
      );

      const parentCheckboxEl = el.shadowRoot?.querySelector('#parent-checkbox');
      expect(parentCheckboxEl).to.have.attribute('indeterminate');
    });
  });

  // FIXME when click parent checkbox in bl-checkbox-group slot children's state not changing
  //
  // it('should all child checkboxes be checked when parent checkbox clicked', async () => {
  //   const el = await fixture(
  //     html`
  //       <bl-checkbox-group label="test label">
  //         <bl-checkbox label="child 1"></bl-checkbox>
  //         <bl-checkbox label="child 2"></bl-checkbox>
  //         <bl-checkbox label="child 3"></bl-checkbox>
  //       </bl-checkbox-group>
  //       `
  //   );
  //   const parentCheckboxEl = el.shadowRoot?.querySelector('#parent-checkbox');
  //   const inputEl = parentCheckboxEl?.shadowRoot?.querySelector('label');

  //   setTimeout(() => (inputEl as HTMLLabelElement).click());
  //   await elementUpdated(el);

  //   expect(el?._slottedChildren[0]).to.have.attribute('checked');
  // });
});
