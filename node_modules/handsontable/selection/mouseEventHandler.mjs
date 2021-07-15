import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { isRightClick as isRightClickEvent, isLeftClick as isLeftClickEvent } from "./../helpers/dom/event.mjs";
import { CellCoords } from "./../3rdparty/walkontable/src/index.mjs";
/**
 * MouseDown handler.
 *
 * @param {object} options The handler options.
 * @param {boolean} options.isShiftKey The flag which indicates if the shift key is pressed.
 * @param {boolean} options.isLeftClick The flag which indicates if the left mouse button is pressed.
 * @param {boolean} options.isRightClick The flag which indicates if the right mouse button is pressed.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 */

export function mouseDown(_ref) {
  var isShiftKey = _ref.isShiftKey,
      isLeftClick = _ref.isLeftClick,
      isRightClick = _ref.isRightClick,
      coords = _ref.coords,
      selection = _ref.selection,
      controller = _ref.controller;
  var currentSelection = selection.isSelected() ? selection.getSelectedRange().current() : null;
  var selectedCorner = selection.isSelectedByCorner();
  var selectedRow = selection.isSelectedByRowHeader();

  if (isShiftKey && currentSelection) {
    if (coords.row >= 0 && coords.col >= 0 && !controller.cells) {
      selection.setRangeEnd(coords);
    } else if ((selectedCorner || selectedRow) && coords.row >= 0 && coords.col >= 0 && !controller.cells) {
      selection.setRangeEnd(new CellCoords(coords.row, coords.col));
    } else if (selectedCorner && coords.row < 0 && !controller.column) {
      selection.setRangeEnd(new CellCoords(currentSelection.to.row, coords.col));
    } else if (selectedRow && coords.col < 0 && !controller.row) {
      selection.setRangeEnd(new CellCoords(coords.row, currentSelection.to.col));
    } else if ((!selectedCorner && !selectedRow && coords.col < 0 || selectedCorner && coords.col < 0) && !controller.row) {
      selection.selectRows(Math.max(currentSelection.from.row, 0), coords.row, coords.col);
    } else if ((!selectedCorner && !selectedRow && coords.row < 0 || selectedRow && coords.row < 0) && !controller.column) {
      selection.selectColumns(Math.max(currentSelection.from.col, 0), coords.col, coords.row);
    }
  } else {
    var allowRightClickSelection = !selection.inInSelection(coords);
    var performSelection = isLeftClick || isRightClick && allowRightClickSelection; // clicked row header and when some column was selected

    if (coords.row < 0 && coords.col >= 0 && !controller.column) {
      if (performSelection) {
        selection.selectColumns(coords.col, coords.col, coords.row);
      } // clicked column header and when some row was selected

    } else if (coords.col < 0 && coords.row >= 0 && !controller.row) {
      if (performSelection) {
        selection.selectRows(coords.row, coords.row, coords.col);
      }
    } else if (coords.col >= 0 && coords.row >= 0 && !controller.cells) {
      if (performSelection) {
        selection.setRangeStart(coords);
      }
    } else if (coords.col < 0 && coords.row < 0) {
      selection.selectAll(true, true);
    }
  }
}
/**
 * MouseOver handler.
 *
 * @param {object} options The handler options.
 * @param {boolean} options.isLeftClick Indicates that event was fired using the left mouse button.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 */

export function mouseOver(_ref2) {
  var isLeftClick = _ref2.isLeftClick,
      coords = _ref2.coords,
      selection = _ref2.selection,
      controller = _ref2.controller;

  if (!isLeftClick) {
    return;
  }

  var selectedRow = selection.isSelectedByRowHeader();
  var selectedColumn = selection.isSelectedByColumnHeader();
  var countCols = selection.tableProps.countCols();
  var countRows = selection.tableProps.countRows();

  if (selectedColumn && !controller.column) {
    selection.setRangeEnd(new CellCoords(countRows - 1, coords.col));
  } else if (selectedRow && !controller.row) {
    selection.setRangeEnd(new CellCoords(coords.row, countCols - 1));
  } else if (!controller.cell) {
    selection.setRangeEnd(coords);
  }
}
var handlers = new Map([['mousedown', mouseDown], ['mouseover', mouseOver], ['touchstart', mouseDown]]);
/**
 * Mouse handler for selection functionality.
 *
 * @param {Event} event An native event to handle.
 * @param {object} options The handler options.
 * @param {CellRange} options.coords The CellCoords object with defined visual coordinates.
 * @param {Selection} options.selection The Selection class instance.
 * @param {object} options.controller An object with keys `row`, `column`, `cell` which indicate what
 *                                    operation will be performed in later selection stages.
 */

export function handleMouseEvent(event, _ref3) {
  var coords = _ref3.coords,
      selection = _ref3.selection,
      controller = _ref3.controller;
  handlers.get(event.type)({
    coords: coords,
    selection: selection,
    controller: controller,
    isShiftKey: event.shiftKey,
    isLeftClick: isLeftClickEvent(event) || event.type === 'touchstart',
    isRightClick: isRightClickEvent(event)
  });
}