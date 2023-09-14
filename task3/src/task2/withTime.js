const { EventEmitter } = require("../task1/customEventEmitter");

class WithTime extends EventEmitter {
  constructor() {
    super();
  }

  execute(asyncFunc, ...args) {
    this.on("data", (data) => console.log("result ", data));
    this.emit("begin");
    console.time("asyncFunc");

    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }
      this.emit("data", data);
      console.timeEnd("asyncFunc");
      this.emit("end");
    });
  }
}

module.exports = { WithTime };
