import { GExcelDropdownStatus } from '@/components/GExcelDropdown/enums';

export interface GExcelDropdownListItem {
  status: GExcelDropdownStatus,
  fileName: string,
  downloadUrl: string,
}
