function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { addClass, getScrollbarWidth, getScrollTop, getWindowScrollLeft, hasClass, outerHeight, removeClass } from "./../../../../helpers/dom/element.mjs";
import BottomOverlayTable from "./../table/bottom.mjs";
import { Overlay } from "./_base.mjs";
import { CLONE_BOTTOM } from "./constants.mjs";
/**
 * @class BottomOverlay
 */

export var BottomOverlay = /*#__PURE__*/function (_Overlay) {
  _inherits(BottomOverlay, _Overlay);

  var _super = _createSuper(BottomOverlay);

  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   */
  function BottomOverlay(wotInstance) {
    var _this;

    _classCallCheck(this, BottomOverlay);

    _this = _super.call(this, wotInstance);

    _defineProperty(_assertThisInitialized(_this), "cachedFixedRowsBottom", -1);

    _this.clone = _this.makeClone(CLONE_BOTTOM);
    _this.cachedFixedRowsBottom = _this.wot.getSetting('fixedRowsBottom');
    return _this;
  }
  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {Table}
   */


  _createClass(BottomOverlay, [{
    key: "createTable",
    value: function createTable() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(BottomOverlayTable, args);
    }
    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */

  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      return this.wot.getSetting('shouldRenderBottomOverlay');
    }
    /**
     * Updates the top overlay position.
     *
     * @returns {boolean}
     */

  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      if (!this.needFullRender || !this.wot.wtTable.holder.parentNode) {
        // removed from DOM
        return;
      }

      var overlayRoot = this.clone.wtTable.holder.parentNode;
      overlayRoot.style.top = '';
      var headerPosition = 0;
      var preventOverflow = this.wot.getSetting('preventOverflow');

      if (this.trimmingContainer === this.wot.rootWindow && (!preventOverflow || preventOverflow !== 'vertical')) {
        var _this$wot = this.wot,
            rootDocument = _this$wot.rootDocument,
            wtTable = _this$wot.wtTable;
        var hiderRect = wtTable.hider.getBoundingClientRect();
        var bottom = Math.ceil(hiderRect.bottom);
        var bodyHeight = rootDocument.documentElement.clientHeight;
        var finalLeft;
        var finalBottom;
        finalLeft = wtTable.hider.style.left;
        finalLeft = finalLeft === '' ? 0 : finalLeft;

        if (bottom > bodyHeight) {
          finalBottom = bottom - bodyHeight;
        } else {
          finalBottom = 0;
        }

        headerPosition = finalBottom;
        finalBottom += 'px';
        overlayRoot.style.left = finalLeft;
        overlayRoot.style.bottom = finalBottom;
      } else {
        headerPosition = this.getScrollPosition();
        this.repositionOverlay();
      }

      var positionChanged = this.adjustHeaderBordersPosition(headerPosition);
      this.adjustElementsSize();
      return positionChanged;
    }
    /**
     * Updates the bottom overlay position.
     */

  }, {
    key: "repositionOverlay",
    value: function repositionOverlay() {
      var _this$wot2 = this.wot,
          wtTable = _this$wot2.wtTable,
          rootDocument = _this$wot2.rootDocument;
      var cloneRoot = this.clone.wtTable.holder.parentNode;
      var scrollbarWidth = getScrollbarWidth(rootDocument);

      if (wtTable.holder.clientHeight === wtTable.holder.offsetHeight) {
        scrollbarWidth = 0;
      }

      cloneRoot.style.bottom = "".concat(scrollbarWidth, "px");
    }
    /**
     * Sets the main overlay's vertical scroll position.
     *
     * @param {number} pos The scroll position.
     * @returns {boolean}
     */

  }, {
    key: "setScrollPosition",
    value: function setScrollPosition(pos) {
      var rootWindow = this.wot.rootWindow;
      var result = false;

      if (this.mainTableScrollableElement === rootWindow) {
        rootWindow.scrollTo(getWindowScrollLeft(rootWindow), pos);
        result = true;
      } else if (this.mainTableScrollableElement.scrollTop !== pos) {
        this.mainTableScrollableElement.scrollTop = pos;
        result = true;
      }

      return result;
    }
    /**
     * Triggers onScroll hook callback.
     */

  }, {
    key: "onScroll",
    value: function onScroll() {
      this.wot.getSetting('onScrollHorizontally');
    }
    /**
     * Calculates total sum cells height.
     *
     * @param {number} from Row index which calculates started from.
     * @param {number} to Row index where calculation is finished.
     * @returns {number} Height sum.
     */

  }, {
    key: "sumCellSizes",
    value: function sumCellSizes(from, to) {
      var _this$wot3 = this.wot,
          wtTable = _this$wot3.wtTable,
          wtSettings = _this$wot3.wtSettings;
      var defaultRowHeight = wtSettings.settings.defaultRowHeight;
      var row = from;
      var sum = 0;

      while (row < to) {
        var height = wtTable.getRowHeight(row);
        sum += height === void 0 ? defaultRowHeight : height;
        row += 1;
      }

      return sum;
    }
    /**
     * Adjust overlay root element, childs and master table element sizes (width, height).
     *
     * @param {boolean} [force=false] When `true`, it adjusts the DOM nodes sizes for that overlay.
     */

  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.updateTrimmingContainer();

      if (this.needFullRender || force) {
        this.adjustRootElementSize();
        this.adjustRootChildrenSize();
      }
    }
    /**
     * Adjust overlay root element size (width and height).
     */

  }, {
    key: "adjustRootElementSize",
    value: function adjustRootElementSize() {
      var _this$wot4 = this.wot,
          wtTable = _this$wot4.wtTable,
          wtViewport = _this$wot4.wtViewport,
          rootWindow = _this$wot4.rootWindow;
      var scrollbarWidth = getScrollbarWidth(this.wot.rootDocument);
      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var overlayRootStyle = overlayRoot.style;
      var preventOverflow = this.wot.getSetting('preventOverflow');

      if (this.trimmingContainer !== rootWindow || preventOverflow === 'horizontal') {
        var width = wtViewport.getWorkspaceWidth();

        if (this.wot.wtOverlays.hasScrollbarRight) {
          width -= scrollbarWidth;
        }

        width = Math.min(width, wtTable.wtRootElement.scrollWidth);
        overlayRootStyle.width = "".concat(width, "px");
      } else {
        overlayRootStyle.width = '';
      }

      this.clone.wtTable.holder.style.width = overlayRootStyle.width;
      var tableHeight = outerHeight(this.clone.wtTable.TABLE);

      if (!this.wot.wtTable.hasDefinedSize()) {
        tableHeight = 0;
      }

      overlayRootStyle.height = "".concat(tableHeight, "px");
    }
    /**
     * Adjust overlay root childs size.
     */

  }, {
    key: "adjustRootChildrenSize",
    value: function adjustRootChildrenSize() {
      var holder = this.clone.wtTable.holder;
      this.clone.wtTable.hider.style.width = this.hider.style.width;
      holder.style.width = holder.parentNode.style.width;
      holder.style.height = holder.parentNode.style.height;
    }
    /**
     * Adjust the overlay dimensions and position.
     */

  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      var total = this.wot.getSetting('totalRows');

      if (typeof this.wot.wtViewport.rowsRenderCalculator.startPosition === 'number') {
        this.spreader.style.top = "".concat(this.wot.wtViewport.rowsRenderCalculator.startPosition, "px");
      } else if (total === 0) {
        // can happen if there are 0 rows
        this.spreader.style.top = '0';
      } else {
        throw new Error('Incorrect value of the rowsRenderCalculator');
      }

      this.spreader.style.bottom = '';

      if (this.needFullRender) {
        this.syncOverlayOffset();
      }
    }
    /**
     * Synchronize calculated left position to an element.
     */

  }, {
    key: "syncOverlayOffset",
    value: function syncOverlayOffset() {
      if (typeof this.wot.wtViewport.columnsRenderCalculator.startPosition === 'number') {
        this.clone.wtTable.spreader.style.left = "".concat(this.wot.wtViewport.columnsRenderCalculator.startPosition, "px");
      } else {
        this.clone.wtTable.spreader.style.left = '';
      }
    }
    /**
     * Scrolls vertically to a row.
     *
     * @param {number} sourceRow Row index which you want to scroll to.
     * @param {boolean} [bottomEdge=false] If `true`, scrolls according to the bottom edge (top edge is by default).
     */

  }, {
    key: "scrollTo",
    value: function scrollTo(sourceRow, bottomEdge) {
      var newY = this.getTableParentOffset();
      var sourceInstance = this.wot.cloneSource ? this.wot.cloneSource : this.wot;
      var mainHolder = sourceInstance.wtTable.holder;
      var scrollbarCompensation = 0;

      if (bottomEdge && mainHolder.offsetHeight !== mainHolder.clientHeight) {
        scrollbarCompensation = getScrollbarWidth(this.wot.rootDocument);
      }

      if (bottomEdge) {
        newY += this.sumCellSizes(0, sourceRow + 1);
        newY -= this.wot.wtViewport.getViewportHeight(); // Fix 1 pixel offset when cell is selected

        newY += 1;
      } else {
        newY += this.sumCellSizes(this.wot.getSetting('fixedRowsBottom'), sourceRow);
      }

      newY += scrollbarCompensation;
      this.setScrollPosition(newY);
    }
    /**
     * Gets table parent top position.
     *
     * @returns {number}
     */

  }, {
    key: "getTableParentOffset",
    value: function getTableParentOffset() {
      if (this.mainTableScrollableElement === this.wot.rootWindow) {
        return this.wot.wtTable.holderOffset.top;
      }

      return 0;
    }
    /**
     * Gets the main overlay's vertical scroll position.
     *
     * @returns {number} Main table's vertical scroll position.
     */

  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      return getScrollTop(this.mainTableScrollableElement, this.wot.rootWindow);
    }
    /**
     * Adds css classes to hide the header border's header (cell-selection border hiding issue).
     *
     * @param {number} position Header Y position if trimming container is window or scroll top if not.
     * @returns {boolean}
     */

  }, {
    key: "adjustHeaderBordersPosition",
    value: function adjustHeaderBordersPosition(position) {
      var fixedRowsBottom = this.wot.getSetting('fixedRowsBottom');
      var areFixedRowsBottomChanged = this.cachedFixedRowsBottom !== fixedRowsBottom;
      var columnHeaders = this.wot.getSetting('columnHeaders');
      var positionChanged = false;

      if ((areFixedRowsBottomChanged || fixedRowsBottom === 0) && columnHeaders.length > 0) {
        var masterParent = this.wot.wtTable.holder.parentNode;
        var previousState = hasClass(masterParent, 'innerBorderBottom');
        this.cachedFixedRowsBottom = this.wot.getSetting('fixedRowsBottom');

        if (position || this.wot.getSetting('totalRows') === 0) {
          addClass(masterParent, 'innerBorderBottom');
          positionChanged = !previousState;
        } else {
          removeClass(masterParent, 'innerBorderBottom');
          positionChanged = previousState;
        }
      }

      return positionChanged;
    }
  }], [{
    key: "OVERLAY_NAME",
    get: function get() {
      return CLONE_BOTTOM;
    }
    /**
     * Cached value which holds the previous value of the `fixedRowsBottom` option.
     * It is used as a comparison value that can be used to detect changes in that value.
     *
     * @type {number}
     */

  }]);

  return BottomOverlay;
}(Overlay);