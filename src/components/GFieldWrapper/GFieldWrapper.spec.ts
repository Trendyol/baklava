import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import GFieldWrapper from './GFieldWrapper.vue';
import GIcon from '../GIcon';

describe('GFieldWrapper', () => {
  let wrapper: Wrapper<any>;

  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GFieldWrapper, {
      ...options,
    });
  };

  it('should match snapshot when show is prop is given as false ', () => {
    renderWrapper({
      propsData: {
        isValue: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values ​​when no props are set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      big: true,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      '-outline': false,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });
    expect(wrapper.vm.iconColor).toEqual('light-grey-500');
  });

  it('should render given isValue when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      big: true,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      '-outline': false,
      '-top': true,
      '-valid': false,
      'g-field-wrapper': true,
    });
  });

  it('should render given isOutlineLabel when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        isOutlineLabel: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      big: true,
      '-borderline': false,
      '-disable': false,
      '-error': false,
      '-outline': true,
      '-top': false,
      '-valid': false,
      'icon-left': '',
      'g-field-wrapper': true,
    });
  });

  it('should render given label and feedback when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        label: 'TestLabel',
        feedback: 'TestSubLabel',
      },
    });
    expect(wrapper.find('label').text()).toEqual('TestLabel');
    expect(wrapper.find('.sub-label').text()).toEqual('TestSubLabel');
  });

  it('should not render feedback if feedback prop is not exists', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        label: 'TestLabel',
      },
    });
    expect(wrapper.find('label').text()).toEqual('TestLabel');
    expect(wrapper.find('.sub-label').exists()).toEqual(false);
  });

  it('should render given success when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        success: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      big: true,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      '-outline': false,
      '-top': false,
      '-valid': true,
      'g-field-wrapper': true,
    });
    expect(wrapper.vm.iconColor).toEqual('green-500');
  });

  it('should render given error when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        error: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': true,
      '-outline': false,
      big: true,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });
    expect(wrapper.vm.iconColor).toEqual('red-500');
  });

  it('should render given disable when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        disable: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      '-borderline': true,
      'icon-left': '',
      '-disable': true,
      '-error': false,
      '-outline': false,
      big: true,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });
    expect(wrapper.vm.iconColor).toEqual('mid-grey-500');
  });

  it('should render given icon when variant prop set', () => {
    renderWrapper({
      propsData: {
        isValue: false,
        icon: 'info',
      },
    });
    expect(wrapper.findAllComponents(GIcon)).toHaveLength(1);
  });

  it('should class change when input is clicked', async () => {
    renderWrapper({
      propsData: {
        isValue: false,
      },
    });

    wrapper.find('.g-field-wrapper').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': true,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      big: true,
      '-outline': false,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });
  });

  it('should set active to false when input is clicked twice', async () => {
    renderWrapper({
      propsData: {
        isValue: false,
      },
    });

    wrapper.find('.g-field-wrapper').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': true,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      big: true,
      '-outline': false,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });

    wrapper.find('.g-field-wrapper').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.wrapperClass).toEqual({
      '-active': false,
      '-borderline': true,
      'icon-left': '',
      '-disable': false,
      '-error': false,
      big: true,
      '-outline': false,
      '-top': false,
      '-valid': false,
      'g-field-wrapper': true,
    });
  });

  it('should render label when label prop set', async () => {
    renderWrapper({
      propsData: {
        isValue: false,
        label: 'dummy text',
      },
    });

    expect(wrapper.find('label').exists()).toBeTruthy();
    expect(wrapper.get('label').text()).toBe('dummy text');
  });

  it('should not render label when label prop is not set', async () => {
    renderWrapper({
      propsData: {
        isValue: false,
        label: '',
      },
    });

    expect(wrapper.find('label').exists()).toBeFalsy();
  });

  it('should render bottom-wrapper area if feedback is given', () => {
    // when
    renderWrapper({
      propsData: {
        isValue: false,
        feedback: 'feedback',
      },
    });

    // then
    expect(wrapper.find('.bottom-wrapper')).toMatchSnapshot();
  });

  it('should render bottom-wrapper area if bottom_right slot is given', () => {
    // when
    renderWrapper({
      slots: {
        bottom_right: 'bottom_right',
      },
      propsData: {
        isValue: false,
      },
    });

    // then
    expect(wrapper.find('.bottom-wrapper')).toMatchSnapshot();
  });
});
