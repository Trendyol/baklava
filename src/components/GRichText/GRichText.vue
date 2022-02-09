<template>
  <div :class="wrapperClass">
    <quill-editor
      :options="options"
      :value="value"
      :disabled="disable"
      v-on="$listeners"
    />
    <div class="feedback">
      {{ feedback }}
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'GRichText',
  components: {
    quillEditor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    feedback: {
      type: String,
      default: '',
    },
    success: {
      default: false,
      type: Boolean,
    },
    error: {
      default: false,
      type: Boolean,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      defaultOpts: {
        placeholder: '', // placeholder'li test
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ direction: 'rtl' }],
            [{ align: [] }],
          ],
        },
      },
    };
  },
  beforeMount () {
    Object.assign(this.options, this.defaultOpts, this.opts);
  },
  computed: {
    wrapperClass () {
      return {
        'g-rich-text': true,
        '-error': this.error,
        '-valid': this.success,
        '-disable': this.disable,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~quill/dist/quill.core.css';
  @import '~quill/dist/quill.snow.css';
  @import '~quill/dist/quill.bubble.css';

  .g-rich-text {
    .quill-editor {
      ::v-deep .ql-toolbar {
        border: solid 1px #afbbca;
        border-radius: 4px 4px 0 0;
        padding: 4px;
      }

      ::v-deep .ql-container {
        border: solid 1px #afbbca;
        border-radius: 0 0 4px 4px;
        border-top: 0;
      }

      ::v-deep .ql-editor strong {
        font-weight: bold;
      }

      ::v-deep .ql-editor em {
        font-style: italic;
      }
    }

    .feedback {
      font-family: var(--font-family-base);
      font-size: var(--font-size-12);
      font-weight: normal;
      margin-top: 5px;
      margin-left: 10px;
      color: var(--dark-grey-500);
    }

    &.-error {
      ::v-deep .ql-container {
        border-color: var(--red-500) !important;
      }

      ::v-deep .ql-toolbar {
        border-color: var(--red-500) !important;
      }

      .feedback {
        color:  var(--red-500) !important;
      }
    }
    &.-valid {
      ::v-deep .ql-container {
        border-color: var(--green-500) !important;
      }

      ::v-deep .ql-toolbar {
        border-color: var(--green-500) !important;
      }

      .feedback {
        color:  var(--green-500) !important;
      }
    }
    &.-disable {
      ::v-deep .ql-container {
        border-color: var(--mid-grey-800) !important;
        background: var(--bg-grey-500);
      }

      ::v-deep .ql-toolbar {
        border-color: var(--mid-grey-800) !important;
      }

      .feedback {
        color: var(--dark-grey-500) !important;
      }
    }
  }

</style>
