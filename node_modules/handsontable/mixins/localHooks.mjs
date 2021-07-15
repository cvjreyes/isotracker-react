import { arrayEach } from "./../helpers/array.mjs";
import { defineGetter } from "./../helpers/object.mjs";
var MIXIN_NAME = 'localHooks';
/**
 * Mixin object to extend objects functionality for local hooks.
 *
 * @type {object}
 */

var localHooks = {
  /**
   * Internal hooks storage.
   */
  _localHooks: Object.create(null),

  /**
   * Add hook to the collection.
   *
   * @param {string} key The hook name.
   * @param {Function} callback The hook callback.
   * @returns {object}
   */
  addLocalHook: function addLocalHook(key, callback) {
    if (!this._localHooks[key]) {
      this._localHooks[key] = [];
    }

    this._localHooks[key].push(callback);

    return this;
  },

  /**
   * Run hooks.
   *
   * @param {string} key The hook name.
   * @param {*} params Additional parameters passed to callback function.
   */
  runLocalHooks: function runLocalHooks(key) {
    var _this = this;

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (this._localHooks[key]) {
      arrayEach(this._localHooks[key], function (callback) {
        return callback.apply(_this, params);
      });
    }
  },

  /**
   * Clear all added hooks.
   *
   * @returns {object}
   */
  clearLocalHooks: function clearLocalHooks() {
    this._localHooks = {};
    return this;
  }
};
defineGetter(localHooks, 'MIXIN_NAME', MIXIN_NAME, {
  writable: false,
  enumerable: false
});
export default localHooks;