const cp = require("child_process");
const fs = require("fs");

const child = cp.fork(`./child.js`);

function unixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

child.on("message", (msg) => {
  process.stdout.write(msg.data.replace("\n", ""));
  if (msg.shouldLog) {
    fs.appendFile("./log.txt", `${unixTimestamp()} : ${msg.data}`, (err) => {
      if (err) throw err;
    });
  }
});

const startChildProcess = () => {
  child.send("");
};

startChildProcess();
