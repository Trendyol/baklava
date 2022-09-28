import BlSelectOption from './bl-select-option';
import { assert } from '@open-wc/testing';

describe('bl-select', () => {
  it('is defined', () => {
    const el = document.createElement('bl-select-option');
    assert.instanceOf(el, BlSelectOption);
  });
});
