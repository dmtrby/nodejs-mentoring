import { validateInput, shortenPublicHoliday } from "./helpers";

jest.mock("./config", () => ({
  SUPPORTED_COUNTRIES: ["GB", "FR", "DE", "NL"],
}));

jest.mock("./types");

describe("validateInput", () => {
  test("should return right result if year and country are valid", () => {
    expect(validateInput({ year: 2023, country: "GB" })).toBe(true);
    expect(validateInput({ year: 2023, country: "NL" })).toBe(true);
    expect(validateInput({ year: 2023, country: "DE" })).toBe(true);
    expect(validateInput({ year: 2023, country: "FR" })).toBe(true);
    expect(validateInput({ country: "FR" })).toBe(true);
    expect(validateInput({ year: 2023 })).toBe(true);
  });

  test("should throw error if country is not is supported countries list", () => {
    expect(() => {
      validateInput({ year: 2023, country: "USA" });
    }).toThrow(new Error("Country provided is not supported, received: USA"));

    expect(() => {
      validateInput({ country: "USA" });
    }).toThrow(new Error("Country provided is not supported, received: USA"));

    expect(() => {
      validateInput({ year: 2021, country: "NL" });
    }).toThrow(new Error("Year provided not the current, received: 2021"));

    expect(() => {
      validateInput({ year: 2019 });
    }).toThrow(new Error("Year provided not the current, received: 2019"));
  });
});

describe("shortenPublicHoliday", () => {
  test("should return right result for valid values", () => {
    expect(
      shortenPublicHoliday({
        date: "2023",
        countryCode: "11",
        fixed: true,
        types: ["type"],
        global: true,
        counties: ["GB"],
        name: "name",
        localName: "localName",
        launchYear: 2023,
      })
    ).toStrictEqual({
      name: "name",
      localName: "localName",
      date: "2023",
    });
  });
});
