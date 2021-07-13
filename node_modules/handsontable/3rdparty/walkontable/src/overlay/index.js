"use strict";

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

exports.__esModule = true;
var _exportNames = {
  BottomLeftCornerOverlay: true,
  BottomOverlay: true,
  LeftOverlay: true,
  Overlay: true,
  TopLeftCornerOverlay: true,
  TopOverlay: true
};
exports.TopOverlay = exports.TopLeftCornerOverlay = exports.Overlay = exports.LeftOverlay = exports.BottomOverlay = exports.BottomLeftCornerOverlay = void 0;

var _bottomLeftCorner = require("./bottomLeftCorner");

exports.BottomLeftCornerOverlay = _bottomLeftCorner.BottomLeftCornerOverlay;

var _bottom = require("./bottom");

exports.BottomOverlay = _bottom.BottomOverlay;

var _left = require("./left");

exports.LeftOverlay = _left.LeftOverlay;

var _base = require("./_base");

exports.Overlay = _base.Overlay;

var _topLeftCorner = require("./topLeftCorner");

exports.TopLeftCornerOverlay = _topLeftCorner.TopLeftCornerOverlay;

var _top = require("./top");

exports.TopOverlay = _top.TopOverlay;

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  exports[key] = _constants[key];
});

var _registerer = require("./registerer");

Object.keys(_registerer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _registerer[key]) return;
  exports[key] = _registerer[key];
});