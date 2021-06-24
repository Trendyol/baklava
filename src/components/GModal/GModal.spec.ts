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
    renderWrapper();
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
});
