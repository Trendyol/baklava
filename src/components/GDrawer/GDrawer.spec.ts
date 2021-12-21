import { mount } from '@vue/test-utils';
import GDrawer from '.';
import GIcon from '../GIcon';

describe('GDrawer', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(GDrawer);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper.setProps({
      url: '',
      title: 'Help',
      show: false,
      top: 0
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should props with default values when no props are set', () => {
    expect(wrapper.vm.classNames).toEqual({
      'g-drawer': true,
    });
  });

  it('should render prop set', async () => {
    // given

    wrapper.setProps({
      url: '',
      title: 'Help',
      show: true,
      top: 0
    });

    expect(wrapper.find('.g-drawer-content'))
    expect(wrapper.find('.g-drawer-title'))
  });
});
