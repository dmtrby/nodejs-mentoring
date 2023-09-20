import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";

describe("getListOfPublicHolidays", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should return right result", async () => {
    const result = await getListOfPublicHolidays(2023, "FR");
    expect(result.length > 0).toBe(true);
  });

  test("should throw error if country value is not valid", async () => {
    try {
      await getListOfPublicHolidays(2023, "USA");
    } catch (err) {
      expect(err).toStrictEqual(
        new Error("Country provided is not supported, received: USA")
      );
    }
  });

  test("should throw error if year value is not valid", async () => {
    try {
      await getListOfPublicHolidays(2021, "GB");
    } catch (err) {
      expect(err).toStrictEqual(
        new Error("Year provided not the current, received: 2021")
      );
    }
  });
});

describe("checkIfTodayIsPublicHoliday", () => {
  test("should return right result", async () => {
    const result = await checkIfTodayIsPublicHoliday("FR");
    expect(result).toBe(false);
  });
});

describe("getNextPublicHolidays", () => {
  test("should return right result", async () => {
    const result = await getNextPublicHolidays("FR");
    expect(result).toStrictEqual([
      {
        date: "2023-11-01",
        localName: "Toussaint",
        name: "All Saints' Day",
      },
      {
        date: "2023-11-11",
        localName: "Armistice 1918",
        name: "Armistice Day",
      },
      {
        date: "2023-12-25",
        localName: "Noël",
        name: "Christmas Day",
      },
      {
        date: "2024-01-01",
        localName: "Jour de l'an",
        name: "New Year's Day",
      },
      {
        date: "2024-04-01",
        localName: "Lundi de Pâques",
        name: "Easter Monday",
      },
      {
        date: "2024-05-01",
        localName: "Fête du Travail",
        name: "Labour Day",
      },
      {
        date: "2024-05-08",
        localName: "Victoire 1945",
        name: "Victory in Europe Day",
      },
      {
        date: "2024-05-09",
        localName: "Ascension",
        name: "Ascension Day",
      },
      {
        date: "2024-05-20",
        localName: "Lundi de Pentecôte",
        name: "Whit Monday",
      },
      {
        date: "2024-07-14",
        localName: "Fête nationale",
        name: "Bastille Day",
      },
      {
        date: "2024-08-15",
        localName: "Assomption",
        name: "Assumption Day",
      },
    ]);
  });
});
