import { mount } from '@vue/test-utils';
import GModal from './';
import GIcon from '../GIcon/GIcon.vue';

describe('GModal', () => {
  let wrapper: any;

  const renderWrapper = (options?: any) => {
    wrapper = mount(GModal, {
      propsData: {
        value: false,
      },
      slots: {
        body: '<div>Cras mattis consectetur purus sit amet fermentum.</div>',
        footer: '<button>Close</button>',
      },
      ...options,
    });
  };

  beforeEach(() => {
    jest.spyOn(document.body.classList, 'add');
    jest.spyOn(document.body.classList, 'remove');
    renderWrapper();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', async () => {
    await wrapper.setProps({ value: true, title: 'Custom Title' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match with snapshot with size', async () => {
    await wrapper.setProps({ value: true, large: true, scrollable: true, title: 'Custom Title' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render modal component with default values', () => {
    const modalWrapper = wrapper.find('.g-modal').element.style.getPropertyValue('display');

    expect(modalWrapper).toBe('none');
  });

  it('should render modal component with given props', async () => {
    await wrapper.setProps({ value: true, title: 'Custom Title' });

    const modalWrapper = wrapper.find('.g-modal-mask').element.style.getPropertyValue('display');
    const headerText = wrapper.find('.g-modal-header .g-text');

    expect(modalWrapper).toBe('');
    expect(headerText.text()).toBe('Custom Title');
  });

  it('should add conditinial classes', async () => {
    await wrapper.setProps({ value: true, large: true, scrollable: true });

    const modalWrapper = wrapper.find('.g-modal-wrapper');

    expect(modalWrapper.classes()).toContain('-large');
    expect(modalWrapper.classes()).toContain('-scrollable');
  });

  it('should emit close event when click the x button', async () => {
    await wrapper.setProps({ value: true });

    const closeButton = wrapper.findComponent(GIcon);
    closeButton.trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should emit close event when click the modal mask', async () => {
    await wrapper.setProps({ value: true });

    const modalMask = wrapper.find('.g-modal-mask');
    modalMask.trigger('click');

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('should add g-no-scroll if modal is open', async () => {
    // given
    jest.clearAllMocks();

    // when
    await wrapper.setProps({ value: true });

    // then
    expect(document.body.classList.add).toHaveBeenCalledWith('g-no-scroll');
    expect(document.body.classList.remove).not.toHaveBeenCalled();
  });

  it('should remove g-no-scroll if modal is close', async () => {
    // given
    jest.clearAllMocks();

    // when
    await wrapper.setProps({ value: true });
    await wrapper.setProps({ value: false });

    // then
    expect(document.body.classList.add).toHaveBeenCalledTimes(1);
    expect(document.body.classList.remove).toHaveBeenCalledWith('g-no-scroll');
  });

  it('should remove g-no-scroll before destroy', async () => {
    // given
    jest.clearAllMocks();

    // when
    wrapper.destroy();

    // then
    expect(document.body.classList.remove).toHaveBeenCalledWith('g-no-scroll');
  });

  it('should close model if outside of modal is clicked', async () => {
    // given
    jest.clearAllMocks();

    // when
    wrapper.find('.g-modal-mask').trigger('click');

    // then
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should not close model if closeClickOutside is false and clicked outside of modal', async () => {
    // given
    jest.clearAllMocks();

    wrapper.setProps({
      closeClickOutside: false,
    });

    // when
    wrapper.find('.g-modal-mask').trigger('click');

    // then
    expect(wrapper.emitted().input).toBeFalsy();
    expect(wrapper.emitted().close).toBeFalsy();
  });
});
