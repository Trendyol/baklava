import { mount } from '@vue/test-utils';
import GSkeleton from "./";

describe('GSkeleton', () => {
  let wrapper: any;
  let mathCopy: any;

  mathCopy = Object.create(global.Math);
  mathCopy.random = () => 0.5;
  global.Math = mathCopy;

  beforeEach(() => {
    wrapper = mount(GSkeleton);
  });

  it('should match snapshot with default style', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly simple skeleton', () => {
    const skeletonStyles = wrapper.find('.g-skeleton').attributes('style');

    expect(skeletonStyles).toEqual('height: 1em; width: 90%; border-radius: 0%;');
  });

  it('should render with given count', async () => {
    wrapper.setProps({
      count: 5,
    });

    await wrapper.vm.$nextTick();

    const skeletonCount = wrapper.findAll('.g-skeleton').length;

    expect(skeletonCount).toEqual(5);
  });

  it('should render with given width and height', async () => {
    wrapper.setProps({
      width: '50px',
      height: '100px',
    });

    await wrapper.vm.$nextTick();

    const skeletonStyles = wrapper.find('.g-skeleton').attributes('style');

    expect(skeletonStyles).toEqual('height: 100px; width: 50px; border-radius: 0%;');
  });

  it('should set border radius if circle props is true', async () => {
    wrapper.setProps({
      circle: true,
    });

    await wrapper.vm.$nextTick();

    const skeletonStyles = wrapper.find('.g-skeleton').attributes('style');

    expect(skeletonStyles).toEqual('height: 1em; width: 90%; border-radius: 50%;');
  });
})
