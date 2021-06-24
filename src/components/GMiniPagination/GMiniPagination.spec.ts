import { shallowMount } from '@vue/test-utils';
import GMiniPagination from './';

describe('GMiniPagination', () => {
  let wrapper: any;
  let propsData;

  beforeEach(() => {
    propsData = {
      totalPages: 3,
    };
    wrapper = shallowMount(GMiniPagination, {
      propsData,
    });
  });

  it('should match snapshot on initial', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given model value if v-model is used', async () => {
    wrapper.setProps({
      value: 2,
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.onPage('next');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().input).not.toBe(undefined);
    expect(wrapper.emitted().input[0][0]).toEqual(3);
    expect(wrapper.find('.current-page').text()).toBe('3');
  });

  it('should emit page event if direction is next and currentPage is less than totalPages', async () => {
    wrapper.vm.onPage('next');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().page).not.toBe(undefined);
    expect(wrapper.emitted().page[0][0]).toEqual({
      page: 2,
      direction: 'next',
      totalPages: 3,
    });
    expect(wrapper.find('.current-page').text()).toBe('2');
  });

  it('should emit page event if direction is next and currentPage is greater than 1', async () => {
    wrapper.setData({
      currentPage: 2,
    });
    wrapper.vm.onPage('prev');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().page).not.toBe(undefined);
    expect(wrapper.emitted().input).not.toBe(undefined);
    expect(wrapper.emitted().input[0][0]).not.toBe(3);
    expect(wrapper.emitted().page[0][0]).toEqual({
      page: 1,
      direction: 'prev',
      totalPages: 3,
    });
    expect(wrapper.find('.current-page').text()).toBe('1');
  });

  it('should not emit page event if currentPage is equal to totalPages', async () => {
    wrapper.setData({
      currentPage: 3,
    });
    wrapper.vm.onPage('next');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().page).toBe(undefined);
    expect(wrapper.find('.current-page').text()).toBe('3');
  });

  it('should not emit page event if currentPage is equal to 1', async () => {
    wrapper.setData({
      currentPage: 1,
    });
    wrapper.vm.onPage('prev');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().page).toBe(undefined);
    expect(wrapper.find('.current-page').text()).toBe('1');
  });
});
