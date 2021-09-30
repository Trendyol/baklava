import { shallowMount } from '@vue/test-utils';
import GBadge from './';

describe('GBadge', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GBadge);
  });

  it('should match snapshot with default style', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with default styles', () => {
    expect(wrapper.vm.badgeClass).toEqual({
      badge: true,
      border: false,
      bottom: false,
      dot: false,
      'g-bg-orange-100': true,
      inline: false,
      left: false,
      overlap: false,
    });
    expect(wrapper.vm.badgeContainerClass).toEqual({
      'g-badge': true,
      inline: false,
      left: false,
    });
  });

  it('should render with given background and border color', async () => {
    // given
    wrapper.setProps({
      backgroundColor: 'green-400',
      borderColor: 'green-500',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.badgeClass).toEqual({
      badge: true,
      border: false,
      bottom: false,
      dot: false,
      'g-bg-green-400': true,
      inline: false,
      left: false,
      overlap: false,
    });
  });

  it('should render with given inline and left', async () => {
    // given
    wrapper.setProps({
      inline: true,
      left: true,
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.badgeContainerClass).toEqual({
      'g-badge': true,
      inline: true,
      left: true,
    });
  });
});
