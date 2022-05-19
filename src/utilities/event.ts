export interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
}

export class EventDispatcher<T> {
  constructor(private target: HTMLElement, private eventName: string) {}

  dispatch(value: T, options?: EventOptions) {
    this.target.dispatchEvent(
      new CustomEvent<T>(this.eventName, { detail: value, ...options })
    );
  }
}

export function event(customName?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (protoOrDescriptor: any, name: string): any => {
    const eventName = customName || name || protoOrDescriptor.key;

    const descriptor = {
      get(this: HTMLElement) {
        return new EventDispatcher(this, eventName);
      },
      enumerable: true,
      configurable: true,
    };

    // if there is no name then this is a TypeScript runtime else its the current native TC39 proposal
    return name !== undefined
      ? Object.defineProperty(protoOrDescriptor, eventName, descriptor)
      : {
          kind: 'property',
          placement: 'prototype',
          key: protoOrDescriptor.key,
          descriptor,
        };
  };
}
