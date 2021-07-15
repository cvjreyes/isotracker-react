"use strict";

exports.__esModule = true;
exports.autocompleteRenderer = autocompleteRenderer;
exports.RENDERER_TYPE = void 0;

var _htmlRenderer = require("../htmlRenderer");

var _textRenderer = require("../textRenderer");

var _src = require("../../3rdparty/walkontable/src");

var _eventManager = _interopRequireDefault(require("../../eventManager"));

var _element = require("../../helpers/dom/element");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RENDERER_TYPE = 'autocomplete';
/**
 * Autocomplete renderer.
 *
 * @private
 * @param {Core} instance The Handsontable instance.
 * @param {HTMLTableCellElement} TD The rendered cell element.
 * @param {number} row The visual row index.
 * @param {number} col The visual column index.
 * @param {number|string} prop The column property (passed when datasource is an array of objects).
 * @param {*} value The rendered value.
 * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
 */

exports.RENDERER_TYPE = RENDERER_TYPE;

function autocompleteRenderer(instance, TD, row, col, prop, value, cellProperties) {
  var rootDocument = instance.rootDocument;
  var rendererFunc = cellProperties.allowHtml ? _htmlRenderer.htmlRenderer : _textRenderer.textRenderer;
  var ARROW = rootDocument.createElement('DIV');
  ARROW.className = 'htAutocompleteArrow';
  ARROW.appendChild(rootDocument.createTextNode(String.fromCharCode(9660)));
  rendererFunc.apply(this, [instance, TD, row, col, prop, value, cellProperties]);

  if (!TD.firstChild) {
    // http://jsperf.com/empty-node-if-needed
    // otherwise empty fields appear borderless in demo/renderers.html (IE)
    TD.appendChild(rootDocument.createTextNode(String.fromCharCode(160))); // workaround for https://github.com/handsontable/handsontable/issues/1946
    // this is faster than innerHTML. See: https://github.com/handsontable/handsontable/wiki/JavaScript-&-DOM-performance-tips
  }

  TD.insertBefore(ARROW, TD.firstChild);
  (0, _element.addClass)(TD, 'htAutocomplete');

  if (!instance.acArrowListener) {
    var eventManager = new _eventManager.default(instance); // not very elegant but easy and fast

    instance.acArrowListener = function (event) {
      if ((0, _element.hasClass)(event.target, 'htAutocompleteArrow')) {
        instance.view.wt.getSetting('onCellDblClick', null, new _src.CellCoords(row, col), TD);
      }
    };

    eventManager.addEventListener(instance.rootElement, 'mousedown', instance.acArrowListener); // We need to unbind the listener after the table has been destroyed

    instance.addHookOnce('afterDestroy', function () {
      eventManager.destroy();
    });
  }
}

autocompleteRenderer.RENDERER_TYPE = RENDERER_TYPE;