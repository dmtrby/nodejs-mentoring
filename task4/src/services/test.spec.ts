import axios from "axios";

import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";

const mockedHolidays = ["June", "Jule", "August"];
const mockApiUrl = "PUBLIC_HOLIDAYS_API_URL";

jest.mock("../config", () => ({
  PUBLIC_HOLIDAYS_API_URL: "PUBLIC_HOLIDAYS_API_URL",
}));

jest.mock("../helpers", () => ({
  validateInput: ({ year, country }) => ({
    year,
    country,
  }),
  shortenPublicHoliday: (field: any) => field,
}));

jest.mock("../types");

describe("getListOfPublicHolidays", () => {
  test("should return right result", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: mockedHolidays }));

    const result = await getListOfPublicHolidays(2023, "usa");
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${mockApiUrl}/PublicHolidays/2023/usa`
    );
    expect(result).toStrictEqual(mockedHolidays);
  });

  test("should return empty array for api error", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject());

    const result = await getListOfPublicHolidays(2023, "usa");
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${mockApiUrl}/PublicHolidays/2023/usa`
    );
    expect(result).toStrictEqual([]);
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should return right result for 200 status code", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    const result = await checkIfTodayIsPublicHoliday("usa");
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${mockApiUrl}/IsTodayPublicHoliday/usa`
    );
    expect(result).toBe(true);
  });

  test("should return false result for any other status code", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 403 }));

    const result = await checkIfTodayIsPublicHoliday("usa");
    expect(result).toBe(false);
  });

  test("should return false result for any other status code", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject());

    const result = await checkIfTodayIsPublicHoliday("usa");
    expect(result).toBe(false);
  });
});

describe("getNextPublicHolidays", () => {
  test("should return right result", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: mockedHolidays }));

    const result = await getNextPublicHolidays("usa");
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `${mockApiUrl}/NextPublicHolidays/usa`
    );
    expect(result).toStrictEqual(mockedHolidays);
  });

  test("should return empty array for api error", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject());

    const result = await getNextPublicHolidays("usa");

    expect(result).toStrictEqual([]);
  });
});
