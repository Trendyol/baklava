import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GDatePicker from './';
import GButton from '../GButton/GButton.vue';
import GIcon from '../GIcon/GIcon.vue';
import dayjs from 'dayjs';

storiesOf('GDatePicker', module)
  .addDecorator(withKnobs)
  .addParameters({ component: GDatePicker })
  .add('Single Select', () => ({
    components: { GDatePicker, GButton, GIcon },
    template: `
      <div style="margin: 40px 200px 200px">
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="date"
          @change="onChange"
          :show-week-number="showWeekNumber"
          :range="isRangeMode"
          :disabled="disabled"
          :placeholder="placeholder"
          :format="format"
          :type="type"
          :open.sync="open"
        >
          <template v-slot:header="{emit}">
            <GButton :disabled="type==='date'" @click="switchToDaily" size="small">
              Günlük
            </GButton>
            <GButton :disabled="type==='week'" @click="switchToWeekly(emit)" size="small">
              Haftalık
            </GButton>
            <GButton :disabled="type==='month'" @click="switchToMonthly(emit)" size="small">
              Aylık
            </GButton>
            <GButton :disabled="type==='year'" @click="switchToYearly(emit)" size="small">
              Yıllık
            </GButton>
          </template>
          <template v-slot:footer="{emit}">
            <GButton @click="switchToYesterday(emit)" outline size="small">
              Dün
            </GButton>
            <GButton @click="switchToToday(emit)" outline size="small">
              Bugün
            </GButton>
            <GButton @click="switchToLast7Days(emit)" outline size="small">
              Son 7 Gün
            </GButton>
            <GButton @click="switchToLast30Days(emit)" outline size="small">
              Son 30 Gün
            </GButton>
          </template>
        </GDatePicker>
      </div>
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="date"
          @change="onChange"
          lang="en"
          :disabled="disabled"
          error
        >
        </GDatePicker>
      </div>
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="date"
          @change="onChange"
          :disabled="disabled"
          success
        >
        </GDatePicker>
      </div>
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="date"
          @change="onChange"
          :disabled="disabled"
          disabled
        >
        </GDatePicker>
      </div>
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="hour"
          @change="onChange"
          :disabled="disabled"
          format="hh:mm a"
          value-type="format"
          type="time"
        >
        </GDatePicker>
      </div>
      <div style="margin-bottom: 10px">
        <GDatePicker
          v-model="hour"
          type="time"
          format="HH:mm"
          @change="onChange"
          :disabled="disabled"
        >
          <template v-slot:icon-calendar>
            <GIcon name="clock" stroke="#fff" size="16px"/>
          </template>
        </GDatePicker>
      </div>
      <button @click="onClear">Temizle</button>
      <div><a href="https://github.com/mengxiong10/vue2-datepicker">vue2-datepicker</a></div>
      </div>
      <script>
      import GIcon from './GIcon';
      export default {
        components: { GIcon },
      };
      </script>`,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      placeholder: {
        default: text('Placeholder', ''),
      },
      format: {
        default: text('format', 'DD.MM.YYYY'),
      },
      type: {
        default: text('type', 'date'),
      },
      open: {
        default: boolean('Open', false),
      },
      showWeekNumber: {
        default: boolean('showWeekNumber', false),
      },
      isRangeMode: {
        default: boolean('isRangeMode', false),
      },
    },
    data () {
      return {
        date: new Date(1601141826127),
        hour: '',
      };
    },
    methods: {
      onClear () {
        // @ts-ignore
        this.date = null;
      },
      switchToLast30Days (emit) {
        // @ts-ignore
        this.isRangeMode = true;
        // @ts-ignore
        this.type = '';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';

        const today = new Date();
        const dateOfLast30Days = new Date(new Date().setDate(new Date().getDate() - 30));
        const startDate = new Date(dayjs(dateOfLast30Days).startOf('day').format());
        const endDate = new Date(dayjs(today).endOf('day').format());
        const date = [startDate, endDate];
        emit(date);

        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToLast7Days (emit) {
        // @ts-ignore
        this.isRangeMode = true;
        // @ts-ignore
        this.type = '';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';

        const today = new Date();
        const dateOfLast7Days = new Date(new Date().setDate(new Date().getDate() - 7));
        const startDate = new Date(dayjs(dateOfLast7Days).startOf('day').format());
        const endDate = new Date(dayjs(today).endOf('day').format());
        const date = [startDate, endDate];
        emit(date);

        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToYearly () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.date = new Date();
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.type = 'year';
        // @ts-ignore
        this.format = 'YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToMonthly () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.date = new Date();
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.type = 'month';
        // @ts-ignore
        this.format = 'MM YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToWeekly () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.date = new Date();
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.type = 'week';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open = true});
      },
      switchToDaily () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.date = new Date();
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.type = 'date';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToToday () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.date = new Date();
        // @ts-ignore
        this.type = 'date';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      switchToYesterday () {
        // @ts-ignore
        if (this.isRangeMode) {
          // @ts-ignore
          this.isRangeMode = false;
        }
        // @ts-ignore
        this.date = new Date(new Date().setDate(new Date().getDate() - 1));
        // @ts-ignore
        this.type = 'date';
        // @ts-ignore
        this.format = 'DD.MM.YYYY';
        // @ts-ignore
        this.open = false;
        // @ts-ignore
        this.$nextTick(()=>{this.open=true});
      },
      onChange (event, data) {
        action('Change')(event, data);
      },
    },
  }))
  .add('Range Select', () => ({
    components: { GDatePicker },
    template: `
    <div style="margin: 40px 200px 200px">
      <div style="margin-bottom: 10px"><GDatePicker
        v-model="date"
        @change="onChange"
        :disabled="disabled"
        :placeholder="placeholder"
        :format="format"
        range
      >
      </GDatePicker>
      <div><a href="https://github.com/mengxiong10/vue2-datepicker">vue2-datepicker</a></div>
      </div>
    </div>
    `,
    props: {
      disabled: {
        default: boolean('Disabled', false),
      },
      placeholder: {
        default: text('Placeholder', ''),
      },
      format: {
        default: text('format', 'DD.MM.YYYY'),
      },
    },
    data () {
      return {
        date: new Date(1601141826127),
      };
    },
    methods: {
      onChange (event) {
        action('Change')(event);
      },
    },
  }));
