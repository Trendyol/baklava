// @ts-nocheck
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GToasterPlugin from '../../plugins/GToaster.plugin';
import GToaster from '../GToaster';
import GButton from '../GButton';
import { GToasterOptions } from '@/components/GToaster/types';

const stories = storiesOf('GToaster', module);

stories.addDecorator(withKnobs);

Vue.use(GToasterPlugin, { GToaster });

stories
  .add('Show Defaults', () => ({
    template: `
      <div style="display: flex; flex-direction: column; width: 200px">
        <GButton @click="showSuccess" variant="success">Show Success</GButton>
        <GButton @click="showError" variant="danger">Show Error</GButton>
        <GButton @click="showWarning" variant="warning">Show Warning</GButton>
        <GButton @click="showInfo" variant="info">Show Info</GButton>
        <GButton @click="hideAll" class="btn btn-dark">Hide All</GButton>
     </div>
    `,
    components: {
      GButton,
    },
    methods: {
      showSuccess () {
        Vue.$toast.success();
      },
      showError (): void {
        // @ts-ignore
        this.$toast.error();
      },
      showWarning () {
        Vue.$toast.warning('Warning', {
          onCloseCallback: (message: any) => {
            action('On Close')(message);
          },
          onShowCallback: (message: any) => {
            action('On Show')(message);
          },
        });
      },
      showInfo () {
        // @ts-ignore
        this.$toast.info('Info');
      },
      hideAll () {
        // @ts-ignore
        this.$toast.hideAll();
      },
    },
    mounted () {
      const toastTypes = ['error', 'success', 'warning', 'info'];
      toastTypes.forEach(variant => {
        // @ts-ignore
        this.$toast[variant]('Message');
      });
    },
  }))
  .add('Show with options', () => ({
    props: {
      type: {
        default: select('Toaster Type', ['success', 'error', 'warning', 'info'], 'success'),
      },
      message: {
        default: text('Message', 'Message'),
      },
      title: {
        default: text('Title', 'Title'),
      },
      autoClose: {
        default: boolean('Auto Close (Related with Duration)', true),
      },
      duration: {
        default: number('Duration', 3000),
      },
      closeOnClick: {
        default: boolean('Close On Click', false),
      },
      unique: {
        default: boolean('Unique (Related with Group Name)', false),
      },
      group: {
        default: text('Group Name', 'Unique Name'),
      },
      textColor: {
        default: text('Text Color', 'text-white'),
      },
    },
    components: {
      GButton,
    },
    template: `
        <GButton @click="showMessage" class="btn btn-primary">Show Toaster</GButton>
    `,
    methods: {
      showMessage (): void {
        const options: GToasterOptions = {
          ...this.duration ? { duration: this.duration } : {},
          ...{ closeOnClick: this.closeOnClick },
          ...this.group ? { group: this.group } : {},
          ...{ unique: this.unique },
          ...{ autoClose: this.autoClose },
          ...{ title: this.title },
          ...{ textColor: this.textColor },
          onCloseCallback: (message) => {
            action('On Close')(message);
          },
          onShowCallback: (message) => {
            action('On Show')(message);
          },
        };

        // @ts-ignore
        this.$toast[this.type](this.message, options);
      },
    },
  }));
