import { mount } from '@vue/test-utils';
import GHeader from './';
import GButton from '../GButton';

describe('GHeader', () => {
  let wrapper: any;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GHeader);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render header with given title and right-area', async () => {
    // when
    wrapper = mount(GHeader, {
      propsData: {
        title: 'Kampanyalarım',
      },
      slots: {
        'right-area': `<GButton variant="gradient-purple" leftIcon="play-circle">RIGHT BUTTON</GButton>`
      },
      stubs: {
        'GButton': GButton
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.title).toEqual('Kampanyalarım');
    expect(wrapper.vm.$slots['right-area'][0].componentOptions.children[0].text).toEqual('RIGHT BUTTON');
    expect(wrapper.vm.$slots['left-area']).toBeUndefined();
    expect(wrapper.vm.$slots['breadcrumb']).toBeUndefined();
  });

  it('should render header with given title, right-area and left-area', async () => {
    // when
    wrapper = mount(GHeader, {
      propsData: {
        title: 'Kampanyalarım',
      },
      slots: {
        'right-area': `<GButton variant="gradient-purple" leftIcon="play-circle">RIGHT BUTTON</GButton>`,
        'left-area': `<GButton variant="gradient-purple" leftIcon="play-circle">LEFT BUTTON</GButton>`
      },
      stubs: {
        'GButton': GButton
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.title).toEqual('Kampanyalarım');
    expect(wrapper.vm.$slots['right-area'][0].componentOptions.children[0].text).toEqual('RIGHT BUTTON')
    expect(wrapper.vm.$slots['left-area'][0].componentOptions.children[0].text).toEqual('LEFT BUTTON')
    expect(wrapper.vm.$slots['breadcrumb']).toBeUndefined();
  });

  it('should render header with given title, title-before', async () => {
    // when
    wrapper = mount(GHeader, {
      propsData: {
        title: 'Kampanyalarım',
      },
      slots: {
        'title-before': `<GButton variant="gradient-purple" leftIcon="play-circle">TITLE BEFORE</GButton>`
      },
      stubs: {
        'GButton': GButton
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.title).toEqual('Kampanyalarım');
    expect(wrapper.vm.$slots['title-before'][0].componentOptions.children[0].text).toEqual('TITLE BEFORE')
    expect(wrapper.vm.$slots['breadcrumb']).toBeUndefined();
  });
});
