import { expect } from "@open-wc/testing";

describe("set-paths utilities", () => {
  describe("getIconPath", () => {
    it("should return default baklava icon path", async () => {
      const { getIconPath } = await import("./asset-paths");

      expect(getIconPath()).to.equal("https://cdn.jsdelivr.net/npm/@trendyol/baklava-icons@latest/icons");
    });
  });

  describe("setIconPath", () => {
    it("should set icon path", async () => {
      const testIconPath = "http://example.com/path/to/icons";
      const { getIconPath, setIconPath } = await import("./asset-paths");

      setIconPath(testIconPath);

      expect(getIconPath()).to.equal(testIconPath);
    });
  });
});
