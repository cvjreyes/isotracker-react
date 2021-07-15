"use strict";

exports.__esModule = true;
exports.numericValidator = numericValidator;
exports.VALIDATOR_TYPE = void 0;

var _number = require("../../helpers/number");

var VALIDATOR_TYPE = 'numeric';
/**
 * The Numeric cell validator.
 *
 * @private
 * @param {*} value Value of edited cell.
 * @param {Function} callback Callback called with validation result.
 */

exports.VALIDATOR_TYPE = VALIDATOR_TYPE;

function numericValidator(value, callback) {
  var valueToValidate = value;

  if (valueToValidate === null || valueToValidate === void 0) {
    valueToValidate = '';
  }

  if (this.allowEmpty && valueToValidate === '') {
    callback(true);
  } else if (valueToValidate === '') {
    callback(false);
  } else {
    callback((0, _number.isNumeric)(value));
  }
}

numericValidator.VALIDATOR_TYPE = VALIDATOR_TYPE;