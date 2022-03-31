import { shallowMount, Wrapper } from '@vue/test-utils';
import GInputPrice from './GInputPrice.vue';

describe('GInputPrice', () => {
  let wrapper: Wrapper<any>;

  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GInputPrice, {
      ...options,
    });
  };

  it('should match snapshot', () => {
    renderWrapper({});

    expect(wrapper.vm.getAttrs.suffix).toEqual('₺');
  });

  it('should check getValue', () => {
    renderWrapper({
      propsData: {
        value: '1234.56',
      },
    });
    expect(wrapper.vm.valueModal).toEqual('1234,56');
  });
});
