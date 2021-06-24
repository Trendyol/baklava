import { mount } from '@vue/test-utils';
import GRadioGroupFilter from './';

describe('GRadioGroupFilter', () => {
  let wrapper: any;

  const renderWrapper = (options?: any) => {
    wrapper = mount(GRadioGroupFilter, {
      propsData: {
        name: 'Apple',
        value: 'apple',
        val: 'apple',
      },
      ...options,
    });
  };

  beforeEach(() => {
    renderWrapper();
  });

  it('should match with snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match with snapshot with unchecked', async () => {
    await wrapper.setProps({
      value: 'samsung',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should add checked class if radio button is checked', () => {
    expect(wrapper.classes()).toContain('-checked');
  });

  it('should remove checked class if radio button is not checked', async () => {
    await wrapper.setProps({
      value: 'samsung',
    });

    expect(wrapper.classes('-checked')).toBe(false);
  });

  it('should emit selected value when clicked radio button', async () => {
    await wrapper.setProps({
      value: 'samsung',
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toEqual(wrapper.vm.val);
  });
});
