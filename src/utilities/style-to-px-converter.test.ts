import { expect } from "@open-wc/testing";
import { styleToPixelConverter } from "./style-to-px.converter";

describe("styleToPixelConverter", () => {
    it("converts pixel value correctly", () => {
      const result = styleToPixelConverter("100px");

      expect(result).to.equal(100);
    });

    it("converts viewport height value correctly", () => {
      Object.defineProperty(window, "innerHeight", { value: 600, writable: true });

      const result = styleToPixelConverter("50vh");

      expect(result).to.equal(300); // 50% of 600 (viewport height)
    });

    it("converts percentage value correctly", () => {
      Object.defineProperty(window, "innerWidth", { value: 800, writable: true });

      const result = styleToPixelConverter("25%");

      expect(result).to.equal(200); // 25% of 800 (viewport width)
    });

    it("returns 0 for invalid input", () => {
      const result = styleToPixelConverter("invalid");

      expect(result).to.null;
    });

    it("returns null for empty input", () => {
      const result = styleToPixelConverter("");

      expect(result).to.null;
    });

    it("returns null for input without a unit", () => {
      const result = styleToPixelConverter("42");

      expect(result).to.null;
    });

    it("handles decimal values correctly", () => {
      const result = styleToPixelConverter("12.5px");

      expect(result).to.equal(12.5);
    });

    it("returns null for unsupported unit", () => {
        const result = styleToPixelConverter("10em");

        expect(result).to.null;
      });
  });
