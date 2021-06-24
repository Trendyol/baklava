import Sortable from '@/components/GDataTable/Sortable.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('components/GDataTable/Sortable.vue', () => {
  let wrapper: Wrapper<Sortable & { [key: string]: any }>;
  const renderWrapper = (options?: any) => {
    wrapper = shallowMount(Sortable, {
      ...options,
    });
  };

  it('should render correctly with default params', () => {
    renderWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('up Arrow', () => {
    it('should has var(--main-grey-500) color if name, sortName are equal and sortType is asc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'name',
          sortType: 'asc',
        },
      });

      expect(wrapper.find('.up').attributes('fill')).toEqual('var(--main-grey-500)');
    });

    it('should has var(--mid-grey-500) color if name, sortName are equal and sortType is different from asc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'name',
          sortType: 'sortType',
        },
      });

      expect(wrapper.find('.up').attributes('fill')).toEqual('var(--mid-grey-500)');
    });

    it('should has var(--mid-grey-500) color if name, sortName are not equal and sortType is asc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'sortName',
          sortType: 'asc',
        },
      });

      expect(wrapper.find('.up').attributes('fill')).toEqual('var(--mid-grey-500)');
    });
  });

  describe('down Arrow', () => {
    it('should has var(--main-grey-500) color if name, sortName are equal and sortType is desc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'name',
          sortType: 'desc',
        },
      });

      expect(wrapper.find('.down').attributes('fill')).toEqual('var(--main-grey-500)');
    });

    it('should has var(--mid-grey-500) color if name, sortName are equal and sortType is different from desc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'name',
          sortType: 'sortType',
        },
      });

      expect(wrapper.find('.down').attributes('fill')).toEqual('var(--mid-grey-500)');
    });

    it('should has var(--mid-grey-500) color if name, sortName are not equal and sortType is desc', () => {
      renderWrapper({
        propsData: {
          name: 'name',
          sortName: 'sortName',
          sortType: 'desc',
        },
      });

      expect(wrapper.find('.down').attributes('fill')).toEqual('var(--mid-grey-500)');
    });
  });

  describe('sort click', () => {
    it('should emit asc sort type if sortName and name are not equal', async () => {
      renderWrapper({
        propsData: {
          sortName: 'sortName',
          name: 'name',
          sortType: 'asc',
        },
      });

      wrapper.vm.onClick();

      expect(wrapper.emitted().sort).toBeTruthy();
      expect(wrapper.emitted().sort?.[0]?.[0]).toEqual({ name: 'name', type: 'asc' });
    });

    it('should emit asc sort type if sortName, name are equal and sortType is desc', async () => {
      renderWrapper({
        propsData: {
          sortName: 'name',
          name: 'name',
          sortType: 'desc',
        },
      });

      wrapper.vm.onClick();

      expect(wrapper.emitted().sort).toBeTruthy();
      expect(wrapper.emitted().sort?.[0]?.[0]).toEqual({ name: 'name', type: 'asc' });
    });

    it('should emit desc sort type if sortName, name are equal and sortType is asc', async () => {
      renderWrapper({
        propsData: {
          sortName: 'name',
          name: 'name',
          sortType: 'asc',
        },
      });

      wrapper.vm.onClick();

      expect(wrapper.emitted().sort).toBeTruthy();
      expect(wrapper.emitted().sort?.[0]?.[0]).toEqual({ name: 'name', type: 'desc' });
    });
  });
});
