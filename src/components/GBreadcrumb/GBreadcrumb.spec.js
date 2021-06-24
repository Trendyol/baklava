import { shallowMount } from '@vue/test-utils';
import GBreadcrumb from './';

describe('GBreadcrumb', () => {
  let wrapper;
  const renderWrapper = (options) => {
    wrapper = shallowMount(GBreadcrumb, options);
  };
  const items = [
    { text: 'text 1', href: 'href 1' },
    { text: 'text 2', href: 'href 2', disabled: true },
    { text: 'text 3', href: 'href 3' },
  ];

  it('should match with snapshot when default props', () => {
    renderWrapper({
      propsData: {
        items,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given divider', () => {
    const divider = '/';
    renderWrapper({ propsData: { items, divider } });

    expect(wrapper.find('.divider').exists()).toBeTruthy();
    expect(wrapper.find('.divider').text()).toBe(divider);
  });

  it('should emit the clicked link', async () => {
    renderWrapper({ propsData: { items } });

    const linkItem = wrapper.find('.item');

    linkItem.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0][0]).toEqual(items[0]);
  });

  it('should not emit the clicked link if item is disabled', async () => {
    renderWrapper({ propsData: { items } });

    const linkItem = wrapper.find('.item.disabled');

    linkItem.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toBeFalsy();
  });
});
