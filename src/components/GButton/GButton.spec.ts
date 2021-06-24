import { mount } from '@vue/test-utils';
import GButton from './';
import GIcon from '../GIcon';

describe('GButton', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(GButton);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values ​​when no props are set', () => {
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': undefined,
      '-onlyIcon': false,
      '-outline': false,
      '-primary': true,
      '-fluid': false,
    });
    expect(wrapper.vm.contentClassname).toEqual({ '-big': true, content: true });
    expect(wrapper.vm.slotClassName).toEqual({ 'g-ml-10': false, 'g-mr-10': false });
    expect(wrapper.vm.iconSize).toEqual(20);
    expect(wrapper.find('.-leftIcon').exists()).toBe(false);
    expect(wrapper.find('.-right').exists()).toBe(false);
  });

  it('should render given variant when variant prop set', async () => {
    // given
    wrapper.setProps({
      variant: 'success',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': undefined,
      '-onlyIcon': false,
      '-outline': false,
      '-success': true,
      '-fluid': false,
    });
  });

  it('should render given size when size prop set', async () => {
    // given
    wrapper.setProps({
      size: 'small',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.iconSize).toEqual(12);
    expect(wrapper.vm.contentClassname).toEqual({ '-small': true, content: true });
  });

  it('should render given fluid when fluid prop set', async () => {
    // given
    wrapper.setProps({
      fluid: true,
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': undefined,
      '-onlyIcon': false,
      '-outline': false,
      '-primary': true,
      '-fluid': true,
    });
  });

  it('should render given leftIcon when leftIcon prop set', async () => {
    // given
    wrapper.setProps({
      leftIcon: 'info',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': 'info',
      '-onlyIcon': false,
      '-outline': false,
      '-primary': true,
      '-fluid': false,
    });
    expect(wrapper.vm.slotClassName).toEqual({ 'g-ml-10': false, 'g-mr-10': true });
    expect(wrapper.find('.-leftIcon').exists()).toBe(true);
  });

  it('should render given rightIcon when rightIcon prop set', async () => {
    // given
    wrapper.setProps({
      rightIcon: 'info',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': 'info',
      '-onlyIcon': false,
      '-outline': false,
      '-primary': true,
      '-fluid': false,
    });
    expect(wrapper.vm.slotClassName).toEqual({ 'g-ml-10': true, 'g-mr-10': false });
    expect(wrapper.find('.-rightIcon').exists()).toBe(true);
  });

  it('should render given icon when icon prop set', async () => {
    // given
    wrapper.setProps({
      icon: 'info',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': 'info',
      '-onlyIcon': true,
      '-outline': false,
      '-primary': true,
      '-fluid': false,
    });
    expect(wrapper.findComponent(GIcon).exists()).toBe(true);
  });

  it('should render given disabled when variant prop set', async () => {
    // given
    wrapper.setProps({
      disabled: true,
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      'g-button': true,
      '-icon': undefined,
      '-onlyIcon': false,
      '-outline': false,
      '-primary': true,
      '-fluid': false,
    });
    expect(wrapper.attributes('disabled')).toBe('disabled');
  });
});
