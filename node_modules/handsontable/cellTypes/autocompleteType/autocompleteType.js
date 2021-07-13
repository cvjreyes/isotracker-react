"use strict";

exports.__esModule = true;
exports.AutocompleteCellType = exports.CELL_TYPE = void 0;

var _autocompleteEditor = require("../../editors/autocompleteEditor");

var _autocompleteRenderer = require("../../renderers/autocompleteRenderer");

var _autocompleteValidator = require("../../validators/autocompleteValidator");

var CELL_TYPE = 'autocomplete';
exports.CELL_TYPE = CELL_TYPE;
var AutocompleteCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: _autocompleteEditor.AutocompleteEditor,
  renderer: _autocompleteRenderer.autocompleteRenderer,
  validator: _autocompleteValidator.autocompleteValidator
};
exports.AutocompleteCellType = AutocompleteCellType;