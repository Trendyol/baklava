import { expect } from '@open-wc/testing';

describe('set-paths utilities', () => {
  describe('getIconPath', () => {
    it('should return assets path relative to current module path', async () => {
      const { getIconPath } = await import('./asset-paths');

      const testPath = 'src/utilities';

      const testRunnerBasePath = document.baseURI.split('/').slice(0, -1).join('/');

      expect(getIconPath()).to.equal(`${testRunnerBasePath}/${testPath}/assets`);
    });
  });

  describe('setIconPath', () => {
    it('should set icon path', async () => {
      const testIconPath = 'http://example.com/path/to/icons';
      const { getIconPath, setIconPath } = await import('./asset-paths');
      setIconPath(testIconPath);

      expect(getIconPath()).to.equal(testIconPath);
    });
  });
});
