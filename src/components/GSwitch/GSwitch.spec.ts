import { shallowMount } from '@vue/test-utils';
import GSwitch from './';

describe('GSwitch', () => {
  let wrapper: any;

  const createWrapper = (options = {}) => {
    wrapper = shallowMount(GSwitch, options);
  };

  it('should match snapshot with default', () => {
    createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot when size small', () => {
    createWrapper({
      propsData: {
        size: 'small',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot when handleChange fired', () => {
    createWrapper({
      propsData: {
        size: 'medium',
      },
    });

    wrapper.vm.handleChange();
    expect(wrapper.emitted().changeToggle.length).toEqual(1);
    expect(wrapper.emitted().input.length).toEqual(1);
    expect(wrapper.element).toMatchSnapshot();
  });
});
