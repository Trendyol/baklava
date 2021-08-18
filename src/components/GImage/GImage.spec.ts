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
});
