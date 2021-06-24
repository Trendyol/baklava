import { shallowMount } from '@vue/test-utils';
import GIcon from './';

describe('GIcon', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GIcon, {
      propsData: {
        name: 'alert-circle'
      }
    });
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render base color as default when color prop does not set', () => {
    expect(wrapper.vm.attrs.stroke).toEqual('currentColor');
  });

  it('should render given color when color prop set', async () => {
    // given
    wrapper.setProps({
      color: 'green-500',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.attrs.stroke).toEqual('var(--green-500)');
  });
});
