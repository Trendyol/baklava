import { mount } from '@vue/test-utils';
import GButtonGroup from './';

describe('GButtonGroup', () => {
  let wrapper: any;

  const renderWrapper = (options: Object = {}) => {
    wrapper = mount(GButtonGroup, {
      ...options,
    });
  };

  it('should match snapshot', () => {
    renderWrapper();
    expect(wrapper.find('div').classes())
      .toEqual(['g-button-group', '-light']);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with correct classess', () => {
    renderWrapper({
      propsData: { variant: 'primary' },
    });
    expect(wrapper.find('div').classes())
      .toEqual(['g-button-group', '-primary']);
  });
});
