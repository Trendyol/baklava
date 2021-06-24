import Vue from 'vue';
import {mount, ThisTypedMountOptions, Wrapper} from '@vue/test-utils';

type VueClass<V extends Vue> = (new (...args: any[]) => V) & typeof Vue;

export const renderWrapper = (component: VueClass<any>, options?: ThisTypedMountOptions<any>): Wrapper<any> => {
  return mount(component, {
    ...options,
  });
};
