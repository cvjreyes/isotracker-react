function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import moment from 'moment';
import Pikaday from 'pikaday';
import { TextEditor } from "../textEditor/index.mjs";
import EventManager from "../../eventManager.mjs";
import { addClass, outerHeight } from "../../helpers/dom/element.mjs";
import { deepExtend } from "../../helpers/object.mjs";
import { isMetaKey } from "../../helpers/unicode.mjs";
export var EDITOR_TYPE = 'date';
/**
 * @private
 * @class DateEditor
 */

export var DateEditor = /*#__PURE__*/function (_TextEditor) {
  _inherits(DateEditor, _TextEditor);

  var _super = _createSuper(DateEditor);

  /**
   * @param {Core} hotInstance Handsontable instance.
   * @private
   */
  function DateEditor(hotInstance) {
    var _this;

    _classCallCheck(this, DateEditor);

    _this = _super.call(this, hotInstance); // TODO: Move this option to general settings

    _this.defaultDateFormat = 'DD/MM/YYYY';
    _this.isCellEdited = false;
    _this.parentDestroyed = false;
    return _this;
  }

  _createClass(DateEditor, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (typeof moment !== 'function') {
        throw new Error('You need to include moment.js to your project.');
      }

      if (typeof Pikaday !== 'function') {
        throw new Error('You need to include Pikaday to your project.');
      }

      _get(_getPrototypeOf(DateEditor.prototype), "init", this).call(this);

      this.instance.addHook('afterDestroy', function () {
        _this2.parentDestroyed = true;

        _this2.destroyElements();
      });
    }
    /**
     * Create data picker instance.
     */

  }, {
    key: "createElements",
    value: function createElements() {
      _get(_getPrototypeOf(DateEditor.prototype), "createElements", this).call(this);

      this.datePicker = this.hot.rootDocument.createElement('DIV');
      this.datePickerStyle = this.datePicker.style;
      this.datePickerStyle.position = 'absolute';
      this.datePickerStyle.top = 0;
      this.datePickerStyle.left = 0;
      this.datePickerStyle.zIndex = 9999;
      addClass(this.datePicker, 'htDatepickerHolder');
      this.hot.rootDocument.body.appendChild(this.datePicker);
      this.$datePicker = new Pikaday(this.getDatePickerConfig());
      var eventManager = new EventManager(this);
      /**
       * Prevent recognizing clicking on datepicker as clicking outside of table.
       */

      eventManager.addEventListener(this.datePicker, 'mousedown', function (event) {
        return event.stopPropagation();
      });
      this.hideDatepicker();
    }
    /**
     * Destroy data picker instance.
     */

  }, {
    key: "destroyElements",
    value: function destroyElements() {
      var datePickerParentElement = this.datePicker.parentNode;
      this.$datePicker.destroy();

      if (datePickerParentElement) {
        datePickerParentElement.removeChild(this.datePicker);
      }
    }
    /**
     * Prepare editor to appear.
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
      _get(_getPrototypeOf(DateEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);
    }
    /**
     * Open editor.
     *
     * @param {Event} [event=null] The event object.
     */

  }, {
    key: "open",
    value: function open() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _get(_getPrototypeOf(DateEditor.prototype), "open", this).call(this);

      this.showDatepicker(event);
    }
    /**
     * Close editor.
     */

  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      this._opened = false;

      this.instance._registerTimeout(function () {
        _this3.instance._refreshBorders();
      });

      _get(_getPrototypeOf(DateEditor.prototype), "close", this).call(this);
    }
    /**
     * Finishes editing and start saving or restoring process for editing cell or last selected range.
     *
     * @param {boolean} restoreOriginalValue If true, then closes editor without saving value from the editor into a cell.
     * @param {boolean} ctrlDown If true, then saveValue will save editor's value to each cell in the last selected range.
     */

  }, {
    key: "finishEditing",
    value: function finishEditing() {
      var restoreOriginalValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ctrlDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (restoreOriginalValue) {
        // pressed ESC, restore original value
        // var value = this.instance.getDataAtCell(this.row, this.col);
        var value = this.originalValue;

        if (value !== void 0) {
          this.setValue(value);
        }
      }

      this.hideDatepicker();

      _get(_getPrototypeOf(DateEditor.prototype), "finishEditing", this).call(this, restoreOriginalValue, ctrlDown);
    }
    /**
     * Show data picker.
     *
     * @param {Event} event The event object.
     */

  }, {
    key: "showDatepicker",
    value: function showDatepicker(event) {
      this.$datePicker.config(this.getDatePickerConfig());
      var offset = this.TD.getBoundingClientRect();
      var dateFormat = this.cellProperties.dateFormat || this.defaultDateFormat;
      var datePickerConfig = this.$datePicker.config();
      var dateStr;
      var isMouseDown = this.instance.view.isMouseDown();
      var isMeta = event ? isMetaKey(event.keyCode) : false;
      this.datePickerStyle.top = "".concat(this.hot.rootWindow.pageYOffset + offset.top + outerHeight(this.TD), "px");
      this.datePickerStyle.left = "".concat(this.hot.rootWindow.pageXOffset + offset.left, "px");

      this.$datePicker._onInputFocus = function () {};

      datePickerConfig.format = dateFormat;

      if (this.originalValue) {
        dateStr = this.originalValue;

        if (moment(dateStr, dateFormat, true).isValid()) {
          this.$datePicker.setMoment(moment(dateStr, dateFormat), true);
        } // workaround for date/time cells - pikaday resets the cell value to 12:00 AM by default, this will overwrite the value.


        if (this.getValue() !== this.originalValue) {
          this.setValue(this.originalValue);
        }

        if (!isMeta && !isMouseDown) {
          this.setValue('');
        }
      } else if (this.cellProperties.defaultDate) {
        dateStr = this.cellProperties.defaultDate;
        datePickerConfig.defaultDate = dateStr;

        if (moment(dateStr, dateFormat, true).isValid()) {
          this.$datePicker.setMoment(moment(dateStr, dateFormat), true);
        }

        if (!isMeta && !isMouseDown) {
          this.setValue('');
        }
      } else {
        // if a default date is not defined, set a soft-default-date: display the current day and month in the
        // datepicker, but don't fill the editor input
        this.$datePicker.gotoToday();
      }

      this.datePickerStyle.display = 'block';
      this.$datePicker.show();
    }
    /**
     * Hide data picker.
     */

  }, {
    key: "hideDatepicker",
    value: function hideDatepicker() {
      this.datePickerStyle.display = 'none';
      this.$datePicker.hide();
    }
    /**
     * Get date picker options.
     *
     * @returns {object}
     */

  }, {
    key: "getDatePickerConfig",
    value: function getDatePickerConfig() {
      var _this4 = this;

      var htInput = this.TEXTAREA;
      var options = {};

      if (this.cellProperties && this.cellProperties.datePickerConfig) {
        deepExtend(options, this.cellProperties.datePickerConfig);
      }

      var origOnSelect = options.onSelect;
      var origOnClose = options.onClose;
      options.field = htInput;
      options.trigger = htInput;
      options.container = this.datePicker;
      options.bound = false;
      options.format = options.format || this.defaultDateFormat;
      options.reposition = options.reposition || false;

      options.onSelect = function (value) {
        var dateStr = value;

        if (!isNaN(dateStr.getTime())) {
          dateStr = moment(dateStr).format(_this4.cellProperties.dateFormat || _this4.defaultDateFormat);
        }

        _this4.setValue(dateStr);

        _this4.hideDatepicker();

        if (origOnSelect) {
          origOnSelect();
        }
      };

      options.onClose = function () {
        if (!_this4.parentDestroyed) {
          _this4.finishEditing(false);
        }

        if (origOnClose) {
          origOnClose();
        }
      };

      return options;
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);

  return DateEditor;
}(TextEditor);