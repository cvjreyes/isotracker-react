import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
import { isDefined } from "../../../helpers/mixed.mjs";
export var KEY = 'col_right';
/**
 * @returns {object}
 */

export default function columnRightItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_INSERT_RIGHT);
    },
    callback: function callback(key, normalizedSelection) {
      var isSelectedByCorner = this.selection.isSelectedByCorner();
      var columnRight = 0;

      if (isSelectedByCorner) {
        columnRight = this.countCols();
      } else {
        var _latestSelection$end;

        var latestSelection = normalizedSelection[Math.max(normalizedSelection.length - 1, 0)];
        var selectedColumn = latestSelection === null || latestSelection === void 0 ? void 0 : (_latestSelection$end = latestSelection.end) === null || _latestSelection$end === void 0 ? void 0 : _latestSelection$end.col; // If there is no selection we have clicked on the corner and there is no data.

        columnRight = isDefined(selectedColumn) ? selectedColumn + 1 : 0;
      }

      this.alter('insert_col', columnRight, 1, 'ContextMenu.columnRight');

      if (isSelectedByCorner) {
        this.selectAll();
      }
    },
    disabled: function disabled() {
      if (!this.isColumnModificationAllowed()) {
        return true;
      }

      var selected = getValidSelection(this);

      if (!selected) {
        return true;
      }

      if (this.selection.isSelectedByCorner()) {
        // Enable "Insert column right" always when the menu is triggered by corner click.
        return false;
      }

      return this.selection.isSelectedByRowHeader() || this.countCols() >= this.getSettings().maxCols;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertColumn;
    }
  };
}