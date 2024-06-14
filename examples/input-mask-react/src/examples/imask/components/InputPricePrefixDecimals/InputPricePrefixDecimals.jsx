import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputPricePrefixDecimals() {
  const ref = useIMaskWithObserver({
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        radix: '.',
      },
    },
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      name="price-postfix"
      label="Price"
      placeholder="Enter price"
      icon="money"
      helpText="$199.00"
    />
  );
}
