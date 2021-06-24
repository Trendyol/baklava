import { shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils';
import GAlert from './';
import GIcon from '../GIcon/GIcon.vue';

describe('GAlert', () => {
  let wrapper: Wrapper<GAlert>;
  const renderWrapper = (options: ThisTypedShallowMountOptions<GAlert> = {}) => {
    wrapper = shallowMount(GAlert, options);
  };

  it('should match snapshot with default style', () => {
    renderWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render GIcon if showIcon is false', () => {
    renderWrapper({
      propsData: {
        showIcon: false,
      },
    });

    expect(wrapper.findComponent(GIcon).exists()).toBeFalsy();
  });

  it('should has prop icon if icon is given as prop', () => {
    renderWrapper({
      propsData: {
        icon: 'user',
      },
    });

    const iconComponent = wrapper.findComponent(GIcon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.attributes().name).toBe('user');
  });

  it('should has variant icon type if given variant is valid', () => {
    renderWrapper({
      propsData: {
        variant: 'success',
      },
    });

    const iconComponent = wrapper.findComponent(GIcon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.attributes().name).toBe('check-circle');
  });

  it('should has alert-circle icon if not variant icon type and given variant is invalid', () => {
    renderWrapper({
      propsData: {
        variant: 'invalid',
      },
    });

    const iconComponent = wrapper.findComponent(GIcon);

    expect(iconComponent.exists()).toBeTruthy();
    expect(iconComponent.attributes().name).toBe('alert-circle');
  });

  it('should has -alert class if border prop is given', () => {
    renderWrapper({
      propsData: {
        variant: 'success',
        border: true,
      },
    });

    expect(wrapper.classes('-border')).toBeTruthy();
  });
});
