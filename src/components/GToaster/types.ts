type GToasterVariant = 'error' | 'success' | 'warning' | 'info';
type Duration = {
  seconds: number,
  autoClose: boolean,
  classes?: string[],
  style?: any,
  onCloseId?: ReturnType<typeof setTimeout>,
}
type GToasterDataConfig = {
  title: string,
  group: string,
  duration: number,
  autoClose: boolean,
  variants: any
}
export type CallbackType = 'onCloseCallback' | 'onShowCallback'

export interface GToasterOptions {
  id?: number;
  variant?: GToasterVariant;
  title?: string;
  unique?: boolean;
  group?: string;
  duration?: number;
  autoClose?: boolean;
  closeOnClick?: boolean;
  onCloseCallback?: (data: any) => void;
  textColor?: string;
  onShowCallback?: (data: any) => void;
  props?: any
}

export interface GToasterItem extends GToasterOptions {
  message?: string;
  durationObject: Duration;
  variantObject?: any;
  closed?: boolean
}

export interface GToasterData {
  items: GToasterItem[];
  id: number;
  config: GToasterDataConfig
}

export interface Toast {
  hide: (id: number) => void;
  hideAll: () => void;
  success: (message: string, toasterOptions?: GToasterOptions) => void;
  error: (message: string, toasterOptions?: GToasterOptions) => void;
  info: (message: string, toasterOptions?: GToasterOptions) => void;
  warning: (message: string, toasterOptions?: GToasterOptions) => void;
}
