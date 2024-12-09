import { expect } from "@open-wc/testing";
import { stringToDateArray } from "./string-to-date-converter";

describe("stringToDateArray", () => {
  it("should convert a valid string of dates into an array of Date objects", () => {
    const input = "2024-01-01,2024-02-01,2024-03-01";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").with.length(3);
    expect(result[0].getTime()).to.equal(new Date("2024-01-01").getTime());
    expect(result[1].getTime()).to.equal(new Date("2024-02-01").getTime());
    expect(result[2].getTime()).to.equal(new Date("2024-03-01").getTime());
  });

  it("should handle an empty string and return an empty array", () => {
    const input = "";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").that.is.empty;
  });

  it("should skip invalid date strings", () => {
    const input = "2024-01-01,invalid-date,2024-03-01";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").with.length(2);
    expect(result[0].toISOString()).to.include("2024-01-01");
    expect(result[1].toISOString()).to.include("2024-03-01");
  });

  it("should return an empty array if all dates are invalid", () => {
    const input = "invalid-date1,invalid-date2,not-a-date";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").that.is.empty;
  });

  it("should correctly parse a single valid date", () => {
    const input = "2024-01-01";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").with.length(1);
    expect(result[0].toISOString()).to.include("2024-01-01");
  });

  it("should handle leading and trailing spaces in date strings", () => {
    const input = " 2024-01-01 , 2024-02-01 ";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").with.length(2);
    expect(result[0].getTime()).to.equal(new Date("2024-01-01").getTime());
    expect(result[1].getTime()).to.equal(new Date("2024-02-01").getTime());
  });

  it("should handle mixed valid and invalid dates with extra spaces", () => {
    const input = " 2024-01-01 , invalid-date , 2024-03-01 ";
    const result = stringToDateArray(input);

    expect(result).to.be.an("array").with.length(2);
    expect(result[0].getTime()).to.equal(new Date("2024-01-01").getTime());
    expect(result[1].getTime()).to.equal(new Date("2024-03-01").getTime());
  });
});
