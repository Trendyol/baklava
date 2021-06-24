import { isUrl } from './regex';

describe('utils', () => {
  it('should return true when given string is url', () => {
    expect(isUrl('https://tymp.mncdn.com/assets/seller-center/default.jpg')).toBeTruthy();
  });

  it('should return true when given string is not url', () => {
    expect(isUrl('default.jpg')).toBeFalsy();
  });
});
