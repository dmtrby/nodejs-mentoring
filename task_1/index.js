const repl = require("repl");

const getRandomNumber = (input, context, filename, callback) => {
  callback(null, Math.random() * input + 1);
};

repl.start({
  prompt: "choose max number for random => ",
  eval: getRandomNumber,
});
