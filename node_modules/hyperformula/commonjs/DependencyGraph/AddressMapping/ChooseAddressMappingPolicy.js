"use strict";

exports.__esModule = true;
exports.AlwaysDense = exports.AlwaysSparse = exports.DenseSparseChooseBasedOnThreshold = void 0;

var _DenseStrategy = require("./DenseStrategy");

var _SparseStrategy = require("./SparseStrategy");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DenseSparseChooseBasedOnThreshold = /*#__PURE__*/function () {
  function DenseSparseChooseBasedOnThreshold(threshold) {
    _classCallCheck(this, DenseSparseChooseBasedOnThreshold);

    this.threshold = threshold;
  }

  _createClass(DenseSparseChooseBasedOnThreshold, [{
    key: "call",
    value: function call(fill) {
      if (fill > this.threshold) {
        return _DenseStrategy.DenseStrategy;
      } else {
        return _SparseStrategy.SparseStrategy;
      }
    }
  }]);

  return DenseSparseChooseBasedOnThreshold;
}();

exports.DenseSparseChooseBasedOnThreshold = DenseSparseChooseBasedOnThreshold;

var AlwaysSparse = /*#__PURE__*/function () {
  function AlwaysSparse() {
    _classCallCheck(this, AlwaysSparse);
  }

  _createClass(AlwaysSparse, [{
    key: "call",
    value: function call() {
      return _SparseStrategy.SparseStrategy;
    }
  }]);

  return AlwaysSparse;
}();

exports.AlwaysSparse = AlwaysSparse;

var AlwaysDense = /*#__PURE__*/function () {
  function AlwaysDense() {
    _classCallCheck(this, AlwaysDense);
  }

  _createClass(AlwaysDense, [{
    key: "call",
    value: function call() {
      return _DenseStrategy.DenseStrategy;
    }
  }]);

  return AlwaysDense;
}();

exports.AlwaysDense = AlwaysDense;