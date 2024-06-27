import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputWithPlaceholderPhone() {
  const ref = useIMaskWithObserver({
    mask: '+{1} (num) 000-0000',
    blocks: {
      num: {
        mask: '000',
        placeholderChar: ' ',
      },
    },
    lazy: false,
  });

  return <BlInput ref={ref} size="large" icon="phone" label="Phone Number" />;
}
