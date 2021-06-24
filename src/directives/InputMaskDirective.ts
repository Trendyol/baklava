// @ts-ignore
import Inputmask from 'inputmask';

export default {
  bind: (el: HTMLElement, binding: any) => {
    const props = {
      mask: binding.value,
      autoUnmask: binding.arg === 'autoUnmask',
      showMaskOnFocus: true,
      showMaskOnHover: true,
    };

    Inputmask(props).mask(el);
  },
};
