import { mount } from '@vue/test-utils';
import GButtonDropdown from './GButtonDropdown.vue';
import GButton from '../GButton';

describe('GButtonDropdown Specs', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(GButtonDropdown);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values ​​when no props are set', () => {
     expect(wrapper.vm.icon).toEqual('chevron-down');
     expect(wrapper.vm.menuClass).toEqual({ 'menu': true, 'g-d-none': true });
  });

  it('should render given variant when variant prop set', async () => {
    // given
    wrapper.setProps({
      variant: 'success',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.darkVariant).toEqual('success-darker');
  });

  it('the correct icon appears when the button is clicked', async () => {
    // given
    wrapper.findAllComponents(GButton).at(1).trigger('click');

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.icon).toEqual('chevron-up');
    expect(wrapper.vm.menuClass).toEqual({ 'menu': true, 'g-d-none': false });
  });

  it('should emit onDropdownOpen event if isContentVisible is true when onDropdownClick is called', () => {
    // when
    wrapper.vm.onDropdownClick();

    // then
    expect(wrapper.vm.isContentVisible).toBe(true);
    expect(wrapper.emitted().onDropdownOpen.length).toEqual(1);
  });

  it('should emit onDropdownClose event if isContentVisible is false when onDropdownClick is called', () => {
    // given
    wrapper.setData({
      isContentVisible: true,
    });

    // when
    wrapper.vm.onDropdownClick();

    // then
    expect(wrapper.vm.isContentVisible).toBe(false);
    expect(wrapper.emitted().onDropdownClose.length).toEqual(1);
  });

  it('should only emit onDropdownOpen event if isContentVisible is false when onDropdownClick is called', () => {
    // given
    wrapper.setData({
      isContentVisible: false,
    });

    // when
    wrapper.vm.onDropdownClick();

    // then
    expect(wrapper.vm.isContentVisible).toBe(true);
    expect(wrapper.emitted().onDropdownOpen.length).toEqual(1);
  });

  it('should emit onDropdownOpen and onButtonClick when isContentVisible false', async () => {
    // when
    wrapper.vm.onButtonClick({});

    // then
    expect(wrapper.vm.isContentVisible).toBe(true);
    expect(wrapper.emitted().onButtonClick.length).toEqual(1);
  });

  it('should emit onDropdownClose and onButtonClick when isContentVisible true', () => {
    // given
    wrapper.setData({
      isContentVisible: true,
    });

    // when
    wrapper.vm.onButtonClick({});

    // then
    expect(wrapper.vm.isContentVisible).toBe(false);
    expect(wrapper.emitted().onDropdownOpen).toEqual(undefined);
    expect(wrapper.emitted().onButtonClick.length).toEqual(1);
  });

  it('should check tooltip when isButtonDisabled false', () => {
    expect(wrapper.vm.isButtonDisabled).toBe(false);
    expect(wrapper.find('.disable-tooltip').exists()).toEqual(false);
  });

  it('should add disabled class to dropdown button if isDropdownDisabled equals true', async () => {
    // given
    wrapper.setProps({ isDropdownDisabled: true });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.find('.dropdown-button').attributes('disabled')).toBe('disabled');
  });

  it('should not emited onDropdownOpen func if isDropdownDisabled equals true', async () => {
    // given
    wrapper.setData({
      isContentVisible: false
    });
    wrapper.setProps({
      isDropdownDisabled: true,
      isDropdownOpen: true,
    });

    // when
    await wrapper.vm.$nextTick();
    wrapper.vm.onButtonClick({});

    // then
    expect(wrapper.emitted().onDropdownOpen).toEqual(undefined);
  });
})
