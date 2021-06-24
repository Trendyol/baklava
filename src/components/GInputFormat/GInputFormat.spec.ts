import { shallowMount, Wrapper } from '@vue/test-utils';
import GInputFormat from './GInputFormat.vue';

describe('GInputFormat', () => {
  let wrapper: Wrapper<any>;

  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GInputFormat, {
      ...options,
    });
  };

  it('should match snapshot', () => {
    renderWrapper({});

    expect(wrapper.vm.getAttrs).toEqual({
      autoUnmask: true,
    });
  });

  it('should check getValue', async () => {
    renderWrapper({
      propsData: {
        value: '12345',
        mask: {
          mask: '99-999',
        },
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.input.value).toEqual('12345');
  });
});
