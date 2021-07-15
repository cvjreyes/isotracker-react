"use strict";

exports.__esModule = true;
exports.TimeCellType = exports.CELL_TYPE = void 0;

var _textEditor = require("../../editors/textEditor");

var _textRenderer = require("../../renderers/textRenderer");

var _timeValidator = require("../../validators/timeValidator");

var CELL_TYPE = 'time';
exports.CELL_TYPE = CELL_TYPE;
var TimeCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _textEditor.TextEditor,
  // displays small gray arrow on right side of the cell
  renderer: _textRenderer.textRenderer,
  validator: _timeValidator.timeValidator
};
exports.TimeCellType = TimeCellType;