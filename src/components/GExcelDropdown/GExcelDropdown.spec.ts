import { renderWrapper } from '@/utils/testUtils';
import { Wrapper } from '@vue/test-utils';
import GExcelDropdown from './GExcelDropdown.vue';

jest.useFakeTimers();

describe('GExcelDropdown Specs', () => {
  let wrapper: Wrapper<GExcelDropdown & { [key: string]: any }>;

  const excelHistoryList = [
    {
      status: 'CREATED',
      fileName: 'created file name',
      downloadUrl: 'created file url',
    },
    {
      status: 'WAITING_FOR_PROCESSED',
      fileName: 'waiting file name',
      downloadUrl: 'waiting file name',
    },
    {
      status: 'FAILED',
      fileName: 'failed file name',
      downloadUrl: 'failed file name',
    },
  ];

  const historyIntervalMsExp = 15001;

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should match snapshot with default props', () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);

    // then
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot with excel history list', () => {
    // given
    wrapper = renderWrapper(GExcelDropdown, { propsData: { excelHistoryList } });

    // then
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit excelTabType when clicked tab', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true });
    // when
    await wrapper.get('.tab.upload').trigger('click');
    // then

    // @ts-ignore
    expect(wrapper.emitted('excelTabType').length).toBe(1);
  });

  it('should show excel dropdown menu and emit active tab history when clicked dropdown button', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown, {
      data () {
        return {
          type: 'download',
        };
      },
    });

    // when
    await wrapper.get('.g-button').trigger('click');

    // then
    expect(wrapper.get('.g-excel-dropdown .menu').classes()).not.toContain('d-none');
    // @ts-ignore
    expect(wrapper.emitted('excelDownloadHistory').length).toBe(1);

    jest.runTimersToTime(historyIntervalMsExp);
    // @ts-ignore
    expect(wrapper.emitted('excelDownloadHistory').length).toBe(2);
  });

  it('should emit excelUploadHistory when clicked upload operations tab', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true, type: 'download' });

    // when
    await wrapper.get('.g-excel-dropdown .tab.upload').trigger('click');

    // then
    // @ts-ignore
    expect(wrapper.emitted('excelUploadHistory').length).toBe(1);

    jest.advanceTimersByTime(historyIntervalMsExp);
    // @ts-ignore
    expect(wrapper.emitted('excelUploadHistory').length).toBe(2);
  });

  it('should emit excelDownloadHistory when clicked upload operations tab', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true, type: 'upload' });

    // when
    await wrapper.get('.g-excel-dropdown .tab.download').trigger('click');

    // then
    // @ts-ignore
    expect(wrapper.emitted('excelDownloadHistory').length).toBe(1);

    jest.advanceTimersByTime(historyIntervalMsExp);
    // @ts-ignore
    expect(wrapper.emitted('excelDownloadHistory').length).toBe(2);
  });

  it('should show no data information if excelHistoryList length equal zero', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true });
    await wrapper.setProps({ downloadTabText: 'some text' });

    // then
    const noDataText = wrapper.get('.list-item.no-data');

    expect(noDataText.exists()).toBe(true);
    expect(noDataText.text()).toBe('some text');
  });

  it('should emit excelDownload when clicked downloadTabText', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true });
    await wrapper.setProps({ downloadTabText: 'some text' });

    const noDataText = wrapper.get('.list-item.no-data');

    // when
    await noDataText.trigger('click');

    // then
    expect(wrapper.emitted('excelDownload')).toBeTruthy();
  });

  it('should emit excelDownload when clicked download button', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true, type: 'download' });

    // when
    await wrapper.findComponent({ ref: 'downloadButton' }).trigger('click');

    // then
    expect(wrapper.emitted('excelDownload')).toBeTruthy();
  });

  it('should disabled excel download button if excel history has any waiting item', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown, { propsData: { excelHistoryList } });

    // when
    const downloadButton = wrapper.findComponent({ ref: 'downloadButton' });

    // then
    expect(downloadButton.attributes('disabled')).toBe('disabled');
  });

  it('should disabled excel upload button if excel history has any waiting item', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown, { propsData: { excelHistoryList } });
    await wrapper.setData({ isDropDownOpen: true, type: 'upload' });

    // when
    const uploadButton = wrapper.findComponent({ ref: 'uploadButton' });

    // then
    expect(uploadButton.attributes('disabled')).toBe('disabled');
  });

  it('should emit excelUpload with file data when called handleExcelUpload', async () => {
    // given
    const event = {
      target: {
        files: ['data'],
      },
    };

    wrapper = renderWrapper(GExcelDropdown);
    await wrapper.setData({ isDropDownOpen: true, type: 'upload' });

    // when
    wrapper.vm.handleExcelUpload(event);

    // then
    const data = new FormData();
    data.append('file', event.target.files[0]);

    // @ts-ignore
    expect(wrapper.emitted('excelUpload')[0]).toEqual([data]);
  });

  it('should render excel history list with expected icon and file names', async () => {
    // given
    wrapper = renderWrapper(GExcelDropdown, { propsData: { excelHistoryList } });
    await wrapper.setData({ isDropDownOpen: true, type: 'download' });

    // when
    const createdFileText = wrapper.findAllComponents({ ref: 'fileName' }).at(0);
    const waitingFileText = wrapper.findAllComponents({ ref: 'fileName' }).at(1);
    const failedFileText = wrapper.findAllComponents({ ref: 'fileName' }).at(2);

    const waitingSpinner = wrapper.findComponent({ ref: 'waitingSpinner' });
    const createdFileIcon = wrapper.findAllComponents({ ref: 'fileIcon' }).at(0);
    const failedFileIcon = wrapper.findAllComponents({ ref: 'fileIcon' }).at(1);

    // then
    expect(createdFileText.text()).toBe('created file name');
    expect(waitingFileText.text()).toBe('Hazırlanıyor...');
    expect(failedFileText.text()).toBe('Bir hata oluştu.');

    expect(waitingSpinner.exists()).toBeTruthy();
    expect(createdFileIcon.props('name')).toBe('check');
    expect(failedFileIcon.props('name')).toBe('x');
  });
});
