import { mount } from '@vue/test-utils';
import GTextarea from '.';

describe('GTextarea', () => {
  let wrapper: any;
  const renderWrapper = (options = {}) => {
    wrapper = mount(GTextarea, {
      ...options,
    });
  };

  it('should match snapshot when show is prop is given as false ', () => {
    // when
    renderWrapper();

    // then
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render max length progress area if showProgress prop is given', () => {
    // when
    renderWrapper({
      propsData: {
        showProgress: true,
      },
    });

    // then
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render current progress area if showProgress prop is given', () => {
    // given
    const value = 'abc';
    const maxLength = value.length;

    // when
    renderWrapper({
      propsData: {
        showProgress: true,
        value,
      },
      attrs: {
        maxlength: maxLength,
      },
    });

    // then
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.emitted('reachMaxLength')).toBeTruthy();
    expect(wrapper.emitted('reachMaxLength')[0][0]).toBe(maxLength);
  });
});
