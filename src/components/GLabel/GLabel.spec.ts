import { shallowMount } from '@vue/test-utils';
import GLabel from './';

describe('GLabel', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GLabel);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render base variant as default when variant prop does not set', () => {
    expect(wrapper.vm.textColor).toEqual('dark-grey-500');
  });

  it('should render given variant when variant prop set', async () => {
    // given
    wrapper.setProps({
      variant: 'success',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.textColor).toEqual('green-500');
  });
});
