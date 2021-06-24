import { storiesOf } from '@storybook/vue';
import GExcelDropdown from './GExcelDropdown.vue';
import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';

storiesOf('GExcelDropdown', module)
  .addParameters({ component: GExcelDropdown })
  .addDecorator(withKnobs)
  .add('Base', () => ({
    components: { GExcelDropdown },
    props: {
      historyIntervalMs: {
        default: number('historyIntervalMs', 15000),
      },
    },
    methods: {
      excelUpload (event) {
        action('excelUpload')();
      },
      excelUploadHistory () {
        action('excelUploadHistory')();
      },
      excelDownload (event) {
        action('excelDownload')();
      },
      excelTabType (event) {
        action('excelTabType')();
      },
      excelDownloadHistory () {
        action('excelDownloadHistory')();
      },
    },
    template: `
      <GExcelDropdown
        :download-tab-text="'Daha önce eklediğiniz excel bulunmamaktadır.'"
        :upload-tab-text="'Daha önce eklediğiniz excel bulunmamaktadır.'"
        :download-button-text="'EXCEL İNDİR'"
        :upload-button-text="'EXCEL YÜKLE'"
        :excel-history-list="[]"
        :history-interval-ms="historyIntervalMs"
        @excelTapType="excelTabType"
        @excelUpload="excelUpload"
        @excelUploadHistory="excelUploadHistory"
        @excelDownload="excelDownload"
        @excelDownloadHistory="excelDownloadHistory"
      />
    `,
  }))
  .add('Only Download', () => ({
    components: { GExcelDropdown },
    props: {
      historyIntervalMs: {
        default: number('historyIntervalMs', 15000),
      },
    },
    methods: {
      excelDownload (event) {
        action('excelDownload')();
      },
      excelDownloadHistory () {
        action('excelDownloadHistory')();
      },
    },
    template: `
      <GExcelDropdown
        :excel-history-list="[{
          status: 'CREATED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }, {
          status: 'CREATED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }, {
          status: 'FAILED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }]"
        :history-interval-ms="historyIntervalMs"
        @excelDownload="excelDownload"
        @excelDownloadHistory="excelDownloadHistory"
        download
      />
    `,
  }))
  .add('With Upload And Download', () => ({
    components: { GExcelDropdown },
    props: {
      historyIntervalMs: {
        default: number('historyIntervalMs', 15000),
      },
    },
    methods: {
      excelUpload (event) {
        action('excelUpload')();
      },
      excelUploadHistory () {
        action('excelUploadHistory')();
      },
      excelDownload (event) {
        action('excelDownload')();
      },
      excelDownloadHistory () {
        action('excelDownloadHistory')();
      },
    },
    template: `
      <GExcelDropdown
        :excel-history-list="[{
          status: 'CREATED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }, {
          status: 'CREATED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }, {
          status: 'FAILED',
          fileName: 'deneme',
          downloadUrl: 'deneme',
        }]"
        :history-interval-ms="historyIntervalMs"
        @excelUpload="excelUpload"
        @excelUploadHistory="excelUploadHistory"
        @excelDownload="excelDownload"
        @excelDownloadHistory="excelDownloadHistory"
      />
    `,
  }));
