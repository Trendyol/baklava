import { mount, Wrapper } from '@vue/test-utils';
import GNativeSelect from '.';

describe('GNativeSelect', () => {
  let wrapper: Wrapper<any>;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GNativeSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given defaultValue when variant prop set', () => {
    wrapper = mount(GNativeSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        defaultValue: 'Value2',
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({ '-borderless': false, 'g-native-select': true });
    expect(wrapper.find('select').element.getAttribute('defaultValue')).toEqual('Value2');
  });

  it('should render given isBorderless when variant prop set', () => {
    wrapper = mount(GNativeSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        isBorderless: true,
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({ '-borderless': true, 'g-native-select': true });
  });
});
