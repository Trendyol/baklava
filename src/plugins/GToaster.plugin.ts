import _Vue from 'vue';
import GToaster from '@/components/GToaster/GToaster.vue';
import { GToasterOptions } from '@/components/GToaster/types';

interface GToasterPluginOptions {
  GToaster: GToaster;
  [key: string]: any
}

export default {
  install (Vue: typeof _Vue, options: GToasterPluginOptions) {
    const Constr = Vue.extend(options.GToaster);
    const VueToaster: any = new Constr();
    const vm = VueToaster.$mount();

    VueToaster.config = Object.assign(VueToaster.config, options);

    // eslint-disable-next-line no-unused-expressions
    // @ts-ignore
    document.querySelector('body') && document.querySelector('body').appendChild(vm.$el);

    Vue.$toast = {
      hide (id: number) {
        VueToaster.onClose({
          id,
          durationObject: { seconds: 0, autoClose: false },
        });
      },
      hideAll () { VueToaster.hideAll(); },

      success (message = 'İşleminiz başarıyla gerçekleştirildi', toasterOptions: GToasterOptions = {}) {
        const toastOptions: GToasterOptions = {
          ...toasterOptions,
          variant: 'success',
        };
        VueToaster.toast(message, toastOptions);
      },

      error (message = 'İşleminiz sırasında bir hata oluştu.', toasterOptions = {}) {
        const toastOptions: GToasterOptions = {
          ...toasterOptions,
          variant: 'error',
        };
        VueToaster.toast(message, toastOptions);
      },

      warning (message: string, toasterOptions: GToasterOptions = {}) {
        const toastOptions: GToasterOptions = {
          ...toasterOptions,
          variant: 'warning',
        };
        VueToaster.toast(message, toastOptions);
      },

      info (message: string, toasterOptions: GToasterOptions = {}) {
        const toastOptions: GToasterOptions = {
          ...toasterOptions,
          variant: 'info',
        };
        VueToaster.toast(message, toastOptions);
      },
    };

    Vue.prototype.$toast = Vue.$toast;
  },
};
