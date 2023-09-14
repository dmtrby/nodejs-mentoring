const csv = require("csvtojson");
const fs = require("fs");

const CSV_FILE_PATH = "src/assets/nodejs-hw1-ex1.csv";
const TXT_FILE_PATH = "src/assets/books.txt";

const readStream = fs
  .createReadStream(CSV_FILE_PATH)
  .on("error", (error) => console.error(error));

const writeStream = fs
  .createWriteStream(TXT_FILE_PATH)
  .on("error", (error) => console.log(error));

const csvStream = csv({
  noheader: false,
  headers: ["book", "author", "amount", "price"],
  colParser: {
    amount: "omit",
  },
})
  .on("error", (err) => {
    console.log(err);
  })
  .on("done", () => {
    console.log("done");
  });

readStream.pipe(csvStream).pipe(writeStream);
