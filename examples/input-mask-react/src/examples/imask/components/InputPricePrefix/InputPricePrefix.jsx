import { BlInput } from '@trendyol/baklava/dist/baklava-react';
import { useIMaskWithObserver } from '../../hooks';

export default function InputPricePrefix() {
  const ref = useIMaskWithObserver({
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
      },
    },
  });

  return (
    <BlInput
      ref={ref}
      size="large"
      name="price"
      label="Price"
      placeholder="Enter price"
      icon="money"
    />
  );
}
