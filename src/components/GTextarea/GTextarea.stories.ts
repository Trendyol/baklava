import { storiesOf } from '@storybook/vue';
import GTextarea from './GTextarea.vue';

storiesOf('GTextarea', module)
  .addParameters({ component: GTextarea })
  .add('Default', () => ({
    components: { GTextarea },
    data () {
      return {
        email: '',
      };
    },
    methods: {
      onReachMaxLength (maxLength) {
        console.log(maxLength);
      },
    },
    template: `
      <div style="margin: 40px 200px 200px">
      <GTextarea
        class="g-mb-20"
        label="Email"
        v-model="email"
        :maxlength="30"
        :showProgress="true"
        @reachMaxLength="onReachMaxLength"
      />
      EMAIL: {{ email }}<br><br><br><br>
      <GTextarea class="g-mb-20" label="Email" icon="info" :showProgress="true" />
      <GTextarea class="g-mb-20" label="Email" feedback="feedback" />
      <GTextarea class="g-mb-20" label="Email" feedback="feedback" isOutlineLabel />
      </div>`,
  }))
  .add('States', () => ({
    components: { GTextarea },
    template: `
      <div style="margin: 40px 200px 200px">
      <GTextarea class="g-mb-20" label="Email" disable feedback="feedback" isOutlineLabel />
      <GTextarea class="g-mb-20" label="Email" disable icon="info" />
      <GTextarea class="g-mb-20" label="Email" error feedback="feedback" isOutlineLabel />
      <GTextarea class="g-mb-20" label="Email" error icon="info" />
      <GTextarea class="g-mb-20" label="Email" success feedback="feedback" isOutlineLabel />
      <GTextarea class="g-mb-20" label="Email" success icon="info" />
      </div>`,
  }));
