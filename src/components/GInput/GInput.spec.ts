import { mount } from '@vue/test-utils';
import GInput from './';
import GButton from '../GButton';
import * as stringUtil from '../../utils/string.util';

jest.mock('../../utils/string.util', () => ({
  trimInputValue: jest.fn(val => val + 'returned value '),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GInput', () => {
  let wrapper: any;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GInput);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values ​​when no props are set', () => {
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': false,
      'right-addon': false,
    });
  });

  it('should render button given on the left-addon', async () => {
    // when
    wrapper = mount(GInput, {
      slots: {
        'left-addon': `<GButton variant="gradient-purple" leftIcon="play-circle">left</GButton>`,
      },
      stubs: {
        GButton: GButton,
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(
      wrapper.vm.$slots['left-addon'][0].componentOptions.children[0].text
    ).toEqual('left');
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': true,
      'right-addon': false,
    });
  });

  it('should render button given on the right-addon', async () => {
    // when
    wrapper = mount(GInput, {
      slots: {
        'right-addon': `<GButton variant="gradient-purple" leftIcon="play-circle">Right</GButton>`,
      },
      stubs: {
        GButton: GButton,
      },
    });

    await wrapper.vm.$nextTick();

    // then
    expect(
      wrapper.vm.$slots['right-addon'][0].componentOptions.children[0].text
    ).toEqual('Right');
    expect(wrapper.vm.wrapperClass).toEqual({
      'g-input': true,
      'left-addon': false,
      'right-addon': true,
    });
  });

  it('should format value with trim prop true', () => {
    const DEFAULT_INPUT_VALUE = 'test ';
    const mockReturnValue = 'test returned value ';
    wrapper = mount(GInput, {
      propsData: {
        trim: true,
      },
    });
    const inputEl = wrapper.find('input');
    inputEl.element.value = DEFAULT_INPUT_VALUE;
    inputEl.trigger('input');
    expect(stringUtil.trimInputValue).toHaveBeenCalled();
    expect(wrapper.emitted('input')[0]).toStrictEqual([mockReturnValue]);
    inputEl.trigger('blur');
    expect(wrapper.emitted('input')[1]).toStrictEqual([mockReturnValue.trim()]);
    expect(wrapper.emitted('blur')[0]).toBeTruthy();
  });

  it('should not format value with trim prop false', () => {
    const DEFAULT_INPUT_VALUE = 'test ';
    wrapper = mount(GInput, {
      propsData: {
        trim: false,
      },
    });
    const inputEl = wrapper.find('input');
    inputEl.element.value = DEFAULT_INPUT_VALUE;
    inputEl.trigger('input');
    expect(stringUtil.trimInputValue).not.toHaveBeenCalled();
    expect(wrapper.emitted('input')[0]).toStrictEqual([DEFAULT_INPUT_VALUE]);
    inputEl.trigger('blur');
    expect(wrapper.emitted('input')[1]).toBeFalsy();
    expect(wrapper.emitted('blur')[0]).toBeTruthy();
  });
});
