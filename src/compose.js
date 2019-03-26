const compose = require("lodash.compose");
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const add10 = (number) => number + 10;
const subtract5 = (number) => number - 5;

const add25 = compose(
  add10,
  add10,
  add10,
  subtract5,
);

console.log(add25(25));
