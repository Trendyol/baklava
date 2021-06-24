import { storiesOf } from '@storybook/vue';
import GRichText from './';

const stories = storiesOf('GRichText', module);

stories
  .add('Default', () => ({
    components: {
      GRichText,
    },
    data () {
      return {
        data: 'default text',
        data2: 'default text',
        data3: 'default text',
        opts: {
          placeholder: '',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
          }
        }
      }
    },
    template: `<div style="margin: 40px 200px 200px">
        <g-rich-text v-model="data" feedback="Buraya yalnizca 50 karakter girebilirsiniz!"></g-rich-text>
        <br />
        <g-rich-text v-model="data2" :error="true" feedback="Lutfen gerekli alanlari doldurun!" :opts="opts"></g-rich-text>
        <br />
        <g-rich-text v-model="data3" :success="true" feedback="Aferin cok iyi girdin yaziyi!" :opts="opts"></g-rich-text>
        <br />
        <g-rich-text :disable="true" feedback="Su an disabled, buraya yazi yazamazsin!" :opts="opts"></g-rich-text>
    </div>`
  }))

