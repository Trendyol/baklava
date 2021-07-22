import { storiesOf } from '@storybook/vue';
import ColorPalette from './GColorPalette.vue';
import GText from '../GText/GText.vue';
import GBox from '../GBox/GBox.vue';
import GIcon from '../GIcon/GIcon.vue';
import colorPalette from "./colorPalette";
import { withKnobs } from '@storybook/addon-knobs';
const stories = storiesOf('Core|Colors', module);

stories.addDecorator(withKnobs);
stories
  .addParameters({ component: ColorPalette })
  .add('Default', () => ({
    data () {
      return {
        allColors : colorPalette,
      }
    },
    components: { ColorPalette, GIcon, GText, GBox },
    template: `
      <GBox
        class="g-col-lg-shift-2 g-col-lg-8"
        :mt="30"
      >
        <GBox :pb="30">
          <GText
            color="main-grey-500"
            variant="headline-02"
          >
            Colors
          </GText>
          <GBox :py="30">
            <span class="g-fs-18 g-text-main-grey-700">
              Choose colors for UI elements such as labels, text,
              backgrounds, and links.
            </span>
          </GBox>
          <GBox flex direction="column">
            <GText
              color="main-grey-500"
              variant="headline-03"
            >
              Usage
            </GText>
            <span class="g-fs-18 g-text-main-grey-700 g-pt-20">
              To apply a color to an element, apply the following classes rules. The actual color for
              each modifier is defined by the UIkit style that you have chosen.
            </span>
            <span class="g-fs-18 g-text-main-grey-700 g-pt-20">
              Background class rule: g-bg-{tag-name}
            </span>
            <GBox
              flex
              :mt="20"
            >
              <span
                class="g-bg-red-500 g-text-bg-grey-900 g-px-10 g-py-28"
              >
                g-bg-red-500
              </span>
            </GBox>
            <span class="g-fs-18 g-text-main-grey-700 g-pt-20">
              Text class rule: g-text-{tag-name}
            </span>
            <span
              class="g-text-red-500 g-pt-20"
            >
              g-text-red-500
            </span>
          </GBox>
        </GBox>
        <ColorPalette
          v-for="(colors,index) in allColors"
          :palette="colors"
          :key="index"
        />
      </GBox>`,
}));
