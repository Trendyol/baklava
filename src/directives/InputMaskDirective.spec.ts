// @ts-ignore
import Inputmask from 'inputmask';
import InputMaskDirective from '@/directives/InputMaskDirective';

jest.mock('inputmask', () => jest.fn());

describe('@/directives/InputMaskDirective', () => {
  let mockMask: jest.Mock;

  beforeEach(() => {
    mockMask = jest.fn();
    Inputmask.mockImplementation(() => ({
      mask: mockMask,
    }));
  });
  it('should call inputmask mask method', () => {
    const el: HTMLElement = document.createElement('div');

    const binding = {
      value: 'value',
      arg: 'autoUnmask',
    };

    InputMaskDirective.bind(el, binding);

    expect(Inputmask).toHaveBeenNthCalledWith(1, {
      mask: binding.value,
      autoUnmask: true,
      showMaskOnFocus: true,
      showMaskOnHover: true,
    });

    expect(mockMask).toHaveBeenNthCalledWith(1, el);
  });
});
