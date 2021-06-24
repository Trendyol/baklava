import { mount } from '@vue/test-utils';
import GTextarea from '.';

describe('GTextarea', () => {
  let wrapper: any;

  it('should match snapshot when show is prop is given as false ', () => {
    wrapper = mount(GTextarea);

    expect(wrapper.element).toMatchSnapshot();
  });
});