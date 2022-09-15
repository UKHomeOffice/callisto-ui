import { deepClone } from './common-utils';

describe('common-utils', () => {
  describe('deepClone', () => {
    it('should deep clone an object', () => {
      const input = { test: 'test' };
      const result = deepClone(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    it('should deep clone an array of objects', () => {
      const input = [{ test: 'test' }, { secondTest: 'hello' }];
      const result = deepClone(input);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });
  });
});
