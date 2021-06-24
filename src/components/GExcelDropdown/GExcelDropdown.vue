<template>
  <div class="g-excel-dropdown">
    <GButtonDropdown
      variant="success"
      :is-dropdown-open="isDropDownOpen"
      @onDropdownOpen="onDropdownOpen"
      @onDropdownClose="onDropdownClose"
    >
      {{ buttonText }}
      <template #menu>
        <GTabs
          v-if="!download"
          :tabs="tabs"
          :type="type"
          @handleTabClick="handleTabClick"
        />
        <div class="excel-history">
          <div class="g-mb-16 title">
            <GText
              v-if="type === 'download'"
              variant="subtitle-03"
              color="green-500"
            >
              İNDİRME GEÇMİŞİM
            </GText>
            <GText
              v-else
              variant="subtitle-03"
              color="green-500"
            >
              YÜKLEME GEÇMİŞİM
            </GText>
          </div>
          <ul class="list">
            <li
              v-if="excelHistoryList.length === 0"
              @click="handleExcelDownload"
              class="list-item no-data"
            >
              <GText
                v-if="downloadTabText || uploadTabText"
                variant="menu-item"
              >
                <template v-if="type === 'download'">
                  {{ downloadTabText }}
                </template>
                <template v-else>
                  {{ uploadTabText }}
                </template>
              </GText>
            </li>
            <li
              v-else
              class="g-d-flex g-d-align-items-center list-item"
              v-for="(listItem, index) in excelHistoryList"
              :key="index"
            >
              <GIcon
                v-if="listItem.status === excelDropdownStatus.WAITING"
                name="circle"
                size="12px"
                ref="waitingSpinner"
              />
              <GIcon
                v-else
                :name="iconClass(listItem.status)"
                :stroke="iconColor(listItem.status)"
                size="12px"
                ref="fileIcon"
              />
              <GText
                variant="menu-item"
                :color="labelColor(listItem.status)"
                class="file-name"
                ref="fileName"
              >
                <a
                  v-if="listItem.status === excelDropdownStatus.CREATED"
                  :href="listItem.url"
                  :class="{ ready: listItem.status === excelDropdownStatus.CREATED }"
                  download
                >
                  {{ listItem.fileName }}
                </a>
                <span
                  v-else-if="listItem.status === excelDropdownStatus.WAITING"
                >
                  Hazırlanıyor...
                </span>
                <span
                  v-else-if="listItem.status === excelDropdownStatus.FAILED"
                >
                  Bir hata oluştu.
                </span>
              </GText>
            </li>
          </ul>
          <GButton
            v-if="type === 'download' && !download"
            variant="success"
            right-icon="download"
            class="g-mt-10"
            @click="handleExcelDownload"
            :disabled="isButtonDisabled()"
            ref="downloadButton"
            fluid
          >
            {{ downloadButtonText }}
          </GButton>
          <GButton
            v-else-if="!download"
            variant="success"
            right-icon="upload"
            class="g-mt-10 upload-button"
            @click="chooseFile"
            :disabled="isButtonDisabled()"
            ref="uploadButton"
            fluid
          >
            {{ uploadButtonText }}
          </GButton>
          <input
            @change="handleExcelUpload"
            id="fileUpload"
            type="file"
            hidden
          >
        </div>
      </template>
    </GButtonDropdown>
  </div>
</template>

<script lang="ts">

import GButtonDropdown from '../GButtonDropdown/GButtonDropdown.vue';
import GTabs from '../GTabs/GTabs.vue';
import GText from '../GText/GText.vue';
import GIcon from '../GIcon/GIcon.vue';
import GButton from '../GButton/GButton.vue';
import { GExcelDropdownStatus } from './enums.ts';

export default {
  name: 'GExcelDropdown',
  components: {
    GButtonDropdown,
    GTabs,
    GText,
    GIcon,
    GButton,
  },
  props: {
    download: {
      default: false,
      type: Boolean,
    },
    downloadTabText: {
      default: '',
      type: String,
    },
    uploadTabText: {
      default: '',
      type: String,
    },
    downloadButtonText: {
      default: 'EXCEL\'E AKTAR',
      type: String,
    },
    uploadButtonText: {
      default: 'EXCEL YÜKLE',
      type: String,
    },
    excelHistoryList: {
      default: () => [],
      type: Array,
    },
    historyIntervalMs: {
      default: 15000,
      type: Number,
    },
    buttonText: {
      default: 'EXCEL İŞLEMLERİ',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data () {
    return {
      isDropDownOpen: false,
      type: 'download',
      interval: null,
      tabs: [{
        type: 'download',
        label: 'İNDİRME İŞLEMLERİ',
      }, {
        type: 'upload',
        label: 'YÜKLEME İŞLEMLERİ',
      }],
    };
  },
  computed: {
    excelDropdownStatus () {
      return GExcelDropdownStatus;
    },
  },
  watch: {
    type (newValue) {
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.type === 'download'
        ? this.setExcelDownloadHistoryInterval()
        : this.setExcelUploadHistoryInterval();
    },
  },
  methods: {
    iconClass (status: GExcelDropdownStatus): string {
      return {
        [GExcelDropdownStatus.CREATED]: 'check',
        [GExcelDropdownStatus.FAILED]: 'x',
      }[status];
    },
    iconColor (status: GExcelDropdownStatus): string {
      return status === GExcelDropdownStatus.CREATED ? 'var(--green-500)' : 'var(--red-500)';
    },
    labelColor (status: GExcelDropdownStatus): string {
      return status === GExcelDropdownStatus.CREATED ? 'main-grey-500' : 'mid-grey-500';
    },
    isButtonDisabled () {
      return this.excelHistoryList.some(listItem => listItem.status === this.excelDropdownStatus.WAITING);
    },
    handleTabClick (type: string): void {
      this.$emit('excelTabType', type);
      this.type = type;
    },
    onButtonClick (): void {
      this.isDropDownOpen = !this.isDropDownOpen;
    },
    onDropdownOpen (): void {
      this.type === 'download'
        ? this.setExcelDownloadHistoryInterval()
        : this.setExcelUploadHistoryInterval();
    },
    onDropdownClose (): void {
      clearInterval(this.interval);
    },
    chooseFile () {
      document.getElementById('fileUpload').click();
    },
    handleExcelUpload (event: any): void {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);

      this.$emit('excelUpload', data);
    },
    handleExcelUploadHistory (): void {
      this.$emit('excelUploadHistory');
    },
    handleExcelDownload (): void {
      this.$emit('excelDownload');
    },
    handleExcelDownloadHistory (): void {
      this.$emit('excelDownloadHistory');
    },
    setExcelUploadHistoryInterval () {
      this.handleExcelUploadHistory();
      this.interval = setInterval(this.handleExcelUploadHistory, this.historyIntervalMs);
    },
    setExcelDownloadHistoryInterval () {
      this.handleExcelDownloadHistory();
      this.interval = setInterval(this.handleExcelDownloadHistory, this.historyIntervalMs);
    },
  },
};
</script>

<style lang="scss" scoped>
.g-excel-dropdown {
  ::v-deep .g-button-dropdown {
    .menu {
      padding: 0;
      z-index: 99;
      position: absolute;
      max-width: 385px;
    }
  }

  .excel-history {
    padding: 20px;

    .list {
      max-height: 240px;
      overflow-y: auto;
      padding: 0;
      list-style: none;

      .list-item {
        padding-top: var(--spacing-15);

        &:not(:last-child) {
          padding-bottom: var(--spacing-15);
          border-bottom: 1px solid var(--mid-grey-800);
        }

        a{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 320px;
          width: 320px;
          display: block;
        }

        .file-name {
          margin-left: var(--spacing-8);

          ::v-deep .ready {
            text-decoration: underline;
            cursor: pointer;
          }
        }

        &:last-child{
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>
