import { mount } from '@vue/test-utils';
import GInput from './';
import GButton from '../GButton';

describe('GInput', () => {
  let wrapper: any;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GInput);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values ​​when no props are set', () => {
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': false,
      'right-addon': false,
    });
  });

  it('should render button given on the left-addon', async () => {
    // when
    wrapper = mount(GInput, {
      slots: {
        'left-addon': `<GButton variant="gradient-purple" leftIcon="play-circle">left</GButton>`,
      },
      stubs: {
        GButton: GButton,
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(
      wrapper.vm.$slots['left-addon'][0].componentOptions.children[0].text
    ).toEqual('left');
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': true,
      'right-addon': false,
    });
  });

  it('should render button given on the right-addon', async () => {
    // when
    wrapper = mount(GInput, {
      slots: {
        'right-addon': `<GButton variant="gradient-purple" leftIcon="play-circle">Right</GButton>`,
      },
      stubs: {
        GButton: GButton,
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(
      wrapper.vm.$slots['right-addon'][0].componentOptions.children[0].text
    ).toEqual('Right');
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': false,
      'right-addon': true,
    });
  });
});
