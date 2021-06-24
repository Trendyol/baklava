import { shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils';
import GDataTable from './';

describe('GDataTable', () => {
  const headers = (stickFirstColumn = false) => [
    { text: 'Dessert', key: 'name', width: '200px', fixed: stickFirstColumn },
    { text: 'Protein (g)', key: 'protein', sortable: true },
    { text: 'Iron (%)', key: 'iron', formatter: (value: any) => `formatted-value: ${value}` },
  ];
  const items = () => [
    {
      name: 'Frozen Yogurt',
      protein: {
        value: 4.0,
      },
      iron: 1,
    },
    {
      rowSpan: [
        {
          iron: 2,
        },
        {
          iron: 2,
        },
      ],
      name: 'Row Span',
    },
    {
      name: null,
      protein: {
        value: 4.0,
      },
      iron: 1,
    },
  ];
  const paginationConfig = () => ({
    pagination: {
      size: 20,
      page: 0,
      totalElements: 1000,
      totalPages: 10,
    },
    pageSizeText: 'Adet',
    pageSizeVisible: true,
    pageLimits: undefined,
    reverse: false,
  });
  const sortConfig = () => ({
    name: 'fat',
    type: 'asc',
  });

  let wrapper: Wrapper<GDataTable & { [key: string]: any }>;
  const renderWrapper = (options: ThisTypedShallowMountOptions<GDataTable> = {}) => {
    wrapper = shallowMount(GDataTable, options);
  };

  it('should render correctly with default props', () => {
    renderWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot with default style', () => {
    renderWrapper({
      propsData: {
        headers: headers(),
        items: items(),
        paginationConfig: paginationConfig(),
        sortConfig: sortConfig(),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot with items is empty', () => {
    const items = () => [];
    renderWrapper({
      propsData: {
        headers: headers(),
        items: items(),
        paginationConfig: paginationConfig(),
        sortConfig: sortConfig(),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render table with correct data', () => {
    const tableItems = items();
    const tableHeaders = headers();

    renderWrapper({
      propsData: {
        headers: tableHeaders,
        items: tableItems,
        paginationConfig: paginationConfig(),
        sortConfig: sortConfig(),
      },
    });

    const rows = wrapper.findAll('tbody tr');
    const columns = rows.at(0).findAll('td');

    const nameColumnInFirstRow = columns.at(0);
    const proteinColumnInFirstRow = columns.at(1);
    const ironColumnInFirstRow = columns.at(2);

    expect(nameColumnInFirstRow.text()).toEqual(tableItems[0]?.name?.toString());
    expect(proteinColumnInFirstRow.text()).toEqual(tableItems[0].protein?.value.toString());

    expect(ironColumnInFirstRow.text()).toEqual(`formatted-value: ${tableItems[0].iron?.toString()}`);

    const columnsInSecondRow = rows.at(1).findAll('td');

    const nameColumnInSecondRow = columnsInSecondRow.at(0);
    const proteinColumnInSecondRow = columnsInSecondRow.at(1);
    const ironColumnInSecondRow = columnsInSecondRow.at(2);

    expect(nameColumnInSecondRow.text()).toEqual(tableItems[1]?.name?.toString());
    expect(nameColumnInSecondRow.attributes('rowspan')).toEqual(tableItems[1].rowSpan?.length.toString());

    expect(proteinColumnInSecondRow.text()).toEqual('');
    expect(proteinColumnInSecondRow.attributes('rowspan')).toEqual(tableItems[1].rowSpan?.length.toString());

    expect(ironColumnInSecondRow.text()).toEqual(`formatted-value: ${tableItems[1].rowSpan?.[0].iron.toString()}`);

    const columnsInThirdRow = rows.at(3).findAll('td');
    const nameColumnInThirdRow = columnsInThirdRow.at(0);

    expect(nameColumnInThirdRow.text()).toEqual('');
  });

  describe('slots', () => {
    it('should render before table slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          before_table: '<div class="before-table"></div>',
        },
      });
      expect(wrapper.findAll('.before-table').length).toBe(1);
    });
    it('should render before header slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          before_header: '<div class="before-header"></div>',
        },
      });
      expect(wrapper.findAll('.before-header').length).toBe(1);
    });
    it('should render header slot with key', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          header_protein: '<div class="header-protein"></div>',
        },
      });
      expect(wrapper.findAll('.header-protein').length).toBe(1);
    });
    it('should render before row slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          before_row: '<div class="before-each-row"></div>',
        },
      });
      expect(wrapper.findAll('.before-each-row').length).toBe(items().length);
    });
    it('should render before nth row slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          before_row_0: '<div class="before-first-row"></div>',
        },
      });
      expect(wrapper.findAll('.before-first-row').length).toBe(1);
    });
    it('should render after nth row slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          after_row_0: '<div class="after-first-row"></div>',
        },
      });
      expect(wrapper.findAll('.after-first-row').length).toBe(1);
    });
    it('should render after row slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          after_row: '<div class="after-each-row"></div>',
        },
      });
      expect(wrapper.findAll('.after-each-row').length).toBe(items().length);
    });
    it('should render column slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          protein: '<div class="protein-column"></div>',
        },
      });
      expect(wrapper.findAll('.protein-column').length).toBe(items().length);
    });
    it('should render row slot as default slot', () => {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
        },
        slots: {
          default: '<div class="custom-row"></div>',
        },
      });
      expect(wrapper.findAll('.custom-row').length).toBe(items().length);
    });
  });

  describe('selectable', function () {
    it('should render checkbox in header and each row if selectable prop is true', function () {
      renderWrapper({
        propsData: {
          headers: headers(),
          items: items(),
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
          selectable: true,
        },
      });

      expect(wrapper.find('thead tr th gcheckbox-stub').exists()).toEqual(true);
      expect(wrapper.findAll('tbody tr td gcheckbox-stub').length).toEqual(items().length);
    });
    describe('selectAllItems', function () {
      it('should select all row if all row is not selected already and emit select event', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });

        wrapper.vm.selectAllItems();

        expect(wrapper.vm.selectedItems.length).toEqual(items().length);

        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual(items());
      });
      it('should select all row if all row is not selected already and emit select event with SELECT_ALL meta data', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });

        wrapper.vm.selectAllItems();

        expect(wrapper.vm.selectedItems.length).toEqual(items().length);

        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual(items());
        expect(wrapper.emitted().select?.[0]?.[1]).toEqual({
          actionType: 'SELECT_ALL',
          items: items(),
        });
      });
      it('should unselect all row if all row is selected', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
        });

        wrapper.vm.selectedItems = items();

        wrapper.vm.selectAllItems();

        expect(wrapper.vm.selectedItems.length).toEqual(0);

        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual([]);
      });
      it('should unselect all row if all row is selected with SELECT_ALL meta data', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
        });

        wrapper.vm.selectedItems = items();

        wrapper.vm.selectAllItems();

        expect(wrapper.vm.selectedItems.length).toEqual(0);
        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual([]);
        expect(wrapper.emitted().select?.[0]?.[1]).toEqual({
          actionType: 'UNSELECT_ALL',
          items: items(),
        });
      });
    });
    describe('onItemSelect', function () {
      it('should select row and emit select event with UNSELECT meta data ', async function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });
        wrapper.vm.selectedItems = [];

        await wrapper.vm.onItemSelect(items()[0]);

        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual([]);
        expect(wrapper.emitted().select?.[0]?.[1]).toEqual({
          actionType: 'UNSELECT',
          item: items()[0],
        });
      });
      it('should select row and emit select event with SELECT meta data', async function () {
        const selectedItem = items()[0];
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });
        wrapper.vm.selectedItems = [selectedItem];

        await wrapper.vm.onItemSelect(selectedItem);

        expect(wrapper.vm.selectedItems.length).toEqual(1);
        expect(wrapper.emitted().select).toBeTruthy();
        expect(wrapper.emitted().select?.[0]?.[0]).toEqual([selectedItem]);
        expect(wrapper.emitted().select?.[0]?.[1]).toEqual({
          actionType: 'SELECT',
          item: selectedItem,
        });
      });
    });
  });

  describe('pagination', function () {
    describe('on page change', function () {
      it('should emit page event with current page index', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });
        const page = 4;

        wrapper.vm.onPage(page);

        expect(wrapper.emitted().page).toBeTruthy();
        expect(wrapper.emitted().page?.[0]?.[0]).toEqual(page);

        expect(wrapper.emitted().paginationChange).toBeTruthy();
        expect(wrapper.emitted().paginationChange?.[0]?.[0]).toEqual({
          pageSizeText: 'Adet',
          pageSizeVisible: true,
          pagination: {
            page: 4,
            size: 20,
            totalElements: 1000,
            totalPages: 10,
          },
          reverse: false,
        });
      });
    });
    describe('on size change', function () {
      it('should emit page event with current page index', function () {
        const pageConfig = paginationConfig();

        pageConfig.pagination.size = 3;

        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: pageConfig,
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });
        const size = { value: 50 };

        wrapper.vm.onSize(size);

        expect(wrapper.emitted().size).toBeTruthy();
        expect(wrapper.emitted().size?.[0]?.[0]).toEqual(size);

        expect(wrapper.emitted().paginationChange).toBeTruthy();
        expect(wrapper.emitted().paginationChange?.[0]?.[0]).toEqual({
          pageLimits: undefined,
          pageSizeText: 'Adet',
          pageSizeVisible: true,
          pagination: {
            page: 0,
            size: 50,
            totalElements: 1000,
            totalPages: 10,
          },
          reverse: false,
        });
      });
    });
  });

  describe('sortable', function () {
    describe('on sort change', function () {
      it('should emit sort event with current sort data', function () {
        renderWrapper({
          propsData: {
            headers: headers(),
            items: items(),
            paginationConfig: paginationConfig(),
            sortConfig: sortConfig(),
            selectable: true,
          },
          data () {
            return {
              selectedItems: [],
            };
          },
        });
        const sort = {
          key: 'header_key',
          type: 'asc',
        };

        wrapper.vm.onSort(sort);

        expect(wrapper.emitted().sort).toBeTruthy();
        expect(wrapper.emitted().sort?.[0]?.[0]).toEqual(sort);
      });
    });
  });

  describe('methods/isSelected', () => {
    it('should return true if row exists in selected items', () => {
      const allItems = items();
      renderWrapper({
        propsData: {
          headers: headers(),
          items: allItems,
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
          selectable: true,
        },
      });

      wrapper.vm.selectedItems = [allItems[0]];

      expect(wrapper.vm.isSelected(allItems[0])).toBeTruthy();
    });
  });

  describe('slot/isLoading', () => {
    it('should render loading if isLoading is true', () => {
      const allItems = items();
      renderWrapper({
        propsData: {
          headers: headers(),
          items: allItems,
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
          selectable: true,
          isLoading: true,
        },
      });

      expect(wrapper.find('.table-loading').exists()).toBeTruthy();
    });

    it('should match snapshot with scoped slots', () => {
      const allItems = items();
      renderWrapper({
        scopedSlots: {
          loading: '<div class="loading-slot">loading</div>',
        },
        propsData: {
          headers: headers(),
          items: allItems,
          paginationConfig: paginationConfig(),
          sortConfig: sortConfig(),
          selectable: true,
          isLoading: true,
        },
      });
      expect(wrapper.find('.loading-slot').exists()).toBeTruthy();
    });
  });
});
