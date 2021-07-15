import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'col_left';
/**
 * @returns {object}
 */

export default function columnLeftItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_INSERT_LEFT);
    },
    callback: function callback(key, normalizedSelection) {
      var isSelectedByCorner = this.selection.isSelectedByCorner();
      var columnLeft = 0;

      if (!isSelectedByCorner) {
        var latestSelection = normalizedSelection[Math.max(normalizedSelection.length - 1, 0)];
        columnLeft = latestSelection.start.col;
      }

      this.alter('insert_col', columnLeft, 1, 'ContextMenu.columnLeft');

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
        var totalColumns = this.countCols(); // Enable "Insert column left" only when there is at least one column.

        return totalColumns === 0;
      }

      return this.selection.isSelectedByRowHeader() || this.countCols() >= this.getSettings().maxCols;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertColumn;
    }
  };
}