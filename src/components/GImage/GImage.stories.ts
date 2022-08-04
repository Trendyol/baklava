// @ts-nocheck
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import GImage from './GImage.vue';

const stories = storiesOf('GImage', module);
stories.addDecorator(withKnobs);

stories
  .addParameters({ component: GImage })
  .add('default', () => ({
    components: { GImage },
    template: '<GImage />',
  }))
  .lokiSkip('src', () => ({
    components: { GImage },
    props: {
      src: {
        default: text('Source', 'https://picsum.photos/500?random'),
      },
      width: {
        default: text('Width', ''),
      },
      height: {
        default: text('Height', ''),
      },
      maxWidth: {
        default: text('Max Width', '500'),
      },
      maxHeight: {
        default: text('Max Height', '500'),
      },
    },
    template: `<GImage
                :src="src"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />`,
  }))
  .lokiSkip('src lazy load', () => ({
    components: { GImage },
    props: {
      src: {
        default: text('Source', 'https://picsum.photos/500?random'),
      },
      defaultImage: {
        default: text('Default Image', 'https://cdn.dsmcdn.com/seller-center/spm/seller-center-product/assets/default.jpg'),
      },
      errorImage: {
        default: text(
          'Error Image',
          'https://cdn.dsmcdn.com/seller-center/spm/seller-center-product/assets/default.jpg'
        ),
      },
      width: {
        default: text('Width', ''),
      },
      height: {
        default: text('Height', ''),
      },
      maxWidth: {
        default: text('Max Width', '500'),
      },
      maxHeight: {
        default: text('Max Height', '500'),
      },
      retry: {
        default: number('Retry', 5),
      },
    },
    template: `
    <div>
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
         <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight" />
          <GImage
                :src="src"
                :defaultImage="defaultImage"
                :errorImage="errorImage"
                :width="width"
                :height="height"
                :maxWidth="maxWidth"
                :maxHeight="maxHeight"
                :retry="retry" />
    </div>`,
  }));
