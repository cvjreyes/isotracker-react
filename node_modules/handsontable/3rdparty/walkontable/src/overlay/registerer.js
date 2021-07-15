"use strict";

exports.__esModule = true;
exports.registerOverlayOnce = registerOverlayOnce;
exports.createOverlay = createOverlay;
exports.hasOverlay = hasOverlay;
exports.isOverlayTypeOf = isOverlayTypeOf;

require("core-js/modules/es.array.index-of.js");

var _constants = require("./constants");

var registeredOverlays = {};
/**
 * Register overlay class. If the Overlay under the same name is already registered
 * the class won't be registered.
 *
 * @param {Overlay} overlayClass Overlay class extended from base overlay class {@link Overlay}.
 */

function registerOverlayOnce(overlayClass) {
  var overlayName = overlayClass.OVERLAY_NAME;

  if (_constants.CLONE_TYPES.indexOf(overlayName) === -1) {
    throw new Error("Unsupported overlay (".concat(overlayName, ")."));
  }

  if (!hasOverlay(overlayName)) {
    registeredOverlays[overlayName] = overlayClass;
  }
}
/**
 * Create new instance of overlay type.
 *
 * @param {string} type Overlay type, one of the CLONE_TYPES value.
 * @param {Walkontable} wot The Walkontable instance.
 * @returns {Overlay}
 */


function createOverlay(type, wot) {
  return new registeredOverlays[type](wot);
}
/**
 * Check if specified overlay was registered.
 *
 * @param {string} type Overlay type, one of the CLONE_TYPES value.
 * @returns {boolean}
 */


function hasOverlay(type) {
  return registeredOverlays[type] !== void 0;
}
/**
 * Checks if overlay object (`overlay`) is instance of overlay type (`type`).
 *
 * @param {Overlay} overlay Overlay object.
 * @param {string} type Overlay type, one of the CLONE_TYPES value.
 * @returns {boolean}
 */


function isOverlayTypeOf(overlay, type) {
  if (!overlay || !registeredOverlays[type]) {
    return false;
  }

  return overlay instanceof registeredOverlays[type];
}