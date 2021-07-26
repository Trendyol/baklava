import {mount, shallowMount, ThisTypedShallowMountOptions, Wrapper} from '@vue/test-utils';
import GColorPalette from './';
import colorPalette from "@/components/GColorPalette/colorPalette";

describe('GColorPalette', () => {
  let wrapper: Wrapper<GColorPalette>;
  const renderWrapper = (options: ThisTypedShallowMountOptions<GColorPalette> = {}) => {
    wrapper = mount(GColorPalette, options);
  };

  it('should match snapshot with palette prop', () => {
    renderWrapper({
      propsData: {
        palette: colorPalette[0],
      },
    })
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not rendered color palette if palette props does not given', () => {
    renderWrapper({
      propsData: {
        palette: {},
      },
    })
    const wrapperDiv = wrapper.find('div.g-color-palette')
    expect(wrapperDiv.exists()).toBe(false)
  });

  it('should render color palette with color', () => {
    renderWrapper({
      propsData: {
        palette: colorPalette[0],
      },
    })
    const wrapperDiv = wrapper.find('div.g-color-palette')
    expect(wrapperDiv.exists()).toBe(true)
  });
});
