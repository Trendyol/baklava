import { storiesOf } from '@storybook/vue';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import GWizard from './GWizard.vue';
import GStep from '../GStep/GStep.vue';

storiesOf('GWizard', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GWizard })
  .add('base', () => ({
    components: { GWizard, GStep },
    data () {
      return {
        activeStep: 'step1',
      };
    },
    template: `
      <div style="text-align: center; margin:100px;">
        <GWizard v-model="activeStep">
          <template slot="content-view">
            <GStep :slug="'step1'" :title="'StepName1'">StepName1Content</GStep>
            <GStep :slug="'step2'" :title="'StepName2'">StepName2Content</GStep>
            <GStep :slug="'step3'" :title="'StepName3'">StepName3Content</GStep>
          </template>
        </GWizard>
        </div>
      `,
  }));
