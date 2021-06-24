import { shallowMount } from '@vue/test-utils';
import GRichText from './';


describe('GRichText', () => {
  let wrapper: any;

  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GRichText, {
      ...options,
    });
  };

  it('should props with default values ​​when no props are set', () => {
    renderWrapper();
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-rich-text': true,
      '-error': false,
      '-valid': false,
      '-disable': false,
    });
  });

  it('should have valid class ​​when success prop is set to true', () => {
    renderWrapper({
      propsData: {
        success: true,
      },
    });

    expect(wrapper.vm.wrapperClass).toEqual({
      'g-rich-text': true,
      '-error': false,
      '-valid': true,
      '-disable': false,
    });
  });

  it('should have error class ​​when error prop is set to true', () => {
    renderWrapper({
      propsData: {
        error: true,
      },
    });

    expect(wrapper.vm.wrapperClass).toEqual({
      'g-rich-text': true,
      '-error': true,
      '-valid': false,
      '-disable': false,
    });
  });

  it('should have disable class ​​when disable prop is set to true', () => {
    renderWrapper({
      propsData: {
        disable: true,
      },
    });

    expect(wrapper.vm.wrapperClass).toEqual({
      'g-rich-text': true,
      '-error': false,
      '-valid': false,
      '-disable': true,
    });
  });

  it('should have correct default options', () => {
    renderWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit input event when onInput is called', () => {
    const event = {
      type: 'test',
    };

    wrapper.vm.onInput(event);

    expect(wrapper.emitted().input.length).toEqual(1);
  });



});
