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

  it('should delegate listened events from quill-editor', async () => {
    const handleInput = jest.fn();
    const handleBlur = jest.fn();
    renderWrapper({ listeners: { input: handleInput, blur: handleBlur } });

    wrapper.find('quill-editor-stub').vm.$emit('input');
    expect(handleInput).toHaveBeenCalled();

    wrapper.find('quill-editor-stub').vm.$emit('blur');
    expect(handleBlur).toHaveBeenCalled();
  });
});
