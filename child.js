const cp = require("child_process");
const {
  WINDOWS_CPU_COMMAND,
  MAC_CPU_COMMAND,
  UPDATE_CALL_MILLISECONDS_RATE,
  LOG_MILLISECONDS_RATE,
} = require("./constants");

const execCommand =
  process.platform === "win32" ? WINDOWS_CPU_COMMAND : MAC_CPU_COMMAND;

let shouldLog = false;

const execProcess = () => {
  cp.exec(execCommand, (error, stdout, stderr) => {
    process.send({ data: stdout, shouldLog: shouldLog });
    if (shouldLog) {
      shouldLog = false;
    }
  });
};

process.on("message", () => {
  setInterval(() => {
    execProcess();
  }, UPDATE_CALL_MILLISECONDS_RATE);

  setInterval(() => {
    shouldLog = true;
  }, LOG_MILLISECONDS_RATE);
});
