import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import { BaseEditor, EDITOR_STATE } from "../baseEditor/index.mjs";
import { addClass, empty, fastInnerHTML, getComputedStyle, getCssTransform, hasClass, offset, outerHeight, outerWidth, removeClass, resetCssTransform } from "../../helpers/dom/element.mjs";
import { stopImmediatePropagation } from "../../helpers/dom/event.mjs";
import { objectEach } from "../../helpers/object.mjs";
import { KEY_CODES } from "../../helpers/unicode.mjs";
var EDITOR_VISIBLE_CLASS_NAME = 'ht_editor_visible';
export var EDITOR_TYPE = 'select';
/**
 * @private
 * @class SelectEditor
 */

export var SelectEditor = /*#__PURE__*/function (_BaseEditor) {
  _inherits(SelectEditor, _BaseEditor);

  var _super = _createSuper(SelectEditor);

  function SelectEditor() {
    _classCallCheck(this, SelectEditor);

    return _super.apply(this, arguments);
  }

  _createClass(SelectEditor, [{
    key: "init",
    value:
    /**
     * Initializes editor instance, DOM Element and mount hooks.
     */
    function init() {
      this.select = this.hot.rootDocument.createElement('SELECT');
      addClass(this.select, 'htSelectEditor');
      this.select.style.display = 'none';
      this.hot.rootElement.appendChild(this.select);
      this.registerHooks();
    }
    /**
     * Returns select's value.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.select.value;
    }
    /**
     * Sets value in the select element.
     *
     * @param {*} value A new select's value.
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      this.select.value = value;
    }
    /**
     * Opens the editor and adjust its size.
     */

  }, {
    key: "open",
    value: function open() {
      var _this = this;

      this._opened = true;
      this.refreshDimensions();
      this.select.style.display = '';
      this.addHook('beforeKeyDown', function () {
        return _this.onBeforeKeyDown();
      });
    }
    /**
     * Closes the editor.
     */

  }, {
    key: "close",
    value: function close() {
      this._opened = false;
      this.select.style.display = 'none';

      if (hasClass(this.select, EDITOR_VISIBLE_CLASS_NAME)) {
        removeClass(this.select, EDITOR_VISIBLE_CLASS_NAME);
      }

      this.clearHooks();
    }
    /**
     * Sets focus state on the select element.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.select.focus();
    }
    /**
     * Binds hooks to refresh editor's size after scrolling of the viewport or resizing of columns/rows.
     *
     * @private
     */

  }, {
    key: "registerHooks",
    value: function registerHooks() {
      var _this2 = this;

      this.addHook('afterScrollHorizontally', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterScrollVertically', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterColumnResize', function () {
        return _this2.refreshDimensions();
      });
      this.addHook('afterRowResize', function () {
        return _this2.refreshDimensions();
      });
    }
    /**
     * Prepares editor's meta data and a list of available options.
     *
     * @param {number} row The visual row index.
     * @param {number} col The visual column index.
     * @param {number|string} prop The column property (passed when datasource is an array of objects).
     * @param {HTMLTableCellElement} td The rendered cell element.
     * @param {*} value The rendered value.
     * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
     */

  }, {
    key: "prepare",
    value: function prepare(row, col, prop, td, value, cellProperties) {
      var _this3 = this;

      _get(_getPrototypeOf(SelectEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);

      var selectOptions = this.cellProperties.selectOptions;
      var options;

      if (typeof selectOptions === 'function') {
        options = this.prepareOptions(selectOptions(this.row, this.col, this.prop));
      } else {
        options = this.prepareOptions(selectOptions);
      }

      empty(this.select);
      objectEach(options, function (optionValue, key) {
        var optionElement = _this3.hot.rootDocument.createElement('OPTION');

        optionElement.value = key;
        fastInnerHTML(optionElement, optionValue);

        _this3.select.appendChild(optionElement);
      });
    }
    /**
     * Creates consistent list of available options.
     *
     * @private
     * @param {Array|object} optionsToPrepare The list of the values to render in the select eleemnt.
     * @returns {object}
     */

  }, {
    key: "prepareOptions",
    value: function prepareOptions(optionsToPrepare) {
      var preparedOptions = {};

      if (Array.isArray(optionsToPrepare)) {
        for (var i = 0, len = optionsToPrepare.length; i < len; i++) {
          preparedOptions[optionsToPrepare[i]] = optionsToPrepare[i];
        }
      } else if (_typeof(optionsToPrepare) === 'object') {
        preparedOptions = optionsToPrepare;
      }

      return preparedOptions;
    }
    /**
     * Refreshes editor's value using source data.
     *
     * @private
     */

  }, {
    key: "refreshValue",
    value: function refreshValue() {
      var sourceData = this.hot.getSourceDataAtCell(this.row, this.prop);
      this.originalValue = sourceData;
      this.setValue(sourceData);
      this.refreshDimensions();
    }
    /**
     * Refreshes editor's size and position.
     *
     * @private
     */

  }, {
    key: "refreshDimensions",
    value: function refreshDimensions() {
      if (this.state !== EDITOR_STATE.EDITING) {
        return;
      }

      this.TD = this.getEditedCell(); // TD is outside of the viewport.

      if (!this.TD) {
        this.close();
        return;
      }

      var wtOverlays = this.hot.view.wt.wtOverlays;
      var currentOffset = offset(this.TD);
      var containerOffset = offset(this.hot.rootElement);
      var scrollableContainer = wtOverlays.scrollableElement;
      var editorSection = this.checkEditorSection();
      var width = outerWidth(this.TD) + 1;
      var height = outerHeight(this.TD) + 1;
      var editTop = currentOffset.top - containerOffset.top - 1 - (scrollableContainer.scrollTop || 0);
      var editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0);
      var cssTransformOffset;

      switch (editorSection) {
        case 'top':
          cssTransformOffset = getCssTransform(wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'left':
          cssTransformOffset = getCssTransform(wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'top-left-corner':
          cssTransformOffset = getCssTransform(wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'bottom-left-corner':
          cssTransformOffset = getCssTransform(wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
          break;

        case 'bottom':
          cssTransformOffset = getCssTransform(wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
          break;

        default:
          break;
      }

      var renderableRow = this.hot.rowIndexMapper.getRenderableFromVisualIndex(this.row);
      var renderableColumn = this.hot.columnIndexMapper.getRenderableFromVisualIndex(this.col);
      var nrOfRenderableRowIndexes = this.hot.rowIndexMapper.getRenderableIndexesLength();
      var firstRowIndexOfTheBottomOverlay = nrOfRenderableRowIndexes - this.hot.view.wt.getSetting('fixedRowsBottom');

      if (renderableRow <= 0 || renderableRow === firstRowIndexOfTheBottomOverlay) {
        editTop += 1;
      }

      if (renderableColumn <= 0) {
        editLeft += 1;
      }

      var selectStyle = this.select.style;

      if (cssTransformOffset && cssTransformOffset !== -1) {
        selectStyle[cssTransformOffset[0]] = cssTransformOffset[1];
      } else {
        resetCssTransform(this.select);
      }

      var cellComputedStyle = getComputedStyle(this.TD, this.hot.rootWindow);

      if (parseInt(cellComputedStyle.borderTopWidth, 10) > 0) {
        height -= 1;
      }

      if (parseInt(cellComputedStyle.borderLeftWidth, 10) > 0) {
        width -= 1;
      }

      selectStyle.height = "".concat(height, "px");
      selectStyle.minWidth = "".concat(width, "px");
      selectStyle.top = "".concat(editTop, "px");
      selectStyle.left = "".concat(editLeft, "px");
      selectStyle.margin = '0px';
      addClass(this.select, EDITOR_VISIBLE_CLASS_NAME);
    }
    /**
     * OnBeforeKeyDown callback.
     *
     * @private
     */

  }, {
    key: "onBeforeKeyDown",
    value: function onBeforeKeyDown() {
      var previousOptionIndex = this.select.selectedIndex - 1;
      var nextOptionIndex = this.select.selectedIndex + 1;

      switch (event.keyCode) {
        case KEY_CODES.ARROW_UP:
          if (previousOptionIndex >= 0) {
            this.select[previousOptionIndex].selected = true;
          }

          stopImmediatePropagation(event);
          event.preventDefault();
          break;

        case KEY_CODES.ARROW_DOWN:
          if (nextOptionIndex <= this.select.length - 1) {
            this.select[nextOptionIndex].selected = true;
          }

          stopImmediatePropagation(event);
          event.preventDefault();
          break;

        default:
          break;
      }
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);

  return SelectEditor;
}(BaseEditor);