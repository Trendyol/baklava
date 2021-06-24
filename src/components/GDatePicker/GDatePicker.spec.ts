import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import GDatePicker from './GDatePicker.vue';

describe('GDatePicker', () => {
  let wrapper: Wrapper<any>;

  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GDatePicker, {
      ...options,
    });
  };
  const renderWrapperAsMount = (options: any = {}) => {
    wrapper = mount(GDatePicker, {
      ...options,
    });
  };

  it('should match snapshot', () => {
    renderWrapper({
      propsData: {
        defaultValue: null,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot check attributes object', () => {
    renderWrapper({
      propsData: {
        placeholder: 'StartDate',
        format: 'YYYY.DD.MM',
        defaultValue: null,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.vm.getAttrs.placeholder).toEqual('StartDate');
    expect(wrapper.vm.getAttrs.format).toEqual('YYYY.DD.MM');
  });

  it('should match snapshot with scoped slots', () => {
    renderWrapperAsMount({
      scopedSlots: {
        header: '<div class="header-slot">header</div>',
        footer: '<div class="footer-slot">footer</div>',
      },
      propsData: {
        open: true
      }
    });
    expect(wrapper.find('.header-slot').exists()).toBeTruthy();
    expect(wrapper.find('.footer-slot').exists()).toBeTruthy();
  });
});
