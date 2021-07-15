import { TextEditor } from "../../editors/textEditor/index.mjs";
import { textRenderer } from "../../renderers/textRenderer/index.mjs";
import { timeValidator } from "../../validators/timeValidator/index.mjs";
export var CELL_TYPE = 'time';
export var TimeCellType = {
  CELL_TYPE: CELL_TYPE,
  editor: TextEditor,
  // displays small gray arrow on right side of the cell
  renderer: textRenderer,
  validator: timeValidator
};