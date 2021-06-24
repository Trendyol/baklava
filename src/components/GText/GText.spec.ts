import { shallowMount, Wrapper } from '@vue/test-utils';
import GText from './';

describe('GText', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GText);
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render base color as default when color prop does not set', () => {
    expect(wrapper.vm.classNames).toEqual({ '-body': true, 'g-text': true, 'g-text-align-null': false, 'g-text-main-grey-500': true, '-inline': false });
  });

  it('should render given color when color prop set', async () => {
    // given
    wrapper.setProps({
      color: 'green-500',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({ '-body': true, 'g-text': true, 'g-text-align-null': false, 'g-text-green-500': true, '-inline': false });
  });

  it('should render given text-align when align prop set', async () => {
    // given
    wrapper.setProps({
      align: 'center',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.classNames).toEqual({
      '-body': true,
      'g-text': true,
      'g-text-main-grey-500': true,
      'g-text-align-center': true,
      '-inline': false,
    });
  });
});
