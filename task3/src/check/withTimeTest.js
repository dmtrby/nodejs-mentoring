const { WithTime } = require("../task2/withTime");

const withTime = new WithTime();

const FETCH_URL = "https://jsonplaceholder.typicode.com/posts/1";

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("error", () => console.log("Error happend"));

const fetchJson = (url, callback) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(null, data));
};

withTime.execute(fetchJson, FETCH_URL);

console.log(withTime.rawListeners("end"));
