"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _element = require("./../../../helpers/dom/element");

var _function = require("./../../../helpers/function");

var _coords = _interopRequireDefault(require("./cell/coords"));

var _column = _interopRequireDefault(require("./filter/column"));

var _row = _interopRequireDefault(require("./filter/row"));

var _renderer = require("./renderer");

var _column2 = _interopRequireDefault(require("./utils/column"));

var _row2 = _interopRequireDefault(require("./utils/row"));

var _registerer = require("./overlay/registerer");

var _constants = require("./overlay/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 */
var Table = /*#__PURE__*/function () {
  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   * @param {HTMLTableElement} table An element to the Walkontable generated table is injected.
   */
  function Table(wotInstance, table) {
    var _this = this;

    _classCallCheck(this, Table);

    /**
     * Indicates if this instance is of type `MasterTable` (i.e. It is NOT an overlay).
     *
     * @type {boolean}
     */
    this.isMaster = !wotInstance.cloneOverlay; // "instanceof" operator isn't used, because it caused a circular reference in Webpack

    this.wot = wotInstance; // legacy support

    this.instance = this.wot;
    this.TABLE = table;
    this.TBODY = null;
    this.THEAD = null;
    this.COLGROUP = null;
    this.tableOffset = 0;
    this.holderOffset = 0;
    /**
     * Indicates if the table has height bigger than 0px.
     *
     * @type {boolean}
     */

    this.hasTableHeight = true;
    /**
     * Indicates if the table has width bigger than 0px.
     *
     * @type {boolean}
     */

    this.hasTableWidth = true;
    /**
     * Indicates if the table is visible. By visible, it means that the holder
     * element has CSS 'display' property different than 'none'.
     *
     * @type {boolean}
     */

    this.isTableVisible = false;
    (0, _element.removeTextNodes)(this.TABLE);
    this.spreader = this.createSpreader(this.TABLE);
    this.hider = this.createHider(this.spreader);
    this.holder = this.createHolder(this.hider);
    this.wtRootElement = this.holder.parentNode;

    if (this.isMaster) {
      this.alignOverlaysWithTrimmingContainer();
    }

    this.fixTableDomTree();
    this.rowFilter = null;
    this.columnFilter = null;
    this.correctHeaderWidth = false;
    var origRowHeaderWidth = this.wot.wtSettings.settings.rowHeaderWidth; // Fix for jumping row headers (https://github.com/handsontable/handsontable/issues/3850)

    this.wot.wtSettings.settings.rowHeaderWidth = function () {
      return _this._modifyRowHeaderWidth(origRowHeaderWidth);
    };

    this.rowUtils = new _row2.default(this.wot);
    this.columnUtils = new _column2.default(this.wot);
    this.tableRenderer = new _renderer.Renderer({
      TABLE: this.TABLE,
      THEAD: this.THEAD,
      COLGROUP: this.COLGROUP,
      TBODY: this.TBODY,
      rowUtils: this.rowUtils,
      columnUtils: this.columnUtils,
      cellRenderer: this.wot.wtSettings.settings.cellRenderer
    });
  }
  /**
   * Returns a boolean that is true if this intance of Table represents a specific overlay, identified by the overlay name.
   * For MasterTable, it returns false.
   *
   * @param {string} overlayTypeName The overlay type.
   * @returns {boolean}
   */


  _createClass(Table, [{
    key: "is",
    value: function is(overlayTypeName) {
      return (0, _registerer.isOverlayTypeOf)(this.wot.cloneOverlay, overlayTypeName);
    }
    /**
     *
     */

  }, {
    key: "fixTableDomTree",
    value: function fixTableDomTree() {
      var rootDocument = this.wot.rootDocument;
      this.TBODY = this.TABLE.querySelector('tbody');

      if (!this.TBODY) {
        this.TBODY = rootDocument.createElement('tbody');
        this.TABLE.appendChild(this.TBODY);
      }

      this.THEAD = this.TABLE.querySelector('thead');

      if (!this.THEAD) {
        this.THEAD = rootDocument.createElement('thead');
        this.TABLE.insertBefore(this.THEAD, this.TBODY);
      }

      this.COLGROUP = this.TABLE.querySelector('colgroup');

      if (!this.COLGROUP) {
        this.COLGROUP = rootDocument.createElement('colgroup');
        this.TABLE.insertBefore(this.COLGROUP, this.THEAD);
      }

      if (this.wot.getSetting('columnHeaders').length && !this.THEAD.childNodes.length) {
        this.THEAD.appendChild(rootDocument.createElement('TR'));
      }
    }
    /**
     * @param {HTMLTableElement} table An element to process.
     * @returns {HTMLElement}
     */

  }, {
    key: "createSpreader",
    value: function createSpreader(table) {
      var parent = table.parentNode;
      var spreader;

      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !(0, _element.hasClass)(parent, 'wtHolder')) {
        spreader = this.wot.rootDocument.createElement('div');
        spreader.className = 'wtSpreader';

        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(spreader, table);
        }

        spreader.appendChild(table);
      }

      spreader.style.position = 'relative';
      return spreader;
    }
    /**
     * @param {HTMLElement} spreader An element to the hider element is injected.
     * @returns {HTMLElement}
     */

  }, {
    key: "createHider",
    value: function createHider(spreader) {
      var parent = spreader.parentNode;
      var hider;

      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !(0, _element.hasClass)(parent, 'wtHolder')) {
        hider = this.wot.rootDocument.createElement('div');
        hider.className = 'wtHider';

        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(hider, spreader);
        }

        hider.appendChild(spreader);
      }

      return hider;
    }
    /**
     *
     * @param {HTMLElement} hider An element to the holder element is injected.
     * @returns {HTMLElement}
     */

  }, {
    key: "createHolder",
    value: function createHolder(hider) {
      var parent = hider.parentNode;
      var holder;

      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !(0, _element.hasClass)(parent, 'wtHolder')) {
        holder = this.wot.rootDocument.createElement('div');
        holder.style.position = 'relative';
        holder.className = 'wtHolder';

        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(holder, hider);
        }

        if (this.isMaster) {
          holder.parentNode.className += 'ht_master handsontable';
        }

        holder.appendChild(hider);
      }

      return holder;
    }
    /**
     * Redraws the table.
     *
     * @param {boolean} [fastDraw=false] If TRUE, will try to avoid full redraw and only update the border positions.
     *                                   If FALSE or UNDEFINED, will perform a full redraw.
     * @returns {Table}
     */

  }, {
    key: "draw",
    value: function draw() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var wot = this.wot;
      var wtOverlays = wot.wtOverlays,
          wtViewport = wot.wtViewport;
      var totalRows = wot.getSetting('totalRows');
      var totalColumns = wot.getSetting('totalColumns');
      var rowHeaders = wot.getSetting('rowHeaders');
      var rowHeadersCount = rowHeaders.length;
      var columnHeaders = wot.getSetting('columnHeaders');
      var columnHeadersCount = columnHeaders.length;
      var syncScroll = false;
      var runFastDraw = fastDraw;

      if (this.isMaster) {
        this.holderOffset = (0, _element.offset)(this.holder);
        runFastDraw = wtViewport.createRenderCalculators(runFastDraw);

        if (rowHeadersCount && !wot.getSetting('fixedColumnsLeft')) {
          var leftScrollPos = wtOverlays.leftOverlay.getScrollPosition();
          var previousState = this.correctHeaderWidth;
          this.correctHeaderWidth = leftScrollPos > 0;

          if (previousState !== this.correctHeaderWidth) {
            runFastDraw = false;
          }
        }
      }

      if (this.isMaster) {
        syncScroll = wtOverlays.prepareOverlays();
      }

      if (runFastDraw) {
        if (this.isMaster) {
          // in case we only scrolled without redraw, update visible rows information in oldRowsCalculator
          wtViewport.createVisibleCalculators();
        }

        if (wtOverlays) {
          wtOverlays.refresh(true);
        }
      } else {
        if (this.isMaster) {
          this.tableOffset = (0, _element.offset)(this.TABLE);
        } else {
          this.tableOffset = this.wot.cloneSource.wtTable.tableOffset;
        }

        var startRow = totalRows > 0 ? this.getFirstRenderedRow() : 0;
        var startColumn = totalColumns > 0 ? this.getFirstRenderedColumn() : 0;
        this.rowFilter = new _row.default(startRow, totalRows, columnHeadersCount);
        this.columnFilter = new _column.default(startColumn, totalColumns, rowHeadersCount);
        var performRedraw = true; // Only master table rendering can be skipped

        if (this.isMaster) {
          this.alignOverlaysWithTrimmingContainer();
          var skipRender = {};
          this.wot.getSetting('beforeDraw', true, skipRender);
          performRedraw = skipRender.skipRender !== true;
        }

        if (performRedraw) {
          this.tableRenderer.setHeaderContentRenderers(rowHeaders, columnHeaders);

          if (this.is(_constants.CLONE_BOTTOM) || this.is(_constants.CLONE_BOTTOM_LEFT_CORNER)) {
            // do NOT render headers on the bottom or bottom-left corner overlay
            this.tableRenderer.setHeaderContentRenderers(rowHeaders, []);
          }

          this.resetOversizedRows();
          this.tableRenderer.setViewportSize(this.getRenderedRowsCount(), this.getRenderedColumnsCount()).setFilters(this.rowFilter, this.columnFilter).render();
          var workspaceWidth;

          if (this.isMaster) {
            workspaceWidth = this.wot.wtViewport.getWorkspaceWidth();
            this.wot.wtViewport.containerWidth = null;
            this.markOversizedColumnHeaders();
          }

          this.adjustColumnHeaderHeights();

          if (this.isMaster || this.is(_constants.CLONE_BOTTOM)) {
            this.markOversizedRows();
          }

          if (this.isMaster) {
            this.wot.wtViewport.createVisibleCalculators();
            this.wot.wtOverlays.refresh(false);
            this.wot.wtOverlays.applyToDOM();
            var hiderWidth = (0, _element.outerWidth)(this.hider);
            var tableWidth = (0, _element.outerWidth)(this.TABLE);

            if (hiderWidth !== 0 && tableWidth !== hiderWidth) {
              // Recalculate the column widths, if width changes made in the overlays removed the scrollbar, thus changing the viewport width.
              this.columnUtils.calculateWidths();
              this.tableRenderer.renderer.colGroup.render();
            }

            if (workspaceWidth !== this.wot.wtViewport.getWorkspaceWidth()) {
              // workspace width changed though to shown/hidden vertical scrollbar. Let's reapply stretching
              this.wot.wtViewport.containerWidth = null;
              this.columnUtils.calculateWidths();
              this.tableRenderer.renderer.colGroup.render();
            }

            this.wot.getSetting('onDraw', true);
          } else if (this.is(_constants.CLONE_BOTTOM)) {
            this.wot.cloneSource.wtOverlays.adjustElementsSize();
          }
        }
      }

      if (this.isMaster) {
        var positionChanged = wtOverlays.topOverlay.resetFixedPosition();

        if (wtOverlays.bottomOverlay.clone) {
          positionChanged = wtOverlays.bottomOverlay.resetFixedPosition() || positionChanged;
        }

        positionChanged = wtOverlays.leftOverlay.resetFixedPosition() || positionChanged;

        if (wtOverlays.topLeftCornerOverlay) {
          wtOverlays.topLeftCornerOverlay.resetFixedPosition();
        }

        if (wtOverlays.bottomLeftCornerOverlay && wtOverlays.bottomLeftCornerOverlay.clone) {
          wtOverlays.bottomLeftCornerOverlay.resetFixedPosition();
        }

        if (positionChanged) {
          // It refreshes the cells borders caused by a 1px shift (introduced by overlays which add or
          // remove `innerBorderTop` and `innerBorderLeft` CSS classes to the DOM element. This happens
          // when there is a switch between rendering from 0 to N rows/columns and vice versa).
          wtOverlays.refreshAll();
          wtOverlays.adjustElementsSize();
        }
      }

      this.refreshSelections(runFastDraw);

      if (syncScroll) {
        wtOverlays.syncScrollWithMaster();
      }

      wot.drawn = true;
      return this;
    }
    /**
     * @param {number} col The visual column index.
     */

  }, {
    key: "markIfOversizedColumnHeader",
    value: function markIfOversizedColumnHeader(col) {
      var sourceColIndex = this.wot.wtTable.columnFilter.renderedToSource(col);
      var level = this.wot.getSetting('columnHeaders').length;
      var defaultRowHeight = this.wot.wtSettings.settings.defaultRowHeight;
      var previousColHeaderHeight;
      var currentHeader;
      var currentHeaderHeight;
      var columnHeaderHeightSetting = this.wot.getSetting('columnHeaderHeight') || [];

      while (level) {
        level -= 1;
        previousColHeaderHeight = this.wot.wtTable.getColumnHeaderHeight(level);
        currentHeader = this.wot.wtTable.getColumnHeader(sourceColIndex, level);

        if (!currentHeader) {
          /* eslint-disable no-continue */
          continue;
        }

        currentHeaderHeight = (0, _element.innerHeight)(currentHeader);

        if (!previousColHeaderHeight && defaultRowHeight < currentHeaderHeight || previousColHeaderHeight < currentHeaderHeight) {
          this.wot.wtViewport.oversizedColumnHeaders[level] = currentHeaderHeight;
        }

        if (Array.isArray(columnHeaderHeightSetting)) {
          if (columnHeaderHeightSetting[level] !== null && columnHeaderHeightSetting[level] !== void 0) {
            this.wot.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting[level];
          }
        } else if (!isNaN(columnHeaderHeightSetting)) {
          this.wot.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting;
        }

        if (this.wot.wtViewport.oversizedColumnHeaders[level] < (columnHeaderHeightSetting[level] || columnHeaderHeightSetting)) {
          this.wot.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting[level] || columnHeaderHeightSetting; // eslint-disable-line max-len
        }
      }
    }
    /**
     *
     */

  }, {
    key: "adjustColumnHeaderHeights",
    value: function adjustColumnHeaderHeights() {
      var wot = this.wot;
      var children = wot.wtTable.THEAD.childNodes;
      var oversizedColumnHeaders = wot.wtViewport.oversizedColumnHeaders;
      var columnHeaders = wot.getSetting('columnHeaders');

      for (var i = 0, len = columnHeaders.length; i < len; i++) {
        if (oversizedColumnHeaders[i]) {
          if (!children[i] || children[i].childNodes.length === 0) {
            return;
          }

          children[i].childNodes[0].style.height = "".concat(oversizedColumnHeaders[i], "px");
        }
      }
    }
    /**
     * Resets cache of row heights. The cache should be cached for each render cycle in a case
     * when new cell values have content which increases/decreases cell height.
     */

  }, {
    key: "resetOversizedRows",
    value: function resetOversizedRows() {
      var wot = this.wot;

      if (!this.isMaster && !this.is(_constants.CLONE_BOTTOM)) {
        return;
      }

      if (!wot.getSetting('externalRowCalculator')) {
        var rowsToRender = this.getRenderedRowsCount(); // Reset the oversized row cache for rendered rows

        for (var visibleRowIndex = 0; visibleRowIndex < rowsToRender; visibleRowIndex++) {
          var sourceRow = this.rowFilter.renderedToSource(visibleRowIndex);

          if (wot.wtViewport.oversizedRows && wot.wtViewport.oversizedRows[sourceRow]) {
            wot.wtViewport.oversizedRows[sourceRow] = void 0;
          }
        }
      }
    }
    /**
     * @param {string} className The CSS class name to remove from the table cells.
     */

  }, {
    key: "removeClassFromCells",
    value: function removeClassFromCells(className) {
      var nodes = this.TABLE.querySelectorAll(".".concat(className));

      for (var i = 0, len = nodes.length; i < len; i++) {
        (0, _element.removeClass)(nodes[i], className);
      }
    }
    /**
     * Refresh the table selection by re-rendering Selection instances connected with that instance.
     *
     * @param {boolean} fastDraw If fast drawing is enabled than additionally className clearing is applied.
     */

  }, {
    key: "refreshSelections",
    value: function refreshSelections(fastDraw) {
      var wot = this.wot;

      if (!wot.selections) {
        return;
      }

      var highlights = Array.from(wot.selections);
      var len = highlights.length;

      if (fastDraw) {
        var classesToRemove = [];

        for (var i = 0; i < len; i++) {
          var _highlights$i$setting = highlights[i].settings,
              highlightHeaderClassName = _highlights$i$setting.highlightHeaderClassName,
              highlightRowClassName = _highlights$i$setting.highlightRowClassName,
              highlightColumnClassName = _highlights$i$setting.highlightColumnClassName;
          var classNames = highlights[i].classNames;
          var classNamesLength = classNames.length;

          for (var j = 0; j < classNamesLength; j++) {
            if (!classesToRemove.includes(classNames[j])) {
              classesToRemove.push(classNames[j]);
            }
          }

          if (highlightHeaderClassName && !classesToRemove.includes(highlightHeaderClassName)) {
            classesToRemove.push(highlightHeaderClassName);
          }

          if (highlightRowClassName && !classesToRemove.includes(highlightRowClassName)) {
            classesToRemove.push(highlightRowClassName);
          }

          if (highlightColumnClassName && !classesToRemove.includes(highlightColumnClassName)) {
            classesToRemove.push(highlightColumnClassName);
          }
        }

        var additionalClassesToRemove = wot.getSetting('onBeforeRemoveCellClassNames');

        if (Array.isArray(additionalClassesToRemove)) {
          for (var _i = 0; _i < additionalClassesToRemove.length; _i++) {
            classesToRemove.push(additionalClassesToRemove[_i]);
          }
        }

        var classesToRemoveLength = classesToRemove.length;

        for (var _i2 = 0; _i2 < classesToRemoveLength; _i2++) {
          // there was no rerender, so we need to remove classNames by ourselves
          this.removeClassFromCells(classesToRemove[_i2]);
        }
      }

      for (var _i3 = 0; _i3 < len; _i3++) {
        highlights[_i3].draw(wot, fastDraw);
      }
    }
    /**
     * Get cell element at coords.
     * Negative coords.row or coords.col are used to retrieve header cells. If there are multiple header levels, the
     * negative value corresponds to the distance from the working area. For example, when there are 3 levels of column
     * headers, coords.col=-1 corresponds to the most inner header element, while coords.col=-3 corresponds to the
     * outmost header element.
     *
     * In case an element for the coords is not rendered, the method returns an error code.
     * To produce the error code, the input parameters are validated in the order in which they
     * are given. Thus, if both the row and the column coords are out of the rendered bounds,
     * the method returns the error code for the row.
     *
     * @param {CellCoords} coords The cell coordinates.
     * @returns {HTMLElement|number} HTMLElement on success or Number one of the exit codes on error:
     *  -1 row before viewport
     *  -2 row after viewport
     *  -3 column before viewport
     *  -4 column after viewport.
     */

  }, {
    key: "getCell",
    value: function getCell(coords) {
      var row = coords.row;
      var column = coords.col;
      var hookResult = this.wot.getSetting('onModifyGetCellCoords', row, column);

      if (hookResult && Array.isArray(hookResult)) {
        var _hookResult = _slicedToArray(hookResult, 2);

        row = _hookResult[0];
        column = _hookResult[1];
      }

      if (this.isRowBeforeRenderedRows(row)) {
        // row before rendered rows
        return -1;
      } else if (this.isRowAfterRenderedRows(row)) {
        // row after rendered rows
        return -2;
      } else if (this.isColumnBeforeRenderedColumns(column)) {
        // column before rendered columns
        return -3;
      } else if (this.isColumnAfterRenderedColumns(column)) {
        // column after rendered columns
        return -4;
      }

      var TR;

      if (row < 0) {
        TR = this.THEAD.childNodes[this.rowFilter.sourceRowToVisibleColHeadedRow(row)];
      } else {
        TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
      }

      if (!TR && row >= 0) {
        throw new Error('TR was expected to be rendered but is not');
      }

      var TD = TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(column)];

      if (!TD && column >= 0) {
        throw new Error('TD or TH was expected to be rendered but is not');
      }

      return TD;
    }
    /**
     * GetColumnHeader.
     *
     * @param {number} col Column index.
     * @param {number} [level=0] Header level (0 = most distant to the table).
     * @returns {object} HTMLElement on success or undefined on error.
     */

  }, {
    key: "getColumnHeader",
    value: function getColumnHeader(col) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var TR = this.THEAD.childNodes[level];
      return TR === null || TR === void 0 ? void 0 : TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(col)];
    }
    /**
     * Gets all columns headers (TH elements) from the table.
     *
     * @param {number} column A source column index.
     * @returns {HTMLTableCellElement[]}
     */

  }, {
    key: "getColumnHeaders",
    value: function getColumnHeaders(column) {
      var THs = [];
      var visibleColumn = this.columnFilter.sourceColumnToVisibleRowHeadedColumn(column);
      this.THEAD.childNodes.forEach(function (TR) {
        var TH = TR.childNodes[visibleColumn];

        if (TH) {
          THs.push(TH);
        }
      });
      return THs;
    }
    /**
     * GetRowHeader.
     *
     * @param {number} row Row index.
     * @param {number} [level=0] Header level (0 = most distant to the table).
     * @returns {HTMLElement} HTMLElement on success or Number one of the exit codes on error: `null table doesn't have row headers`.
     */

  }, {
    key: "getRowHeader",
    value: function getRowHeader(row) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0) === 0) {
        return;
      }

      var rowHeadersCount = this.wot.getSetting('rowHeaders').length;

      if (level >= rowHeadersCount) {
        return;
      }

      var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
      return TR === null || TR === void 0 ? void 0 : TR.childNodes[level];
    }
    /**
     * Gets all rows headers (TH elements) from the table.
     *
     * @param {number} row A source row index.
     * @returns {HTMLTableCellElement[]}
     */

  }, {
    key: "getRowHeaders",
    value: function getRowHeaders(row) {
      if (this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0) === 0) {
        return [];
      }

      var THs = [];
      var rowHeadersCount = this.wot.getSetting('rowHeaders').length;

      for (var renderedRowIndex = 0; renderedRowIndex < rowHeadersCount; renderedRowIndex++) {
        var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
        var TH = TR === null || TR === void 0 ? void 0 : TR.childNodes[renderedRowIndex];

        if (TH) {
          THs.push(TH);
        }
      }

      return THs;
    }
    /**
     * Returns cell coords object for a given TD (or a child element of a TD element).
     *
     * @param {HTMLTableCellElement} TD A cell DOM element (or a child of one).
     * @returns {CellCoords|null} The coordinates of the provided TD element (or the closest TD element) or null, if the provided element is not applicable.
     */

  }, {
    key: "getCoords",
    value: function getCoords(TD) {
      var cellElement = TD;

      if (cellElement.nodeName !== 'TD' && cellElement.nodeName !== 'TH') {
        cellElement = (0, _element.closest)(cellElement, ['TD', 'TH']);
      }

      if (cellElement === null) {
        return null;
      }

      var TR = cellElement.parentNode;
      var CONTAINER = TR.parentNode;
      var row = (0, _element.index)(TR);
      var col = cellElement.cellIndex;

      if ((0, _element.overlayContainsElement)(_constants.CLONE_TOP_LEFT_CORNER, cellElement, this.wtRootElement) || (0, _element.overlayContainsElement)(_constants.CLONE_TOP, cellElement, this.wtRootElement)) {
        if (CONTAINER.nodeName === 'THEAD') {
          row -= CONTAINER.childNodes.length;
        }
      } else if ((0, _element.overlayContainsElement)(_constants.CLONE_BOTTOM_LEFT_CORNER, cellElement, this.wtRootElement) || (0, _element.overlayContainsElement)(_constants.CLONE_BOTTOM, cellElement, this.wtRootElement)) {
        var totalRows = this.wot.getSetting('totalRows');
        row = totalRows - CONTAINER.childNodes.length + row;
      } else if (CONTAINER === this.THEAD) {
        row = this.rowFilter.visibleColHeadedRowToSourceRow(row);
      } else {
        row = this.rowFilter.renderedToSource(row);
      }

      if ((0, _element.overlayContainsElement)(_constants.CLONE_TOP_LEFT_CORNER, cellElement, this.wtRootElement) || (0, _element.overlayContainsElement)(_constants.CLONE_LEFT, cellElement, this.wtRootElement) || (0, _element.overlayContainsElement)(_constants.CLONE_BOTTOM_LEFT_CORNER, cellElement, this.wtRootElement)) {
        col = this.columnFilter.offsettedTH(col);
      } else {
        col = this.columnFilter.visibleRowHeadedColumnToSourceColumn(col);
      }

      return new _coords.default(row, col);
    }
    /**
     * Check if any of the rendered rows is higher than expected, and if so, cache them.
     */

  }, {
    key: "markOversizedRows",
    value: function markOversizedRows() {
      if (this.wot.getSetting('externalRowCalculator')) {
        return;
      }

      var rowCount = this.TBODY.childNodes.length;
      var expectedTableHeight = rowCount * this.wot.wtSettings.settings.defaultRowHeight;
      var actualTableHeight = (0, _element.innerHeight)(this.TBODY) - 1;
      var previousRowHeight;
      var rowInnerHeight;
      var sourceRowIndex;
      var currentTr;
      var rowHeader;

      if (expectedTableHeight === actualTableHeight && !this.wot.getSetting('fixedRowsBottom')) {
        // If the actual table height equals rowCount * default single row height, no row is oversized -> no need to iterate over them
        return;
      }

      while (rowCount) {
        rowCount -= 1;
        sourceRowIndex = this.rowFilter.renderedToSource(rowCount);
        previousRowHeight = this.getRowHeight(sourceRowIndex);
        currentTr = this.getTrForRow(sourceRowIndex);
        rowHeader = currentTr.querySelector('th');

        if (rowHeader) {
          rowInnerHeight = (0, _element.innerHeight)(rowHeader);
        } else {
          rowInnerHeight = (0, _element.innerHeight)(currentTr) - 1;
        }

        if (!previousRowHeight && this.wot.wtSettings.settings.defaultRowHeight < rowInnerHeight || previousRowHeight < rowInnerHeight) {
          rowInnerHeight += 1;
          this.wot.wtViewport.oversizedRows[sourceRowIndex] = rowInnerHeight;
        }
      }
    }
    /**
     * @param {number} row The visual row index.
     * @returns {HTMLTableElement}
     */

  }, {
    key: "getTrForRow",
    value: function getTrForRow(row) {
      return this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
    }
    /**
     * Checks if the column index (negative value from -1 to N) is rendered.
     *
     * @param {number} column The column index (negative value from -1 to N).
     * @returns {boolean}
     */

  }, {
    key: "isColumnHeaderRendered",
    value: function isColumnHeaderRendered(column) {
      if (column >= 0) {
        return false;
      }

      var rowHeaders = this.wot.getSetting('rowHeaders');
      var rowHeadersCount = rowHeaders.length;
      return Math.abs(column) <= rowHeadersCount;
    }
    /**
     * Checks if the row index (negative value from -1 to N) is rendered.
     *
     * @param {number} row The row index (negative value from -1 to N).
     * @returns {boolean}
     */

  }, {
    key: "isRowHeaderRendered",
    value: function isRowHeaderRendered(row) {
      if (row >= 0) {
        return false;
      }

      var columnHeaders = this.wot.getSetting('columnHeaders');
      var columnHeadersCount = columnHeaders.length;
      return Math.abs(row) <= columnHeadersCount;
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * Check if the given row index is lower than the index of the first row that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * Negative row index is used to check the columns' headers.
     *
     *  Headers
     *           +--------------+                                     │
     *       -3  │    │    │    │                                     │
     *           +--------------+                                     │
     *       -2  │    │    │    │                                     │ TRUE
     *           +--------------+                                     │
     *       -1  │    │    │    │                                     │
     *  Cells  +==================+                                   │
     *        0  ┇    ┇    ┇    ┇ <--- For fixedRowsTop: 1            │
     *           +--------------+      the master overlay do       ---+ first rendered row (index 1)
     *        1  │ A2 │ B2 │ C2 │      not render the first row.      │
     *           +--------------+                                     │ FALSE
     *        2  │ A3 │ B3 │ C3 │                                     │
     *           +--------------+                                  ---+ last rendered row
     *                                                                │
     *                                                                │ FALSE
     *
     * @param {number} row The visual row index.
     * @memberof Table#
     * @function isRowBeforeRenderedRows
     * @returns {boolean}
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "isRowBeforeRenderedRows",
    value: function isRowBeforeRenderedRows(row) {
      var first = this.getFirstRenderedRow(); // Check the headers only in case when the first rendered row is -1 or 0.
      // This is an indication that the overlay is placed on the most top position.

      if (row < 0 && first <= 0) {
        return !this.isRowHeaderRendered(row);
      }

      return row < first;
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * Check if the given column index is greater than the index of the last column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * The negative row index is used to check the columns' headers. However,
     * keep in mind that for negative indexes, the method always returns FALSE as
     * it is not possible to render headers partially. The "after" index can not be
     * lower than -1.
     *
     *  Headers
     *           +--------------+                                     │
     *       -3  │    │    │    │                                     │
     *           +--------------+                                     │
     *       -2  │    │    │    │                                     │ FALSE
     *           +--------------+                                     │
     *       -1  │    │    │    │                                     │
     *  Cells  +==================+                                   │
     *        0  ┇    ┇    ┇    ┇ <--- For fixedRowsTop: 1            │
     *           +--------------+      the master overlay do       ---+ first rendered row (index 1)
     *        1  │ A2 │ B2 │ C2 │      not render the first rows      │
     *           +--------------+                                     │ FALSE
     *        2  │ A3 │ B3 │ C3 │                                     │
     *           +--------------+                                  ---+ last rendered row
     *                                                                │
     *                                                                │ TRUE
     *
     * @param {number} row The visual row index.
     * @memberof Table#
     * @function isRowAfterRenderedRows
     * @returns {boolean}
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "isRowAfterRenderedRows",
    value: function isRowAfterRenderedRows(row) {
      return row > this.getLastRenderedRow();
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * Check if the given column index is lower than the index of the first column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * Negative column index is used to check the rows' headers.
     *
     *                            For fixedColumnsLeft: 1 the master overlay
     *                            do not render this first columns.
     *  Headers    -3   -2   -1    |
     *           +----+----+----║┄ ┄ +------+------+
     *           │    │    │    ║    │  B1  │  C1  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B2  │  C2  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B3  │  C3  │
     *           +----+----+----║┄ ┄ +------+------+
     *                               ╷             ╷
     *      -------------------------+-------------+---------------->
     *          TRUE             first    FALSE   last         FALSE
     *                           rendered         rendered
     *                           column           column
     *
     * @param {number} column The visual column index.
     * @memberof Table#
     * @function isColumnBeforeRenderedColumns
     * @returns {boolean}
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "isColumnBeforeRenderedColumns",
    value: function isColumnBeforeRenderedColumns(column) {
      var first = this.getFirstRenderedColumn(); // Check the headers only in case when the first rendered column is -1 or 0.
      // This is an indication that the overlay is placed on the most left position.

      if (column < 0 && first <= 0) {
        return !this.isColumnHeaderRendered(column);
      }

      return column < first;
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */

    /**
     * Check if the given column index is greater than the index of the last column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * The negative column index is used to check the rows' headers. However,
     * keep in mind that for negative indexes, the method always returns FALSE as
     * it is not possible to render headers partially. The "after" index can not be
     * lower than -1.
     *
     *                            For fixedColumnsLeft: 1 the master overlay
     *                            do not render this first columns.
     *  Headers    -3   -2   -1    |
     *           +----+----+----║┄ ┄ +------+------+
     *           │    │    │    ║    │  B1  │  C1  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B2  │  C2  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B3  │  C3  │
     *           +----+----+----║┄ ┄ +------+------+
     *                               ╷             ╷
     *      -------------------------+-------------+---------------->
     *          FALSE             first    FALSE   last         TRUE
     *                           rendered         rendered
     *                           column           column
     *
     * @param {number} column The visual column index.
     * @memberof Table#
     * @function isColumnAfterRenderedColumns
     * @returns {boolean}
     */

    /* eslint-enable jsdoc/require-description-complete-sentence */

  }, {
    key: "isColumnAfterRenderedColumns",
    value: function isColumnAfterRenderedColumns(column) {
      return this.columnFilter && column > this.getLastRenderedColumn();
    }
  }, {
    key: "isColumnAfterViewport",
    value: function isColumnAfterViewport(column) {
      return this.columnFilter && column > this.getLastVisibleColumn();
    }
  }, {
    key: "isRowAfterViewport",
    value: function isRowAfterViewport(row) {
      return this.rowFilter && row > this.getLastVisibleRow();
    }
  }, {
    key: "isColumnBeforeViewport",
    value: function isColumnBeforeViewport(column) {
      return this.columnFilter && this.columnFilter.sourceToRendered(column) < 0 && column >= 0;
    }
  }, {
    key: "isLastRowFullyVisible",
    value: function isLastRowFullyVisible() {
      return this.getLastVisibleRow() === this.getLastRenderedRow();
    }
  }, {
    key: "isLastColumnFullyVisible",
    value: function isLastColumnFullyVisible() {
      return this.getLastVisibleColumn() === this.getLastRenderedColumn();
    }
  }, {
    key: "allRowsInViewport",
    value: function allRowsInViewport() {
      return this.wot.getSetting('totalRows') === this.getVisibleRowsCount();
    }
  }, {
    key: "allColumnsInViewport",
    value: function allColumnsInViewport() {
      return this.wot.getSetting('totalColumns') === this.getVisibleColumnsCount();
    }
    /**
     * Checks if any of the row's cells content exceeds its initial height, and if so, returns the oversized height.
     *
     * @param {number} sourceRow The physical row index.
     * @returns {number}
     */

  }, {
    key: "getRowHeight",
    value: function getRowHeight(sourceRow) {
      return this.rowUtils.getHeight(sourceRow);
    }
    /**
     * @param {number} level The column level.
     * @returns {number}
     */

  }, {
    key: "getColumnHeaderHeight",
    value: function getColumnHeaderHeight(level) {
      return this.columnUtils.getHeaderHeight(level);
    }
    /**
     * @param {number} sourceColumn The physical column index.
     * @returns {number}
     */

  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(sourceColumn) {
      return this.columnUtils.getWidth(sourceColumn);
    }
    /**
     * @param {number} sourceColumn The physical column index.
     * @returns {number}
     */

  }, {
    key: "getStretchedColumnWidth",
    value: function getStretchedColumnWidth(sourceColumn) {
      return this.columnUtils.getStretchedColumnWidth(sourceColumn);
    }
    /**
     * Checks if the table has defined size. It returns `true` when the table has width and height
     * set bigger than `0px`.
     *
     * @returns {boolean}
     */

  }, {
    key: "hasDefinedSize",
    value: function hasDefinedSize() {
      return this.hasTableHeight && this.hasTableWidth;
    }
    /**
     * Checks if the table is visible. It returns `true` when the holder element (or its parents)
     * has CSS 'display' property different than 'none'.
     *
     * @returns {boolean}
     */

  }, {
    key: "isVisible",
    value: function isVisible() {
      return (0, _element.isVisible)(this.TABLE);
    }
    /**
     * Modify row header widths provided by user in class contructor.
     *
     * @private
     * @param {Function} rowHeaderWidthFactory The function which can provide default width values for rows..
     * @returns {number}
     */

  }, {
    key: "_modifyRowHeaderWidth",
    value: function _modifyRowHeaderWidth(rowHeaderWidthFactory) {
      var widths = (0, _function.isFunction)(rowHeaderWidthFactory) ? rowHeaderWidthFactory() : null;

      if (Array.isArray(widths)) {
        widths = _toConsumableArray(widths);
        widths[widths.length - 1] = this._correctRowHeaderWidth(widths[widths.length - 1]);
      } else {
        widths = this._correctRowHeaderWidth(widths);
      }

      return widths;
    }
    /**
     * Correct row header width if necessary.
     *
     * @private
     * @param {number} width The width to process.
     * @returns {number}
     */

  }, {
    key: "_correctRowHeaderWidth",
    value: function _correctRowHeaderWidth(width) {
      var rowHeaderWidth = width;

      if (typeof width !== 'number') {
        rowHeaderWidth = this.wot.getSetting('defaultColumnWidth');
      }

      if (this.correctHeaderWidth) {
        rowHeaderWidth += 1;
      }

      return rowHeaderWidth;
    }
  }]);

  return Table;
}();

var _default = Table;
exports.default = _default;