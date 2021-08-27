import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import GSelect from '.';
import GCheckbox from '../GCheckbox';
import GInput from '../GInput';

describe('GSelect', () => {
  let wrapper: Wrapper<any>;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given default when options prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
      },
    });
    expect(wrapper.vm.icon).toEqual('chevron-down');
    expect(wrapper.vm.getValue).toEqual('');
    expect(wrapper.vm.wrapperClass).toEqual({
      '-borderless': false,
      big: true,
      'g-select': true,
    });
    expect(wrapper.vm.contentClass).toEqual({
      'g-d-none': true,
      's-content': true,
    });
  });

  it('should render given default when defaultValue prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        value: 'Value2',
      },
    });
    expect(wrapper.vm.getValue).toEqual('Value2');
  });

  it('should render given default when size prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        size: 'small',
      },
    });
    expect(wrapper.vm.wrapperClass).toEqual({
      '-borderless': false,
      small: true,
      'g-select': true,
    });
  });

  it('should render given default when isBorderless and placeholder prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        placeholder: 'placeholder',
        isBorderless: true,
      },
    });
    expect(wrapper.vm.getLabel).toEqual('placeholder');
    expect(wrapper.vm.wrapperClass).toEqual({
      '-borderless': true,
      big: true,
      'g-select': true,
    });
  });

  it('the correct class and icon appears when the GSelect is clicked', async () => {
    wrapper = mount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        placeholder: 'placeholder',
        isBorderless: true,
      },
    });
    wrapper.findAll('.content').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.icon).toEqual('chevron-up');
    expect(wrapper.vm.contentClass).toEqual({
      'g-d-none': false,
      's-content': true,
    });
  });

  it('should render checkbox when isCheckbox prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        isCheckbox: true,
      },
    });

    expect(wrapper.findAllComponents(GCheckbox).length).toEqual(2);
    expect(wrapper.findAll('.text').length).toEqual(2);
    expect(
      wrapper
        .findAll('.text')
        .at(1)
        .text(),
    ).toEqual('Text2');
  });

  it('should render checkbox when isSearch prop set', () => {
    wrapper = shallowMount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        isSearch: true,
      },
    });

    expect(wrapper.findAllComponents(GInput).length).toEqual(1);
  });

  it('should emit blur event if select is closed', async () => {
    // given
    wrapper = mount(GSelect, {
      propsData: {
        options: [
          { value: 'Value1', text: 'Text1' },
          { value: 'Value2', text: 'Text2' },
        ],
        placeholder: 'placeholder',
        isBorderless: true,
      },
    });

    wrapper.find('.content').trigger('click'); // open select
    await wrapper.vm.$nextTick();

    // when
    wrapper.find('.content').trigger('click'); // close select
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.emitted().blur).toBeTruthy();
  });
});
