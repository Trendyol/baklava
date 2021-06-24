import { GCard } from './';
import { shallowMount } from '@vue/test-utils';

describe('GCard', () => {
  let wrapper: any;
  const renderWrapper = (options: any = {}) => {
    wrapper = shallowMount(GCard, {
      ...options,
    });
  };

  it('should match snapshot on initial', async () => {
    renderWrapper({
      propsData: {
        title: 'Title',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have GMiniPagination component if pageable prop is true', () => {
    renderWrapper({
      propsData: {
        pageable: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set currentPage when onPage is triggered', () => {
    renderWrapper();

    wrapper.vm.onPage({ page: 2 });

    expect(wrapper.vm.currentPage).toBe(2);
    expect(wrapper.emitted().page).not.toBe(undefined);
    expect(wrapper.emitted().page[0][0]).toEqual({
      page: 2,
    });
  });

  it('should set GCardPage active data if currentPage is equal the GCardPage page prop', async () => {
    const defaultSlot = [
      {
        componentInstance: undefined,
      },
      {
        componentInstance: {
          active: false,
          page: 1,
        },
      },
      {
        componentInstance: {
          active: false,
          page: 2,
        },
      },
    ];
    renderWrapper({
      propsData: {
        pageable: true,
      },
      computed: {
        defaultSlot: () => defaultSlot,
      },
    });

    wrapper.vm.onPage({ page: 2 });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('gminipagination-stub').props('totalPages')).toBe(2);
    expect(defaultSlot[1].componentInstance?.active).toBe(false);
    expect(defaultSlot[2].componentInstance?.active).toBe(true);
  });

  it('should have message-wrapper if showMessage prop is true', () => {
    renderWrapper({
      propsData: {
        showMessage: true,
        message: 'Message',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
