import { shallowMount } from '@vue/test-utils';
import GTag from './';

describe('GTag', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GTag);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render base variant as default when variant prop does not set', () => {
    expect(wrapper.vm.tagColor).toEqual({ 'g-tag': true, '-base': true });
  });

  it('should render given variant when variant prop set', async () => {
    // given
    wrapper.setProps({
      variant: 'success',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.tagColor).toEqual({ 'g-tag': true, '-success': true });
  });
});
