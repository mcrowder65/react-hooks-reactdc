const compose = require("lodash.compose");
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const add10 = (number) => number + 10;

const add30 = compose(
  add10,
  add10,
  add10,
);
console.log(add30(5));
