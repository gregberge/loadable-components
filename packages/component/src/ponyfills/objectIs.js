// https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Polyfill_for_non-ES6_browsers
function objectIs(x, y) {
  // SameValue algorithm
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y
  }
  // NaN == NaN
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y
}

export default objectIs
