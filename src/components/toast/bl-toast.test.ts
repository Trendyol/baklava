import { assert, elementUpdated, expect, fixture, html } from '@open-wc/testing';
import BlToast from './bl-toast';
import typeOfBlToast from '../toast/bl-toast';

describe('bl-toast', () => {
  it('should be defined progress indicator instance', () => {
    //when
    const el = document.createElement('bl-toast');

    //then
    assert.instanceOf(el, BlToast);
  });

  it('should be rendered with default values', async () => {
    //when
    const el = await fixture<typeOfBlToast>(html`<bl-toast></bl-toast>`);

    //then
    assert.shadowDom.equal(
      el,
      `
      <div class="toast">
        <div class="wrapper">
          <div class="content">
            <bl-icon class="icon" name='info'></bl-icon>
            <div class="text-content">
              <span class="description">
                <slot></slot>
              </span>
            </div>
          </div>
        </div>
        <bl-progress-indicator
          translucent
          noBorderRadius
          value=100
        ></bl-progress-indicator>
      </div>
      `
    );
  });

  it('should have correct default values', async () => {
    //when
    const el = await fixture<typeOfBlToast>(html`<bl-toast></bl-toast>`);

    //then
    expect(el.variant).to.equal('info');
    expect(el.position).to.equal('top-right');
    expect(el.closed).to.equal(false);
    expect(el.description).to.equal(undefined);
    expect(el.innerHTML).to.equal('');
  });

  it('should be rendered with correct variant,position,description attributes', async () => {
    //when
    const el = await fixture<typeOfBlToast>(
      html`<bl-toast variant="danger" position="bottom-left">description</bl-toast>`
    );

    //then
    expect(el.variant).to.equal('danger');
    expect(el.position).to.equal('bottom-left');
    expect(el.innerHTML).to.equal('description');
  });

  it('should be rendered with correct close attribute', async () => {
    //when
    const el = await fixture<typeOfBlToast>(html`<bl-toast closed>description</bl-toast>`);

    //then
    expect(el.closed).to.equal(true);
  });

  it('should be rendered with correct variant (success),position,description attributes when variant,position,description attributes was changed', async () => {
    //given
    const el = await fixture<typeOfBlToast>(
      html`<bl-toast variant="danger" position="bottom-left">old text</bl-toast>`
    );
    el.setAttribute('variant', 'success');
    el.setAttribute('position', 'bottom-right');
    el.setAttribute('description', 'new text');
    el.innerHTML = 'new text';

    //when
    await elementUpdated(el);

    //then
    expect(el.variant).to.equal('success');
    expect(el.position).to.equal('bottom-right');
    expect(el.closed).to.equal(false);
    expect(el.description).to.equal('new text');
    expect(el.innerHTML).to.equal('new text');
  });

  it('should be rendered with correct variant (warning),position,description attributes when variant,position,description attributes was changed', async () => {
    //given
    const el = await fixture<typeOfBlToast>(
      html`<bl-toast variant="danger" position="bottom-left">old text</bl-toast>`
    );
    el.setAttribute('variant', 'warning');
    el.setAttribute('position', 'bottom-right');
    el.setAttribute('description', 'new text');
    el.innerHTML = 'new text';

    //when
    await elementUpdated(el);

    //then
    expect(el.variant).to.equal('warning');
    expect(el.position).to.equal('bottom-right');
    expect(el.closed).to.equal(false);
    expect(el.description).to.equal('new text');
    expect(el.innerHTML).to.equal('new text');
  });
});
