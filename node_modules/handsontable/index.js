"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.object.get-own-property-names.js");

var _base = _interopRequireDefault(require("./base"));

var _eventManager = _interopRequireWildcard(require("./eventManager"));

var _translations = require("./translations");

var _pluginHooks = _interopRequireDefault(require("./pluginHooks"));

var _index = require("./dataMap/index");

var _jquery = _interopRequireDefault(require("./helpers/wrappers/jquery"));

var _ghostTable = _interopRequireDefault(require("./utils/ghostTable"));

var parseTableHelpers = _interopRequireWildcard(require("./utils/parseTable"));

var arrayHelpers = _interopRequireWildcard(require("./helpers/array"));

var browserHelpers = _interopRequireWildcard(require("./helpers/browser"));

var dataHelpers = _interopRequireWildcard(require("./helpers/data"));

var dateHelpers = _interopRequireWildcard(require("./helpers/date"));

var featureHelpers = _interopRequireWildcard(require("./helpers/feature"));

var functionHelpers = _interopRequireWildcard(require("./helpers/function"));

var mixedHelpers = _interopRequireWildcard(require("./helpers/mixed"));

var numberHelpers = _interopRequireWildcard(require("./helpers/number"));

var objectHelpers = _interopRequireWildcard(require("./helpers/object"));

var stringHelpers = _interopRequireWildcard(require("./helpers/string"));

var unicodeHelpers = _interopRequireWildcard(require("./helpers/unicode"));

var domHelpers = _interopRequireWildcard(require("./helpers/dom/element"));

var domEventHelpers = _interopRequireWildcard(require("./helpers/dom/event"));

var _editors = require("./editors");

var _renderers = require("./renderers");

var _validators = require("./validators");

var _cellTypes = require("./cellTypes");

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable handsontable/restricted-module-imports */
// Since the Handsontable was modularized, importing some submodules is restricted.
// Importing the main entry of the submodule can make the "dead" code elimination
// process more difficult. The "handsontable/restricted-module-imports" rule is on
// guard. For the index.js file, the rule has to be disabled. This file exports the
// full version of the Handsontable with build-in all available components, so that's
// why the rule is disabled here (see more #7506).

/* eslint-enable handsontable/restricted-module-imports */
(0, _editors.registerEditor)(_editors.BaseEditor);
(0, _editors.registerEditor)(_editors.AutocompleteEditor);
(0, _editors.registerEditor)(_editors.CheckboxEditor);
(0, _editors.registerEditor)(_editors.DateEditor);
(0, _editors.registerEditor)(_editors.DropdownEditor);
(0, _editors.registerEditor)(_editors.HandsontableEditor);
(0, _editors.registerEditor)(_editors.NumericEditor);
(0, _editors.registerEditor)(_editors.PasswordEditor);
(0, _editors.registerEditor)(_editors.SelectEditor);
(0, _editors.registerEditor)(_editors.TextEditor);
(0, _renderers.registerRenderer)(_renderers.baseRenderer);
(0, _renderers.registerRenderer)(_renderers.autocompleteRenderer);
(0, _renderers.registerRenderer)(_renderers.checkboxRenderer);
(0, _renderers.registerRenderer)(_renderers.htmlRenderer);
(0, _renderers.registerRenderer)(_renderers.numericRenderer);
(0, _renderers.registerRenderer)(_renderers.passwordRenderer);
(0, _renderers.registerRenderer)(_renderers.textRenderer);
(0, _validators.registerValidator)(_validators.autocompleteValidator);
(0, _validators.registerValidator)(_validators.dateValidator);
(0, _validators.registerValidator)(_validators.numericValidator);
(0, _validators.registerValidator)(_validators.timeValidator);
(0, _cellTypes.registerCellType)(_cellTypes.AutocompleteCellType);
(0, _cellTypes.registerCellType)(_cellTypes.CheckboxCellType);
(0, _cellTypes.registerCellType)(_cellTypes.DateCellType);
(0, _cellTypes.registerCellType)(_cellTypes.DropdownCellType);
(0, _cellTypes.registerCellType)(_cellTypes.HandsontableCellType);
(0, _cellTypes.registerCellType)(_cellTypes.NumericCellType);
(0, _cellTypes.registerCellType)(_cellTypes.PasswordCellType);
(0, _cellTypes.registerCellType)(_cellTypes.TimeCellType);
(0, _cellTypes.registerCellType)(_cellTypes.TextCellType);
(0, _jquery.default)(_base.default);
(0, _plugins.registerPlugin)(_plugins.AutoColumnSize);
(0, _plugins.registerPlugin)(_plugins.Autofill);
(0, _plugins.registerPlugin)(_plugins.AutoRowSize);
(0, _plugins.registerPlugin)(_plugins.BindRowsWithHeaders);
(0, _plugins.registerPlugin)(_plugins.CollapsibleColumns);
(0, _plugins.registerPlugin)(_plugins.ColumnSorting);
(0, _plugins.registerPlugin)(_plugins.ColumnSummary);
(0, _plugins.registerPlugin)(_plugins.Comments);
(0, _plugins.registerPlugin)(_plugins.ContextMenu);
(0, _plugins.registerPlugin)(_plugins.CopyPaste);
(0, _plugins.registerPlugin)(_plugins.CustomBorders);
(0, _plugins.registerPlugin)(_plugins.DragToScroll);
(0, _plugins.registerPlugin)(_plugins.DropdownMenu);
(0, _plugins.registerPlugin)(_plugins.ExportFile);
(0, _plugins.registerPlugin)(_plugins.Filters);
(0, _plugins.registerPlugin)(_plugins.Formulas);
(0, _plugins.registerPlugin)(_plugins.HiddenColumns);
(0, _plugins.registerPlugin)(_plugins.HiddenRows);
(0, _plugins.registerPlugin)(_plugins.ManualColumnFreeze);
(0, _plugins.registerPlugin)(_plugins.ManualColumnMove);
(0, _plugins.registerPlugin)(_plugins.ManualColumnResize);
(0, _plugins.registerPlugin)(_plugins.ManualRowMove);
(0, _plugins.registerPlugin)(_plugins.ManualRowResize);
(0, _plugins.registerPlugin)(_plugins.MergeCells);
(0, _plugins.registerPlugin)(_plugins.MultiColumnSorting);
(0, _plugins.registerPlugin)(_plugins.MultipleSelectionHandles);
(0, _plugins.registerPlugin)(_plugins.NestedHeaders);
(0, _plugins.registerPlugin)(_plugins.NestedRows);
(0, _plugins.registerPlugin)(_plugins.PersistentState);
(0, _plugins.registerPlugin)(_plugins.Search);
(0, _plugins.registerPlugin)(_plugins.TouchScroll);
(0, _plugins.registerPlugin)(_plugins.TrimRows);
(0, _plugins.registerPlugin)(_plugins.UndoRedo); // TODO: Remove this exports after rewrite tests about this module

_base.default.__GhostTable = _ghostTable.default;
_base.default._getListenersCounter = _eventManager.getListenersCounter; // For MemoryLeak tests

_base.default._getRegisteredMapsCounter = _translations.getRegisteredMapsCounter; // For MemoryLeak tests

_base.default.DefaultSettings = (0, _index.metaSchemaFactory)();
_base.default.EventManager = _eventManager.default; // Export Hooks singleton

_base.default.hooks = _pluginHooks.default.getSingleton(); // Export all helpers to the Handsontable object

var HELPERS = [arrayHelpers, browserHelpers, dataHelpers, dateHelpers, featureHelpers, functionHelpers, mixedHelpers, numberHelpers, objectHelpers, stringHelpers, unicodeHelpers, parseTableHelpers];
var DOM = [domHelpers, domEventHelpers];
_base.default.helper = {};
_base.default.dom = {}; // Fill general helpers.

arrayHelpers.arrayEach(HELPERS, function (helper) {
  arrayHelpers.arrayEach(Object.getOwnPropertyNames(helper), function (key) {
    if (key.charAt(0) !== '_') {
      _base.default.helper[key] = helper[key];
    }
  });
}); // Fill DOM helpers.

arrayHelpers.arrayEach(DOM, function (helper) {
  arrayHelpers.arrayEach(Object.getOwnPropertyNames(helper), function (key) {
    if (key.charAt(0) !== '_') {
      _base.default.dom[key] = helper[key];
    }
  });
}); // Export cell types.

_base.default.cellTypes = {};
arrayHelpers.arrayEach((0, _cellTypes.getRegisteredCellTypeNames)(), function (cellTypeName) {
  _base.default.cellTypes[cellTypeName] = (0, _cellTypes.getCellType)(cellTypeName);
});
_base.default.cellTypes.registerCellType = _cellTypes.registerCellType;
_base.default.cellTypes.getCellType = _cellTypes.getCellType; // Export all registered editors from the Handsontable.

_base.default.editors = {};
arrayHelpers.arrayEach((0, _editors.getRegisteredEditorNames)(), function (editorName) {
  _base.default.editors["".concat(stringHelpers.toUpperCaseFirst(editorName), "Editor")] = (0, _editors.getEditor)(editorName);
});
_base.default.editors.registerEditor = _editors.registerEditor;
_base.default.editors.getEditor = _editors.getEditor; // Export all registered renderers from the Handsontable.

_base.default.renderers = {};
arrayHelpers.arrayEach((0, _renderers.getRegisteredRendererNames)(), function (rendererName) {
  var renderer = (0, _renderers.getRenderer)(rendererName);

  if (rendererName === 'base') {
    _base.default.renderers.cellDecorator = renderer;
  }

  _base.default.renderers["".concat(stringHelpers.toUpperCaseFirst(rendererName), "Renderer")] = renderer;
});
_base.default.renderers.registerRenderer = _renderers.registerRenderer;
_base.default.renderers.getRenderer = _renderers.getRenderer; // Export all registered validators from the Handsontable.

_base.default.validators = {};
arrayHelpers.arrayEach((0, _validators.getRegisteredValidatorNames)(), function (validatorName) {
  _base.default.validators["".concat(stringHelpers.toUpperCaseFirst(validatorName), "Validator")] = (0, _validators.getValidator)(validatorName);
});
_base.default.validators.registerValidator = _validators.registerValidator;
_base.default.validators.getValidator = _validators.getValidator; // Export all registered plugins from the Handsontable.
// Make sure to initialize the plugin dictionary as an empty object. Otherwise, while
// transpiling the files into ES and CommonJS format, the injected CoreJS helper
// `import "core-js/modules/es.object.get-own-property-names";` won't be processed
// by the `./config/plugin/babel/add-import-extension` babel plugin. Thus, the distribution
// files will be broken. The reason is not known right now (probably it's caused by bug in
// the Babel or missing something in the plugin).

_base.default.plugins = {};
arrayHelpers.arrayEach((0, _plugins.getPluginsNames)(), function (pluginName) {
  _base.default.plugins[pluginName] = (0, _plugins.getPlugin)(pluginName);
});
_base.default.plugins["".concat(stringHelpers.toUpperCaseFirst(_plugins.BasePlugin.PLUGIN_KEY), "Plugin")] = _plugins.BasePlugin;
_base.default.plugins.registerPlugin = _plugins.registerPlugin;
_base.default.plugins.getPlugin = _plugins.getPlugin;
var _default = _base.default;
exports.default = _default;