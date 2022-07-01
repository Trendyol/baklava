export interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export class EventDispatcher<T> {
  constructor(private target: HTMLElement, private eventName: string) {}

  dispatch(
    value: T,
    options: EventOptions = {
      bubbles: true,
      cancelable: false,
      composed: true,
    }
  ) {
    this.target.dispatchEvent(new CustomEvent<T>(this.eventName, { detail: value, ...options }));
  }
}

export function event(customName?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (protoOrDescriptor: any, name: string): any => {
    const descriptor = {
      get(this: HTMLElement) {
        return new EventDispatcher(this, customName || name);
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(protoOrDescriptor, name, descriptor);
  };
}
