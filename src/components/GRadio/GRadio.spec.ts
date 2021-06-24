import { mount } from '@vue/test-utils';
import GRadio from './';

describe('Radio', () => {
  let wrapper: any;
  let listenersStub = {
    input: () => {
    },
    mouseover: () => {
    },
  };
  const renderWrapper = (options?: any) => {
    wrapper = mount(GRadio, {
      propsData: {
        name: 'testName',
        value: 'Test',
        val: 'Test',
      },
      listeners: listenersStub,
      ...options,
    });
  };

  beforeEach(() => {
    renderWrapper();
  });

  it('should match with snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match with snapshot when disabled attribute is passed', function () {
    renderWrapper({
      attrs: {
        disabled: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should return true on isChecked if value and val is equal', () => {
    expect(
      wrapper.vm.isChecked
    ).toBe(true);
  });

  it('should return false on isChecked if value and val is not equal', async () => {
    wrapper.setProps({
      value: 'Test 2',
    });
    await wrapper.vm.$nextTick();

    expect(
      wrapper.vm.isChecked
    ).toBe(false);
  });

  it('should extract the input listener from listeners', () => {
    expect(
      Object.keys(wrapper.vm.listeners)
    ).toEqual(['mouseover']);
  });

  it('should emit input event if disabled is false and value and val is not equal', async () => {
    renderWrapper({
      attrs: {
        disabled: false,
      },
    });

    wrapper.setProps({
      value: 'Test 2',
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.click();

    expect(wrapper.emitted().input[0][0]).toEqual(wrapper.vm.val);
  });

  it('should not emit input event if disabled is true and value and val is not equal', () => {
    renderWrapper({
      attrs: {
        disabled: true,
      },
    });

    wrapper.setProps({
      value: 'Test 2',
    });

    wrapper.vm.click();

    expect(wrapper.emitted().input).toEqual(undefined);
  });

  it('should not emit input event if disabled is false and value and val is equal', () => {
    renderWrapper({
      attrs: {
        disabled: false,
      },
    });

    wrapper.vm.click();

    expect(wrapper.emitted().input).toEqual(undefined);
  });
});
