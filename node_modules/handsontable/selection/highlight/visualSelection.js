"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _src = require("./../../3rdparty/walkontable/src");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var VisualSelection = /*#__PURE__*/function (_Selection) {
  _inherits(VisualSelection, _Selection);

  var _super = _createSuper(VisualSelection);

  function VisualSelection(settings, visualCellRange) {
    var _this;

    _classCallCheck(this, VisualSelection);

    _this = _super.call(this, settings, null);
    /**
     * Range of selection visually. Visual representation may have representation in a rendered selection.
     *
     * @type {null|CellRange}
     */

    _this.visualCellRange = visualCellRange || null;

    _this.commit();

    return _this;
  }
  /**
   * Adds a cell coords to the selection.
   *
   * @param {CellCoords} coords Visual coordinates of a cell.
   * @returns {VisualSelection}
   */


  _createClass(VisualSelection, [{
    key: "add",
    value: function add(coords) {
      if (this.visualCellRange === null) {
        this.visualCellRange = new _src.CellRange(coords);
      } else {
        this.visualCellRange.expand(coords);
      }

      return this;
    }
    /**
     * Clears visual and renderable selection.
     *
     * @returns {VisualSelection}
     */

  }, {
    key: "clear",
    value: function clear() {
      this.visualCellRange = null;
      return _get(_getPrototypeOf(VisualSelection.prototype), "clear", this).call(this);
    }
    /**
     * Search for the first visible coordinates in the range as range may start and/or end with the hidden index.
     *
     * @private
     * @param {CellCoords} startCoords Visual start coordinates for the range. Starting point for finding destination coordinates
     * with visible coordinates (we are going from the starting coordinates to the end coordinates until the criteria are met).
     * @param {CellCoords} endCoords Visual end coordinates for the range.
     * @param {number} incrementByRow We are searching for a next visible rows by increasing (to be precise, or decreasing) indexes.
     * This variable represent indexes shift. We are looking for an index:
     * - for rows: from the left to the right (increasing indexes, then variable should have value 1) or
     * other way around (decreasing indexes, then variable should have the value -1)
     * - for columns: from the top to the bottom (increasing indexes, then variable should have value 1)
     * or other way around (decreasing indexes, then variable should have the value -1).
     * @param {number} incrementByColumn As above, just indexes shift for columns.
     * @returns {null|CellCoords} Visual cell coordinates.
     */

  }, {
    key: "findVisibleCoordsInRange",
    value: function findVisibleCoordsInRange(startCoords, endCoords, incrementByRow) {
      var incrementByColumn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : incrementByRow;
      var nextVisibleRow = this.findVisibleCoordsInRowsRange(startCoords.row, endCoords.row, incrementByRow); // There are no more visual rows in the range.

      if (nextVisibleRow === null) {
        return null;
      }

      var nextVisibleColumn = this.findVisibleCoordsInColumnsRange(startCoords.col, endCoords.col, incrementByColumn); // There are no more visual columns in the range.

      if (nextVisibleColumn === null) {
        return null;
      }

      return new _src.CellCoords(nextVisibleRow, nextVisibleColumn);
    }
    /**
     * Searches the nearest visible row index, which is not hidden (is renderable).
     *
     * @private
     * @param {CellCoords} startVisibleRow Visual row index which starts the range. Starting point for finding
     * destination coordinates with visible coordinates (we are going from the starting coordinates to the end
     * coordinates until the criteria are met).
     * @param {CellCoords} endVisibleRow Visual row index which ends the range.
     * @param {number} incrementBy We are searching for a next visible rows by increasing (to be precise, or decreasing)
     * indexes. This variable represent indexes shift. From the left to the right (increasing indexes, then variable
     * should have value 1) or other way around (decreasing indexes, then variable should have the value -1).
     * @returns {number|null} The visual row index.
     */

  }, {
    key: "findVisibleCoordsInRowsRange",
    value: function findVisibleCoordsInRowsRange(startVisibleRow, endVisibleRow, incrementBy) {
      var _this$settings$visual = this.settings.visualToRenderableCoords({
        row: startVisibleRow,
        col: -1
      }),
          startRowRenderable = _this$settings$visual.row; // There are no more visual rows in the range.


      if (endVisibleRow === startVisibleRow && startRowRenderable === null) {
        return null;
      } // We are looking for a next visible row in the range.


      if (startRowRenderable === null) {
        return this.findVisibleCoordsInRowsRange(startVisibleRow + incrementBy, endVisibleRow, incrementBy);
      } // We found visible row index in the range.


      return startVisibleRow;
    }
    /**
     * Searches the nearest visible column index, which is not hidden (is renderable).
     *
     * @private
     * @param {CellCoords} startVisibleColumn Visual column index which starts the range. Starting point for finding
     * destination coordinates with visible coordinates (we are going from the starting coordinates to the end
     * coordinates until the criteria are met).
     * @param {CellCoords} endVisibleColumn Visual column index which ends the range.
     * @param {number} incrementBy We are searching for a next visible columns by increasing (to be precise, or decreasing)
     * indexes. This variable represent indexes shift. From the top to the bottom (increasing indexes, then variable
     * should have value 1) or other way around (decreasing indexes, then variable should have the value -1).
     * @returns {number|null} The visual column index.
     */

  }, {
    key: "findVisibleCoordsInColumnsRange",
    value: function findVisibleCoordsInColumnsRange(startVisibleColumn, endVisibleColumn, incrementBy) {
      var _this$settings$visual2 = this.settings.visualToRenderableCoords({
        row: -1,
        col: startVisibleColumn
      }),
          startColumnRenderable = _this$settings$visual2.col; // There are no more visual columns in the range.


      if (endVisibleColumn === startVisibleColumn && startColumnRenderable === null) {
        return null;
      } // We are looking for a next visible column in the range.


      if (startColumnRenderable === null) {
        return this.findVisibleCoordsInColumnsRange(startVisibleColumn + incrementBy, endVisibleColumn, incrementBy);
      } // We found visible column index in the range.


      return startVisibleColumn;
    }
    /**
     * Searches the nearest visible column and row index, which is not hidden (is renderable). If one
     * of the axes' range is entirely hidden, then created CellCoords object will hold the `null` value
     * under a specific axis. For example, when we select the hidden column, then the calculated `col`
     * prop will be `null`. In that case, rows are calculated further (regardless of the column result)
     * to make rows header highlightable.
     *
     * @private
     * @param {CellCoords} visualFromCoords Visual start coordinates for the range. Starting point for finding destination coordinates
     * with visible coordinates (we are going from the starting coordinates to the end coordinates until the criteria are met).
     * @param {CellCoords} visualToCoords Visual end coordinates for the range.
     * @param {number} incrementByRow We are searching for a next visible rows by increasing (to be precise, or decreasing) indexes.
     * This variable represent indexes shift. We are looking for an index:
     * - for rows: from the left to the right (increasing indexes, then variable should have value 1) or
     * other way around (decreasing indexes, then variable should have the value -1)
     * - for columns: from the top to the bottom (increasing indexes, then variable should have value 1)
     * or other way around (decreasing indexes, then variable should have the value -1).
     * @param {number} incrementByColumn As above, just indexes shift for columns.
     * @returns {CellCoords[]|null} Visual cell coordinates.
     */

  }, {
    key: "findVisibleHeaderRange",
    value: function findVisibleHeaderRange(visualFromCoords, visualToCoords, incrementByRow, incrementByColumn) {
      var fromRangeVisualRow = this.findVisibleCoordsInRowsRange(visualFromCoords.row, visualToCoords.row, incrementByRow);
      var toRangeVisualRow = this.findVisibleCoordsInRowsRange(visualToCoords.row, visualFromCoords.row, -incrementByRow);
      var fromRangeVisualColumn = this.findVisibleCoordsInColumnsRange(visualFromCoords.col, visualToCoords.col, incrementByColumn);
      var toRangeVisualColumn = this.findVisibleCoordsInColumnsRange(visualToCoords.col, visualFromCoords.col, -incrementByColumn); // All rows and columns ranges are hidden.

      if (fromRangeVisualRow === null && toRangeVisualRow === null && fromRangeVisualColumn === null && toRangeVisualColumn === null) {
        return null;
      }

      return [new _src.CellCoords(fromRangeVisualRow, fromRangeVisualColumn), new _src.CellCoords(toRangeVisualRow, toRangeVisualColumn)];
    }
    /**
     * Override internally stored visual indexes added by the Selection's `add` function. It should be executed
     * at the end of process of adding visual selection coordinates.
     *
     * @returns {VisualSelection}
     */

  }, {
    key: "commit",
    value: function commit() {
      // There is no information about visual ranges, thus no selection may be displayed.
      if (this.visualCellRange === null) {
        return this;
      }

      var _this$visualCellRange = this.visualCellRange,
          visualFromCoords = _this$visualCellRange.from,
          visualToCoords = _this$visualCellRange.to; // We may move in two different directions while searching for visible rows and visible columns.

      var incrementByRow = this.getRowSearchDirection(this.visualCellRange);
      var incrementByColumn = this.getColumnSearchDirection(this.visualCellRange);
      var fromRangeVisual = this.findVisibleCoordsInRange(visualFromCoords, visualToCoords, incrementByRow, incrementByColumn);
      var toRangeVisual = this.findVisibleCoordsInRange(visualToCoords, visualFromCoords, -incrementByRow, -incrementByColumn); // There is no visual start point (and also visual end point) in the range.
      // We are looking for the first visible cell in a broader range.

      if (fromRangeVisual === null || toRangeVisual === null) {
        var isHeaderSelectionType = this.settings.type === 'header';
        var cellRange = null; // For the "header" selection type, find rows and column indexes, which should be
        // highlighted, although one of the axes is completely hidden.

        if (isHeaderSelectionType) {
          var _this$findVisibleHead = this.findVisibleHeaderRange(visualFromCoords, visualToCoords, incrementByRow, incrementByColumn),
              _this$findVisibleHead2 = _slicedToArray(_this$findVisibleHead, 2),
              fromRangeVisualHeader = _this$findVisibleHead2[0],
              toRangeVisualHeader = _this$findVisibleHead2[1];

          cellRange = this.createRenderableCellRange(fromRangeVisualHeader, toRangeVisualHeader);
        }

        this.cellRange = cellRange;
      } else {
        this.cellRange = this.createRenderableCellRange(fromRangeVisual, toRangeVisual);
      }

      return this;
    }
    /**
     * Some selection may be a part of broader cell range. This function adjusting coordinates of current selection
     * and the broader cell range when needed (current selection can't be presented visually).
     *
     * @param {CellRange} broaderCellRange Visual range. Actual cell range may be contained in the broader cell range.
     * When there is no way to represent some cell range visually we try to find range containing just the first visible cell.
     *
     * Warn: Please keep in mind that this function may change coordinates of the handled broader range.
     *
     * @returns {VisualSelection}
     */

  }, {
    key: "adjustCoordinates",
    value: function adjustCoordinates(broaderCellRange) {
      // We may move in two different directions while searching for visible rows and visible columns.
      var incrementByRow = this.getRowSearchDirection(broaderCellRange);
      var incrementByColumn = this.getColumnSearchDirection(broaderCellRange);
      var normFromCoords = broaderCellRange.from.clone().normalize();
      var normToCoords = broaderCellRange.to.clone().normalize();
      var singleCellRangeVisual = this.findVisibleCoordsInRange(normFromCoords, normToCoords, incrementByRow, incrementByColumn);

      if (singleCellRangeVisual !== null) {
        // We can't show selection visually now, but we found fist visible range in the broader cell range.
        if (this.cellRange === null) {
          var singleCellRangeRenderable = this.settings.visualToRenderableCoords(singleCellRangeVisual);
          this.cellRange = new _src.CellRange(singleCellRangeRenderable);
        } // We set new highlight as it might change (for example, when showing/hiding some cells from the broader selection range)
        // TODO: It is also handled by the `MergeCells` plugin while adjusting already modified coordinates. Should it?


        broaderCellRange.setHighlight(singleCellRangeVisual);
        return this;
      } // Fallback to the start of the range. It resets the previous highlight (for example, when all columns have been hidden).


      broaderCellRange.setHighlight(broaderCellRange.from);
      return this;
    }
    /**
     * Returns the top left (TL) and bottom right (BR) selection coordinates (renderable indexes).
     * The method overwrites the original method to support header selection for hidden cells.
     * To make the header selection working, the CellCoords and CellRange have to support not
     * complete coordinates (`null` values for example, `row: null`, `col: 2`).
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`.
     */

  }, {
    key: "getCorners",
    value: function getCorners() {
      var _this$cellRange = this.cellRange,
          from = _this$cellRange.from,
          to = _this$cellRange.to;
      var isRowUndefined = from.row === null || to.row === null;
      var isColumnUndefined = from.col === null || to.col === null;
      var topLeftCorner = new _src.CellCoords(isRowUndefined ? null : Math.min(from.row, to.row), isColumnUndefined ? null : Math.min(from.col, to.col));
      var bottomRightCorner = new _src.CellCoords(isRowUndefined ? null : Math.max(from.row, to.row), isColumnUndefined ? null : Math.max(from.col, to.col));
      return [topLeftCorner.row, topLeftCorner.col, bottomRightCorner.row, bottomRightCorner.col];
    }
    /**
     * Returns the top left (TL) and bottom right (BR) selection coordinates (visual indexes).
     *
     * @returns {Array} Returns array of coordinates for example `[1, 1, 5, 5]`.
     */

  }, {
    key: "getVisualCorners",
    value: function getVisualCorners() {
      var topLeft = this.settings.renderableToVisualCoords(this.cellRange.getTopLeftCorner());
      var bottomRight = this.settings.renderableToVisualCoords(this.cellRange.getBottomRightCorner());
      return [topLeft.row, topLeft.col, bottomRight.row, bottomRight.col];
    }
    /**
     * Creates a new CellRange object based on visual coordinates which before object creation are
     * translated to renderable indexes.
     *
     * @param {CellCoords} visualFromCoords The CellCoords object which contains coordinates that
     *                                      points to the begining of the selection.
     * @param {CellCoords} visualToCoords The CellCoords object which contains coordinates that
     *                                    points to the end of the selection.
     * @returns {CellRange}
     */

  }, {
    key: "createRenderableCellRange",
    value: function createRenderableCellRange(visualFromCoords, visualToCoords) {
      var renderableFromCoords = this.settings.visualToRenderableCoords(visualFromCoords);
      var renderableToCoords = this.settings.visualToRenderableCoords(visualToCoords);
      return new _src.CellRange(renderableFromCoords, renderableFromCoords, renderableToCoords);
    }
    /**
     * It returns rows shift needed for searching visual row.
     *
     * @private
     * @param {CellRange} cellRange Selection range.
     * @returns {number} Rows shift. It return 1 when we should increase indexes (moving from the top to the bottom) or
     * -1 when we should decrease indexes (moving other way around).
     */

  }, {
    key: "getRowSearchDirection",
    value: function getRowSearchDirection(cellRange) {
      if (cellRange.from.row < cellRange.to.row) {
        return 1; // Increasing row indexes.
      }

      return -1; // Decreasing row indexes.
    }
    /**
     * It returns columns shift needed for searching visual column.
     *
     * @private
     * @param {CellRange} cellRange Selection range.
     * @returns {number} Columns shift. It return 1 when we should increase indexes (moving from the left to the right) or
     * -1 when we should decrease indexes (moving other way around).
     */

  }, {
    key: "getColumnSearchDirection",
    value: function getColumnSearchDirection(cellRange) {
      if (cellRange.from.col < cellRange.to.col) {
        return 1; // Increasing column indexes.
      }

      return -1; // Decreasing column indexes.
    }
  }]);

  return VisualSelection;
}(_src.Selection);

var _default = VisualSelection;
exports.default = _default;