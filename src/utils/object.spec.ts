import { isEmptyObject, isEqualObject } from './object';

describe('utils/object', () => {
  describe('isEmptyObject', () => {
    it('should return false if object has a property', () => {
      const object = { a: 'a' };
      expect(isEmptyObject(object)).toBe(false);
    });

    it('should return true if object is empty', () => {
      const object = {};
      expect(isEmptyObject(object)).toBe(true);
    });
  });

  describe('isEqualObject', () => {
    it('should return true when compare objects are same', () => {
      const a = {
        a: 'a',
      };

      const b = {
        a: 'a',
      };

      expect(isEqualObject(a, b)).toBe(true);
    });

    it('should return false when compare objects are diffrent', () => {
      const a = {
        a: 'a',
      };

      const b = {
        a: 'b',
      };

      expect(isEqualObject(a, b)).toBe(false);
    });
  });
});
