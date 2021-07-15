function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * CellCoords holds cell coordinates (row, column) and few method to validate them and retrieve as an array or an object.
 *
 * @util
 */
var CellCoords = /*#__PURE__*/function () {
  function CellCoords(row, column) {
    _classCallCheck(this, CellCoords);

    /**
     * Row index.
     *
     * @type {number}
     */
    this.row = null;
    /**
     * Column index.
     *
     * @type {number}
     */

    this.col = null;

    if (typeof row !== 'undefined' && typeof column !== 'undefined') {
      this.row = row;
      this.col = column;
    }
  }
  /**
   * Checks if given set of coordinates is valid in context of a given Walkontable instance.
   *
   * @param {Walkontable} wot A Walkontable instance.
   * @returns {boolean}
   */


  _createClass(CellCoords, [{
    key: "isValid",
    value: function isValid(wot) {
      // is it a valid cell index (0 or higher)
      if (this.row < 0 || this.col < 0) {
        return false;
      } // is selection within total rows and columns


      if (this.row >= wot.getSetting('totalRows') || this.col >= wot.getSetting('totalColumns')) {
        return false;
      }

      return true;
    }
    /**
     * Checks if this cell coordinates are the same as cell coordinates given as an argument.
     *
     * @param {CellCoords} cellCoords Cell coordinates to equal.
     * @returns {boolean}
     */

  }, {
    key: "isEqual",
    value: function isEqual(cellCoords) {
      if (cellCoords === this) {
        return true;
      }

      return this.row === cellCoords.row && this.col === cellCoords.col;
    }
    /**
     * Checks if tested coordinates are positioned in south-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */

  }, {
    key: "isSouthEastOf",
    value: function isSouthEastOf(testedCoords) {
      return this.row >= testedCoords.row && this.col >= testedCoords.col;
    }
    /**
     * Checks if tested coordinates are positioned in north-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */

  }, {
    key: "isNorthWestOf",
    value: function isNorthWestOf(testedCoords) {
      return this.row <= testedCoords.row && this.col <= testedCoords.col;
    }
    /**
     * Checks if tested coordinates are positioned in south-west from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */

  }, {
    key: "isSouthWestOf",
    value: function isSouthWestOf(testedCoords) {
      return this.row >= testedCoords.row && this.col <= testedCoords.col;
    }
    /**
     * Checks if tested coordinates are positioned in north-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */

  }, {
    key: "isNorthEastOf",
    value: function isNorthEastOf(testedCoords) {
      return this.row <= testedCoords.row && this.col >= testedCoords.col;
    }
    /**
     * Normalizes the coordinates to the nearest valid position. The coordinates that point
     * to the headers (negative values) are normalized to 0.
     *
     * @returns {CellCoords}
     */

  }, {
    key: "normalize",
    value: function normalize() {
      this.row = this.row === null ? this.row : Math.max(this.row, 0);
      this.col = this.col === null ? this.col : Math.max(this.col, 0);
      return this;
    }
    /**
     * Clones the coordinates.
     *
     * @returns {CellCoords}
     */

  }, {
    key: "clone",
    value: function clone() {
      return new CellCoords(this.row, this.col);
    }
    /**
     * Converts CellCoords to literal object with `row` and `col` properties.
     *
     * @returns {object} Returns a literal object with `row` and `col` properties.
     */

  }, {
    key: "toObject",
    value: function toObject() {
      return {
        row: this.row,
        col: this.col
      };
    }
  }]);

  return CellCoords;
}();

export default CellCoords;