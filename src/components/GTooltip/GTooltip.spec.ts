import { shallowMount } from '@vue/test-utils';
import GTooltip from './';

describe('GTooltip', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(GTooltip, {
        propsData: {
            text: 'Tooltip Text',
        },
    });
  });

  it('should match snapshot when show is prop is given as false ', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render base variant as default when variant prop does not set', () => {
    expect(wrapper.vm.borderColorVars).toEqual({ '--border-color': 'var(--main-grey-500)' });
  });

  it('should render given variant when variant prop set', async () => {
    // given
    wrapper.setProps({
      variant: 'success',
    });

    // when
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.borderColorVars).toEqual({ '--border-color': 'var(--green-500)' });
  });

    it('shows the text if the tooltip trigger text is over or not', () => {
        wrapper.find('.g-tooltip').trigger('mouseover');
        wrapper.vm.$nextTick( () => {
            expect(wrapper.find('.text').text()).toContain('Tooltip Text');
        });
    });
});
