import "core-js/modules/es.array.reduce.js";
import { isObjectEqual } from "../../helpers/object.mjs";
/**
 * Creates hooks for autofill.
 *
 * @param {object} pluginInstance The formulas plugin instance.
 * @returns {object}
 */

export var createAutofillHooks = function createAutofillHooks(pluginInstance) {
  // Blocks the autofill operation if at least one of the underlying's cell
  // contents cannot be set, e.g. if there's a matrix underneath.
  var beforeAutofill = function beforeAutofill(_, __, target) {
    var width = target.getWidth();
    var height = target.getHeight();
    var row = target.from.row;
    var col = target.from.col;

    if (!pluginInstance.engine.isItPossibleToSetCellContents({
      sheet: pluginInstance.sheetId,
      row: row,
      col: col
    }, width, height)) {
      return false;
    }
  };

  var afterAutofill = function afterAutofill(fillData, source, target, direction, hasFillDataChanged) {
    // Skip fill handle process when the fill data was changed by user.
    if (hasFillDataChanged) {
      return;
    }

    var sourceSize = {
      width: source.getWidth(),
      height: source.getHeight()
    };
    var targetSize = {
      width: target.getWidth(),
      height: target.getHeight()
    };
    var operations = [];

    switch (direction) {
      case 'right':
        {
          var pasteRow = source.from.row;

          for (var pasteCol = target.from.col; pasteCol <= target.to.col; pasteCol += sourceSize.width) {
            var remaining = target.to.col - pasteCol + 1;
            var width = Math.min(sourceSize.width, remaining);
            operations.push({
              copy: {
                row: source.from.row,
                col: source.from.col,
                width: width,
                height: sourceSize.height
              },
              paste: {
                row: pasteRow,
                col: pasteCol
              }
            });
          }

          break;
        }

      case 'down':
        {
          var _pasteCol = source.from.col;

          for (var _pasteRow = target.from.row; _pasteRow <= target.to.row; _pasteRow += sourceSize.height) {
            var _remaining = target.to.row - _pasteRow + 1;

            var height = Math.min(sourceSize.height, _remaining);
            operations.push({
              copy: {
                row: source.from.row,
                col: source.from.col,
                width: sourceSize.width,
                height: height
              },
              paste: {
                row: _pasteRow,
                col: _pasteCol
              }
            });
          }

          break;
        }

      case 'left':
        {
          var _pasteRow2 = source.from.row;

          for (var _pasteCol2 = target.from.col; _pasteCol2 <= target.to.col; _pasteCol2++) {
            var offset = targetSize.width % sourceSize.width;
            var copyCol = (sourceSize.width - offset + (_pasteCol2 - target.from.col)) % sourceSize.width + source.from.col;
            operations.push({
              copy: {
                row: source.from.row,
                col: copyCol,
                width: 1,
                height: sourceSize.height
              },
              paste: {
                row: _pasteRow2,
                col: _pasteCol2
              }
            });
          }

          break;
        }

      case 'up':
        {
          var _pasteCol3 = source.from.col;

          for (var _pasteRow3 = target.from.row; _pasteRow3 <= target.to.row; _pasteRow3++) {
            var _offset = targetSize.height % sourceSize.height;

            var copyRow = (sourceSize.height - _offset + (_pasteRow3 - target.from.row)) % sourceSize.height + source.from.row;
            operations.push({
              copy: {
                row: copyRow,
                col: source.from.col,
                width: sourceSize.width,
                height: 1
              },
              paste: {
                row: _pasteRow3,
                col: _pasteCol3
              }
            });
          }

          break;
        }

      default:
        {
          throw new Error('Unexpected direction parameter');
        }
    }

    var sheet = pluginInstance.sheetId;
    operations.reduce(function (previousCopy, operation) {
      if (!isObjectEqual(previousCopy, operation.copy)) {
        pluginInstance.engine.copy({
          sheet: sheet,
          row: operation.copy.row,
          col: operation.copy.col
        }, operation.copy.width, operation.copy.height);
      }

      pluginInstance.engine.paste({
        sheet: sheet,
        row: operation.paste.row,
        col: operation.paste.col
      });
      return operation.copy;
    }, {});
  };

  return {
    beforeAutofill: beforeAutofill,
    afterAutofill: afterAutofill
  };
};