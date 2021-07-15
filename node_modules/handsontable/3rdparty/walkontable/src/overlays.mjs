import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/web.timers.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { getScrollableElement, getScrollbarWidth } from "./../../../helpers/dom/element.mjs";
import { arrayEach } from "./../../../helpers/array.mjs";
import { isKey } from "./../../../helpers/unicode.mjs";
import { isChrome } from "./../../../helpers/browser.mjs";
import EventManager from "./../../../eventManager.mjs";
import { CLONE_BOTTOM_LEFT_CORNER, CLONE_BOTTOM, CLONE_LEFT, CLONE_TOP_LEFT_CORNER, CLONE_TOP, LeftOverlay, TopOverlay, TopLeftCornerOverlay, BottomOverlay, BottomLeftCornerOverlay, registerOverlayOnce, createOverlay, hasOverlay } from "./overlay/index.mjs";
registerOverlayOnce(BottomLeftCornerOverlay);
registerOverlayOnce(BottomOverlay);
registerOverlayOnce(LeftOverlay);
registerOverlayOnce(TopLeftCornerOverlay);
registerOverlayOnce(TopOverlay);
/**
 * @class Overlays
 */

var Overlays = /*#__PURE__*/function () {
  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   */
  function Overlays(wotInstance) {
    _classCallCheck(this, Overlays);

    /**
     * Walkontable instance's reference.
     *
     * @private
     * @type {Walkontable}
     */
    this.wot = wotInstance;
    var _this$wot = this.wot,
        rootDocument = _this$wot.rootDocument,
        rootWindow = _this$wot.rootWindow,
        wtTable = _this$wot.wtTable;
    /**
     * Sometimes `line-height` might be set to 'normal'. In that case, a default `font-size` should be multiplied by roughly 1.2.
     * Https://developer.mozilla.org/pl/docs/Web/CSS/line-height#Values.
     */

    var BODY_LINE_HEIGHT = parseInt(rootWindow.getComputedStyle(rootDocument.body).lineHeight, 10);
    var FALLBACK_BODY_LINE_HEIGHT = parseInt(rootWindow.getComputedStyle(rootDocument.body).fontSize, 10) * 1.2; // legacy support

    this.instance = this.wot;
    this.eventManager = new EventManager(this.wot);
    this.scrollbarSize = getScrollbarWidth(rootDocument);
    this.wot.update('scrollbarWidth', this.scrollbarSize);
    this.wot.update('scrollbarHeight', this.scrollbarSize);
    var isOverflowHidden = rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden';
    this.scrollableElement = isOverflowHidden ? wtTable.holder : getScrollableElement(wtTable.TABLE);
    this.topOverlay = void 0;
    this.bottomOverlay = void 0;
    this.leftOverlay = void 0;
    this.topLeftCornerOverlay = void 0;
    this.bottomLeftCornerOverlay = void 0;
    this.prepareOverlays();
    this.hasScrollbarBottom = false;
    this.hasScrollbarRight = false;
    this.destroyed = false;
    this.keyPressed = false;
    this.spreaderLastSize = {
      width: null,
      height: null
    };
    this.verticalScrolling = false;
    this.horizontalScrolling = false;
    this.browserLineHeight = BODY_LINE_HEIGHT || FALLBACK_BODY_LINE_HEIGHT;
    this.registerListeners();
    this.lastScrollX = rootWindow.scrollX;
    this.lastScrollY = rootWindow.scrollY;
  }
  /**
   * Prepare overlays based on user settings.
   *
   * @returns {boolean} Returns `true` if changes applied to overlay needs scroll synchronization.
   */


  _createClass(Overlays, [{
    key: "prepareOverlays",
    value: function prepareOverlays() {
      var syncScroll = false;

      if (this.topOverlay) {
        syncScroll = this.topOverlay.updateStateOfRendering() || syncScroll;
      } else {
        this.topOverlay = createOverlay(CLONE_TOP, this.wot);
      }

      if (!hasOverlay(CLONE_BOTTOM)) {
        this.bottomOverlay = {
          needFullRender: false,
          updateStateOfRendering: function updateStateOfRendering() {
            return false;
          }
        };
      }

      if (!hasOverlay(CLONE_BOTTOM_LEFT_CORNER)) {
        this.bottomLeftCornerOverlay = {
          needFullRender: false,
          updateStateOfRendering: function updateStateOfRendering() {
            return false;
          }
        };
      }

      if (this.bottomOverlay) {
        syncScroll = this.bottomOverlay.updateStateOfRendering() || syncScroll;
      } else {
        this.bottomOverlay = createOverlay(CLONE_BOTTOM, this.wot);
      }

      if (this.leftOverlay) {
        syncScroll = this.leftOverlay.updateStateOfRendering() || syncScroll;
      } else {
        this.leftOverlay = createOverlay(CLONE_LEFT, this.wot);
      }

      if (this.topOverlay.needFullRender && this.leftOverlay.needFullRender) {
        if (this.topLeftCornerOverlay) {
          syncScroll = this.topLeftCornerOverlay.updateStateOfRendering() || syncScroll;
        } else {
          this.topLeftCornerOverlay = createOverlay(CLONE_TOP_LEFT_CORNER, this.wot);
        }
      }

      if (this.bottomOverlay.needFullRender && this.leftOverlay.needFullRender) {
        if (this.bottomLeftCornerOverlay) {
          syncScroll = this.bottomLeftCornerOverlay.updateStateOfRendering() || syncScroll;
        } else {
          this.bottomLeftCornerOverlay = createOverlay(CLONE_BOTTOM_LEFT_CORNER, this.wot);
        }
      }

      return syncScroll;
    }
    /**
     * Refresh and redraw table.
     */

  }, {
    key: "refreshAll",
    value: function refreshAll() {
      if (!this.wot.drawn) {
        return;
      }

      if (!this.wot.wtTable.holder.parentNode) {
        // Walkontable was detached from DOM, but this handler was not removed
        this.destroy();
        return;
      }

      this.wot.draw(true);

      if (this.verticalScrolling) {
        this.leftOverlay.onScroll();
      }

      if (this.horizontalScrolling) {
        this.topOverlay.onScroll();
      }

      this.verticalScrolling = false;
      this.horizontalScrolling = false;
    }
    /**
     * Register all necessary event listeners.
     */

  }, {
    key: "registerListeners",
    value: function registerListeners() {
      var _this = this;

      var _this$wot2 = this.wot,
          rootDocument = _this$wot2.rootDocument,
          rootWindow = _this$wot2.rootWindow;
      var topOverlayScrollableElement = this.topOverlay.mainTableScrollableElement;
      var leftOverlayScrollableElement = this.leftOverlay.mainTableScrollableElement;
      this.eventManager.addEventListener(rootDocument.documentElement, 'keydown', function (event) {
        return _this.onKeyDown(event);
      });
      this.eventManager.addEventListener(rootDocument.documentElement, 'keyup', function () {
        return _this.onKeyUp();
      });
      this.eventManager.addEventListener(rootDocument, 'visibilitychange', function () {
        return _this.onKeyUp();
      });
      this.eventManager.addEventListener(topOverlayScrollableElement, 'scroll', function (event) {
        return _this.onTableScroll(event);
      }, {
        passive: true
      });

      if (topOverlayScrollableElement !== leftOverlayScrollableElement) {
        this.eventManager.addEventListener(leftOverlayScrollableElement, 'scroll', function (event) {
          return _this.onTableScroll(event);
        }, {
          passive: true
        });
      }

      var isHighPixelRatio = rootWindow.devicePixelRatio && rootWindow.devicePixelRatio > 1;
      var isScrollOnWindow = this.scrollableElement === rootWindow;
      var preventWheel = this.wot.wtSettings.getSetting('preventWheel');
      var wheelEventOptions = {
        passive: isScrollOnWindow
      };

      if (preventWheel || isHighPixelRatio || !isChrome()) {
        this.eventManager.addEventListener(this.wot.wtTable.wtRootElement, 'wheel', function (event) {
          return _this.onCloneWheel(event, preventWheel);
        }, wheelEventOptions);
      }

      var overlays = [this.topOverlay, this.bottomOverlay, this.leftOverlay, this.topLeftCornerOverlay, this.bottomLeftCornerOverlay];
      overlays.forEach(function (overlay) {
        if (overlay && overlay.needFullRender) {
          var holder = overlay.clone.wtTable.holder;

          _this.eventManager.addEventListener(holder, 'wheel', function (event) {
            return _this.onCloneWheel(event, preventWheel);
          }, wheelEventOptions);
        }
      });
      var resizeTimeout;
      this.eventManager.addEventListener(rootWindow, 'resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          _this.wot.getSetting('onWindowResize');
        }, 200);
      });
    }
    /**
     * Deregister all previously registered listeners.
     */

  }, {
    key: "deregisterListeners",
    value: function deregisterListeners() {
      this.eventManager.clearEvents(true);
    }
    /**
     * Scroll listener.
     *
     * @param {Event} event The mouse event object.
     */

  }, {
    key: "onTableScroll",
    value: function onTableScroll(event) {
      // There was if statement which controlled flow of this function. It avoided the execution of the next lines
      // on mobile devices. It was changed. Broader description of this case is included within issue #4856.
      var rootWindow = this.wot.rootWindow;
      var masterHorizontal = this.leftOverlay.mainTableScrollableElement;
      var masterVertical = this.topOverlay.mainTableScrollableElement;
      var target = event.target; // For key press, sync only master -> overlay position because while pressing Walkontable.render is triggered
      // by hot.refreshBorder

      if (this.keyPressed) {
        if (masterVertical !== rootWindow && target !== rootWindow && !event.target.contains(masterVertical) || masterHorizontal !== rootWindow && target !== rootWindow && !event.target.contains(masterHorizontal)) {
          return;
        }
      }

      this.syncScrollPositions(event);
    }
    /**
     * Wheel listener for cloned overlays.
     *
     * @param {Event} event The mouse event object.
     * @param {boolean} preventDefault If `true`, the `preventDefault` will be called on event object.
     */

  }, {
    key: "onCloneWheel",
    value: function onCloneWheel(event, preventDefault) {
      var rootWindow = this.wot.rootWindow; // There was if statement which controlled flow of this function. It avoided the execution of the next lines
      // on mobile devices. It was changed. Broader description of this case is included within issue #4856.

      var masterHorizontal = this.leftOverlay.mainTableScrollableElement;
      var masterVertical = this.topOverlay.mainTableScrollableElement;
      var target = event.target; // For key press, sync only master -> overlay position because while pressing Walkontable.render is triggered
      // by hot.refreshBorder

      var shouldNotWheelVertically = masterVertical !== rootWindow && target !== rootWindow && !target.contains(masterVertical);
      var shouldNotWheelHorizontally = masterHorizontal !== rootWindow && target !== rootWindow && !target.contains(masterHorizontal);

      if (this.keyPressed && (shouldNotWheelVertically || shouldNotWheelHorizontally)) {
        return;
      }

      var isScrollPossible = this.translateMouseWheelToScroll(event);

      if (preventDefault || this.scrollableElement !== rootWindow && isScrollPossible) {
        event.preventDefault();
      }
    }
    /**
     * Key down listener.
     *
     * @param {Event} event The keyboard event object.
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      this.keyPressed = isKey(event.keyCode, 'ARROW_UP|ARROW_RIGHT|ARROW_DOWN|ARROW_LEFT');
    }
    /**
     * Key up listener.
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp() {
      this.keyPressed = false;
    }
    /**
     * Translate wheel event into scroll event and sync scroll overlays position.
     *
     * @private
     * @param {Event} event The mouse event object.
     * @returns {boolean}
     */

  }, {
    key: "translateMouseWheelToScroll",
    value: function translateMouseWheelToScroll(event) {
      var browserLineHeight = this.browserLineHeight;
      var deltaY = isNaN(event.deltaY) ? -1 * event.wheelDeltaY : event.deltaY;
      var deltaX = isNaN(event.deltaX) ? -1 * event.wheelDeltaX : event.deltaX;

      if (event.deltaMode === 1) {
        deltaX += deltaX * browserLineHeight;
        deltaY += deltaY * browserLineHeight;
      }

      var isScrollVerticallyPossible = this.scrollVertically(deltaY);
      var isScrollHorizontallyPossible = this.scrollHorizontally(deltaX);
      return isScrollVerticallyPossible || isScrollHorizontallyPossible;
    }
    /**
     * Scrolls main scrollable element horizontally.
     *
     * @param {number} delta Relative value to scroll.
     * @returns {boolean}
     */

  }, {
    key: "scrollVertically",
    value: function scrollVertically(delta) {
      var previousScroll = this.scrollableElement.scrollTop;
      this.scrollableElement.scrollTop += delta;
      return previousScroll !== this.scrollableElement.scrollTop;
    }
    /**
     * Scrolls main scrollable element horizontally.
     *
     * @param {number} delta Relative value to scroll.
     * @returns {boolean}
     */

  }, {
    key: "scrollHorizontally",
    value: function scrollHorizontally(delta) {
      var previousScroll = this.scrollableElement.scrollLeft;
      this.scrollableElement.scrollLeft += delta;
      return previousScroll !== this.scrollableElement.scrollLeft;
    }
    /**
     * Synchronize scroll position between master table and overlay table.
     *
     * @private
     */

  }, {
    key: "syncScrollPositions",
    value: function syncScrollPositions() {
      if (this.destroyed) {
        return;
      }

      var rootWindow = this.wot.rootWindow;
      var topHolder = this.topOverlay.clone.wtTable.holder;
      var leftHolder = this.leftOverlay.clone.wtTable.holder;
      var _ref = [this.scrollableElement.scrollLeft, this.scrollableElement.scrollTop],
          scrollLeft = _ref[0],
          scrollTop = _ref[1];
      this.horizontalScrolling = topHolder.scrollLeft !== scrollLeft || this.lastScrollX !== rootWindow.scrollX;
      this.verticalScrolling = leftHolder.scrollTop !== scrollTop || this.lastScrollY !== rootWindow.scrollY;
      this.lastScrollX = rootWindow.scrollX;
      this.lastScrollY = rootWindow.scrollY;

      if (this.horizontalScrolling) {
        topHolder.scrollLeft = scrollLeft;
        var bottomHolder = this.bottomOverlay.needFullRender ? this.bottomOverlay.clone.wtTable.holder : null;

        if (bottomHolder) {
          bottomHolder.scrollLeft = scrollLeft;
        }
      }

      if (this.verticalScrolling) {
        leftHolder.scrollTop = scrollTop;
      }

      this.refreshAll();
    }
    /**
     * Synchronize overlay scrollbars with the master scrollbar.
     */

  }, {
    key: "syncScrollWithMaster",
    value: function syncScrollWithMaster() {
      var master = this.topOverlay.mainTableScrollableElement;
      var scrollLeft = master.scrollLeft,
          scrollTop = master.scrollTop;

      if (this.topOverlay.needFullRender) {
        this.topOverlay.clone.wtTable.holder.scrollLeft = scrollLeft;
      }

      if (this.bottomOverlay.needFullRender) {
        this.bottomOverlay.clone.wtTable.holder.scrollLeft = scrollLeft;
      }

      if (this.leftOverlay.needFullRender) {
        this.leftOverlay.clone.wtTable.holder.scrollTop = scrollTop;
      }
    }
    /**
     * Update the main scrollable elements for all the overlays.
     */

  }, {
    key: "updateMainScrollableElements",
    value: function updateMainScrollableElements() {
      this.deregisterListeners();
      this.leftOverlay.updateMainScrollableElement();
      this.topOverlay.updateMainScrollableElement();

      if (this.bottomOverlay.needFullRender) {
        this.bottomOverlay.updateMainScrollableElement();
      }

      var _this$wot3 = this.wot,
          rootWindow = _this$wot3.rootWindow,
          wtTable = _this$wot3.wtTable;

      if (rootWindow.getComputedStyle(wtTable.wtRootElement.parentNode).getPropertyValue('overflow') === 'hidden') {
        this.scrollableElement = wtTable.holder;
      } else {
        this.scrollableElement = getScrollableElement(wtTable.TABLE);
      }

      this.registerListeners();
    }
    /**
     *
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroy();
      this.topOverlay.destroy();

      if (this.bottomOverlay.clone) {
        this.bottomOverlay.destroy();
      }

      this.leftOverlay.destroy();

      if (this.topLeftCornerOverlay) {
        this.topLeftCornerOverlay.destroy();
      }

      if (this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone) {
        this.bottomLeftCornerOverlay.destroy();
      }

      this.destroyed = true;
    }
    /**
     * @param {boolean} [fastDraw=false] When `true`, try to refresh only the positions of borders without rerendering
     *                                   the data. It will only work if Table.draw() does not force
     *                                   rendering anyway.
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var spreader = this.wot.wtTable.spreader;
      var width = spreader.clientWidth;
      var height = spreader.clientHeight;

      if (width !== this.spreaderLastSize.width || height !== this.spreaderLastSize.height) {
        this.spreaderLastSize.width = width;
        this.spreaderLastSize.height = height;
        this.adjustElementsSize();
      }

      if (this.bottomOverlay.clone) {
        this.bottomOverlay.refresh(fastDraw);
      }

      this.leftOverlay.refresh(fastDraw);
      this.topOverlay.refresh(fastDraw);

      if (this.topLeftCornerOverlay) {
        this.topLeftCornerOverlay.refresh(fastDraw);
      }

      if (this.bottomLeftCornerOverlay && this.bottomLeftCornerOverlay.clone) {
        this.bottomLeftCornerOverlay.refresh(fastDraw);
      }
    }
    /**
     * Adjust overlays elements size and master table size.
     *
     * @param {boolean} [force=false] When `true`, it adjust the DOM nodes sizes for all overlays.
     */

  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$wot4 = this.wot,
          wtViewport = _this$wot4.wtViewport,
          wtTable = _this$wot4.wtTable;
      var totalColumns = this.wot.getSetting('totalColumns');
      var totalRows = this.wot.getSetting('totalRows');
      var headerRowSize = wtViewport.getRowHeaderWidth();
      var headerColumnSize = wtViewport.getColumnHeaderHeight();
      var hiderStyle = wtTable.hider.style;
      hiderStyle.width = "".concat(headerRowSize + this.leftOverlay.sumCellSizes(0, totalColumns), "px");
      hiderStyle.height = "".concat(headerColumnSize + this.topOverlay.sumCellSizes(0, totalRows) + 1, "px");

      if (this.scrollbarSize > 0) {
        var _wtTable$wtRootElemen = wtTable.wtRootElement,
            rootElemScrollHeight = _wtTable$wtRootElemen.scrollHeight,
            rootElemScrollWidth = _wtTable$wtRootElemen.scrollWidth;
        var _wtTable$holder = wtTable.holder,
            holderScrollHeight = _wtTable$holder.scrollHeight,
            holderScrollWidth = _wtTable$holder.scrollWidth;
        this.hasScrollbarRight = rootElemScrollHeight < holderScrollHeight;
        this.hasScrollbarBottom = rootElemScrollWidth < holderScrollWidth;

        if (this.hasScrollbarRight && wtTable.hider.scrollWidth + this.scrollbarSize > rootElemScrollWidth) {
          this.hasScrollbarBottom = true;
        } else if (this.hasScrollbarBottom && wtTable.hider.scrollHeight + this.scrollbarSize > rootElemScrollHeight) {
          this.hasScrollbarRight = true;
        }
      }

      this.topOverlay.adjustElementsSize(force);
      this.leftOverlay.adjustElementsSize(force);
      this.bottomOverlay.adjustElementsSize(force);
    }
    /**
     *
     */

  }, {
    key: "applyToDOM",
    value: function applyToDOM() {
      var wtTable = this.wot.wtTable;

      if (!wtTable.isVisible()) {
        return;
      }

      this.topOverlay.applyToDOM();

      if (this.bottomOverlay.clone) {
        this.bottomOverlay.applyToDOM();
      }

      this.leftOverlay.applyToDOM();
    }
    /**
     * Get the parent overlay of the provided element.
     *
     * @param {HTMLElement} element An element to process.
     * @returns {object|null}
     */

  }, {
    key: "getParentOverlay",
    value: function getParentOverlay(element) {
      if (!element) {
        return null;
      }

      var overlays = [this.topOverlay, this.leftOverlay, this.bottomOverlay, this.topLeftCornerOverlay, this.bottomLeftCornerOverlay];
      var result = null;
      arrayEach(overlays, function (elem) {
        if (!elem) {
          return;
        }

        if (elem.clone && elem.clone.wtTable.TABLE.contains(element)) {
          result = elem.clone;
        }
      });
      return result;
    }
    /**
     * Synchronize the class names between the main overlay table and the tables on the other overlays.
     *
     */

  }, {
    key: "syncOverlayTableClassNames",
    value: function syncOverlayTableClassNames() {
      var masterTable = this.instance.wtTable.TABLE;
      var overlays = [this.topOverlay, this.leftOverlay, this.bottomOverlay, this.topLeftCornerOverlay, this.bottomLeftCornerOverlay];
      arrayEach(overlays, function (elem) {
        if (!elem) {
          return;
        }

        elem.clone.wtTable.TABLE.className = masterTable.className;
      });
    }
  }]);

  return Overlays;
}();

export default Overlays;