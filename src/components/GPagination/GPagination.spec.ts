import { shallowMount, Wrapper } from '@vue/test-utils';
import GPagination from './';

type GPaginationType = {[key: string]: any}

describe('GPagination', () => {
  let wrapper: Wrapper<GPagination & GPaginationType>;

  beforeEach(() => {
    wrapper = shallowMount(GPagination, {
      propsData: {
        pagination: {
          totalPages: 10,
          size: 1,
          page: 1,
        },
        pageSizeText: 'adet',
        pageSizeVisible: true,
      },
    });
  });

  it('should match snapshot when show is prop is given as true ', () => {
    expect(wrapper.vm.show).toEqual(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot when show is prop is given as false ', async () => {
    // given
    wrapper.setProps({
      pagination: {},
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.show).toEqual(false);
  });

  describe('computed/pageLimitsWithText', function () {
    it('should return pageLimits with pageSizeText', function () {
      expect(wrapper.vm.pageLimitsWithText).toEqual([
        {
          text: '10 adet',
          value: 10,
        },
        {
          text: '20 adet',
          value: 20,
        },
        {
          text: '50 adet',
          value: 50,
        },
      ]);
    });
  });

  describe('pagination', function () {
    it('should click goPage when emitted page', () => {
      wrapper.vm.goPage('page', 1);
      expect(wrapper.emitted().page?.length).toEqual(1);
      expect(wrapper.emitted().page?.[0]).toEqual([0]);
    });

    it('should click next when emitted page', () => {
      // when
      wrapper.vm.next('page', wrapper.vm.currentPage);

      // then
      expect(wrapper.emitted().page?.length).toEqual(1);
      expect(wrapper.emitted().page?.[0]).toEqual([2]);
    });

    it('should click previous when emitted page', () => {
      // when
      wrapper.vm.previous('page', wrapper.vm.currentPage - 1);

      // then
      expect(wrapper.emitted().page?.length).toEqual(1);
      expect(wrapper.emitted().page?.[0]).toEqual([0]);
    });

    it('should current page is equal to 1 when disable previous items', async () => {
      // given
      wrapper.setProps({
        pagination: {
          totalPages: 10,
          size: 1,
          page: 0,
        },
      });

      // when
      await wrapper.vm.$nextTick();

      // then
      expect(wrapper.vm.isFirst).toEqual(true);
    });

    it('should pagination range return as 5 item when totalpages greater than 5', async () => {
      // given
      wrapper.setProps({
        pagination: {
          totalPages: 10,
          size: 1,
          page: 0,
        },
      });

      // when
      await wrapper.vm.$nextTick();

      // then
      expect(wrapper.vm.paginationRange).toEqual([1, 2, 3, 4, 5]);
    });

    it('should pagination range return as total pages length when totalpages less than 5', async () => {
      // given
      wrapper.setProps({
        pagination: {
          totalPages: 2,
          size: 1,
          page: 0,
        },
      });

      // when
      await wrapper.vm.$nextTick();

      // then
      expect(wrapper.vm.paginationRange).toEqual([1, 2]);
    });

    it('should current page is equal to last when disable next items', async () => {
      // given
      wrapper.setProps({
        pagination: {
          totalPages: 10,
          size: 1,
          page: 9,
        },
      });

      // when
      await wrapper.vm.$nextTick();

      // then
      expect(wrapper.vm.isLast).toEqual(true);
    });
  });

  describe('page size', function () {
    it('should click changeSize when emitted page', () => {
      // given
      wrapper.vm.size = 20;

      // when
      wrapper.vm.changeSize('size');

      // then
      expect(wrapper.emitted().size?.length).toEqual(1);
      expect(wrapper.emitted().size?.[0]).toEqual([20]);
    });

    it('should render with pageSizeVisible is false', async () => {
      // given
      wrapper.setProps({
        pageSizeVisible: false,
      });

      // when
      await wrapper.vm.$nextTick();

      // then
      expect(wrapper.find('.change-size').exists()).toEqual(false);
      expect(wrapper.vm.pageSizeVisible).toEqual(false);
    });

    it('should set size when pageSize value is changed', function () {
      const size = 20;
      wrapper.vm.pageSize = size;

      expect(wrapper.vm.size).toEqual(size);
    });
  });
});
