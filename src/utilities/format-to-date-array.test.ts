import { expect } from "@open-wc/testing";
import { formatToDateArray } from "./format-to-date-array";

describe("normalizeValue", () => {
  it("should return an array of dates from a string", () => {
    const input = "2023-10-10,2023-10-11";
    const expected = [new Date("2023-10-10"), new Date("2023-10-11")];
    const result = formatToDateArray(input);

    expect(result).to.deep.equal(expected);
  });

  it("should return an array with a single date from a Date object", () => {
    const input = new Date("2023-10-12");
    const expected = [input];
    const result = formatToDateArray(input);

    expect(result).to.deep.equal(expected);
  });

  it("should return the input array if it contains only Date objects", () => {
    const input = [new Date("2023-10-13"), new Date("2023-10-14")];
    const result = formatToDateArray(input);

    expect(result).to.equal(input);
  });

  it("should return an empty array when value is undefined", () => {
    const result = formatToDateArray(undefined);

    expect(result).to.deep.equal([]);
  });

  it("should return an empty array when value is an empty string", () => {
    const result = formatToDateArray("");

    expect(result).to.deep.equal([]);
  });
});
