import { shallowMount } from '@vue/test-utils';
import { GCardPage } from './';

describe('GCardPage', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GCardPage);
  });

  it('should match snapshot when active is true', async () => {
    wrapper.setData({
      active: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot when active is false', async () => {
    wrapper.setData({
      active: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});
