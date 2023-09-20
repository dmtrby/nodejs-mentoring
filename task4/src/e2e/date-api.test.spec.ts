import request from "supertest";

const DATE_API = "https://date.nager.at"; // swagger https://date.nager.at/swagger/index.html

describe("Date API", () => {
  describe("/api/v3/AvailableCountries", () => {
    test("should return 200 and a array with right data inside", async () => {
      const { status, body } = await request(DATE_API)
        .get("/api/v3/AvailableCountries")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect(function (res) {
          const { body } = res;
          expect(Array.isArray(body)).toBe(true);
          expect(body[0]).toEqual({
            countryCode: expect.any(String),
            name: expect.any(String),
          });
        });
    });
  });

  describe("/api/v3/NextPublicHolidaysWorldwide", () => {
    test("should return 200 and a array with right data inside", async () => {
      const { status, body } = await request(DATE_API)
        .get("/api/v3/NextPublicHolidaysWorldwide")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect(function (res) {
          const { body } = res;
          expect(Array.isArray(body)).toBe(true);
          expect(body[0]).toEqual({
            date: expect.any(String),
            localName: expect.any(String),
            name: expect.any(String),
            countryCode: expect.any(String),
            fixed: expect.any(Boolean),
            global: expect.any(Boolean),
            counties: expect.any(Array),
            launchYear: expect.any(Number),
            types: expect.any(Array),
          });
        });
    });
  });
});
