function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.string.trim.js";
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
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import { CellCoords } from "../../3rdparty/walkontable/src/index.mjs";
import { stringify } from "../../helpers/mixed.mjs";
import { mixin } from "../../helpers/object.mjs";
import hooksRefRegisterer from "../../mixins/hooksRefRegisterer.mjs";
export var EDITOR_TYPE = 'base';
export var EDITOR_STATE = Object.freeze({
  VIRGIN: 'STATE_VIRGIN',
  // before editing
  EDITING: 'STATE_EDITING',
  WAITING: 'STATE_WAITING',
  // waiting for async validation
  FINISHED: 'STATE_FINISHED'
});
/**
 * @util
 * @class BaseEditor
 */

export var BaseEditor = /*#__PURE__*/function () {
  /**
   * @param {Handsontable} instance A reference to the source instance of the Handsontable.
   */
  function BaseEditor(instance) {
    _classCallCheck(this, BaseEditor);

    /**
     * A reference to the source instance of the Handsontable.
     *
     * @type {Handsontable}
     */
    this.hot = instance;
    /**
     * A reference to the source instance of the Handsontable.
     *
     * @deprecated
     *
     * @type {Handsontable}
     */

    this.instance = instance;
    /**
     * Editor's state.
     *
     * @type {string}
     */

    this.state = EDITOR_STATE.VIRGIN;
    /**
     * Flag to store information about editor's opening status.
     *
     * @private
     *
     * @type {boolean}
     */

    this._opened = false;
    /**
     * Defines the editor's editing mode. When false, then an editor works in fast editing mode.
     *
     * @private
     *
     * @type {boolean}
     */

    this._fullEditMode = false;
    /**
     * Callback to call after closing editor.
     *
     * @type {Function}
     */

    this._closeCallback = null;
    /**
     * Currently rendered cell's TD element.
     *
     * @type {HTMLTableCellElement}
     */

    this.TD = null;
    /**
     * Visual row index.
     *
     * @type {number}
     */

    this.row = null;
    /**
     * Visual column index.
     *
     * @type {number}
     */

    this.col = null;
    /**
     * Column property name or a column index, if datasource is an array of arrays.
     *
     * @type {number|string}
     */

    this.prop = null;
    /**
     * Original cell's value.
     *
     * @type {*}
     */

    this.originalValue = null;
    /**
     * Object containing the cell's properties.
     *
     * @type {object}
     */

    this.cellProperties = null;
    this.init();
  }
  /**
   * Fires callback after closing editor.
   *
   * @private
   * @param {boolean} result The editor value.
   */


  _createClass(BaseEditor, [{
    key: "_fireCallbacks",
    value: function _fireCallbacks(result) {
      if (this._closeCallback) {
        this._closeCallback(result);

        this._closeCallback = null;
      }
    }
    /**
     * Initializes an editor's intance.
     */

  }, {
    key: "init",
    value: function init() {}
    /**
     * Required method to get current value from editable element.
     */

  }, {
    key: "getValue",
    value: function getValue() {
      throw Error('Editor getValue() method unimplemented');
    }
    /**
     * Required method to set new value into editable element.
     */

  }, {
    key: "setValue",
    value: function setValue() {
      throw Error('Editor setValue() method unimplemented');
    }
    /**
     * Required method to open editor.
     */

  }, {
    key: "open",
    value: function open() {
      throw Error('Editor open() method unimplemented');
    }
    /**
     * Required method to close editor.
     */

  }, {
    key: "close",
    value: function close() {
      throw Error('Editor close() method unimplemented');
    }
    /**
     * Prepares editor's meta data.
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
      this.TD = td;
      this.row = row;
      this.col = col;
      this.prop = prop;
      this.originalValue = value;
      this.cellProperties = cellProperties;
      this.state = EDITOR_STATE.VIRGIN;
    }
    /**
     * Fallback method to provide extendable editors in ES5.
     *
     * @returns {Function}
     */

  }, {
    key: "extend",
    value: function extend() {
      return /*#__PURE__*/function (_this$constructor) {
        _inherits(Editor, _this$constructor);

        var _super = _createSuper(Editor);

        function Editor() {
          _classCallCheck(this, Editor);

          return _super.apply(this, arguments);
        }

        return Editor;
      }(this.constructor);
    }
    /**
     * Saves value from editor into data storage.
     *
     * @param {*} value The editor value.
     * @param {boolean} ctrlDown If `true`, applies value to each cell in the last selected range.
     */

  }, {
    key: "saveValue",
    value: function saveValue(value, ctrlDown) {
      var visualRowFrom;
      var visualColumnFrom;
      var visualRowTo;
      var visualColumnTo; // if ctrl+enter and multiple cells selected, behave like Excel (finish editing and apply to all cells)

      if (ctrlDown) {
        var selectedLast = this.hot.getSelectedLast();
        visualRowFrom = Math.max(Math.min(selectedLast[0], selectedLast[2]), 0); // Math.max eliminate headers coords.

        visualColumnFrom = Math.max(Math.min(selectedLast[1], selectedLast[3]), 0); // Math.max eliminate headers coords.

        visualRowTo = Math.max(selectedLast[0], selectedLast[2]);
        visualColumnTo = Math.max(selectedLast[1], selectedLast[3]);
      } else {
        var _ref = [this.row, this.col, null, null];
        visualRowFrom = _ref[0];
        visualColumnFrom = _ref[1];
        visualRowTo = _ref[2];
        visualColumnTo = _ref[3];
      }

      var modifiedCellCoords = this.hot.runHooks('modifyGetCellCoords', visualRowFrom, visualColumnFrom);

      if (Array.isArray(modifiedCellCoords)) {
        var _modifiedCellCoords = _slicedToArray(modifiedCellCoords, 2);

        visualRowFrom = _modifiedCellCoords[0];
        visualColumnFrom = _modifiedCellCoords[1];
      } // Saving values using the modified coordinates.


      this.hot.populateFromArray(visualRowFrom, visualColumnFrom, value, visualRowTo, visualColumnTo, 'edit');
    }
    /**
     * Begins editing on a highlighted cell and hides fillHandle corner if was present.
     *
     * @param {*} newInitialValue The initial editor value.
     * @param {Event} event The keyboard event object.
     */

  }, {
    key: "beginEditing",
    value: function beginEditing(newInitialValue, event) {
      if (this.state !== EDITOR_STATE.VIRGIN) {
        return;
      }

      var hotInstance = this.hot; // We have to convert visual indexes into renderable indexes
      // due to hidden columns don't participate in the rendering process

      var renderableRowIndex = hotInstance.rowIndexMapper.getRenderableFromVisualIndex(this.row);
      var renderableColumnIndex = hotInstance.columnIndexMapper.getRenderableFromVisualIndex(this.col);
      hotInstance.view.scrollViewport(new CellCoords(renderableRowIndex, renderableColumnIndex));
      this.state = EDITOR_STATE.EDITING; // Set the editor value only in the full edit mode. In other mode the focusable element has to be empty,
      // otherwise IME (editor for Asia users) doesn't work.

      if (this.isInFullEditMode()) {
        var stringifiedInitialValue = typeof newInitialValue === 'string' ? newInitialValue : stringify(this.originalValue);
        this.setValue(stringifiedInitialValue);
      }

      this.open(event);
      this._opened = true;
      this.focus(); // only rerender the selections (FillHandle should disappear when beginediting is triggered)

      hotInstance.view.render();
      hotInstance.runHooks('afterBeginEditing', this.row, this.col);
    }
    /**
     * Finishes editing and start saving or restoring process for editing cell or last selected range.
     *
     * @param {boolean} restoreOriginalValue If true, then closes editor without saving value from the editor into a cell.
     * @param {boolean} ctrlDown If true, then saveValue will save editor's value to each cell in the last selected range.
     * @param {Function} callback The callback function, fired after editor closing.
     */

  }, {
    key: "finishEditing",
    value: function finishEditing(restoreOriginalValue, ctrlDown, callback) {
      var _this = this;

      var val;

      if (callback) {
        var previousCloseCallback = this._closeCallback;

        this._closeCallback = function (result) {
          if (previousCloseCallback) {
            previousCloseCallback(result);
          }

          callback(result);

          _this.hot.view.render();
        };
      }

      if (this.isWaiting()) {
        return;
      }

      if (this.state === EDITOR_STATE.VIRGIN) {
        this.hot._registerTimeout(function () {
          _this._fireCallbacks(true);
        });

        return;
      }

      if (this.state === EDITOR_STATE.EDITING) {
        if (restoreOriginalValue) {
          this.cancelChanges();
          this.hot.view.render();
          return;
        }

        var value = this.getValue();

        if (this.hot.getSettings().trimWhitespace) {
          // We trim only string values
          val = [[typeof value === 'string' ? String.prototype.trim.call(value || '') : value]];
        } else {
          val = [[value]];
        }

        this.state = EDITOR_STATE.WAITING;
        this.saveValue(val, ctrlDown);

        if (this.hot.getCellValidator(this.cellProperties)) {
          this.hot.addHookOnce('postAfterValidate', function (result) {
            _this.state = EDITOR_STATE.FINISHED;

            _this.discardEditor(result);
          });
        } else {
          this.state = EDITOR_STATE.FINISHED;
          this.discardEditor(true);
        }
      }
    }
    /**
     * Finishes editing without singout saving value.
     */

  }, {
    key: "cancelChanges",
    value: function cancelChanges() {
      this.state = EDITOR_STATE.FINISHED;
      this.discardEditor();
    }
    /**
     * Verifies result of validation or closes editor if user's cancelled changes.
     *
     * @param {boolean|undefined} result If `false` and the cell using allowInvalid option,
     *                                   then an editor won't be closed until validation is passed.
     */

  }, {
    key: "discardEditor",
    value: function discardEditor(result) {
      if (this.state !== EDITOR_STATE.FINISHED) {
        return;
      } // validator was defined and failed


      if (result === false && this.cellProperties.allowInvalid !== true) {
        this.hot.selectCell(this.row, this.col);
        this.focus();
        this.state = EDITOR_STATE.EDITING;

        this._fireCallbacks(false);
      } else {
        this.close();
        this._opened = false;
        this._fullEditMode = false;
        this.state = EDITOR_STATE.VIRGIN;

        this._fireCallbacks(true);
      }
    }
    /**
     * Switch editor into full edit mode. In this state navigation keys don't close editor. This mode is activated
     * automatically after hit ENTER or F2 key on the cell or while editing cell press F2 key.
     */

  }, {
    key: "enableFullEditMode",
    value: function enableFullEditMode() {
      this._fullEditMode = true;
    }
    /**
     * Checks if editor is in full edit mode.
     *
     * @returns {boolean}
     */

  }, {
    key: "isInFullEditMode",
    value: function isInFullEditMode() {
      return this._fullEditMode;
    }
    /**
     * Returns information whether the editor is open.
     *
     * @returns {boolean}
     */

  }, {
    key: "isOpened",
    value: function isOpened() {
      return this._opened;
    }
    /**
     * Returns information whether the editor is waiting, eg.: for async validation.
     *
     * @returns {boolean}
     */

  }, {
    key: "isWaiting",
    value: function isWaiting() {
      return this.state === EDITOR_STATE.WAITING;
    }
    /**
     * Gets className of the edited cell if exist.
     *
     * @returns {string}
     */

  }, {
    key: "getEditedCellsLayerClass",
    value: function getEditedCellsLayerClass() {
      var editorSection = this.checkEditorSection();

      switch (editorSection) {
        case 'right':
          return 'ht_clone_right';

        case 'left':
          return 'ht_clone_left';

        case 'bottom':
          return 'ht_clone_bottom';

        case 'bottom-right-corner':
          return 'ht_clone_bottom_right_corner';

        case 'bottom-left-corner':
          return 'ht_clone_bottom_left_corner';

        case 'top':
          return 'ht_clone_top';

        case 'top-right-corner':
          return 'ht_clone_top_right_corner';

        case 'top-left-corner':
          return 'ht_clone_top_left_corner';

        default:
          return 'ht_clone_master';
      }
    }
    /**
     * Gets HTMLTableCellElement of the edited cell if exist.
     *
     * @returns {HTMLTableCellElement|null}
     */

  }, {
    key: "getEditedCell",
    value: function getEditedCell() {
      return this.hot.getCell(this.row, this.col, true);
    }
    /**
     * Returns name of the overlay, where editor is placed.
     *
     * @private
     * @returns {string}
     */

  }, {
    key: "checkEditorSection",
    value: function checkEditorSection() {
      var totalRows = this.hot.countRows();
      var section = '';

      if (this.row < this.hot.getSettings().fixedRowsTop) {
        if (this.col < this.hot.getSettings().fixedColumnsLeft) {
          section = 'top-left-corner';
        } else {
          section = 'top';
        }
      } else if (this.hot.getSettings().fixedRowsBottom && this.row >= totalRows - this.hot.getSettings().fixedRowsBottom) {
        if (this.col < this.hot.getSettings().fixedColumnsLeft) {
          section = 'bottom-left-corner';
        } else {
          section = 'bottom';
        }
      } else if (this.col < this.hot.getSettings().fixedColumnsLeft) {
        section = 'left';
      }

      return section;
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);

  return BaseEditor;
}();
mixin(BaseEditor, hooksRefRegisterer);