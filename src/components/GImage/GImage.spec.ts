import { shallowMount } from '@vue/test-utils';
import GImage from './';

describe('GImage', () => {
  let wrapper: any;

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    wrapper = shallowMount(GImage);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render image as default src url when src prop does not set', () => {
    expect(wrapper.vm.src).toEqual('https://cdn.dsmcdn.com/shared/images/trendyol.jpeg');
  });

  it('should render image with given src url', async () => {
    // given
    wrapper.setProps({
      src: 'https://picsum.photos/500?random',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.isSrcUrl).toBeTruthy();
    expect(wrapper.vm.src).toEqual('https://picsum.photos/500?random');
  });

  it('should render image with given src absolute path', async () => {
    // given
    wrapper.setProps({
      src: '../../resources/default.jpg',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.isSrcUrl).toBeFalsy();
    expect(wrapper.vm.src).toEqual('../../resources/default.jpg');
  });
});
