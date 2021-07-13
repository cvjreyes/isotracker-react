function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.index-of.js";
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

import { BaseEditor, EDITOR_STATE } from "../baseEditor/index.mjs";
import EventManager from "../../eventManager.mjs";
import { isMobileBrowser, isIE, isEdge, isIOS } from "../../helpers/browser.mjs";
import { addClass, getCaretPosition, getComputedStyle, getCssTransform, getScrollbarWidth, innerWidth, offset, resetCssTransform, setCaretPosition, hasVerticalScrollbar, hasHorizontalScrollbar, hasClass, removeClass } from "../../helpers/dom/element.mjs";
import { stopImmediatePropagation, isImmediatePropagationStopped } from "../../helpers/dom/event.mjs";
import { rangeEach } from "../../helpers/number.mjs";
import { KEY_CODES } from "../../helpers/unicode.mjs";
import { autoResize } from "../../3rdparty/autoResize/index.mjs";
var EDITOR_VISIBLE_CLASS_NAME = 'ht_editor_visible';
var EDITOR_HIDDEN_CLASS_NAME = 'ht_editor_hidden';
export var EDITOR_TYPE = 'text';
/**
 * @private
 * @class TextEditor
 */

export var TextEditor = /*#__PURE__*/function (_BaseEditor) {
  _inherits(TextEditor, _BaseEditor);

  var _super = _createSuper(TextEditor);

  /**
   * @param {Core} instance The Handsontable instance.
   */
  function TextEditor(instance) {
    var _this;

    _classCallCheck(this, TextEditor);

    _this = _super.call(this, instance);
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */

    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    /**
     * Autoresize instance. Automagically resizes editor after changes.
     *
     * @private
     * @type {autoResize}
     */

    _this.autoResize = autoResize();
    /**
     * An TEXTAREA element.
     *
     * @private
     * @type {HTMLTextAreaElement}
     */

    _this.TEXTAREA = void 0;
    /**
     * Style declaration object of the TEXTAREA element.
     *
     * @private
     * @type {CSSStyleDeclaration}
     */

    _this.textareaStyle = void 0;
    /**
     * Parent element of the TEXTAREA.
     *
     * @private
     * @type {HTMLDivElement}
     */

    _this.TEXTAREA_PARENT = void 0;
    /**
     * Style declaration object of the TEXTAREA_PARENT element.
     *
     * @private
     * @type {CSSStyleDeclaration}
     */

    _this.textareaParentStyle = void 0;
    /**
     * Z-index class style for the editor.
     *
     * @private
     * @type {string}
     */

    _this.layerClass = void 0;

    _this.createElements();

    _this.bindEvents();

    _this.hot.addHookOnce('afterDestroy', function () {
      return _this.destroy();
    });

    return _this;
  }
  /**
   * Gets current value from editable element.
   *
   * @returns {number}
   */


  _createClass(TextEditor, [{
    key: "getValue",
    value: function getValue() {
      return this.TEXTAREA.value;
    }
    /**
     * Sets new value into editable element.
     *
     * @param {*} newValue The editor value.
     */

  }, {
    key: "setValue",
    value: function setValue(newValue) {
      this.TEXTAREA.value = newValue;
    }
    /**
     * Opens the editor and adjust its size.
     */

  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      this.refreshDimensions(); // need it instantly, to prevent https://github.com/handsontable/handsontable/issues/348

      this.showEditableElement();
      this.addHook('beforeKeyDown', function (event) {
        return _this2.onBeforeKeyDown(event);
      });
    }
    /**
     * Closes the editor.
     */

  }, {
    key: "close",
    value: function close() {
      this.autoResize.unObserve();

      if (this.hot.rootDocument.activeElement === this.TEXTAREA) {
        this.hot.listen(); // don't refocus the table if user focused some cell outside of HT on purpose
      }

      this.hideEditableElement();
      this.removeHooksByKey('beforeKeyDown');
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
      var previousState = this.state;

      _get(_getPrototypeOf(TextEditor.prototype), "prepare", this).call(this, row, col, prop, td, value, cellProperties);

      if (!cellProperties.readOnly) {
        this.refreshDimensions(true);
        var allowInvalid = cellProperties.allowInvalid,
            fragmentSelection = cellProperties.fragmentSelection;

        if (allowInvalid) {
          // Remove an empty space from texarea (added by copyPaste plugin to make copy/paste
          // functionality work with IME)
          this.TEXTAREA.value = '';
        }

        if (previousState !== EDITOR_STATE.FINISHED) {
          this.hideEditableElement();
        } // @TODO: The fragmentSelection functionality is conflicted with IME. For this feature
        // refocus has to be disabled (to make IME working).


        var restoreFocus = !fragmentSelection;

        if (restoreFocus && !isMobileBrowser()) {
          this.focus();
        }
      }
    }
    /**
     * Begins editing on a highlighted cell and hides fillHandle corner if was present.
     *
     * @param {*} newInitialValue The editor initial value.
     * @param {Event} event The keyboard event object.
     */

  }, {
    key: "beginEditing",
    value: function beginEditing(newInitialValue, event) {
      if (this.state !== EDITOR_STATE.VIRGIN) {
        return;
      }

      this.TEXTAREA.value = ''; // Remove an empty space from texarea (added by copyPaste plugin to make copy/paste functionality work with IME).

      _get(_getPrototypeOf(TextEditor.prototype), "beginEditing", this).call(this, newInitialValue, event);
    }
    /**
     * Sets focus state on the select element.
     */

  }, {
    key: "focus",
    value: function focus() {
      // For IME editor textarea element must be focused using ".select" method.
      // Using ".focus" browser automatically scroll into the focused element which
      // is undesire effect.
      this.TEXTAREA.select();
      setCaretPosition(this.TEXTAREA, this.TEXTAREA.value.length);
    }
    /**
     * Creates an editor's elements and adds necessary CSS classnames.
     */

  }, {
    key: "createElements",
    value: function createElements() {
      var rootDocument = this.hot.rootDocument;
      this.TEXTAREA = rootDocument.createElement('TEXTAREA');
      this.TEXTAREA.setAttribute('data-hot-input', ''); // Makes the element recognizable by Hot as its own component's element.

      this.TEXTAREA.tabIndex = -1;
      addClass(this.TEXTAREA, 'handsontableInput');
      this.textareaStyle = this.TEXTAREA.style;
      this.textareaStyle.width = 0;
      this.textareaStyle.height = 0;
      this.textareaStyle.overflowY = 'visible';
      this.TEXTAREA_PARENT = rootDocument.createElement('DIV');
      addClass(this.TEXTAREA_PARENT, 'handsontableInputHolder');

      if (hasClass(this.TEXTAREA_PARENT, this.layerClass)) {
        removeClass(this.TEXTAREA_PARENT, this.layerClass);
      }

      addClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
      this.textareaParentStyle = this.TEXTAREA_PARENT.style;
      this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
      this.hot.rootElement.appendChild(this.TEXTAREA_PARENT);
    }
    /**
     * Moves an editable element out of the viewport, but element must be able to hold focus for IME support.
     *
     * @private
     */

  }, {
    key: "hideEditableElement",
    value: function hideEditableElement() {
      if (isIE() || isEdge()) {
        this.textareaStyle.textIndent = '-99999px';
      }

      this.textareaStyle.overflowY = 'visible';
      this.textareaParentStyle.opacity = '0';
      this.textareaParentStyle.height = '1px';

      if (hasClass(this.TEXTAREA_PARENT, this.layerClass)) {
        removeClass(this.TEXTAREA_PARENT, this.layerClass);
      }

      addClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
    }
    /**
     * Resets an editable element position.
     *
     * @private
     */

  }, {
    key: "showEditableElement",
    value: function showEditableElement() {
      this.textareaParentStyle.height = '';
      this.textareaParentStyle.overflow = '';
      this.textareaParentStyle.position = '';
      this.textareaParentStyle.right = 'auto';
      this.textareaParentStyle.opacity = '1';
      this.textareaStyle.textIndent = '';
      this.textareaStyle.overflowY = 'hidden';
      var childNodes = this.TEXTAREA_PARENT.childNodes;
      var hasClassHandsontableEditor = false;
      rangeEach(childNodes.length - 1, function (index) {
        var childNode = childNodes[index];

        if (hasClass(childNode, 'handsontableEditor')) {
          hasClassHandsontableEditor = true;
          return false;
        }
      });

      if (hasClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME)) {
        removeClass(this.TEXTAREA_PARENT, EDITOR_HIDDEN_CLASS_NAME);
      }

      if (hasClassHandsontableEditor) {
        this.layerClass = EDITOR_VISIBLE_CLASS_NAME;
        addClass(this.TEXTAREA_PARENT, this.layerClass);
      } else {
        this.layerClass = this.getEditedCellsLayerClass();
        addClass(this.TEXTAREA_PARENT, this.layerClass);
      }
    }
    /**
     * Refreshes editor's value using source data.
     *
     * @private
     */

  }, {
    key: "refreshValue",
    value: function refreshValue() {
      var physicalRow = this.hot.toPhysicalRow(this.row);
      var sourceData = this.hot.getSourceDataAtCell(physicalRow, this.col);
      this.originalValue = sourceData;
      this.setValue(sourceData);
      this.refreshDimensions();
    }
    /**
     * Refreshes editor's size and position.
     *
     * @private
     * @param {boolean} force Indicates if the refreshing editor dimensions should be triggered.
     */

  }, {
    key: "refreshDimensions",
    value: function refreshDimensions() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.state !== EDITOR_STATE.EDITING && !force) {
        return;
      }

      this.TD = this.getEditedCell(); // TD is outside of the viewport.

      if (!this.TD) {
        if (!force) {
          this.close(); // TODO shouldn't it be this.finishEditing() ?
        }

        return;
      }

      var _this$hot$view$wt = this.hot.view.wt,
          wtOverlays = _this$hot$view$wt.wtOverlays,
          wtViewport = _this$hot$view$wt.wtViewport;
      var currentOffset = offset(this.TD);
      var containerOffset = offset(this.hot.rootElement);
      var scrollableContainerTop = wtOverlays.topOverlay.holder;
      var scrollableContainerLeft = wtOverlays.leftOverlay.holder;
      var containerScrollTop = scrollableContainerTop !== this.hot.rootWindow ? scrollableContainerTop.scrollTop : 0;
      var containerScrollLeft = scrollableContainerLeft !== this.hot.rootWindow ? scrollableContainerLeft.scrollLeft : 0;
      var editorSection = this.checkEditorSection();
      var scrollTop = ['', 'left'].includes(editorSection) ? containerScrollTop : 0;
      var scrollLeft = ['', 'top', 'bottom'].includes(editorSection) ? containerScrollLeft : 0; // If colHeaders is disabled, cells in the first row have border-top

      var editTopModifier = currentOffset.top === containerOffset.top ? 0 : 1;
      var backgroundColor = this.TD.style.backgroundColor;
      var editTop = currentOffset.top - containerOffset.top - editTopModifier - scrollTop;
      var editLeft = currentOffset.left - containerOffset.left - 1 - scrollLeft;
      var cssTransformOffset; // TODO: Refactor this to the new instance.getCell method (from #ply-59), after 0.12.1 is released

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

      var hasColumnHeaders = this.hot.hasColHeaders();
      var renderableRow = this.hot.rowIndexMapper.getRenderableFromVisualIndex(this.row);
      var renderableColumn = this.hot.columnIndexMapper.getRenderableFromVisualIndex(this.col);
      var nrOfRenderableRowIndexes = this.hot.rowIndexMapper.getRenderableIndexesLength();
      var firstRowIndexOfTheBottomOverlay = nrOfRenderableRowIndexes - this.hot.view.wt.getSetting('fixedRowsBottom');

      if (hasColumnHeaders && renderableRow <= 0 || renderableRow === firstRowIndexOfTheBottomOverlay) {
        editTop += 1;
      }

      if (renderableColumn <= 0) {
        editLeft += 1;
      }

      if (cssTransformOffset && cssTransformOffset !== -1) {
        this.textareaParentStyle[cssTransformOffset[0]] = cssTransformOffset[1];
      } else {
        resetCssTransform(this.TEXTAREA_PARENT);
      }

      this.textareaParentStyle.top = "".concat(editTop, "px");
      this.textareaParentStyle.left = "".concat(editLeft, "px");
      this.showEditableElement();
      var firstRowOffset = wtViewport.rowsRenderCalculator.startPosition;
      var firstColumnOffset = wtViewport.columnsRenderCalculator.startPosition;
      var horizontalScrollPosition = wtOverlays.leftOverlay.getScrollPosition();
      var verticalScrollPosition = wtOverlays.topOverlay.getScrollPosition();
      var scrollbarWidth = getScrollbarWidth(this.hot.rootDocument);
      var cellTopOffset = this.TD.offsetTop + firstRowOffset - verticalScrollPosition;
      var cellLeftOffset = this.TD.offsetLeft + firstColumnOffset - horizontalScrollPosition;
      var width = innerWidth(this.TD) - 8;
      var actualVerticalScrollbarWidth = hasVerticalScrollbar(scrollableContainerTop) ? scrollbarWidth : 0;
      var actualHorizontalScrollbarWidth = hasHorizontalScrollbar(scrollableContainerLeft) ? scrollbarWidth : 0;
      var maxWidth = this.hot.view.maximumVisibleElementWidth(cellLeftOffset) - 9 - actualVerticalScrollbarWidth;
      var height = this.TD.scrollHeight + 1;
      var maxHeight = Math.max(this.hot.view.maximumVisibleElementHeight(cellTopOffset) - actualHorizontalScrollbarWidth, 23); // eslint-disable-line max-len

      var cellComputedStyle = getComputedStyle(this.TD, this.hot.rootWindow);
      this.TEXTAREA.style.fontSize = cellComputedStyle.fontSize;
      this.TEXTAREA.style.fontFamily = cellComputedStyle.fontFamily;
      this.TEXTAREA.style.backgroundColor = backgroundColor;
      this.autoResize.init(this.TEXTAREA, {
        minHeight: Math.min(height, maxHeight),
        maxHeight: maxHeight,
        // TEXTAREA should never be higher than visible part of the viewport (should not cover the scrollbar)
        minWidth: Math.min(width, maxWidth),
        maxWidth: maxWidth // TEXTAREA should never be wider than visible part of the viewport (should not cover the scrollbar)

      }, true);
    }
    /**
     * Binds events and hooks.
     *
     * @private
     */

  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this3 = this;

      this.eventManager.addEventListener(this.TEXTAREA, 'cut', function (event) {
        return event.stopPropagation();
      });
      this.eventManager.addEventListener(this.TEXTAREA, 'paste', function (event) {
        return event.stopPropagation();
      });

      if (isIOS()) {
        // on iOS after click "Done" the edit isn't hidden by default, so we need to handle it manually.
        this.eventManager.addEventListener(this.TEXTAREA, 'focusout', function () {
          return _this3.finishEditing(false);
        });
      }

      this.addHook('afterScrollHorizontally', function () {
        return _this3.refreshDimensions();
      });
      this.addHook('afterScrollVertically', function () {
        return _this3.refreshDimensions();
      });
      this.addHook('afterColumnResize', function () {
        _this3.refreshDimensions();

        _this3.focus();
      });
      this.addHook('afterRowResize', function () {
        _this3.refreshDimensions();

        _this3.focus();
      });
    }
    /**
     * Ugly hack for autocompleteEditor.
     *
     * @private
     */

  }, {
    key: "allowKeyEventPropagation",
    value: function allowKeyEventPropagation() {}
    /**
     * Destroys the internal event manager and clears attached hooks.
     *
     * @private
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroy();
      this.clearHooks();
    }
    /**
     * OnBeforeKeyDown callback.
     *
     * @param {Event} event The keyboard event object.
     */

  }, {
    key: "onBeforeKeyDown",
    value: function onBeforeKeyDown(event) {
      // catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)
      var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey; // Process only events that have been fired in the editor

      if (event.target !== this.TEXTAREA || isImmediatePropagationStopped(event)) {
        return;
      }

      switch (event.keyCode) {
        case KEY_CODES.ARROW_RIGHT:
          if (this.isInFullEditMode()) {
            if (!this.isWaiting() && !this.allowKeyEventPropagation(event.keyCode)) {
              stopImmediatePropagation(event);
            }
          }

          break;

        case KEY_CODES.ARROW_LEFT:
          if (this.isInFullEditMode()) {
            if (!this.isWaiting() && !this.allowKeyEventPropagation(event.keyCode)) {
              stopImmediatePropagation(event);
            }
          }

          break;

        case KEY_CODES.ARROW_UP:
        case KEY_CODES.ARROW_DOWN:
          if (this.isInFullEditMode()) {
            if (!this.isWaiting() && !this.allowKeyEventPropagation(event.keyCode)) {
              stopImmediatePropagation(event);
            }
          }

          break;

        case KEY_CODES.ENTER:
          {
            var isMultipleSelection = this.hot.selection.isMultiple();

            if (ctrlDown && !isMultipleSelection || event.altKey) {
              // if ctrl+enter or alt+enter, add new line
              if (this.isOpened()) {
                var caretPosition = getCaretPosition(this.TEXTAREA);
                var value = this.getValue();
                var newValue = "".concat(value.slice(0, caretPosition), "\n").concat(value.slice(caretPosition));
                this.setValue(newValue);
                setCaretPosition(this.TEXTAREA, caretPosition + 1);
              } else {
                this.beginEditing("".concat(this.originalValue, "\n"));
              }

              stopImmediatePropagation(event);
            }

            event.preventDefault(); // don't add newline to field

            break;
          }

        case KEY_CODES.BACKSPACE:
        case KEY_CODES.DELETE:
        case KEY_CODES.HOME:
        case KEY_CODES.END:
          stopImmediatePropagation(event); // backspace, delete, home, end should only work locally when cell is edited (not in table context)

          break;

        default:
          break;
      }

      var arrowKeyCodes = [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_RIGHT, KEY_CODES.ARROW_DOWN, KEY_CODES.ARROW_LEFT];

      if (arrowKeyCodes.indexOf(event.keyCode) === -1) {
        this.autoResize.resize(String.fromCharCode(event.keyCode));
      }
    }
  }], [{
    key: "EDITOR_TYPE",
    get: function get() {
      return EDITOR_TYPE;
    }
  }]);

  return TextEditor;
}(BaseEditor);