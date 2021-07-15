function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { outerHeight, outerWidth, setOverlayPosition, resetCssTransform } from "./../../../../helpers/dom/element.mjs";
import TopLeftCornerOverlayTable from "./../table/topLeftCorner.mjs";
import { Overlay } from "./_base.mjs";
import { CLONE_TOP_LEFT_CORNER } from "./constants.mjs";
/**
 * @class TopLeftCornerOverlay
 */

export var TopLeftCornerOverlay = /*#__PURE__*/function (_Overlay) {
  _inherits(TopLeftCornerOverlay, _Overlay);

  var _super = _createSuper(TopLeftCornerOverlay);

  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   */
  function TopLeftCornerOverlay(wotInstance) {
    var _this;

    _classCallCheck(this, TopLeftCornerOverlay);

    _this = _super.call(this, wotInstance);
    _this.clone = _this.makeClone(CLONE_TOP_LEFT_CORNER);
    return _this;
  }
  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {Table}
   */


  _createClass(TopLeftCornerOverlay, [{
    key: "createTable",
    value: function createTable() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(TopLeftCornerOverlayTable, args);
    }
    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */

  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      var wot = this.wot;
      return wot.getSetting('shouldRenderTopOverlay') && wot.getSetting('shouldRenderLeftOverlay');
    }
    /**
     * Updates the corner overlay position.
     *
     * @returns {boolean}
     */

  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      this.updateTrimmingContainer();

      if (!this.wot.wtTable.holder.parentNode) {
        // removed from DOM
        return;
      }

      var overlayRoot = this.clone.wtTable.holder.parentNode;
      var preventOverflow = this.wot.getSetting('preventOverflow');

      if (this.trimmingContainer === this.wot.rootWindow) {
        var wtTable = this.wot.wtTable;
        var hiderRect = wtTable.hider.getBoundingClientRect();
        var top = Math.ceil(hiderRect.top);
        var left = Math.ceil(hiderRect.left);
        var bottom = Math.ceil(hiderRect.bottom);
        var right = Math.ceil(hiderRect.right);
        var finalLeft = '0';
        var finalTop = '0';

        if (!preventOverflow || preventOverflow === 'vertical') {
          if (left < 0 && right - overlayRoot.offsetWidth > 0) {
            finalLeft = "".concat(-left, "px");
          }
        }

        if (!preventOverflow || preventOverflow === 'horizontal') {
          if (top < 0 && bottom - overlayRoot.offsetHeight > 0) {
            finalTop = "".concat(-top, "px");
          }
        }

        setOverlayPosition(overlayRoot, finalLeft, finalTop);
      } else {
        resetCssTransform(overlayRoot);
      }

      var tableHeight = outerHeight(this.clone.wtTable.TABLE);
      var tableWidth = outerWidth(this.clone.wtTable.TABLE);

      if (!this.wot.wtTable.hasDefinedSize()) {
        tableHeight = 0;
      }

      overlayRoot.style.height = "".concat(tableHeight, "px");
      overlayRoot.style.width = "".concat(tableWidth, "px");
      return false;
    }
  }], [{
    key: "OVERLAY_NAME",
    get: function get() {
      return CLONE_TOP_LEFT_CORNER;
    }
  }]);

  return TopLeftCornerOverlay;
}(Overlay);