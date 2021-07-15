"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _src = require("./3rdparty/walkontable/src");

var _unicode = require("./helpers/unicode");

var _event = require("./helpers/dom/event");

var _registry = require("./editors/registry");

var _eventManager = _interopRequireDefault(require("./eventManager"));

var _baseEditor = require("./editors/baseEditor");

var _element = require("./helpers/dom/element");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EditorManager = /*#__PURE__*/function () {
  /**
   * @param {Core} instance The Handsontable instance.
   * @param {TableMeta} tableMeta The table meta instance.
   * @param {Selection} selection The selection instance.
   */
  function EditorManager(instance, tableMeta, selection) {
    var _this = this;

    _classCallCheck(this, EditorManager);

    /**
     * Instance of {@link Handsontable}.
     *
     * @private
     * @type {Handsontable}
     */
    this.instance = instance;
    /**
     * Reference to an instance's private GridSettings object.
     *
     * @private
     * @type {GridSettings}
     */

    this.tableMeta = tableMeta;
    /**
     * Instance of {@link Selection}.
     *
     * @private
     * @type {Selection}
     */

    this.selection = selection;
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */

    this.eventManager = new _eventManager.default(instance);
    /**
     * Determines if EditorManager is destroyed.
     *
     * @private
     * @type {boolean}
     */

    this.destroyed = false;
    /**
     * Determines if EditorManager is locked.
     *
     * @private
     * @type {boolean}
     */

    this.lock = false;
    /**
     * A reference to an instance of the activeEditor.
     *
     * @private
     * @type {*}
     */

    this.activeEditor = void 0;
    /**
     * Keeps a reference to the cell's properties object.
     *
     * @type {object}
     */

    this.cellProperties = void 0;
    /**
     * Keeps last keyCode pressed from the keydown event.
     *
     * @type {number}
     */

    this.lastKeyCode = void 0;
    this.instance.addHook('afterDocumentKeyDown', function (event) {
      return _this.onAfterDocumentKeyDown(event);
    });
    var frame = this.instance.rootWindow;

    while (frame) {
      this.eventManager.addEventListener(frame.document.documentElement, 'keydown', function (event) {
        if (!_this.destroyed) {
          _this.instance.runHooks('afterDocumentKeyDown', event);
        }
      });
      frame = (0, _element.getParentWindow)(frame);
    } // Open editor when text composition is started (IME editor)


    this.eventManager.addEventListener(this.instance.rootDocument.documentElement, 'compositionstart', function (event) {
      if (!_this.destroyed && _this.activeEditor && !_this.activeEditor.isOpened() && _this.instance.isListening()) {
        _this.openEditor('', event);
      }
    });
    this.instance.view.wt.update('onCellDblClick', function (event, coords, elem) {
      return _this.onCellDblClick(event, coords, elem);
    });
  }
  /**
   * Lock the editor from being prepared and closed. Locking the editor prevents its closing and
   * reinitialized after selecting the new cell. This feature is necessary for a mobile editor.
   */


  _createClass(EditorManager, [{
    key: "lockEditor",
    value: function lockEditor() {
      this.lock = true;
    }
    /**
     * Unlock the editor from being prepared and closed. This method restores the original behavior of
     * the editors where for every new selection its instances are closed.
     */

  }, {
    key: "unlockEditor",
    value: function unlockEditor() {
      this.lock = false;
    }
    /**
     * Destroy current editor, if exists.
     *
     * @param {boolean} revertOriginal If `false` and the cell using allowInvalid option,
     *                                 then an editor won't be closed until validation is passed.
     */

  }, {
    key: "destroyEditor",
    value: function destroyEditor(revertOriginal) {
      if (!this.lock) {
        this.closeEditor(revertOriginal);
      }
    }
    /**
     * Get active editor.
     *
     * @returns {*}
     */

  }, {
    key: "getActiveEditor",
    value: function getActiveEditor() {
      return this.activeEditor;
    }
    /**
     * Prepare text input to be displayed at given grid cell.
     */

  }, {
    key: "prepareEditor",
    value: function prepareEditor() {
      var _this2 = this;

      if (this.lock) {
        return;
      }

      if (this.activeEditor && this.activeEditor.isWaiting()) {
        this.closeEditor(false, false, function (dataSaved) {
          if (dataSaved) {
            _this2.prepareEditor();
          }
        });
        return;
      }

      var _this$instance$select = this.instance.selection.selectedRange.current().highlight,
          row = _this$instance$select.row,
          col = _this$instance$select.col;
      var modifiedCellCoords = this.instance.runHooks('modifyGetCellCoords', row, col);
      var visualRowToCheck = row;
      var visualColumnToCheck = col;

      if (Array.isArray(modifiedCellCoords)) {
        var _modifiedCellCoords = _slicedToArray(modifiedCellCoords, 2);

        visualRowToCheck = _modifiedCellCoords[0];
        visualColumnToCheck = _modifiedCellCoords[1];
      } // Getting values using the modified coordinates.


      this.cellProperties = this.instance.getCellMeta(visualRowToCheck, visualColumnToCheck);
      var activeElement = this.instance.rootDocument.activeElement;

      if (activeElement) {
        // Bluring the activeElement removes unwanted border around the focusable element
        // (and resets activeElement prop). Without blurring the activeElement points to the
        // previously focusable element after clicking onto the cell (#6877).
        activeElement.blur();
      }

      if (this.cellProperties.readOnly) {
        this.clearActiveEditor();
        return;
      }

      var editorClass = this.instance.getCellEditor(this.cellProperties); // Getting element using coordinates from the selection.

      var td = this.instance.getCell(row, col, true);

      if (editorClass && td) {
        var prop = this.instance.colToProp(visualColumnToCheck);
        var originalValue = this.instance.getSourceDataAtCell(this.instance.toPhysicalRow(visualRowToCheck), visualColumnToCheck);
        this.activeEditor = (0, _registry.getEditorInstance)(editorClass, this.instance); // Using not modified coordinates, as we need to get the table element using selection coordinates.
        // There is an extra translation in the editor for saving value.

        this.activeEditor.prepare(row, col, prop, td, originalValue, this.cellProperties);
      } else {
        this.clearActiveEditor();
      }
    }
    /**
     * Check is editor is opened/showed.
     *
     * @returns {boolean}
     */

  }, {
    key: "isEditorOpened",
    value: function isEditorOpened() {
      return this.activeEditor && this.activeEditor.isOpened();
    }
    /**
     * Open editor with initial value.
     *
     * @param {null|string} newInitialValue New value from which editor will start if handled property it's not the `null`.
     * @param {Event} event The event object.
     */

  }, {
    key: "openEditor",
    value: function openEditor(newInitialValue, event) {
      if (!this.activeEditor) {
        return;
      }

      this.activeEditor.beginEditing(newInitialValue, event);
    }
    /**
     * Close editor, finish editing cell.
     *
     * @param {boolean} restoreOriginalValue If `true`, then closes editor without saving value from the editor into a cell.
     * @param {boolean} isCtrlPressed If `true`, then editor will save value to each cell in the last selected range.
     * @param {Function} callback The callback function, fired after editor closing.
     */

  }, {
    key: "closeEditor",
    value: function closeEditor(restoreOriginalValue, isCtrlPressed, callback) {
      if (this.activeEditor) {
        this.activeEditor.finishEditing(restoreOriginalValue, isCtrlPressed, callback);
      } else if (callback) {
        callback(false);
      }
    }
    /**
     * Close editor and save changes.
     *
     * @param {boolean} isCtrlPressed If `true`, then editor will save value to each cell in the last selected range.
     */

  }, {
    key: "closeEditorAndSaveChanges",
    value: function closeEditorAndSaveChanges(isCtrlPressed) {
      this.closeEditor(false, isCtrlPressed);
    }
    /**
     * Close editor and restore original value.
     *
     * @param {boolean} isCtrlPressed Indication of whether the CTRL button is pressed.
     */

  }, {
    key: "closeEditorAndRestoreOriginalValue",
    value: function closeEditorAndRestoreOriginalValue(isCtrlPressed) {
      this.closeEditor(true, isCtrlPressed);
    }
    /**
     * Clears reference to an instance of the active editor.
     *
     * @private
     */

  }, {
    key: "clearActiveEditor",
    value: function clearActiveEditor() {
      this.activeEditor = void 0;
    }
    /**
     * Controls selection's behaviour after clicking `Enter`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will move up after hit enter.
     */

  }, {
    key: "moveSelectionAfterEnter",
    value: function moveSelectionAfterEnter(isShiftPressed) {
      var enterMoves = typeof this.tableMeta.enterMoves === 'function' ? this.tableMeta.enterMoves(event) : this.tableMeta.enterMoves;

      if (isShiftPressed) {
        // move selection up
        this.selection.transformStart(-enterMoves.row, -enterMoves.col);
      } else {
        // move selection down (add a new row if needed)
        this.selection.transformStart(enterMoves.row, enterMoves.col, true);
      }
    }
    /**
     * Controls selection behaviour after clicking `arrow up`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will expand up.
     */

  }, {
    key: "moveSelectionUp",
    value: function moveSelectionUp(isShiftPressed) {
      if (isShiftPressed) {
        this.selection.transformEnd(-1, 0);
      } else {
        this.selection.transformStart(-1, 0);
      }
    }
    /**
     * Controls selection's behaviour after clicking `arrow down`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will expand down.
     */

  }, {
    key: "moveSelectionDown",
    value: function moveSelectionDown(isShiftPressed) {
      if (isShiftPressed) {
        // expanding selection down with shift
        this.selection.transformEnd(1, 0);
      } else {
        this.selection.transformStart(1, 0);
      }
    }
    /**
     * Controls selection's behaviour after clicking `arrow right`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will expand right.
     */

  }, {
    key: "moveSelectionRight",
    value: function moveSelectionRight(isShiftPressed) {
      if (isShiftPressed) {
        this.selection.transformEnd(0, 1);
      } else {
        this.selection.transformStart(0, 1);
      }
    }
    /**
     * Controls selection's behaviour after clicking `arrow left`.
     *
     * @private
     * @param {boolean} isShiftPressed If `true`, then the selection will expand left.
     */

  }, {
    key: "moveSelectionLeft",
    value: function moveSelectionLeft(isShiftPressed) {
      if (isShiftPressed) {
        this.selection.transformEnd(0, -1);
      } else {
        this.selection.transformStart(0, -1);
      }
    }
    /**
     * OnAfterDocumentKeyDown callback.
     *
     * @private
     * @param {KeyboardEvent} event The keyboard event object.
     */

  }, {
    key: "onAfterDocumentKeyDown",
    value: function onAfterDocumentKeyDown(event) {
      if (!this.instance.isListening()) {
        return;
      }

      this.instance.runHooks('beforeKeyDown', event); // keyCode 229 aka 'uninitialized' doesn't take into account with editors. This key code is produced when unfinished
      // character is entering (using IME editor). It is fired mainly on linux (ubuntu) with installed ibus-pinyin package.

      if (this.destroyed || event.keyCode === 229) {
        return;
      }

      if ((0, _event.isImmediatePropagationStopped)(event)) {
        return;
      }

      this.lastKeyCode = event.keyCode;

      if (!this.selection.isSelected()) {
        return;
      } // catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)


      var isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;

      if (this.activeEditor && !this.activeEditor.isWaiting()) {
        if (!(0, _unicode.isMetaKey)(event.keyCode) && !(0, _unicode.isCtrlMetaKey)(event.keyCode) && !isCtrlPressed && !this.isEditorOpened()) {
          this.openEditor('', event);
          return;
        }
      }

      var isShiftPressed = event.shiftKey;
      var rangeModifier = isShiftPressed ? this.selection.setRangeEnd : this.selection.setRangeStart;
      var tabMoves;

      switch (event.keyCode) {
        case _unicode.KEY_CODES.A:
          if (!this.isEditorOpened() && isCtrlPressed) {
            this.instance.selectAll();
            event.preventDefault();
            event.stopPropagation();
          }

          break;

        case _unicode.KEY_CODES.ARROW_UP:
          if (this.isEditorOpened() && !this.activeEditor.isWaiting()) {
            this.closeEditorAndSaveChanges(isCtrlPressed);
          }

          this.moveSelectionUp(isShiftPressed);
          event.preventDefault();
          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.ARROW_DOWN:
          if (this.isEditorOpened() && !this.activeEditor.isWaiting()) {
            this.closeEditorAndSaveChanges(isCtrlPressed);
          }

          this.moveSelectionDown(isShiftPressed);
          event.preventDefault();
          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.ARROW_RIGHT:
          if (this.isEditorOpened() && !this.activeEditor.isWaiting()) {
            this.closeEditorAndSaveChanges(isCtrlPressed);
          }

          this.moveSelectionRight(isShiftPressed);
          event.preventDefault();
          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.ARROW_LEFT:
          if (this.isEditorOpened() && !this.activeEditor.isWaiting()) {
            this.closeEditorAndSaveChanges(isCtrlPressed);
          }

          this.moveSelectionLeft(isShiftPressed);
          event.preventDefault();
          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.TAB:
          tabMoves = typeof this.tableMeta.tabMoves === 'function' ? this.tableMeta.tabMoves(event) : this.tableMeta.tabMoves;

          if (isShiftPressed) {
            // move selection left
            this.selection.transformStart(-tabMoves.row, -tabMoves.col);
          } else {
            // move selection right (add a new column if needed)
            this.selection.transformStart(tabMoves.row, tabMoves.col, true);
          }

          event.preventDefault();
          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.BACKSPACE:
        case _unicode.KEY_CODES.DELETE:
          this.instance.emptySelectedCells();
          this.prepareEditor();
          event.preventDefault();
          break;

        case _unicode.KEY_CODES.F2:
          /* F2 */
          if (this.activeEditor) {
            this.activeEditor.enableFullEditMode();
          }

          this.openEditor(null, event);
          event.preventDefault(); // prevent Opera from opening 'Go to Page dialog'

          break;

        case _unicode.KEY_CODES.ENTER:
          /* return/enter */
          if (this.isEditorOpened()) {
            if (this.activeEditor && this.activeEditor.state !== _baseEditor.EDITOR_STATE.WAITING) {
              this.closeEditorAndSaveChanges(isCtrlPressed);
            }

            this.moveSelectionAfterEnter(isShiftPressed);
          } else if (this.instance.getSettings().enterBeginsEditing) {
            if (this.cellProperties.readOnly) {
              this.moveSelectionAfterEnter();
            } else if (this.activeEditor) {
              this.activeEditor.enableFullEditMode();
              this.openEditor(null, event);
            }
          } else {
            this.moveSelectionAfterEnter(isShiftPressed);
          }

          event.preventDefault(); // don't add newline to field

          (0, _event.stopImmediatePropagation)(event); // required by HandsontableEditor

          break;

        case _unicode.KEY_CODES.ESCAPE:
          if (this.isEditorOpened()) {
            this.closeEditorAndRestoreOriginalValue(isCtrlPressed);
            this.activeEditor.focus();
          }

          event.preventDefault();
          break;

        case _unicode.KEY_CODES.HOME:
          if (event.ctrlKey || event.metaKey) {
            rangeModifier.call(this.selection, new _src.CellCoords(this.instance.rowIndexMapper.getFirstNotHiddenIndex(0, 1), this.selection.selectedRange.current().from.col));
          } else {
            rangeModifier.call(this.selection, new _src.CellCoords(this.selection.selectedRange.current().from.row, this.instance.columnIndexMapper.getFirstNotHiddenIndex(0, 1)));
          }

          event.preventDefault(); // don't scroll the window

          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.END:
          if (event.ctrlKey || event.metaKey) {
            rangeModifier.call(this.selection, new _src.CellCoords(this.instance.rowIndexMapper.getFirstNotHiddenIndex(this.instance.countRows() - 1, -1), this.selection.selectedRange.current().from.col));
          } else {
            rangeModifier.call(this.selection, new _src.CellCoords(this.selection.selectedRange.current().from.row, this.instance.columnIndexMapper.getFirstNotHiddenIndex(this.instance.countCols() - 1, -1)));
          }

          event.preventDefault(); // don't scroll the window

          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.PAGE_UP:
          this.selection.transformStart(-this.instance.countVisibleRows(), 0);
          event.preventDefault(); // don't page up the window

          event.stopPropagation();
          break;

        case _unicode.KEY_CODES.PAGE_DOWN:
          this.selection.transformStart(this.instance.countVisibleRows(), 0);
          event.preventDefault(); // don't page down the window

          event.stopPropagation();
          break;

        default:
          break;
      }
    }
    /**
     * OnCellDblClick callback.
     *
     * @private
     * @param {MouseEvent} event The mouse event object.
     * @param {object} coords The cell coordinates.
     * @param {HTMLTableCellElement|HTMLTableHeaderCellElement} elem The element which triggers the action.
     */

  }, {
    key: "onCellDblClick",
    value: function onCellDblClick(event, coords, elem) {
      // may be TD or TH
      if (elem.nodeName === 'TD') {
        if (this.activeEditor) {
          this.activeEditor.enableFullEditMode();
        }

        this.openEditor(null, event);
      }
    }
    /**
     * Destroy the instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this.eventManager.destroy();
    }
  }]);

  return EditorManager;
}();

var instances = new WeakMap();
/**
 * @param {Core} hotInstance The Handsontable instance.
 * @param {TableMeta} tableMeta The table meta class instance.
 * @param {Selection} selection The selection instance.
 * @returns {EditorManager}
 */

EditorManager.getInstance = function (hotInstance, tableMeta, selection) {
  var editorManager = instances.get(hotInstance);

  if (!editorManager) {
    editorManager = new EditorManager(hotInstance, tableMeta, selection);
    instances.set(hotInstance, editorManager);
  }

  return editorManager;
};

var _default = EditorManager;
exports.default = _default;