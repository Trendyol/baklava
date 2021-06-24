import { shallowMount } from '@vue/test-utils';
import GSpinner from './';

describe('GSpinner', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GSpinner);
  });

  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render medium variant as default when variant prop does not set', () => {
    expect(wrapper.vm.classNames).toEqual({ 'g-spinner': true, '-medium': true });
  });


  it('should render with given variant', async () => {
    // given
    wrapper.setProps({
      variant: 'extra-small',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({ 'g-spinner': true, '-extra-small': true });
  });
});
