import { mount } from '@vue/test-utils';
import GCheckbox from '.';

describe('Checkbox', () => {
  let wrapper: any;
  let listeners: any;

  beforeEach(() => {
    listeners = {
      change: () => {},
      input: () => {},
      click: () => {},
    };
    wrapper = mount(GCheckbox, {
      propsData: {
        value: 'test',
      },
      listeners,
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show icon-check if checkbox is checked', async () => {
    wrapper.find('.-input').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.feather--check').exists()).toBe(true);
  });

  it('should have disabled class if disabled attribute is given', async () => {
    wrapper.setProps({
      disabled: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.-inner').classes('-disabled')).toBe(true);
  });

  it('should extract change and input event from $listeners', () => {
    const reducedListeners = wrapper.vm.listeners;

    expect(Object.keys(reducedListeners)).toEqual(['click']);
  });

  it('should emit change and input events on click checkbox', () => {
    wrapper.find('.-input').trigger('click');

    const { checked, event, value } = wrapper.emitted().change[0][0];
    const inputValue = wrapper.emitted().input[0][0];

    expect(checked).toEqual(true);
    expect(value).toEqual('test');
    expect(event.type).toEqual('change');
    expect(inputValue).toEqual(true);
  });

  it('should push given value to v-model array options if Array is given with v-model', async () => {
    wrapper.setProps({
      modelValue: [],
    });
    await wrapper.vm.$nextTick();

    wrapper.find('.-input').trigger('click');

    const { checked, event, value } = wrapper.emitted().change[0][0];
    const inputValue = wrapper.emitted().input[0][0];

    expect(checked).toEqual(true);
    expect(value).toEqual('test');
    expect(event.type).toEqual('change');
    expect(inputValue).toEqual(['test']);
  });

  it('should remove given value from v-model array options if Array is given with v-model', async () => {
    wrapper.setProps({
      modelValue: ['test', 'test2'],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.toggleInput({ target: { checked: false } });

    const inputValue = wrapper.emitted().input[0][0];

    expect(inputValue).toEqual(['test2']);
  });

  it('should remove given string value from v-model array options if Array is given with v-model', async () => {
    wrapper = mount(GCheckbox, {
      propsData: {
        value: 'test1',
        modelValue: ['test1', 'test2', 'test3'],
      },
      listeners,
    });

    wrapper.vm.toggleInput({ target: { checked: false } });

    wrapper.setProps({
      value: 'test2',
      modelValue: wrapper.emitted().input[0][0],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.toggleInput({ target: { checked: false } });

    wrapper.setProps({
      modelValue: wrapper.emitted().input[1][0],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.modelValue).toEqual(['test3']);
  });

  it('should remove given object value from v-model array options if Array is given with v-model', async () => {
    wrapper = mount(GCheckbox, {
      propsData: {
        value: { id: 1 },
        modelValue: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      listeners,
    });

    wrapper.vm.toggleInput({ target: { checked: false } });

    wrapper.setProps({
      value: { id: 2 },
      modelValue: wrapper.emitted().input[0][0],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.toggleInput({ target: { checked: false } });

    wrapper.setProps({
      modelValue: wrapper.emitted().input[1][0],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.modelValue).toEqual([{ id: 3 }]);
  });

  it('should set true to isChecked if initial value is true', async () => {
    wrapper.setProps({ modelValue: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isChecked).toBe(true);
  });

  it('should set true to isChecked if initial value is true', async () => {
    wrapper.setProps({ modelValue: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isChecked).toBe(true);
  });

  it('should set true to isChecked if modelValue array contains a given value', async () => {
    const value = { id: 1 };

    wrapper = mount(GCheckbox, {
      propsData: {
        value,
        modelValue: [value],
      },
      listeners,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isChecked).toBe(true);
  });

  it('should set false to isChecked if modelValue array not contains a given value', async () => {
    const value = { id: 1 };

    wrapper = mount(GCheckbox, {
      propsData: {
        value,
        modelValue: [{ id: 2 }],
      },
      listeners,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isChecked).toBe(false);
  });

  it('should set false to isChecked if modelValue array is empty', async () => {
    const value = { id: 1 };

    wrapper = mount(GCheckbox, {
      propsData: {
        value,
        modelValue: [],
      },
      listeners,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isChecked).toBe(false);
  });

  it('should have is-invalid class if isInvalid prop is true', async () => {
    const value = { id: 1 };

    wrapper = mount(GCheckbox, {
      propsData: {
        value,
        modelValue: [],
        isInvalid: true,
      },
      listeners,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.-inner').classes('-invalid')).toBe(true);
  });

  it('should not have is-invalid class if isInvalid prop is false', async () => {
    const value = { id: 1 };

    wrapper = mount(GCheckbox, {
      propsData: {
        value,
        modelValue: [],
        isInvalid: false,
      },
      listeners,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.-inner').classes('-invalid')).not.toBe(true);
  });

  it('should set default color if do not given color as props', async () => {
    const defaultColor = '.g-bg-orange-500';

    wrapper.find('.-input').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find(defaultColor).exists()).toBe(true);
  });

  it('should set color if color given as props', async () => {
    const color = 'purple-500';

    wrapper.setProps({
      color: color,
    });

    wrapper.find('.-input').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.g-bg-purple-500').exists()).toBe(true);
  });
});
