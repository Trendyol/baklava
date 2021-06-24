import { shallowMount, Wrapper } from '@vue/test-utils';
import GToaster from './';
import { GToasterItem } from '@/components/GToaster/types';

type GToasterType = {[key: string]: any}

describe('Toaster', () => {
  let wrapper: Wrapper<GToaster & GToasterType>;
  const renderWrapper = () => {
    wrapper = shallowMount(GToaster);
  };
  const clearTimeout = global.clearTimeout;

  beforeEach(() => {
    renderWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  afterAll(() => {
    global.clearTimeout = clearTimeout;
  });

  it('should match snapshot on initial state', () => {
    expect(wrapper.element)
      .toMatchSnapshot();
  });

  it('should match snapshot which is a success toaster, if config is not passed', () => {
    const successMessage = 'It is a warning';

    wrapper.vm.toast(successMessage);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should show variant name as a title, if title is not given', () => {
    wrapper.vm.toast('It is a test', {
      variant: 'error',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot which is as changed title and warning message, if title and warning variant is passed', () => {
    const warningMessage = 'It is a warning';

    wrapper.vm.toast(warningMessage, {
      title: 'Test Title',
      variant: 'warning',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('show toasts as reversed', () => {
    wrapper.vm.toast('This is a error 1', {
      title: 'Test Title 1',
      variant: 'error',
    });
    wrapper.vm.toast('This is a error 2', {
      title: 'Test Title 2',
      variant: 'error',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not show same group toast if "unique" is passed as true', () => {
    wrapper.vm.toast('This is a error 1', {
      title: 'Test Title 1',
      group: 'testGroup',
      variant: 'error',
    });
    wrapper.vm.toast('This is a error 2', {
      title: 'Test Title 2',
      group: 'testGroup',
      unique: true,
      variant: 'error',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be disappeared after given duration time', async (done) => {
    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
      duration: 50,
    });

    setTimeout(() => {
      expect(wrapper.element).toMatchSnapshot();
    }, 10);

    setTimeout(() => {
      expect(wrapper.find('.toaster').exists()).toBe(false);

      done();
    }, 55);
  });

  it('should be disappeared if click close button', async () => {
    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
    });

    await wrapper.vm.$nextTick();
    wrapper.find('.close').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toaster').exists()).toBe(false);
  });

  it('should clear all auto close timeout before component destroy', () => {
    global.clearTimeout = jest.fn();

    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
      duration: 50,
    });

    wrapper.destroy();

    expect(global.clearTimeout).toBeCalled();
  });

  it('should close on click if the closeOnClick flag is set to true.', async () => {
    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
    });

    await wrapper.vm.$nextTick();
    wrapper.find('.toaster').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toaster').exists()).toBe(false);
  });

  it('should be able to render a component when a vue instance is provided.', async () => {
    wrapper.vm.toast({ name: 'this-is-a-test-component', template: '<p>This is a test 1</p>' }, {
      title: 'Test Title 1',
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('this-is-a-test-component-stub').exists()).toBe(true);
  });

  it('should hide all toasters when hide all called.', async () => {
    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toast('This is a test 2', {
      title: 'Test Title 2',
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.toaster').length).toEqual(2);

    wrapper.vm.hideAll();
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.toaster').length).toEqual(0);
  });

  it('should call given onShowCallback after showing message', async () => {
    const onShowCallback = jest.fn();
    const messageItem: GToasterItem = {
      closeOnClick: true,
      closed: false,
      durationObject: { autoClose: false, seconds: 2000 },
      group: 'default',
      id: 0,
      message: 'This is a test 1',
      props: null,
      title: 'Test Title 1',
      unique: undefined,
      variantObject: { className: 'success' },
    };
    const { textColor, variantObject, durationObject, ...restItem } = messageItem;

    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
      onShowCallback,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.toaster').length).toEqual(1);

    expect(onShowCallback).toBeCalledWith(restItem);
  });

  it('should call given onCloseCallback after closing message', async () => {
    const onCloseCallback = jest.fn();
    const messageItem: GToasterItem = {
      closeOnClick: true,
      closed: true,
      durationObject: { autoClose: false, seconds: 2000 },
      group: 'default',
      id: 0,
      message: 'This is a test 1',
      props: null,
      title: 'Test Title 1',
      unique: undefined,
      variantObject: { className: 'success' },
    };
    const { textColor, variantObject, durationObject, ...restItem } = messageItem;

    wrapper.vm.toast('This is a test 1', {
      title: 'Test Title 1',
      onCloseCallback,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toaster').length).toEqual(1);
    wrapper.vm.hideAll();
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.toaster').length).toEqual(0);

    expect(onCloseCallback).toBeCalledWith(restItem);
  });

  it('should execute onCloseCallback if message is not closed', () => {
    const item: GToasterItem = {
      id: 1,
      closed: false,
      onCloseCallback: jest.fn(),
      durationObject: { seconds: 0, autoClose: false },
    };

    wrapper.vm.executeCallback(item, 'onCloseCallback');

    expect(item.onCloseCallback).toBeCalledWith({ id: 1, closed: true });
  });

  it('should not execute onCloseCallback if message is closed', () => {
    const item: GToasterItem = {
      id: 1,
      closed: true,
      onCloseCallback: jest.fn(),
      durationObject: { seconds: 0, autoClose: false },
    };

    wrapper.vm.executeCallback(item, 'onCloseCallback');

    expect(item.onCloseCallback).not.toBeCalled();
  });

  it('should execute onShowCallback', () => {
    const item: GToasterItem = {
      id: 1,
      closed: false,
      onShowCallback: jest.fn(),
      durationObject: { seconds: 0, autoClose: false },
    };

    wrapper.vm.executeCallback(item, 'onShowCallback');

    expect(item.onShowCallback).toBeCalledWith({ closed: false, id: 1 });
  });
});
