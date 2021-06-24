import { mount } from '@vue/test-utils';
import GTabs from './GTabs.vue';

describe('GTabs', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(GTabs);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should match snapshot given props ', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
      type: 'all',
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should tabs return [] with default props', () => {
    expect(wrapper.vm.tabs).toEqual([]);
  });

  it('should render GTabs Component', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
      type: 'announcement',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.tab').exists()).toBe(true);
    expect(wrapper.find('.active').exists()).toBe(true);
    expect(wrapper.find('.active .tab-title').text()).toBe('DUYURU');
  });

  it('should render GTabs Component when type not given', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.tab').exists()).toBe(true);
    expect(wrapper.find('.active').exists()).toBe(false);
  });

  it('should render GTabs Component when showCount true', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
      type: 'announcement',
      showCount: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.tab').exists()).toBe(true);
    expect(wrapper.find('.active').exists()).toBe(true);
    expect(wrapper.find('.tab-count').exists()).toBe(true);
  });

  it('should render GTabs Component when fluid true', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
      type: 'announcement',
      showCount: true,
      fluid: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.-fluid').exists()).toBe(true);
    expect(wrapper.find('.tab').exists()).toBe(true);
    expect(wrapper.find('.active').exists()).toBe(true);
    expect(wrapper.find('.tab-count').exists()).toBe(true);
  });

  it('should change active tab', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
      }],
      type: 'announcement',
    });

    await wrapper.vm.$nextTick();

    wrapper.findAll('.tab').at(0).trigger('click');
    wrapper.setProps({ type: 'all' });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.active .tab-title').text()).toBe('TÜMÜ');
  });

  it('should show new text if tab has a isNew property', async () => {
    wrapper.setProps({
      tabs: [{
        type: 'all',
        label: 'TÜMÜ',
        totalElements: 99,
      }, {
        type: 'announcement',
        label: 'DUYURU',
        totalElements: 12,
        isNew:{
          color: 'white',
          text: 'YENİ',
          bgColor: 'red-500',
        }
      }],
      type: 'announcement',
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.tab-name .is-new').text()).toBe('YENİ');
  });
});
