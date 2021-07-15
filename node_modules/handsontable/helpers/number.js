"use strict";

exports.__esModule = true;
exports.isNumeric = isNumeric;
exports.rangeEach = rangeEach;
exports.rangeEachReverse = rangeEachReverse;
exports.valueAccordingPercent = valueAccordingPercent;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if value of n is a numeric one
 * http://jsperf.com/isnan-vs-isnumeric/4.
 *
 * @param {*} value The value to check.
 * @returns {boolean}
 */
function isNumeric(value) {
  /* eslint-disable */
  var t = _typeof(value);

  return t == 'number' ? !isNaN(value) && isFinite(value) : t == 'string' ? !value.length ? false : value.length == 1 ? /\d/.test(value) : /^\s*[+-]?\s*(?:(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?)|(?:0x[a-f\d]+))\s*$/i.test(value) : t == 'object' ? !!value && typeof value.valueOf() == 'number' && !(value instanceof Date) : false;
}
/**
 * A specialized version of `.forEach` defined by ranges.
 *
 * @param {Number} rangeFrom The number from start iterate.
 * @param {Number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */


function rangeEach(rangeFrom, rangeTo, iteratee) {
  var index = -1;

  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = rangeFrom;
  } else {
    index = rangeFrom - 1;
  }

  while (++index <= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}
/**
 * A specialized version of `.forEach` defined by ranges iterable in reverse order.
 *
 * @param {Number} rangeFrom The number from start iterate.
 * @param {Number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */


function rangeEachReverse(rangeFrom, rangeTo, iteratee) {
  var index = rangeFrom + 1;

  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = 0;
  }

  while (--index >= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}
/**
 * Calculate value from percent.
 *
 * @param {Number} value Base value from percent will be calculated.
 * @param {String|Number} percent Can be Number or String (eq. `'33%'`).
 * @returns {Number}
 */


function valueAccordingPercent(value, percent) {
  percent = parseInt(percent.toString().replace('%', ''), 10);
  percent = parseInt(value * percent / 100, 10);
  return percent;
}