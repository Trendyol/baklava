import { iconConverter } from './icon.converter';
import { expect } from '@open-wc/testing';

describe('bl-alert', () => {
  it('is defined', () => {
    const { fromAttribute } = iconConverter();
    if (!fromAttribute) return;
    const trueResult = fromAttribute('true');
    const falseResult = fromAttribute('false');
    const anyResult = fromAttribute('any');
    expect(trueResult).to.eq(true);
    expect(falseResult).to.eq(false);
    expect(anyResult).to.eq('any');
  });
});
