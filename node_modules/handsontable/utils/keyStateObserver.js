"use strict";

exports.__esModule = true;
exports._getRefCount = _getRefCount;
exports._resetState = _resetState;
exports.isPressed = isPressed;
exports.isPressedCtrlKey = isPressedCtrlKey;
exports.startObserving = startObserving;
exports.stopObserving = stopObserving;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.set.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

var _eventManager = _interopRequireDefault(require("../eventManager"));

var _unicode = require("../helpers/unicode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventManager = new _eventManager.default();
var pressedKeys = new Set();
var refCount = 0;
/**
 * Begins observing keyboard keys states.
 *
 * @param {Document} rootDocument The document owner.
 */

function startObserving(rootDocument) {
  if (refCount === 0) {
    eventManager.addEventListener(rootDocument, 'keydown', function (event) {
      if (!pressedKeys.has(event.keyCode)) {
        pressedKeys.add(event.keyCode);
      }
    });
    eventManager.addEventListener(rootDocument, 'keyup', function (event) {
      if (pressedKeys.has(event.keyCode)) {
        pressedKeys.delete(event.keyCode);
      }
    });
    eventManager.addEventListener(rootDocument, 'visibilitychange', function () {
      if (rootDocument.hidden) {
        pressedKeys.clear();
      }
    });
    eventManager.addEventListener(rootDocument.defaultView, 'blur', function () {
      pressedKeys.clear();
    });
  }

  refCount += 1;
}
/**
 * Stops observing keyboard keys states and clear all previously saved states.
 */


function stopObserving() {
  if (refCount > 0) {
    refCount -= 1;
  }

  if (refCount === 0) {
    _resetState();
  }
}
/**
 * Remove all listeners attached to the DOM and clear all previously saved states.
 */


function _resetState() {
  eventManager.clearEvents();
  pressedKeys.clear();
  refCount = 0;
}
/**
 * Checks if provided keyCode or keyCodes are pressed.
 *
 * @param {string} keyCodes The key codes passed as a string defined in helpers/unicode.js file delimited with '|'.
 * @returns {boolean}
 */


function isPressed(keyCodes) {
  return Array.from(pressedKeys.values()).some(function (_keyCode) {
    return (0, _unicode.isKey)(_keyCode, keyCodes);
  });
}
/**
 * Checks if ctrl keys are pressed.
 *
 * @returns {boolean}
 */


function isPressedCtrlKey() {
  var values = Array.from(pressedKeys.values());
  return values.some(function (_keyCode) {
    return (0, _unicode.isCtrlMetaKey)(_keyCode);
  });
}
/**
 * Returns reference count. Useful for debugging and testing purposes.
 *
 * @returns {number}
 */


function _getRefCount() {
  return refCount;
}