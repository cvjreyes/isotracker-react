"use strict";

exports.__esModule = true;
exports.default = void 0;

var _object = require("../../../../../helpers/object");

var MIXIN_NAME = 'calculatedColumns';
/**
 * Mixin for the subclasses of `Table` with implementations of
 * helper methods that are related to columns.
 * This mixin is meant to be applied in the subclasses of `Table`
 * that use virtual rendering in the horizontal axis.
 *
 * @type {object}
 */

var calculatedColumns = {
  /**
   * Get the source index of the first rendered column. If no columns are rendered, returns an error code: -1.
   *
   * @returns {number}
   */
  getFirstRenderedColumn: function getFirstRenderedColumn() {
    var startColumn = this.wot.wtViewport.columnsRenderCalculator.startColumn;

    if (startColumn === null) {
      return -1;
    }

    return startColumn;
  },

  /**
   * Get the source index of the first column fully visible in the viewport. If no columns are fully visible, returns an error code: -1.
   *
   * @returns {number}
   */
  getFirstVisibleColumn: function getFirstVisibleColumn() {
    var startColumn = this.wot.wtViewport.columnsVisibleCalculator.startColumn;

    if (startColumn === null) {
      return -1;
    }

    return startColumn;
  },

  /**
   * Get the source index of the last rendered column. If no columns are rendered, returns an error code: -1.
   *
   * @returns {number}
   */
  getLastRenderedColumn: function getLastRenderedColumn() {
    var endColumn = this.wot.wtViewport.columnsRenderCalculator.endColumn;

    if (endColumn === null) {
      return -1;
    }

    return endColumn;
  },

  /**
   * Get the source index of the last column fully visible in the viewport. If no columns are fully visible, returns an error code: -1.
   *
   * @returns {number}
   */
  getLastVisibleColumn: function getLastVisibleColumn() {
    var endColumn = this.wot.wtViewport.columnsVisibleCalculator.endColumn;

    if (endColumn === null) {
      return -1;
    }

    return endColumn;
  },

  /**
   * Get the number of rendered columns.
   *
   * @returns {number}
   */
  getRenderedColumnsCount: function getRenderedColumnsCount() {
    return this.wot.wtViewport.columnsRenderCalculator.count;
  },

  /**
   * Get the number of fully visible columns in the viewport.
   *
   * @returns {number}
   */
  getVisibleColumnsCount: function getVisibleColumnsCount() {
    return this.wot.wtViewport.columnsVisibleCalculator.count;
  }
};
(0, _object.defineGetter)(calculatedColumns, 'MIXIN_NAME', MIXIN_NAME, {
  writable: false,
  enumerable: false
});
var _default = calculatedColumns;
exports.default = _default;