"use strict";

exports.__esModule = true;
exports.registerPlugin = exports.getPluginsNames = exports.getPlugin = exports.TrimRows = exports.HiddenRows = exports.HiddenColumns = exports.NestedRows = exports.CollapsibleColumns = exports.NestedHeaders = exports.Formulas = exports.Filters = exports.ExportFile = exports.DropdownMenu = exports.ColumnSummary = exports.BindRowsWithHeaders = exports.BasePlugin = exports.UndoRedo = exports.TouchScroll = exports.Search = exports.MultiColumnSorting = exports.MultipleSelectionHandles = exports.MergeCells = exports.ManualRowMove = exports.ManualColumnResize = exports.ManualColumnMove = exports.ManualColumnFreeze = exports.DragToScroll = exports.CustomBorders = exports.CopyPaste = exports.ContextMenu = exports.Comments = exports.ColumnSorting = exports.AutoRowSize = exports.ManualRowResize = exports.Autofill = exports.AutoColumnSize = exports.PersistentState = void 0;

var _persistentState = require("./persistentState");

exports.PersistentState = _persistentState.PersistentState;

var _autoColumnSize = require("./autoColumnSize");

exports.AutoColumnSize = _autoColumnSize.AutoColumnSize;

var _autofill = require("./autofill");

exports.Autofill = _autofill.Autofill;

var _manualRowResize = require("./manualRowResize");

exports.ManualRowResize = _manualRowResize.ManualRowResize;

var _autoRowSize = require("./autoRowSize");

exports.AutoRowSize = _autoRowSize.AutoRowSize;

var _columnSorting = require("./columnSorting");

exports.ColumnSorting = _columnSorting.ColumnSorting;

var _comments = require("./comments");

exports.Comments = _comments.Comments;

var _contextMenu = require("./contextMenu");

exports.ContextMenu = _contextMenu.ContextMenu;

var _copyPaste = require("./copyPaste");

exports.CopyPaste = _copyPaste.CopyPaste;

var _customBorders = require("./customBorders");

exports.CustomBorders = _customBorders.CustomBorders;

var _dragToScroll = require("./dragToScroll");

exports.DragToScroll = _dragToScroll.DragToScroll;

var _manualColumnFreeze = require("./manualColumnFreeze");

exports.ManualColumnFreeze = _manualColumnFreeze.ManualColumnFreeze;

var _manualColumnMove = require("./manualColumnMove");

exports.ManualColumnMove = _manualColumnMove.ManualColumnMove;

var _manualColumnResize = require("./manualColumnResize");

exports.ManualColumnResize = _manualColumnResize.ManualColumnResize;

var _manualRowMove = require("./manualRowMove");

exports.ManualRowMove = _manualRowMove.ManualRowMove;

var _mergeCells = require("./mergeCells");

exports.MergeCells = _mergeCells.MergeCells;

var _multipleSelectionHandles = require("./multipleSelectionHandles");

exports.MultipleSelectionHandles = _multipleSelectionHandles.MultipleSelectionHandles;

var _multiColumnSorting = require("./multiColumnSorting");

exports.MultiColumnSorting = _multiColumnSorting.MultiColumnSorting;

var _search = require("./search");

exports.Search = _search.Search;

var _touchScroll = require("./touchScroll");

exports.TouchScroll = _touchScroll.TouchScroll;

var _undoRedo = require("./undoRedo");

exports.UndoRedo = _undoRedo.UndoRedo;

var _base = require("./base");

exports.BasePlugin = _base.BasePlugin;

var _bindRowsWithHeaders = require("./bindRowsWithHeaders");

exports.BindRowsWithHeaders = _bindRowsWithHeaders.BindRowsWithHeaders;

var _columnSummary = require("./columnSummary");

exports.ColumnSummary = _columnSummary.ColumnSummary;

var _dropdownMenu = require("./dropdownMenu");

exports.DropdownMenu = _dropdownMenu.DropdownMenu;

var _exportFile = require("./exportFile");

exports.ExportFile = _exportFile.ExportFile;

var _filters = require("./filters");

exports.Filters = _filters.Filters;

var _formulas = require("./formulas");

exports.Formulas = _formulas.Formulas;

var _nestedHeaders = require("./nestedHeaders");

exports.NestedHeaders = _nestedHeaders.NestedHeaders;

var _collapsibleColumns = require("./collapsibleColumns");

exports.CollapsibleColumns = _collapsibleColumns.CollapsibleColumns;

var _nestedRows = require("./nestedRows");

exports.NestedRows = _nestedRows.NestedRows;

var _hiddenColumns = require("./hiddenColumns");

exports.HiddenColumns = _hiddenColumns.HiddenColumns;

var _hiddenRows = require("./hiddenRows");

exports.HiddenRows = _hiddenRows.HiddenRows;

var _trimRows = require("./trimRows");

exports.TrimRows = _trimRows.TrimRows;

var _registry = require("./registry");

exports.getPlugin = _registry.getPlugin;
exports.getPluginsNames = _registry.getPluginsNames;
exports.registerPlugin = _registry.registerPlugin;