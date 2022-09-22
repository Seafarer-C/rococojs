/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../core/2d/src/base/event.ts":
/*!************************************!*\
  !*** ../core/2d/src/base/event.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventCenter": () => (/* binding */ EventCenter)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * 发布订阅，事件中心
 * 应用场景：可以在渲染前后、初始化物体前后、物体状态改变时触发一系列事件
 */
var EventCenter = /*#__PURE__*/function () {
  function EventCenter() {
    _classCallCheck(this, EventCenter);
  }

  _createClass(EventCenter, [{
    key: "on",
    value: function on(eventName, handler) {
      if (!this.__eventListeners) {
        this.__eventListeners = {};
      }

      if (!this.__eventListeners[eventName]) {
        this.__eventListeners[eventName] = [];
      }

      this.__eventListeners[eventName].push(handler);

      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      if (!this.__eventListeners) {
        return this;
      }

      if (arguments.length === 0) {
        // 如果没有参数，就是解绑所有事件
        for (eventName in this.__eventListeners) {
          this._removeEventListener.call(this, eventName);
        }
      } else {
        // 解绑单个事件
        this._removeEventListener.call(this, eventName, handler);
      }

      return this;
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.__eventListeners) {
        return this;
      }

      var listenersForEvent = this.__eventListeners[eventName];

      if (!listenersForEvent) {
        return this;
      }

      for (var i = 0, len = listenersForEvent.length; i < len; i++) {
        listenersForEvent[i] && listenersForEvent[i].call(this, options);
      }

      this.__eventListeners[eventName] = listenersForEvent.filter(function (value) {
        return value !== false;
      });
      return this;
    }
  }, {
    key: "_removeEventListener",
    value: function _removeEventListener(eventName, handler) {
      if (!this.__eventListeners[eventName]) {
        return;
      }

      var eventListener = this.__eventListeners[eventName]; // 注意：这里我们删除监听一般都是置为 null 或者 false
      // 当然也可以用 splice 删除，不过 splice 会改变数组长度，这点要尤为注意

      if (handler) {
        eventListener[eventListener.indexOf(handler)] = false;
      } else {
        eventListener.fill(false);
      }
    }
  }]);

  return EventCenter;
}();

/***/ }),

/***/ "../core/2d/src/base/group.ts":
/*!************************************!*\
  !*** ../core/2d/src/base/group.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Group": () => (/* binding */ Group)
/* harmony export */ });
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape */ "../core/2d/src/base/shape.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../core/2d/src/base/utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



/**
 * 组类，也就是拖蓝框选区域包围的那些物体构成了一个组
 * Group 虽然继承至 Shape，但是要注意获取某些属性有时是没有的
 */

var Group = /*#__PURE__*/function (_Shape) {
  _inherits(Group, _Shape);

  var _super = _createSuper(Group);

  function Group(objects) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Group);

    _this = _super.call(this, options);
    _this.type = "group";
    _this.objects = objects || [];
    _this.originalState = {};

    _this._calcBounds();

    _this._updateObjectsCoords();

    _this.setCoords();

    return _this;
  }
  /** 更新所有物体坐标系 */


  _createClass(Group, [{
    key: "_updateObjectsCoords",
    value: function _updateObjectsCoords() {
      var groupDeltaX = this.left,
          groupDeltaY = this.top;
      this.objects.forEach(function (object) {
        var objectLeft = object.get("left"),
            objectTop = object.get("top");
        object.set("left", objectLeft - groupDeltaX);
        object.set("top", objectTop - groupDeltaY);
        object.setCoords(); // 当有选中组的时候，不显示物体的控制点

        object.orignHasControls = object.hasControls;
        object.hasControls = false;
      });
    }
  }, {
    key: "getObjects",
    value: function getObjects() {
      return this.objects;
    }
    /** 将物体添加到 group 中，并重新计算位置尺寸等 */

  }, {
    key: "addWithUpdate",
    value: function addWithUpdate(object) {
      this._restoreObjectsState();

      this.objects.push(object);

      this._calcBounds();

      this._updateObjectsCoords();

      return this;
    }
    /** 将物体添加到 group 中 */

  }, {
    key: "add",
    value: function add(object) {
      this.objects.push(object);
      return this;
    }
    /** 将物体从 group 中移除 */

  }, {
    key: "remove",
    value: function remove(object) {
      _utils__WEBPACK_IMPORTED_MODULE_1__.Util.removeFromArray(this.objects, object);
      return this;
    }
    /** 将物体从组中移除，并重新计算组的大小位置 */

  }, {
    key: "removeWithUpdate",
    value: function removeWithUpdate(object) {
      this._restoreObjectsState();

      _utils__WEBPACK_IMPORTED_MODULE_1__.Util.removeFromArray(this.objects, object);
      object.setActive(false);

      this._calcBounds();

      this._updateObjectsCoords();

      return this;
    }
    /** 物体是否在 group 中 */

  }, {
    key: "contains",
    value: function contains(object) {
      return this.objects.indexOf(object) > -1;
    }
    /** 获取 group 尺寸 */

  }, {
    key: "size",
    value: function size() {
      return this.getObjects().length;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      ctx.save();
      this.transform(ctx); // let groupScaleFactor = Math.max(this.scaleX, this.scaleY);

      for (var i = 0, len = this.objects.length; i < len; i++) {
        var object = this.objects[i],
            // originalScaleFactor = object.borderScaleFactor,
        originalHasRotatingPoint = object.hasRotatingPoint; // object.borderScaleFactor = groupScaleFactor;

        object.hasRotatingPoint = false;
        object.render(ctx); // object.borderScaleFactor = originalScaleFactor;

        object.hasRotatingPoint = originalHasRotatingPoint;
      }

      if (this.active) {
        // if (!noTransform && this.active) {
        this.drawBorders(ctx);
        this.drawControls(ctx);
      }

      ctx.restore();
      this.setCoords();
    }
    /** 根据 index 获取 group 中的某个物体 */

  }, {
    key: "item",
    value: function item(index) {
      return this.getObjects()[index];
    }
    /** 还原创建 group 之前的状态 */

  }, {
    key: "_restoreObjectsState",
    value: function _restoreObjectsState() {
      this.objects.forEach(this._restoreObjectState, this);
      return this;
    }
    /** 还原 group 中某个物体的初始状态 */

  }, {
    key: "_restoreObjectState",
    value: function _restoreObjectState(object) {
      var groupLeft = this.get("left"),
          groupTop = this.get("top"),
          groupAngle = this.getAngle() * (Math.PI / 180),
          rotatedTop = Math.cos(groupAngle) * object.get("top") + Math.sin(groupAngle) * object.get("left"),
          rotatedLeft = -Math.sin(groupAngle) * object.get("top") + Math.cos(groupAngle) * object.get("left");
      object.setAngle(object.getAngle() + this.getAngle());
      object.set("left", groupLeft + rotatedLeft * this.get("scaleX"));
      object.set("top", groupTop + rotatedTop * this.get("scaleY"));
      object.set("scaleX", object.get("scaleX") * this.get("scaleX"));
      object.set("scaleY", object.get("scaleY") * this.get("scaleY"));
      object.setCoords();
      object.hasControls = object.orignHasControls; // delete object.__origHasControls;

      object.setActive(false);
      object.setCoords();
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this._restoreObjectsState();
    }
    /** 重新设置当前组中所有的物体的边框、控制点、位置和大小等 */

  }, {
    key: "setObjectsCoords",
    value: function setObjectsCoords() {
      this.objects.forEach(function (object) {
        object.setCoords();
      });
      return this;
    }
    /** 激活所有 group 中的物体 */

  }, {
    key: "activateAllObjects",
    value: function activateAllObjects() {
      this.objects.forEach(function (object) {
        object.setActive(true);
      });
      return this;
    }
    /** 计算组的包围盒 */

  }, {
    key: "_calcBounds",
    value: function _calcBounds() {
      var aX = [],
          aY = [],
          minX,
          minY,
          maxX,
          maxY,
          o,
          width,
          height,
          i = 0,
          len = this.objects.length;

      for (; i < len; ++i) {
        o = this.objects[i];
        o.setCoords();

        for (var prop in o.oCoords) {
          aX.push(o.oCoords[prop].x);
          aY.push(o.oCoords[prop].y);
        }
      }

      minX = _utils__WEBPACK_IMPORTED_MODULE_1__.Util.min(aX);
      maxX = _utils__WEBPACK_IMPORTED_MODULE_1__.Util.max(aX);
      minY = _utils__WEBPACK_IMPORTED_MODULE_1__.Util.min(aY);
      maxY = _utils__WEBPACK_IMPORTED_MODULE_1__.Util.max(aY);
      width = maxX - minX || 0;
      height = maxY - minY || 0;
      this.width = width;
      this.height = height;
      this.left = minX + width / 2 || 0;
      this.top = minY + height / 2 || 0;
    }
    /** 检查点是都在 group 中 */

  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      var halfWidth = this.get("width") / 2,
          halfHeight = this.get("height") / 2,
          centerX = this.get("left"),
          centerY = this.get("top");
      return centerX - halfWidth < point.x && centerX + halfWidth > point.x && centerY - halfHeight < point.y && centerY + halfHeight > point.y;
    }
  }, {
    key: "get",
    value: function get(prop) {
      // 组里面有很多元素，所以虽然继承至 Fabric，但是有很多属性读取是无效的，设置同理
      return this[prop];
    }
  }, {
    key: "_set",
    value: function _set(key, value) {
      this[key] = value;
      return this;
    }
  }]);

  return Group;
}(_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);
/** 异步标识，说明这个东西是后面创建的，比如得现有几个物体才能有 Group；类似的还有图片，目前这里没用到 */

Group.async = true;

/***/ }),

/***/ "../core/2d/src/base/intersection.ts":
/*!*******************************************!*\
  !*** ../core/2d/src/base/intersection.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Intersection": () => (/* binding */ Intersection)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "../core/2d/src/base/point.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


/** 检测多边形、线段是否相交的一个类 */

var Intersection = /*#__PURE__*/function () {
  function Intersection(status) {
    _classCallCheck(this, Intersection);

    this.init(status);
  }

  _createClass(Intersection, [{
    key: "init",
    value: function init(status) {
      this.status = status;
      this.points = [];
    }
  }, {
    key: "appendPoint",
    value: function appendPoint(point) {
      this.points.push(point);
    }
  }, {
    key: "appendPoints",
    value: function appendPoints(points) {
      this.points = this.points.concat(points);
    }
    /**
     * 判断两条线段是否想交
     * @param a1 线段1 起点
     * @param a2 线段1 终点
     * @param b1 线段2 起点
     * @param b2 线段3 终点
     */

  }], [{
    key: "intersectLineLine",
    value: function intersectLineLine(a1, a2, b1, b2) {
      // 向量叉乘公式 `a✖️b = (x1, y1)✖️(x2, y2) = x1y2 - x2y1`
      // http://blog.letow.top/2017/11/13/vector-cross-product-cal-intersection/
      var result,
          // b1->b2向量 与 a1->b1向量的向量叉乘
      ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
          // a1->a2向量 与 a1->b1向量的向量叉乘
      ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
          // a1->a2向量 与 b1->b2向量的向量叉乘
      u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

      if (u_b !== 0) {
        var ua = ua_t / u_b,
            ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
          result = new Intersection("Intersection");
          result.points.push(new _point__WEBPACK_IMPORTED_MODULE_0__.Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
        } else {
          result = new Intersection("No Intersection");
        }
      } else {
        // u_b == 0时，角度为0或者180 平行或者共线不属于相交
        if (ua_t === 0 || ub_t === 0) {
          result = new Intersection("Coincident");
        } else {
          result = new Intersection("Parallel");
        }
      }

      return result;
    }
    /**
     * 检测线段和多边形是否相交
     * @param a1 线段起点
     * @param a2 线段终点
     * @param points 多边形顶点
     * @returns
     */

  }, {
    key: "intersectLinePolygon",
    value: function intersectLinePolygon(a1, a2, points) {
      var result = new Intersection("No Intersection"),
          length = points.length;

      for (var i = 0; i < length; i++) {
        var b1 = points[i],
            // 多边形每条边的起点
        b2 = points[(i + 1) % length],
            // 多边形每条边的终点
        inter = Intersection.intersectLineLine(a1, a2, b1, b2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
  }, {
    key: "intersectPolygonPolygon",
    value: function intersectPolygonPolygon(points1, points2) {
      var result = new Intersection("No Intersection"),
          length = points1.length;

      for (var i = 0; i < length; i++) {
        var a1 = points1[i],
            a2 = points1[(i + 1) % length],
            inter = Intersection.intersectLinePolygon(a1, a2, points2);
        result.appendPoints(inter.points);
      }

      if (result.points.length > 0) {
        result.status = "Intersection";
      }

      return result;
    }
    /**
     * 检测物体是否与拖蓝选区相交
     * @param points 物体包围盒的四个顶点的坐标
     * @param r1 拖蓝选区左上角的点
     * @param r2 拖蓝选区右下角的点
     * @returns
     */

  }, {
    key: "intersectPolygonRectangle",
    value: function intersectPolygonRectangle(points, r1, r2) {
      var topLeft = r1.min(r2),
          // 拖蓝选区左上角
      bottomRight = r1.max(r2),
          // 拖蓝选区右下角
      topRight = new _point__WEBPACK_IMPORTED_MODULE_0__.Point(bottomRight.x, topLeft.y),
          // 拖蓝选区右上角
      bottomLeft = new _point__WEBPACK_IMPORTED_MODULE_0__.Point(topLeft.x, bottomRight.y),
          // 拖蓝选区左下角
      // 检测每条边是否与物体相交
      inter1 = Intersection.intersectLinePolygon(topLeft, topRight, points),
          inter2 = Intersection.intersectLinePolygon(topRight, bottomRight, points),
          inter3 = Intersection.intersectLinePolygon(bottomRight, bottomLeft, points),
          inter4 = Intersection.intersectLinePolygon(bottomLeft, topLeft, points),
          result = new Intersection("No Intersection");
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);

      if (result.points.length > 0) {
        // 如果有至少一条边与物体相交
        result.status = "Intersection";
      }

      return result;
    }
  }]);

  return Intersection;
}();

/***/ }),

/***/ "../core/2d/src/base/point.ts":
/*!************************************!*\
  !*** ../core/2d/src/base/point.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }
  /** 返回一个新的点，值为两个点的最小x、y值 */


  _createClass(Point, [{
    key: "min",
    value: function min(otherPoint) {
      return new Point(Math.min(this.x, otherPoint.x), Math.min(this.y, otherPoint.y));
    }
    /** 返回一个新的点，值为两个点的最大x、y值 */

  }, {
    key: "max",
    value: function max(otherPoint) {
      return new Point(Math.max(this.x, otherPoint.x), Math.max(this.y, otherPoint.y));
    }
    /** += 的意思，会改变自身的值 */

  }, {
    key: "addEquals",
    value: function addEquals(point) {
      this.x += point.x;
      this.y += point.y;
      return this;
    }
    /** -= 的意思，会改变自身的值 */

  }, {
    key: "subtractEquals",
    value: function subtractEquals(point) {
      this.x -= point.x;
      this.y -= point.y;
      return this;
    }
  }]);

  return Point;
}();

/***/ }),

/***/ "../core/2d/src/base/shape.ts":
/*!************************************!*\
  !*** ../core/2d/src/base/shape.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "../core/2d/src/base/utils.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "../core/2d/src/base/point.ts");
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intersection */ "../core/2d/src/base/intersection.ts");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ "../core/2d/src/base/event.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





/** 物体基类，有一些共同属性和方法 */

var Shape = /*#__PURE__*/function (_EventCenter) {
  _inherits(Shape, _EventCenter);

  var _super = _createSuper(Shape);

  function Shape(options) {
    var _this;

    _classCallCheck(this, Shape);

    _this = _super.call(this);
    /** 物体类型标识 */

    _this.type = "object";
    /** 是否处于激活态，也就是是否被选中 */

    _this.active = false;
    /** 是否可见 */

    _this.visible = true;
    /** 默认水平变换中心 left | right | center */

    _this.originX = "center";
    /** 默认垂直变换中心 top | bottom | center */

    _this.originY = "center";
    /** 物体位置 top 值 */

    _this.top = 0;
    /** 物体位置 left 值 */

    _this.left = 0;
    /** 物体原始宽度 */

    _this.width = 0;
    /** 物体原始高度 */

    _this.height = 0;
    /** 物体当前的缩放倍数 x */

    _this.scaleX = 1;
    /** 物体当前的缩放倍数 y */

    _this.scaleY = 1;
    /** 物体当前的旋转角度 */

    _this.angle = 0;
    /** 左右镜像，比如反向拉伸控制点 */

    _this.flipX = false;
    /** 上下镜像，比如反向拉伸控制点 */

    _this.flipY = false;
    /** 选中态物体和边框之间的距离 */

    _this.padding = 0;
    /** 物体缩放后的宽度 */

    _this.currentWidth = 0;
    /** 物体缩放后的高度 */

    _this.currentHeight = 0;
    /** 激活态边框颜色 */

    _this.borderColor = "#ba86fe";
    /** 激活态控制点颜色 */

    _this.cornerColor = "#ba86fe";
    /** 物体默认填充颜色 */

    _this.fill = "rgb(0,0,0)";
    /** 物体默认描边宽度 */

    _this.strokeWidth = 1;
    /** 矩阵变换 */
    // public transformMatrix: number[];

    /** 最小缩放值 */
    // public minScaleLimit: number = 0.01;

    /** 是否有控制点 */

    _this.hasControls = true;
    /** 是否有旋转控制点 */

    _this.hasRotatingPoint = true;
    /** 旋转控制点偏移量 */

    _this.rotatingPointOffset = 40;
    /** 移动的时候边框透明度 */

    _this.borderOpacityWhenMoving = 0.4;
    /** 物体是否在移动中 */

    _this.isMoving = false;
    /** 选中态的边框宽度 */

    _this.borderWidth = 1;
    /** 物体控制点用 stroke 还是 fill */

    _this.transparentCorners = false;
    /** 物体控制点大小，单位 px */

    _this.cornerSize = 12;
    /** 通过像素来检测物体而不是通过包围盒 */

    _this.perPixelTargetFind = false;
    /** 物体被拖蓝选区保存的时候需要临时保存下 hasControls 的值 */

    _this.orignHasControls = true;
    _this.stateProperties = ("top left width height scaleX scaleY " + "flipX flipY angle cornerSize fill originX originY " + "stroke strokeWidth " + "borderWidth transformMatrix visible").split(" ");

    _this.initialize(options);

    return _this;
  }

  _createClass(Shape, [{
    key: "initialize",
    value: function initialize(options) {
      options && this.setOptions(options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      for (var prop in options) {
        this[prop] = options[prop];
      }
    }
    /** 渲染物体，默认用 fill 填充 */

  }, {
    key: "render",
    value: function render(ctx) {
      var noTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.width === 0 || this.height === 0 || !this.visible) return;
      ctx.save(); // let m = this.transformMatrix;
      // if (m && !this.group) {
      //     ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      // }

      if (!noTransform) {
        this.transform(ctx);
      }

      if (this.stroke) {
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.stroke;
      }

      if (this.fill) {
        ctx.fillStyle = this.fill;
      } // if (m && this.group) {
      //     ctx.translate(-this.group.width / 2, -this.group.height / 2);
      //     ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      // }
      // 绘制物体


      this._render(ctx);

      if (this.active && !noTransform) {
        // 绘制激活物体边框
        this.drawBorders(ctx); // 绘制激活物体四周的控制点

        this.drawControls(ctx);
      } // 画自身坐标系


      this.drawAxis(ctx);
      ctx.restore();
    }
    /** 由子类实现，就是由具体物体类来实现 */

  }, {
    key: "_render",
    value: function _render(ctx) {}
    /** 绘制前需要进行各种变换（包括平移、旋转、缩放）
     * 注意变换顺序很重要，顺序不一样会导致不一样的结果，所以一个框架一旦定下来了，后面大概率是不能更改的
     * 我们采用的顺序是：平移 -> 旋转 -> 缩放，这样可以减少些计算量，如果我们先旋转，点的坐标值一般就不是整数，那么后面的变换基于非整数来计算
     */

  }, {
    key: "transform",
    value: function transform(ctx) {
      var center = this.getCenterPoint();
      ctx.translate(center.x, center.y);
      ctx.rotate(_utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle));
      ctx.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1); // 设置新数据

      this.width *= this.scaleX;
      this.height *= this.scaleY;
      this.scaleX = 1;
      this.scaleY = 1;
      this.left = center.x;
      this.top = center.y; // const m = Util.composeMatrix({
      //     angle: this.angle,
      //     translateX: center.x,
      //     translateY: center.y,
      //     scaleX: this.scaleX,
      //     scaleY: this.scaleY,
      //     flipX: this.flipX,
      //     flipY: this.flipY,
      // });
      // ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      // const radian = Util.degreesToRadians(this.angle);
      // const cos = Math.cos(radian);
      // const sin = Math.sin(radian);
      // const m = [cos * this.scaleX, sin * this.scaleX, -sin * this.scaleY, cos * this.scaleY, center.x, center.y];
    }
    /** 绘制激活物体边框 */

  }, {
    key: "drawBorders",
    value: function drawBorders(ctx) {
      var padding = this.padding,
          padding2 = padding * 2,
          strokeWidth = this.borderWidth;
      ctx.save();
      ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = strokeWidth;
      /** 画边框的时候需要把 transform 变换中的 scale 效果抵消，这样才能画出原始大小的线条 */
      // ctx.scale(1 / this.scaleX, 1 / this.scaleY);

      var w = this.getWidth(),
          h = this.getHeight(); // 画物体激活时候的边框，也就是包围盒，~~就是取整的意思

      ctx.strokeRect(-(w / 2) - padding - strokeWidth / 2, -(h / 2) - padding - strokeWidth / 2, w + padding2 + strokeWidth, h + padding2 + strokeWidth); // 画旋转控制点的那条线

      if (this.hasRotatingPoint && this.hasControls) {
        var rotateHeight = (-h - strokeWidth - padding * 2) / 2;
        ctx.beginPath();
        ctx.moveTo(0, rotateHeight);
        ctx.lineTo(0, rotateHeight - this.rotatingPointOffset);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
      return this;
    }
    /** 绘制包围盒模型的控制点 */

  }, {
    key: "drawControls",
    value: function drawControls(ctx) {
      if (!this.hasControls) return; // 因为画布已经经过变换，所以大部分数值需要除以 scale 来抵消变换

      var size = this.cornerSize,
          size2 = size / 2,
          strokeWidth2 = this.strokeWidth / 2,
          // top 和 left 值为物体左上角的点
      left = -(this.width / 2),
          top = -(this.height / 2),
          _left,
          _top,
          sizeX = size / this.scaleX,
          sizeY = size / this.scaleY,
          paddingX = this.padding / this.scaleX,
          paddingY = this.padding / this.scaleY,
          scaleOffsetY = size2 / this.scaleY,
          scaleOffsetX = size2 / this.scaleX,
          scaleOffsetSizeX = (size2 - size) / this.scaleX,
          scaleOffsetSizeY = (size2 - size) / this.scaleY,
          height = this.height,
          width = this.width,
          // 控制点是实心还是空心
      methodName = this.transparentCorners ? "strokeRect" : "fillRect";

      ctx.save();
      ctx.lineWidth = this.borderWidth / Math.max(this.scaleX, this.scaleY);
      ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
      ctx.strokeStyle = ctx.fillStyle = this.cornerColor; // top-left

      _left = left - scaleOffsetX - strokeWidth2 - paddingX;
      _top = top - scaleOffsetY - strokeWidth2 - paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // top-right

      _left = left + width - scaleOffsetX + strokeWidth2 + paddingX;
      _top = top - scaleOffsetY - strokeWidth2 - paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // bottom-left

      _left = left - scaleOffsetX - strokeWidth2 - paddingX;
      _top = top + height + scaleOffsetSizeY + strokeWidth2 + paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // bottom-right

      _left = left + width + scaleOffsetSizeX + strokeWidth2 + paddingX;
      _top = top + height + scaleOffsetSizeY + strokeWidth2 + paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // middle-top

      _left = left + width / 2 - scaleOffsetX;
      _top = top - scaleOffsetY - strokeWidth2 - paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // middle-bottom

      _left = left + width / 2 - scaleOffsetX;
      _top = top + height + scaleOffsetSizeY + strokeWidth2 + paddingY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // middle-right

      _left = left + width + scaleOffsetSizeX + strokeWidth2 + paddingX;
      _top = top + height / 2 - scaleOffsetY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // middle-left

      _left = left - scaleOffsetX - strokeWidth2 - paddingX;
      _top = top + height / 2 - scaleOffsetY;
      ctx.clearRect(_left, _top, sizeX, sizeY);
      ctx[methodName](_left, _top, sizeX, sizeY); // 绘制旋转控制点

      if (this.hasRotatingPoint) {
        _left = left + width / 2 - scaleOffsetX;
        _top = top - this.rotatingPointOffset / this.scaleY - sizeY / 2 - strokeWidth2 - paddingY;
        ctx.clearRect(_left, _top, sizeX, sizeY);
        ctx[methodName](_left, _top, sizeX, sizeY);
      }

      ctx.restore();
      return this;
    }
  }, {
    key: "drawAxis",
    value: function drawAxis(ctx) {
      ctx.save();
      var lengthRatio = 1.5;
      ctx.lineWidth = this.borderWidth;
      ctx.setLineDash([4 * lengthRatio, 3 * lengthRatio]);
      /** 画坐标轴的时候需要把 transform 变换中的 scale 效果抵消，这样才能画出原始大小的线条 */

      ctx.scale(1 / this.scaleX, 1 / this.scaleY);
      ctx.restore();
    }
  }, {
    key: "setupState",
    value: function setupState() {
      this.originalState = {};
      this.saveState();
    }
    /** 保存物体当前的状态到 originalState 中 */

  }, {
    key: "saveState",
    value: function saveState() {
      var _this2 = this;

      this.stateProperties.forEach(function (prop) {
        _this2.originalState[prop] = _this2[prop];
      });
      return this;
    }
    /** 获取物体中心点 */

  }, {
    key: "getCenterPoint",
    value: function getCenterPoint() {
      return this.translateToCenterPoint(new _point__WEBPACK_IMPORTED_MODULE_1__.Point(this.left, this.top), this.originX, this.originY);
    }
    /** 将中心点移到变换基点 */

  }, {
    key: "translateToCenterPoint",
    value: function translateToCenterPoint(point, originX, originY) {
      var cx = point.x,
          cy = point.y;

      if (originX === "left") {
        cx = point.x + this.getWidth() / 2;
      } else if (originX === "right") {
        cx = point.x - this.getWidth() / 2;
      }

      if (originY === "top") {
        cy = point.y + this.getHeight() / 2;
      } else if (originY === "bottom") {
        cy = point.y - this.getHeight() / 2;
      }

      var p = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(cx, cy);

      if (this.angle) {
        return _utils__WEBPACK_IMPORTED_MODULE_0__.Util.rotatePoint(p, point, _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle));
      } else {
        return p;
      }
    }
    /**
     * 平移坐标系到中心点
     * @param center
     * @param {string} originX  left | center | right
     * @param {string} originY  top | center | bottom
     * @returns
     */

  }, {
    key: "translateToOriginPoint",
    value: function translateToOriginPoint(center, originX, originY) {
      var x = center.x,
          y = center.y; // Get the point coordinates

      if (originX === "left") {
        x = center.x - this.getWidth() / 2;
      } else if (originX === "right") {
        x = center.x + this.getWidth() / 2;
      }

      if (originY === "top") {
        y = center.y - this.getHeight() / 2;
      } else if (originY === "bottom") {
        y = center.y + this.getHeight() / 2;
      } // Apply the rotation to the point (it's already scaled properly)


      return _utils__WEBPACK_IMPORTED_MODULE_0__.Util.rotatePoint(new _point__WEBPACK_IMPORTED_MODULE_1__.Point(x, y), center, _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle));
    }
    /** 转换成本地坐标 */

  }, {
    key: "toLocalPoint",
    value: function toLocalPoint(point, originX, originY) {
      var center = this.getCenterPoint();
      var x, y;

      if (originX !== undefined && originY !== undefined) {
        if (originX === "left") {
          x = center.x - this.getWidth() / 2;
        } else if (originX === "right") {
          x = center.x + this.getWidth() / 2;
        } else {
          x = center.x;
        }

        if (originY === "top") {
          y = center.y - this.getHeight() / 2;
        } else if (originY === "bottom") {
          y = center.y + this.getHeight() / 2;
        } else {
          y = center.y;
        }
      } else {
        x = this.left;
        y = this.top;
      }

      return _utils__WEBPACK_IMPORTED_MODULE_0__.Util.rotatePoint(new _point__WEBPACK_IMPORTED_MODULE_1__.Point(point.x, point.y), center, -_utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle)).subtractEquals(new _point__WEBPACK_IMPORTED_MODULE_1__.Point(x, y));
    }
    /** 检测哪个控制点被点击了 */

  }, {
    key: "_findTargetCorner",
    value: function _findTargetCorner(e) {
      if (!this.hasControls || !this.active) return false;
      var pointer = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, this.canvas.topCanvas, this.canvas),
          ex = pointer.x,
          ey = pointer.y,
          xpoints,
          lines;

      for (var i in this.oCoords) {
        if (i === "mtr" && !this.hasRotatingPoint) {
          continue;
        }

        lines = this._getImageLines(this.oCoords[i].corner);
        xpoints = this._findCrossPoints(ex, ey, lines);

        if (xpoints % 2 === 1 && xpoints !== 0) {
          return i;
        }
      }

      return false;
    }
    /** 获取包围盒的四条边 */

  }, {
    key: "_getImageLines",
    value: function _getImageLines(corner) {
      return {
        topline: {
          o: corner.tl,
          d: corner.tr
        },
        rightline: {
          o: corner.tr,
          d: corner.br
        },
        bottomline: {
          o: corner.br,
          d: corner.bl
        },
        leftline: {
          o: corner.bl,
          d: corner.tl
        }
      };
    }
    /**
     * 射线检测法：以鼠标坐标点为参照，水平向右做一条射线，求坐标点与多条边的交点个数
     * 如果和物体相交的个数为偶数点则点在物体外部；如果为奇数点则点在内部
     * 不过 fabric 的点选多边形都是用于包围盒，也就是矩形，所以该方法是专门针对矩形的，并且针对矩形做了一些优化
     */

  }, {
    key: "_findCrossPoints",
    value: function _findCrossPoints(ex, ey, lines) {
      var b1,
          // 射线的斜率
      b2,
          // 边的斜率
      a1,
          a2,
          xi,
          // 射线与边的交点
      // yi, // 射线与边的交点
      xcount = 0,
          iLine; // 当前边
      // 遍历包围盒的四条边

      for (var lineKey in lines) {
        iLine = lines[lineKey]; // 优化1：如果边的两个端点的 y 值都小于鼠标点的 y 值，则跳过

        if (iLine.o.y < ey && iLine.d.y < ey) continue; // 优化2：如果边的两个端点的 y 值都大于鼠标点的 y 值，则跳过

        if (iLine.o.y >= ey && iLine.d.y >= ey) continue; // 优化3：如果边是一条垂线

        if (iLine.o.x === iLine.d.x && iLine.o.x >= ex) {
          xi = iLine.o.x; // yi = ey;
        } else {
          // 简单计算下射线与边的交点，看式子容易晕，建议自己手动算一下
          b1 = 0;
          b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
          a1 = ey - b1 * ex;
          a2 = iLine.o.y - b2 * iLine.o.x;
          xi = -(a1 - a2) / (b1 - b2); // yi = a1 + b1 * xi;
        } // 只需要计数 xi >= ex 的情况


        if (xi >= ex) {
          xcount += 1;
        } // 优化4：因为 fabric 中的多边形只需要用到矩形，所以根据矩形的特质，顶多只有两个交点，所以我们可以提前结束循环


        if (xcount === 2) {
          break;
        }
      }

      return xcount;
    }
    /** 物体动画 */

  }, {
    key: "animate",
    value: function animate(props, animateOptions) {
      var _this3 = this;

      var propsToAnimate = [];

      for (var prop in props) {
        propsToAnimate.push(prop);
      }

      var len = propsToAnimate.length;
      propsToAnimate.forEach(function (prop, i) {
        var skipCallbacks = i !== len - 1;

        _this3._animate(prop, props[prop], animateOptions, skipCallbacks);
      });
      return this;
    }
    /**
     * 让物体真正动起来
     * @param property 物体需要动画的属性
     * @param to 物体属性的最终值
     * @param options 一些动画选项
     * @param skipCallbacks 是否跳过绘制
     */

  }, {
    key: "_animate",
    value: function _animate(property, to) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var skipCallbacks = arguments.length > 3 ? arguments[3] : undefined;
      options = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.clone(options);
      var currentValue = this.get(property);
      if (!options.from) options.from = currentValue;
      to = to.toString();

      if (~to.indexOf("=")) {
        to = currentValue + parseFloat(to.replace("=", ""));
      } else {
        to = parseFloat(to);
      }

      _utils__WEBPACK_IMPORTED_MODULE_0__.Util.animate({
        startValue: options.from,
        endValue: to,
        byValue: options.by,
        easing: options.easing,
        duration: options.duration,
        abort: options.abort && function () {
          return options.abort.call(_this4);
        },
        onChange: function onChange(value) {
          _this4.set(property, value);

          if (skipCallbacks) {
            return;
          }

          options.onChange && options.onChange();
        },
        onComplete: function onComplete() {
          if (skipCallbacks) {
            return;
          }

          _this4.setCoords();

          options.onComplete && options.onComplete();
        }
      });
    }
  }, {
    key: "setActive",
    value: function setActive() {
      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.active = !!active;
      return this;
    }
    /**
     * 根据物体的 origin 来设置物体的位置
     * @method setPositionByOrigin
     * @param {Point} pos
     * @param {string} originX left | center | right
     * @param {string} originY top | center | bottom
     */

  }, {
    key: "setPositionByOrigin",
    value: function setPositionByOrigin(pos, originX, originY) {
      var center = this.translateToCenterPoint(pos, originX, originY);
      var position = this.translateToOriginPoint(center, this.originX, this.originY); // console.log(`更新缩放的物体位置:[${position.x}，${position.y}]`);

      this.set("left", position.x);
      this.set("top", position.y);
    }
    /**
     * @param to left, center, right 中的一个
     */

  }, {
    key: "adjustPosition",
    value: function adjustPosition(to) {
      var angle = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle);
      var hypotHalf = this.getWidth() / 2;
      var xHalf = Math.cos(angle) * hypotHalf;
      var yHalf = Math.sin(angle) * hypotHalf;
      var hypotFull = this.getWidth();
      var xFull = Math.cos(angle) * hypotFull;
      var yFull = Math.sin(angle) * hypotFull;

      if (this.originX === "center" && to === "left" || this.originX === "right" && to === "center") {
        // move half left
        this.left -= xHalf;
        this.top -= yHalf;
      } else if (this.originX === "left" && to === "center" || this.originX === "center" && to === "right") {
        // move half right
        this.left += xHalf;
        this.top += yHalf;
      } else if (this.originX === "left" && to === "right") {
        // move full right
        this.left += xFull;
        this.top += yFull;
      } else if (this.originX === "right" && to === "left") {
        // move full left
        this.left -= xFull;
        this.top -= yFull;
      }

      this.setCoords();
      this.originX = to;
    }
  }, {
    key: "hasStateChanged",
    value: function hasStateChanged() {
      return this.stateProperties.some(function (prop) {
        return this[prop] !== this.originalState[prop];
      }, this);
    }
    /**
     * 物体与框选区域是否相交，用框选区域的四条边分别与物体的四条边求交
     * @param {Point} selectionTL 拖蓝框选区域左上角的点
     * @param {Point} selectionBR 拖蓝框选区域右下角的点
     * @returns {boolean}
     */

  }, {
    key: "intersectsWithRect",
    value: function intersectsWithRect(selectionTL, selectionBR) {
      var oCoords = this.oCoords,
          tl = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.tl.x, oCoords.tl.y),
          tr = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.tr.x, oCoords.tr.y),
          bl = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.bl.x, oCoords.bl.y),
          br = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.br.x, oCoords.br.y);
      var intersection = _intersection__WEBPACK_IMPORTED_MODULE_2__.Intersection.intersectPolygonRectangle([tl, tr, br, bl], selectionTL, selectionBR);
      return intersection.status === "Intersection";
    } // isContainedWithinObject(other) {
    //     return this.isContainedWithinRect(other.oCoords.tl, other.oCoords.br);
    // }

    /**
     * 物体是否被框选区域包含
     * @param {Point} selectionTL 拖蓝框选区域左上角的点
     * @param {Point} selectionBR 拖蓝框选区域右下角的点
     * @returns {boolean}
     */

  }, {
    key: "isContainedWithinRect",
    value: function isContainedWithinRect(selectionTL, selectionBR) {
      var oCoords = this.oCoords,
          tl = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.tl.x, oCoords.tl.y),
          tr = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.tr.x, oCoords.tr.y),
          bl = new _point__WEBPACK_IMPORTED_MODULE_1__.Point(oCoords.bl.x, oCoords.bl.y);
      return tl.x > selectionTL.x && tr.x < selectionBR.x && tl.y > selectionTL.y && bl.y < selectionBR.y;
    }
    /** 确保缩放值有效，有意义 */
    // _constrainScale(value: number): number {
    //     if (Math.abs(value) < this.minScaleLimit) {
    //         if (value < 0) {
    //             return -this.minScaleLimit;
    //         } else {
    //             return this.minScaleLimit;
    //         }
    //     }
    //     return value;
    // }

  }, {
    key: "getViewportTransform",
    value: function getViewportTransform() {
      if (this.canvas && this.canvas.viewportTransform) {
        return this.canvas.viewportTransform;
      }

      return [1, 0, 0, 1, 0, 0];
    }
  }, {
    key: "_calculateCurrentDimensions",
    value: function _calculateCurrentDimensions() {
      var vpt = this.getViewportTransform(),
          dim = this._getTransformedDimensions(),
          w = dim.x,
          h = dim.y;

      w += 2 * this.padding;
      h += 2 * this.padding;
      return _utils__WEBPACK_IMPORTED_MODULE_0__.Util.transformPoint(new _point__WEBPACK_IMPORTED_MODULE_1__.Point(w, h), vpt, true);
    }
    /** 获取物体没有变换时的大小，包括 strokeWidth 的 1px */

  }, {
    key: "_getNonTransformedDimensions",
    value: function _getNonTransformedDimensions() {
      var strokeWidth = this.strokeWidth,
          w = this.width,
          h = this.height,
          addStrokeToW = true,
          addStrokeToH = true;

      if (addStrokeToH) {
        h += h < 0 ? -strokeWidth : strokeWidth;
      }

      if (addStrokeToW) {
        w += w < 0 ? -strokeWidth : strokeWidth;
      }

      return {
        x: w,
        y: h
      };
    }
  }, {
    key: "_getTransformedDimensions",
    value: function _getTransformedDimensions() {
      var skewX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var skewY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // if (typeof skewX === 'undefined') {
      //     skewX = this.skewX;
      // }
      // if (typeof skewY === 'undefined') {
      //     skewY = this.skewY;
      // }
      var dimensions = this._getNonTransformedDimensions(),
          dimX = dimensions.x / 2,
          dimY = dimensions.y / 2,
          points = [{
        x: -dimX,
        y: -dimY
      }, {
        x: dimX,
        y: -dimY
      }, {
        x: -dimX,
        y: dimY
      }, {
        x: dimX,
        y: dimY
      }],
          i,
          transformMatrix = this._calcDimensionsTransformMatrix(skewX, skewY, false),
          bbox;

      for (i = 0; i < points.length; i++) {
        points[i] = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.transformPoint(points[i], transformMatrix);
      }

      bbox = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.makeBoundingBoxFromPoints(points);
      return {
        x: bbox.width,
        y: bbox.height
      };
    }
  }, {
    key: "_calcDimensionsTransformMatrix",
    value: function _calcDimensionsTransformMatrix(skewX, skewY, flipping) {
      var skewMatrixX = [1, 0, Math.tan(_utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(skewX)), 1],
          skewMatrixY = [1, Math.tan(_utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(skewY)), 0, 1],
          scaleX = this.scaleX,
          scaleY = this.scaleY,
          scaleMatrix = [scaleX, 0, 0, scaleY],
          m = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.multiplyTransformMatrices(scaleMatrix, skewMatrixX, true);
      return _utils__WEBPACK_IMPORTED_MODULE_0__.Util.multiplyTransformMatrices(m, skewMatrixY, true);
    } // setCoords() {
    //     let theta = Util.degreesToRadians(this.angle),
    //         vpt = this.getViewportTransform(),
    //         dim = this._calculateCurrentDimensions(),
    //         currentWidth = dim.x,
    //         currentHeight = dim.y;
    //     // If width is negative, make postive. Fixes path selection issue
    //     // if (currentWidth < 0) {
    //     //     currentWidth = Math.abs(currentWidth);
    //     // }
    //     let sinTh = Math.sin(theta),
    //         cosTh = Math.cos(theta),
    //         _angle = currentWidth > 0 ? Math.atan(currentHeight / currentWidth) : 0,
    //         _hypotenuse = currentWidth / Math.cos(_angle) / 2,
    //         offsetX = Math.cos(_angle + theta) * _hypotenuse,
    //         offsetY = Math.sin(_angle + theta) * _hypotenuse,
    //         // offset added for rotate and scale actions
    //         coords = Util.transformPoint(this.getCenterPoint(), vpt),
    //         tl = new Point(coords.x - offsetX, coords.y - offsetY),
    //         tr = new Point(tl.x + currentWidth * cosTh, tl.y + currentWidth * sinTh),
    //         bl = new Point(tl.x - currentHeight * sinTh, tl.y + currentHeight * cosTh),
    //         br = new Point(coords.x + offsetX, coords.y + offsetY),
    //         ml = new Point((tl.x + bl.x) / 2, (tl.y + bl.y) / 2),
    //         mt = new Point((tr.x + tl.x) / 2, (tr.y + tl.y) / 2),
    //         mr = new Point((br.x + tr.x) / 2, (br.y + tr.y) / 2),
    //         mb = new Point((br.x + bl.x) / 2, (br.y + bl.y) / 2),
    //         mtr = new Point(mt.x + sinTh * this.rotatingPointOffset, mt.y - cosTh * this.rotatingPointOffset);
    //     console.log(sinTh, cosTh, mt, mtr);
    //     // let mtr = {
    //     //             x: tl.x + (this.currentWidth / 2) * cosTh,
    //     //             y: tl.y + (this.currentWidth / 2) * sinTh,
    //     //         };
    //     // debugging
    //     /* setTimeout(function() {
    //        canvas.contextTop.fillStyle = 'green';
    //        canvas.contextTop.fillRect(mb.x, mb.y, 3, 3);
    //        canvas.contextTop.fillRect(bl.x, bl.y, 3, 3);
    //        canvas.contextTop.fillRect(br.x, br.y, 3, 3);
    //        canvas.contextTop.fillRect(tl.x, tl.y, 3, 3);
    //        canvas.contextTop.fillRect(tr.x, tr.y, 3, 3);
    //        canvas.contextTop.fillRect(ml.x, ml.y, 3, 3);
    //        canvas.contextTop.fillRect(mr.x, mr.y, 3, 3);
    //        canvas.contextTop.fillRect(mt.x, mt.y, 3, 3);
    //        canvas.contextTop.fillRect(mtr.x, mtr.y, 3, 3);
    //      }, 50); */
    //     this.oCoords = {
    //         // corners
    //         tl,
    //         tr,
    //         br,
    //         bl,
    //         // middle
    //         ml,
    //         mt,
    //         mr,
    //         mb,
    //         // rotating point
    //         mtr,
    //     };
    //     // set coordinates of the draggable boxes in the corners used to scale/rotate the image
    //     this._setCornerCoords && this._setCornerCoords();
    //     return this;
    // }

    /** 重新设置物体包围盒的边框和各个控制点，包括位置和大小 */

  }, {
    key: "setCoords",
    value: function setCoords() {
      var strokeWidth = this.strokeWidth > 1 ? this.strokeWidth : 0,
          padding = this.padding,
          radian = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle);
      this.currentWidth = (this.width + strokeWidth) * this.scaleX + padding * 2;
      this.currentHeight = (this.height + strokeWidth) * this.scaleY + padding * 2; // If width is negative, make postive. Fixes path selection issue
      // if (this.currentWidth < 0) {
      //     this.currentWidth = Math.abs(this.currentWidth);
      // }
      // 物体中心点到顶点的斜边长度

      var _hypotenuse = Math.sqrt(Math.pow(this.currentWidth / 2, 2) + Math.pow(this.currentHeight / 2, 2));

      var _angle = Math.atan(this.currentHeight / this.currentWidth); // let _angle = Math.atan2(this.currentHeight, this.currentWidth);
      // offset added for rotate and scale actions


      var offsetX = Math.cos(_angle + radian) * _hypotenuse,
          offsetY = Math.sin(_angle + radian) * _hypotenuse,
          sinTh = Math.sin(radian),
          cosTh = Math.cos(radian);

      var coords = this.getCenterPoint();
      var tl = {
        x: coords.x - offsetX,
        y: coords.y - offsetY
      };
      var tr = {
        x: tl.x + this.currentWidth * cosTh,
        y: tl.y + this.currentWidth * sinTh
      };
      var br = {
        x: tr.x - this.currentHeight * sinTh,
        y: tr.y + this.currentHeight * cosTh
      };
      var bl = {
        x: tl.x - this.currentHeight * sinTh,
        y: tl.y + this.currentHeight * cosTh
      };
      var ml = {
        x: tl.x - this.currentHeight / 2 * sinTh,
        y: tl.y + this.currentHeight / 2 * cosTh
      };
      var mt = {
        x: tl.x + this.currentWidth / 2 * cosTh,
        y: tl.y + this.currentWidth / 2 * sinTh
      };
      var mr = {
        x: tr.x - this.currentHeight / 2 * sinTh,
        y: tr.y + this.currentHeight / 2 * cosTh
      };
      var mb = {
        x: bl.x + this.currentWidth / 2 * cosTh,
        y: bl.y + this.currentWidth / 2 * sinTh
      };
      var mtr = {
        x: tl.x + this.currentWidth / 2 * cosTh,
        y: tl.y + this.currentWidth / 2 * sinTh
      }; // clockwise

      this.oCoords = {
        tl: tl,
        tr: tr,
        br: br,
        bl: bl,
        ml: ml,
        mt: mt,
        mr: mr,
        mb: mb,
        mtr: mtr
      }; // set coordinates of the draggable boxes in the corners used to scale/rotate the image

      this._setCornerCoords();

      return this;
    }
    /** 重新设置物体的每个控制点，包括位置和大小 */

  }, {
    key: "_setCornerCoords",
    value: function _setCornerCoords() {
      var coords = this.oCoords,
          radian = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(this.angle),
          newTheta = _utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(45 - this.angle),
          cornerHypotenuse = Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2,
          cosHalfOffset = cornerHypotenuse * Math.cos(newTheta),
          sinHalfOffset = cornerHypotenuse * Math.sin(newTheta),
          sinTh = Math.sin(radian),
          cosTh = Math.cos(radian);
      coords.tl.corner = {
        tl: {
          x: coords.tl.x - sinHalfOffset,
          y: coords.tl.y - cosHalfOffset
        },
        tr: {
          x: coords.tl.x + cosHalfOffset,
          y: coords.tl.y - sinHalfOffset
        },
        bl: {
          x: coords.tl.x - cosHalfOffset,
          y: coords.tl.y + sinHalfOffset
        },
        br: {
          x: coords.tl.x + sinHalfOffset,
          y: coords.tl.y + cosHalfOffset
        }
      };
      coords.tr.corner = {
        tl: {
          x: coords.tr.x - sinHalfOffset,
          y: coords.tr.y - cosHalfOffset
        },
        tr: {
          x: coords.tr.x + cosHalfOffset,
          y: coords.tr.y - sinHalfOffset
        },
        br: {
          x: coords.tr.x + sinHalfOffset,
          y: coords.tr.y + cosHalfOffset
        },
        bl: {
          x: coords.tr.x - cosHalfOffset,
          y: coords.tr.y + sinHalfOffset
        }
      };
      coords.bl.corner = {
        tl: {
          x: coords.bl.x - sinHalfOffset,
          y: coords.bl.y - cosHalfOffset
        },
        bl: {
          x: coords.bl.x - cosHalfOffset,
          y: coords.bl.y + sinHalfOffset
        },
        br: {
          x: coords.bl.x + sinHalfOffset,
          y: coords.bl.y + cosHalfOffset
        },
        tr: {
          x: coords.bl.x + cosHalfOffset,
          y: coords.bl.y - sinHalfOffset
        }
      };
      coords.br.corner = {
        tr: {
          x: coords.br.x + cosHalfOffset,
          y: coords.br.y - sinHalfOffset
        },
        bl: {
          x: coords.br.x - cosHalfOffset,
          y: coords.br.y + sinHalfOffset
        },
        br: {
          x: coords.br.x + sinHalfOffset,
          y: coords.br.y + cosHalfOffset
        },
        tl: {
          x: coords.br.x - sinHalfOffset,
          y: coords.br.y - cosHalfOffset
        }
      };
      coords.ml.corner = {
        tl: {
          x: coords.ml.x - sinHalfOffset,
          y: coords.ml.y - cosHalfOffset
        },
        tr: {
          x: coords.ml.x + cosHalfOffset,
          y: coords.ml.y - sinHalfOffset
        },
        bl: {
          x: coords.ml.x - cosHalfOffset,
          y: coords.ml.y + sinHalfOffset
        },
        br: {
          x: coords.ml.x + sinHalfOffset,
          y: coords.ml.y + cosHalfOffset
        }
      };
      coords.mt.corner = {
        tl: {
          x: coords.mt.x - sinHalfOffset,
          y: coords.mt.y - cosHalfOffset
        },
        tr: {
          x: coords.mt.x + cosHalfOffset,
          y: coords.mt.y - sinHalfOffset
        },
        bl: {
          x: coords.mt.x - cosHalfOffset,
          y: coords.mt.y + sinHalfOffset
        },
        br: {
          x: coords.mt.x + sinHalfOffset,
          y: coords.mt.y + cosHalfOffset
        }
      };
      coords.mr.corner = {
        tl: {
          x: coords.mr.x - sinHalfOffset,
          y: coords.mr.y - cosHalfOffset
        },
        tr: {
          x: coords.mr.x + cosHalfOffset,
          y: coords.mr.y - sinHalfOffset
        },
        bl: {
          x: coords.mr.x - cosHalfOffset,
          y: coords.mr.y + sinHalfOffset
        },
        br: {
          x: coords.mr.x + sinHalfOffset,
          y: coords.mr.y + cosHalfOffset
        }
      };
      coords.mb.corner = {
        tl: {
          x: coords.mb.x - sinHalfOffset,
          y: coords.mb.y - cosHalfOffset
        },
        tr: {
          x: coords.mb.x + cosHalfOffset,
          y: coords.mb.y - sinHalfOffset
        },
        bl: {
          x: coords.mb.x - cosHalfOffset,
          y: coords.mb.y + sinHalfOffset
        },
        br: {
          x: coords.mb.x + sinHalfOffset,
          y: coords.mb.y + cosHalfOffset
        }
      };
      coords.mtr.corner = {
        tl: {
          x: coords.mtr.x - sinHalfOffset + sinTh * this.rotatingPointOffset,
          y: coords.mtr.y - cosHalfOffset - cosTh * this.rotatingPointOffset
        },
        tr: {
          x: coords.mtr.x + cosHalfOffset + sinTh * this.rotatingPointOffset,
          y: coords.mtr.y - sinHalfOffset - cosTh * this.rotatingPointOffset
        },
        bl: {
          x: coords.mtr.x - cosHalfOffset + sinTh * this.rotatingPointOffset,
          y: coords.mtr.y + sinHalfOffset - cosTh * this.rotatingPointOffset
        },
        br: {
          x: coords.mtr.x + sinHalfOffset + sinTh * this.rotatingPointOffset,
          y: coords.mtr.y + cosHalfOffset - cosTh * this.rotatingPointOffset
        }
      };
    }
    /**
     * 转成基础标准对象，方便序列化
     * @param propertiesToInclude 你可能需要添加一些额外的自定义属性
     * @returns 标准对象
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var propertiesToInclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // 保存时的数字精度
      var NUM_FRACTION_DIGITS = 2;
      var object = {
        type: this.type,
        originX: this.originX,
        originY: this.originY,
        left: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.left, NUM_FRACTION_DIGITS),
        top: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.top, NUM_FRACTION_DIGITS),
        width: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.width, NUM_FRACTION_DIGITS),
        height: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.height, NUM_FRACTION_DIGITS),
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        scaleX: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.scaleX, NUM_FRACTION_DIGITS),
        scaleY: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.scaleY, NUM_FRACTION_DIGITS),
        angle: _utils__WEBPACK_IMPORTED_MODULE_0__.Util.toFixed(this.getAngle(), NUM_FRACTION_DIGITS),
        flipX: this.flipX,
        flipY: this.flipY,
        hasControls: this.hasControls,
        hasRotatingPoint: this.hasRotatingPoint,
        transparentCorners: this.transparentCorners,
        perPixelTargetFind: this.perPixelTargetFind,
        visible: this.visible
      };
      _utils__WEBPACK_IMPORTED_MODULE_0__.Util.populateWithProperties(this, object, propertiesToInclude);
      return object;
    }
  }, {
    key: "toSvg",
    value: function toSvg() {
      var markup = [];

      var objSvg = this._toSVG();

      markup.push("<g ", this.getSvgTransform(), " >\n");
      markup.push(objSvg.join(""));
      markup.push("</g>\n");
      return markup.join("");
    }
    /** 由子类具体实现 */

  }, {
    key: "_toSVG",
    value: function _toSVG() {
      return [];
    }
  }, {
    key: "getSvgTransform",
    value: function getSvgTransform() {
      var transform = this.calcOwnMatrix(),
          svgTransform = 'transform="' + _utils__WEBPACK_IMPORTED_MODULE_0__.Util.matrixToSVG(transform);
      return svgTransform + '" ';
    }
  }, {
    key: "calcOwnMatrix",
    value: function calcOwnMatrix() {}
  }, {
    key: "get",
    value: function get(key) {
      return this[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      // if (typeof value === 'function') value = value(this.get(key));
      // if (key === 'scaleX' || key === 'scaleY') {
      //     value = this._constrainScale(value);
      // }
      // if (key === 'width' || key === 'height') {
      //     this.minScaleLimit = Util.toFixed(Math.min(0.1, 1 / Math.max(this.width, this.height)), 2);
      // }
      if (key === "scaleX" && value < 0) {
        this.flipX = !this.flipX;
        value *= -1;
      } else if (key === "scaleY" && value < 0) {
        this.flipY = !this.flipY;
        value *= -1;
      }

      this[key] = value;
      return this;
    }
  }, {
    key: "scale",
    get: function get() {
      return this.canvas ? this.canvas.scale : 1;
    }
    /** 获取当前大小，包含缩放效果 */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width * this.scaleX;
    }
    /** 获取当前大小，包含缩放效果 */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height * this.scaleY;
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      return this.angle;
    }
  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      this.angle = angle;
    }
  }]);

  return Shape;
}(_event__WEBPACK_IMPORTED_MODULE_3__.EventCenter);

/***/ }),

/***/ "../core/2d/src/base/utils.ts":
/*!************************************!*\
  !*** ../core/2d/src/base/utils.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "../core/2d/src/base/point.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var PiBy180 = Math.PI / 180; // 写在这里相当于缓存，因为会频繁调用

var iMatrix = [1, 0, 0, 1, 0, 0];
var PiBy2 = Math.PI * 2;
var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "populateWithProperties",
    value:
    /**
     * 把源对象的某些属性赋值给目标对象
     * @param source 源对象
     * @param destination 目标对象
     * @param properties 需要赋值的属性
     */
    function populateWithProperties(source, destination, properties) {
      if (properties && Object.prototype.toString.call(properties) === "[object Array]") {
        for (var i = 0, len = properties.length; i < len; i++) {
          destination[properties[i]] = source[properties[i]];
        }
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var img = document.createElement("img");

        var done = function done() {
          img.onload = img.onerror = null;
          resolve(img);
        };

        if (url) {
          img.onload = done;

          img.onerror = function () {
            reject(new Error("Error loading " + img.src));
          };

          options && options.crossOrigin && (img.crossOrigin = options.crossOrigin);
          img.src = url;
        } else {
          done();
        }
      });
    }
  }, {
    key: "clone",
    value: function clone(obj) {
      if (!obj || _typeof(obj) !== "object") return obj;
      var temp = new obj.constructor();

      for (var key in obj) {
        if (!obj[key] || _typeof(obj[key]) !== "object") {
          temp[key] = obj[key];
        } else {
          temp[key] = Util.clone(obj[key]);
        }
      }

      return temp;
    }
  }, {
    key: "animate",
    value: function animate(options) {
      window.requestAnimationFrame(function (timestamp) {
        var start = timestamp || +new Date(),
            // 开始时间
        duration = options.duration || 500,
            // 动画时间
        finish = start + duration,
            // 结束时间
        time,
            // 当前时间
        onChange = options.onChange || function () {},
            abort = options.abort || function () {
          return false;
        },
            easing = options.easing || function (t, b, c, d) {
          return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
            startValue = options.startValue || 0,
            // 初始值
        endValue = options.endValue || 100,
            // 结束值
        byValue = options.byValue || endValue - startValue; // 值的变化范围


        function tick(ticktime) {
          // tick 的主要任务就是根据时间更新值
          time = ticktime || +new Date();
          var currentTime = time > finish ? duration : time - start; // 当前已经执行了多久时间（介于0~duration）

          if (abort()) {
            options.onComplete && options.onComplete();
            return;
          }

          onChange(easing(currentTime, startValue, byValue, duration)); // 其实 animate 函数只是根据 easing 函数计算出了某个值，然后传给调用者而已

          if (time > finish) {
            options.onComplete && options.onComplete();
            return;
          }

          window.requestAnimationFrame(tick);
        }

        options.onStart && options.onStart(); // 动画开始前的回调

        tick(start);
      });
    }
    /** 从数组中溢出某个元素 */

  }, {
    key: "removeFromArray",
    value: function removeFromArray(array, value) {
      var idx = array.indexOf(value);

      if (idx !== -1) {
        array.splice(idx, 1);
      }

      return array;
    }
    /**
     * 数组的最小值
     */

  }, {
    key: "min",
    value: function min(array) {
      var byProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if (!array || array.length === 0) return undefined;
      var i = array.length - 1,
          result = byProperty ? array[i][byProperty] : array[i];

      if (byProperty) {
        while (i--) {
          if (array[i][byProperty] < result) {
            result = array[i][byProperty];
          }
        }
      } else {
        while (i--) {
          if (array[i] < result) {
            result = array[i];
          }
        }
      }

      return result;
    }
    /**
     * 数组的最大值
     */

  }, {
    key: "max",
    value: function max(array) {
      var byProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if (!array || array.length === 0) return undefined;
      var i = array.length - 1,
          result = byProperty ? array[i][byProperty] : array[i];

      if (byProperty) {
        while (i--) {
          if (array[i][byProperty] >= result) {
            result = array[i][byProperty];
          }
        }
      } else {
        while (i--) {
          if (array[i] >= result) {
            result = array[i];
          }
        }
      }

      return result;
    }
    /** 和原生的 toFixed 一样，只不过返回的数字 */

  }, {
    key: "toFixed",
    value: function toFixed(number, fractionDigits) {
      return parseFloat(Number(number).toFixed(fractionDigits));
    }
    /** 获取鼠标的点击坐标，相对于页面左上角，注意不是画布的左上角，到时候会减掉 offset */

  }, {
    key: "getPointer",
    value: function getPointer(event, upperCanvasEl, _ref) {
      var _ref$scale = _ref.scale,
          scale = _ref$scale === void 0 ? 1 : _ref$scale,
          _offset = _ref._offset,
          _canvasOffset = _ref._canvasOffset;
      event || (event = window.event);
      var element = event.target,
          body = document.body || {
        scrollLeft: 0,
        scrollTop: 0
      },
          docElement = document.documentElement,
          orgElement = element,
          scrollLeft = 0,
          scrollTop = 0,
          firstFixedAncestor;

      while (element && element.parentNode && !firstFixedAncestor) {
        element = element.parentNode;
        if (element !== document && Util.getElementPosition(element) === "fixed") firstFixedAncestor = element;

        if (element !== document && orgElement !== upperCanvasEl && Util.getElementPosition(element) === "absolute") {
          scrollLeft = 0;
          scrollTop = 0;
        } else if (element === document && orgElement !== upperCanvasEl) {
          scrollLeft = body.scrollLeft || docElement.scrollLeft || 0;
          scrollTop = body.scrollTop || docElement.scrollTop || 0;
        } else {
          scrollLeft += element.scrollLeft || 0;
          scrollTop += element.scrollTop || 0;
        }
      }

      return {
        x: (Util.pointerX(event) - _offset.left - _canvasOffset.left + scrollLeft) / scale,
        y: (Util.pointerY(event) - _offset.top - _canvasOffset.top + scrollTop) / scale
      };
    }
  }, {
    key: "getScroll",
    value: function getScroll(upperCanvasEl) {
      var element = event.target,
          body = document.body || {
        scrollLeft: 0,
        scrollTop: 0
      },
          docElement = document.documentElement,
          orgElement = element,
          scrollLeft = 0,
          scrollTop = 0,
          firstFixedAncestor;

      while (element && element.parentNode && !firstFixedAncestor) {
        element = element.parentNode;
        if (element !== document && Util.getElementPosition(element) === "fixed") firstFixedAncestor = element;

        if (element !== document && orgElement !== upperCanvasEl && Util.getElementPosition(element) === "absolute") {
          scrollLeft = 0;
          scrollTop = 0;
        } else if (element === document && orgElement !== upperCanvasEl) {
          scrollLeft = body.scrollLeft || docElement.scrollLeft || 0;
          scrollTop = body.scrollTop || docElement.scrollTop || 0;
        } else {
          scrollLeft += element.scrollLeft || 0;
          scrollTop += element.scrollTop || 0;
        }

        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        };
      }
    }
    /** 根据矩阵反推出具体变换数值 */

  }, {
    key: "qrDecompose",
    value: function qrDecompose(m) {
      var angle = Math.atan2(m[1], m[0]),
          denom = Math.pow(m[0], 2) + Math.pow(m[1], 2),
          scaleX = Math.sqrt(denom),
          scaleY = (m[0] * m[3] - m[2] * m[1]) / scaleX,
          skewX = Math.atan2(m[0] * m[2] + m[1] * m[3], denom);
      return {
        angle: angle / PiBy180,
        scaleX: scaleX,
        scaleY: scaleY,
        skewX: skewX / PiBy180,
        skewY: 0,
        translateX: m[4],
        translateY: m[5]
      };
    }
  }, {
    key: "invertTransform",
    value: function invertTransform(t) {
      var a = 1 / (t[0] * t[3] - t[1] * t[2]),
          r = [a * t[3], -a * t[1], -a * t[2], a * t[0]],
          o = Util.transformPoint({
        x: t[4],
        y: t[5]
      }, r, true);
      r[4] = -o.x;
      r[5] = -o.y;
      return r;
    }
  }, {
    key: "transformPoint",
    value: function transformPoint(p, t) {
      var ignoreOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (ignoreOffset) {
        return new _point__WEBPACK_IMPORTED_MODULE_0__.Point(t[0] * p.x + t[2] * p.y, t[1] * p.x + t[3] * p.y);
      }

      return new _point__WEBPACK_IMPORTED_MODULE_0__.Point(t[0] * p.x + t[2] * p.y + t[4], t[1] * p.x + t[3] * p.y + t[5]);
    }
  }, {
    key: "multiplyTransformMatrices",
    value: function multiplyTransformMatrices(a, b) {
      var is2x2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Matrix multiply a * b
      return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4], is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5]];
    }
  }, {
    key: "makeBoundingBoxFromPoints",
    value: function makeBoundingBoxFromPoints(points) {
      var xPoints = [points[0].x, points[1].x, points[2].x, points[3].x],
          minX = Util.min(xPoints),
          maxX = Util.max(xPoints),
          width = Math.abs(minX - maxX),
          yPoints = [points[0].y, points[1].y, points[2].y, points[3].y],
          minY = Util.min(yPoints),
          maxY = Util.max(yPoints),
          height = Math.abs(minY - maxY);
      return {
        left: minX,
        top: minY,
        width: width,
        height: height
      };
    }
  }, {
    key: "pointerX",
    value: function pointerX(event) {
      return event.clientX || 0;
    }
  }, {
    key: "pointerY",
    value: function pointerY(event) {
      return event.clientY || 0;
    }
    /** 获取元素位置 */

  }, {
    key: "getElementPosition",
    value: function getElementPosition(element) {
      return window.getComputedStyle(element, null).position;
    }
    /** 角度转弧度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */

  }, {
    key: "degreesToRadians",
    value: function degreesToRadians(degrees) {
      return degrees * PiBy180;
    }
    /** 弧度转角度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */

  }, {
    key: "radiansToDegrees",
    value: function radiansToDegrees(radians) {
      return radians / PiBy180;
    }
    /**
     * 将 point 绕 origin 旋转 radians 弧度
     * @param {Point} point 要旋转的点
     * @param {Point} origin 旋转中心点
     * @param {number} radians 注意 canvas 中用的都是弧度
     * @returns
     */

  }, {
    key: "rotatePoint",
    value: function rotatePoint(point, origin, radians) {
      var sin = Math.sin(radians),
          cos = Math.cos(radians);
      point.subtractEquals(origin);
      var rx = point.x * cos - point.y * sin;
      var ry = point.x * sin + point.y * cos;
      return new _point__WEBPACK_IMPORTED_MODULE_0__.Point(rx, ry).addEquals(origin);
    }
    /** 单纯的创建一个新的 canvas 元素 */

  }, {
    key: "createCanvasElement",
    value: function createCanvasElement() {
      var canvas = document.createElement("canvas");
      return canvas;
    }
    /** 给元素添加类名 */

  }, {
    key: "addClass",
    value: function addClass(element, className) {
      if ((" " + element.className + " ").indexOf(" " + className + " ") === -1) {
        element.className += (element.className ? " " : "") + className;
      }
    }
    /** 计算元素偏移值 */

  }, {
    key: "getElementOffset",
    value: function getElementOffset(element) {
      var valueT = 0,
          valueL = 0;

      do {
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        left: valueL,
        top: valueT
      };
    }
    /** 包裹元素并替换 */

  }, {
    key: "wrapElement",
    value: function wrapElement(element, wrapper, attributes) {
      if (typeof wrapper === "string") {
        wrapper = Util.makeElement(wrapper, attributes);
      }

      if (element.parentNode) {
        element.parentNode.replaceChild(wrapper, element);
      }

      wrapper.appendChild(element);
      return wrapper;
    }
    /** 新建元素并添加相应属性 */

  }, {
    key: "makeElement",
    value: function makeElement(tagName, attributes) {
      var el = document.createElement(tagName);

      for (var prop in attributes) {
        if (prop === "class") {
          el.className = attributes[prop];
        } else {
          el.setAttribute(prop, attributes[prop]);
        }
      }

      return el;
    }
    /** 给元素设置样式 */

  }, {
    key: "setStyle",
    value: function setStyle(element, styles) {
      var elementStyle = element.style;

      if (typeof styles === "string") {
        element.style.cssText += ";" + styles;
        return styles.indexOf("opacity") > -1 ? Util.setOpacity(element, styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
      }

      for (var property in styles) {
        if (property === "opacity") {
          Util.setOpacity(element, styles[property]);
        } else {
          elementStyle[property] = styles[property];
        }
      }

      return element;
    }
    /** 设置元素透明度 */

  }, {
    key: "setOpacity",
    value: function setOpacity(element, value) {
      element.style.opacity = value;
      return element;
    }
    /** 设置 css 的 userSelect 样式为 none，也就是不可选中的状态 */

  }, {
    key: "makeElementUnselectable",
    value: function makeElementUnselectable(element) {
      element.style.userSelect = "none";
      return element;
    }
  }, {
    key: "addListener",
    value: function addListener(element, eventName, handler) {
      element.addEventListener(eventName, handler, false);
    }
  }, {
    key: "removeListener",
    value: function removeListener(element, eventName, handler) {
      element.removeEventListener(eventName, handler, false);
    }
    /**
     * Returns a transform matrix starting from an object of the same kind of
     * the one returned from qrDecompose, useful also if you want to calculate some
     * transformations from an object that is not enlived yet
     * @static
     * @memberOf fabric.util
     * @param  {Object} options
     * @param  {Number} [options.angle]
     * @param  {Number} [options.scaleX]
     * @param  {Number} [options.scaleY]
     * @param  {Boolean} [options.flipX]
     * @param  {Boolean} [options.flipY]
     * @param  {Number} [options.skewX]
     * @param  {Number} [options.skewX]
     * @param  {Number} [options.translateX]
     * @param  {Number} [options.translateY]
     * @return {Number[]} transform matrix
     */

  }, {
    key: "composeMatrix",
    value: function composeMatrix(options) {
      var matrix = [1, 0, 0, 1, options.translateX || 0, options.translateY || 0],
          multiply = Util.multiplyTransformMatrices;

      if (options.angle) {
        matrix = multiply(matrix, Util.calcRotateMatrix(options));
      }

      if (options.scaleX !== 1 || options.scaleY !== 1 || options.skewX || options.skewY || options.flipX || options.flipY) {
        matrix = multiply(matrix, Util.calcDimensionsMatrix(options));
      }

      return matrix;
    }
  }, {
    key: "calcDimensionsMatrix",
    value: function calcDimensionsMatrix(options) {
      var scaleX = typeof options.scaleX === "undefined" ? 1 : options.scaleX,
          scaleY = typeof options.scaleY === "undefined" ? 1 : options.scaleY,
          scaleMatrix = [options.flipX ? -scaleX : scaleX, 0, 0, options.flipY ? -scaleY : scaleY, 0, 0],
          multiply = Util.multiplyTransformMatrices,
          degreesToRadians = Util.degreesToRadians;

      if (options.skewX) {
        scaleMatrix = multiply(scaleMatrix, [1, 0, Math.tan(degreesToRadians(options.skewX)), 1], true);
      }

      if (options.skewY) {
        scaleMatrix = multiply(scaleMatrix, [1, Math.tan(degreesToRadians(options.skewY)), 0, 1], true);
      }

      return scaleMatrix;
    }
  }, {
    key: "calcRotateMatrix",
    value: function calcRotateMatrix(options) {
      if (!options.angle) {
        return iMatrix.concat();
      }

      var theta = Util.degreesToRadians(options.angle),
          cos = Math.cos(theta),
          sin = Math.sin(theta);
      return [cos, sin, -sin, cos, 0, 0];
    }
  }, {
    key: "matrixToSVG",
    value: function matrixToSVG(transform) {
      return "matrix(" + transform.map(function (value) {
        return Util.toFixed(value, 2);
      }).join(" ") + ")";
    } // 洋葱任务模型

  }, {
    key: "compose",
    value: function compose(middleware) {
      return function (context, next) {
        var index = -1;
        return dispatch(0);

        function dispatch(i) {
          if (i <= index) return Promise.reject(new Error("next() called multiple times"));
          index = i;
          var fn = middleware[i];
          if (i === middleware.length) fn = next;
          if (!fn) return Promise.resolve();

          try {
            return Promise.resolve(fn(context, function next() {
              return dispatch(i + 1);
            }));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      };
    }
  }, {
    key: "getBoundsOfCurve",
    value: function getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
      var argsString;
      var sqrt = Math.sqrt,
          min = Math.min,
          max = Math.max,
          abs = Math.abs,
          tvalues = [],
          bounds = [[], []],
          a,
          b,
          c,
          t,
          t1,
          t2,
          b2ac,
          sqrtb2ac;
      b = 6 * x0 - 12 * x1 + 6 * x2;
      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
      c = 3 * x1 - 3 * x0;

      for (var i = 0; i < 2; ++i) {
        if (i > 0) {
          b = 6 * y0 - 12 * y1 + 6 * y2;
          a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
          c = 3 * y1 - 3 * y0;
        }

        if (abs(a) < 1e-12) {
          if (abs(b) < 1e-12) {
            continue;
          }

          t = -c / b;

          if (0 < t && t < 1) {
            tvalues.push(t);
          }

          continue;
        }

        b2ac = b * b - 4 * c * a;

        if (b2ac < 0) {
          continue;
        }

        sqrtb2ac = sqrt(b2ac);
        t1 = (-b + sqrtb2ac) / (2 * a);

        if (0 < t1 && t1 < 1) {
          tvalues.push(t1);
        }

        t2 = (-b - sqrtb2ac) / (2 * a);

        if (0 < t2 && t2 < 1) {
          tvalues.push(t2);
        }
      }

      var x,
          y,
          j = tvalues.length,
          jlen = j,
          mt;

      while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
        bounds[0][j] = x;
        y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
        bounds[1][j] = y;
      }

      bounds[0][jlen] = x0;
      bounds[1][jlen] = y0;
      bounds[0][jlen + 1] = x3;
      bounds[1][jlen + 1] = y3;
      var result = [{
        x: min.apply(null, bounds[0]),
        y: min.apply(null, bounds[1])
      }, {
        x: max.apply(null, bounds[0]),
        y: max.apply(null, bounds[1])
      }];
      return result;
    }
  }, {
    key: "calcVectorAngle",
    value: function calcVectorAngle(ux, uy, vx, vy) {
      var ta = Math.atan2(uy, ux),
          tb = Math.atan2(vy, vx);

      if (tb >= ta) {
        return tb - ta;
      } else {
        return 2 * Math.PI - (ta - tb);
      }
    }
  }, {
    key: "sin",
    value: function sin(angle) {
      if (angle === 0) {
        return 0;
      }

      var angleSlice = angle / PiBy2,
          sign = 1;

      if (angle < 0) {
        // sin(-a) = -sin(a)
        sign = -1;
      }

      switch (angleSlice) {
        case 1:
          return sign;

        case 2:
          return 0;

        case 3:
          return -sign;
      }

      return Math.sin(angle);
    }
  }, {
    key: "cos",
    value: function cos(angle) {
      if (angle === 0) {
        return 1;
      }

      if (angle < 0) {
        angle = -angle;
      }

      var angleSlice = angle / PiBy2;

      switch (angleSlice) {
        case 1:
        case 3:
          return 0;

        case 2:
          return -1;
      }

      return Math.cos(angle);
    }
  }, {
    key: "segmentToBezier",
    value: function segmentToBezier(th2, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY) {
      var costh2 = Util.cos(th2),
          sinth2 = Util.sin(th2),
          costh3 = Util.cos(th3),
          sinth3 = Util.sin(th3),
          toX = cosTh * rx * costh3 - sinTh * ry * sinth3 + cx1,
          toY = sinTh * rx * costh3 + cosTh * ry * sinth3 + cy1,
          cp1X = fromX + mT * (-cosTh * rx * sinth2 - sinTh * ry * costh2),
          cp1Y = fromY + mT * (-sinTh * rx * sinth2 + cosTh * ry * costh2),
          cp2X = toX + mT * (cosTh * rx * sinth3 + sinTh * ry * costh3),
          cp2Y = toY + mT * (sinTh * rx * sinth3 - cosTh * ry * costh3);
      return ["C", cp1X, cp1Y, cp2X, cp2Y, toX, toY];
    }
  }, {
    key: "arcToSegments",
    value: function arcToSegments(toX, toY, rx, ry, large, sweep, rotateX) {
      var PI = Math.PI,
          th = rotateX * PI / 180,
          sinTh = Util.sin(th),
          cosTh = Util.cos(th),
          fromX = 0,
          fromY = 0;
      rx = Math.abs(rx);
      ry = Math.abs(ry);
      var px = -cosTh * toX * 0.5 - sinTh * toY * 0.5,
          py = -cosTh * toY * 0.5 + sinTh * toX * 0.5,
          rx2 = rx * rx,
          ry2 = ry * ry,
          py2 = py * py,
          px2 = px * px,
          pl = rx2 * ry2 - rx2 * py2 - ry2 * px2,
          root = 0;

      if (pl < 0) {
        var s = Math.sqrt(1 - pl / (rx2 * ry2));
        rx *= s;
        ry *= s;
      } else {
        root = (large === sweep ? -1.0 : 1.0) * Math.sqrt(pl / (rx2 * py2 + ry2 * px2));
      }

      var cx = root * rx * py / ry,
          cy = -root * ry * px / rx,
          cx1 = cosTh * cx - sinTh * cy + toX * 0.5,
          cy1 = sinTh * cx + cosTh * cy + toY * 0.5,
          mTheta = Util.calcVectorAngle(1, 0, (px - cx) / rx, (py - cy) / ry),
          dtheta = Util.calcVectorAngle((px - cx) / rx, (py - cy) / ry, (-px - cx) / rx, (-py - cy) / ry);

      if (sweep === 0 && dtheta > 0) {
        dtheta -= 2 * PI;
      } else if (sweep === 1 && dtheta < 0) {
        dtheta += 2 * PI;
      } // Convert into cubic bezier segments <= 90deg


      var segments = Math.ceil(Math.abs(dtheta / PI * 2)),
          result = [],
          mDelta = dtheta / segments,
          mT = 8 / 3 * Math.sin(mDelta / 4) * Math.sin(mDelta / 4) / Math.sin(mDelta / 2),
          th3 = mTheta + mDelta;

      for (var i = 0; i < segments; i++) {
        result[i] = Util.segmentToBezier(mTheta, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY);
        fromX = result[i][5];
        fromY = result[i][6];
        mTheta = th3;
        th3 += mDelta;
      }

      return result;
    }
  }, {
    key: "fromArcToBeziers",
    value: function fromArcToBeziers(fx, fy, coords) {
      var rx = coords[1],
          ry = coords[2],
          rot = coords[3],
          large = coords[4],
          sweep = coords[5],
          tx = coords[6],
          ty = coords[7],
          segsNorm = Util.arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);

      for (var i = 0, len = segsNorm.length; i < len; i++) {
        segsNorm[i][1] += fx;
        segsNorm[i][2] += fy;
        segsNorm[i][3] += fx;
        segsNorm[i][4] += fy;
        segsNorm[i][5] += fx;
        segsNorm[i][6] += fy;
      }

      return segsNorm;
    }
  }, {
    key: "makePathSimpler",
    value: function makePathSimpler(path) {
      // x and y represent the last point of the path. the previous command point.
      // we add them to each relative command to make it an absolute comment.
      // we also swap the v V h H with L, because are easier to transform.
      var x = 0,
          y = 0,
          len = path.length,
          // x1 and y1 represent the last point of the subpath. the subpath is started with
      // m or M command. When a z or Z command is drawn, x and y need to be resetted to
      // the last x1 and y1.
      x1 = 0,
          y1 = 0,
          current,
          i,
          converted,
          // previous will host the letter of the previous command, to handle S and T.
      // controlX and controlY will host the previous reflected control point
      destinationPath = [],
          previous,
          controlX,
          controlY;

      for (i = 0; i < len; ++i) {
        converted = false;
        current = path[i].slice(0);

        switch (current[0] // first letter
        ) {
          case "l":
            // lineto, relative
            current[0] = "L";
            current[1] += x;
            current[2] += y;
          // falls through

          case "L":
            x = current[1];
            y = current[2];
            break;

          case "h":
            // horizontal lineto, relative
            current[1] += x;
          // falls through

          case "H":
            current[0] = "L";
            current[2] = y;
            x = current[1];
            break;

          case "v":
            // vertical lineto, relative
            current[1] += y;
          // falls through

          case "V":
            current[0] = "L";
            y = current[1];
            current[1] = x;
            current[2] = y;
            break;

          case "m":
            // moveTo, relative
            current[0] = "M";
            current[1] += x;
            current[2] += y;
          // falls through

          case "M":
            x = current[1];
            y = current[2];
            x1 = current[1];
            y1 = current[2];
            break;

          case "c":
            // bezierCurveTo, relative
            current[0] = "C";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
            current[5] += x;
            current[6] += y;
          // falls through

          case "C":
            controlX = current[3];
            controlY = current[4];
            x = current[5];
            y = current[6];
            break;

          case "s":
            // shorthand cubic bezierCurveTo, relative
            current[0] = "S";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
          // falls through

          case "S":
            // would be sScC but since we are swapping sSc for C, we check just that.
            if (previous === "C") {
              // calculate reflection of previous control points
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            } else {
              // If there is no previous command or if the previous command was not a C, c, S, or s,
              // the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }

            x = current[3];
            y = current[4];
            current[0] = "C";
            current[5] = current[3];
            current[6] = current[4];
            current[3] = current[1];
            current[4] = current[2];
            current[1] = controlX;
            current[2] = controlY; // current[3] and current[4] are NOW the second control point.
            // we keep it for the next reflection.

            controlX = current[3];
            controlY = current[4];
            break;

          case "q":
            // quadraticCurveTo, relative
            current[0] = "Q";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
          // falls through

          case "Q":
            controlX = current[1];
            controlY = current[2];
            x = current[3];
            y = current[4];
            break;

          case "t":
            // shorthand quadraticCurveTo, relative
            current[0] = "T";
            current[1] += x;
            current[2] += y;
          // falls through

          case "T":
            if (previous === "Q") {
              // calculate reflection of previous control point
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            } else {
              // If there is no previous command or if the previous command was not a Q, q, T or t,
              // assume the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }

            current[0] = "Q";
            x = current[1];
            y = current[2];
            current[1] = controlX;
            current[2] = controlY;
            current[3] = x;
            current[4] = y;
            break;

          case "a":
            current[0] = "A";
            current[6] += x;
            current[7] += y;
          // falls through

          case "A":
            converted = true;
            destinationPath = destinationPath.concat(Util.fromArcToBeziers(x, y, current));
            x = current[6];
            y = current[7];
            break;

          case "z":
          case "Z":
            x = x1;
            y = y1;
            break;

          default:
        }

        if (!converted) {
          destinationPath.push(current);
        }

        previous = current[0];
      }

      return destinationPath;
    }
  }]);

  return Util;
}();

/***/ }),

/***/ "../core/2d/src/entities/canvas.ts":
/*!*****************************************!*\
  !*** ../core/2d/src/entities/canvas.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Canvas": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _base_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/utils */ "../core/2d/src/base/utils.ts");
/* harmony import */ var _base_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/point */ "../core/2d/src/base/point.ts");
/* harmony import */ var _base_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/group */ "../core/2d/src/base/group.ts");
/* harmony import */ var _base_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/event */ "../core/2d/src/base/event.ts");
/* harmony import */ var _plugins_default_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plugins/default.plugin */ "../core/2d/src/plugins/default.plugin.ts");
/* harmony import */ var _plugins_move_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plugins/move.plugin */ "../core/2d/src/plugins/move.plugin.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







var STROKE_OFFSET = 0.5; // 鼠标手势

var cursorMap = {
  tr: "ne-resize",
  br: "se-resize",
  bl: "sw-resize",
  tl: "nw-resize",
  ml: "w-resize",
  mt: "n-resize",
  mr: "e-resize",
  mb: "s-resize"
};
/** 一些鼠标样式 */

var CursorStyle;

(function (CursorStyle) {
  CursorStyle["default"] = "default";
  CursorStyle["move"] = "move";
  CursorStyle["hover"] = "move";
  CursorStyle["rotation"] = "crosshair";
})(CursorStyle || (CursorStyle = {}));

var Canvas = /*#__PURE__*/function (_EventCenter) {
  _inherits(Canvas, _EventCenter);

  var _super = _createSuper(Canvas);

  function Canvas(el, options) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _super.call(this); //#region 属性字段

    /** 当前操作类型 */

    _this.action = "default";
    _this.viewportTransform = [1, 0, 0, 1, 0, 0];
    /** 画布中所有添加的物体 */

    _this._shapes = [];
    /** 整个画布距离原点的偏移量 */

    _this._offset = {
      left: 0,
      top: 0
    };
    /**
     * Window.devicePixelRatio
     * Window 接口的**devicePixelRatio
     *  返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。
     *  此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小。
     *  简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素。
     */

    _this.dpr = window.devicePixelRatio; // 缩放比

    _this.scale = 1; // 上一次的缩放比

    _this.preScale = 1; // 画布内的偏移量

    _this._canvasOffset = {
      left: 0,
      top: 0
    };
    /**************  可配置部分  **************/

    /** 选择区域框的背景颜色 */

    _this.selectionColor = "#0c99ff26";
    /** 选择区域框的边框颜色 */

    _this.selectionBorderColor = "#0c99ff";
    /** 选择区域的边框大小，拖蓝的线宽 */

    _this.selectionLineWidth = 1; // 每次缩放的步长

    _this.scaleStep = 0.2; // 最大缩放比

    _this.scaleMax = 8;
    _this.scaleMin = 0.8; // 插件

    _this.plugins = [_plugins_default_plugin__WEBPACK_IMPORTED_MODULE_4__["default"], _plugins_move_plugin__WEBPACK_IMPORTED_MODULE_5__["default"]]; // 挂件

    _this.widgets = []; // 初始化配置

    _this.wrapperElement = el;

    _this._initConfig(options); // 初始化下层画布 main-canvas


    _this._initMainCanvas(); // 初始化上层画布 top-canvas


    _this._initInteractiveCanvas(); // 初始化缓冲层画布


    _this._initCacheCanvas(); // 处理模糊问题


    _this._initRetinaScaling();

    return _this;
  } //#endregion
  //#region 初始化逻辑
  // 初始化配置


  _createClass(Canvas, [{
    key: "_initConfig",
    value: function _initConfig(options) {
      for (var key in options) {
        if (key === "plugins") {
          var _this$plugins;

          (_this$plugins = this.plugins).push.apply(_this$plugins, _toConsumableArray(options[key]));
        } else if (key === "widgets") {
          var _this$widgets;

          (_this$widgets = this.widgets).push.apply(_this$widgets, _toConsumableArray(options[key])); // 初始化挂件


          this._initWidgets();
        } else if (Object.prototype.hasOwnProperty.call(options, key)) {
          this[key] = options[key];
        }
      }

      this.wrapperElement.style.width = this.width + "px";
      this.wrapperElement.style.height = this.height + "px";
    } // 初始化挂载挂件

  }, {
    key: "_initWidgets",
    value: function _initWidgets() {
      var _this2 = this;

      this.widgets.forEach(function (widget) {
        widget.dom = document.createElement("div");
        widget.dom.innerHTML = widget.innerHTML;
        widget.dom.style.display = "initial";
        widget.dom.style.position = "absolute";
        widget.dom.style["zIndex"] = "10";

        _this2.wrapperElement.appendChild(widget.dom);

        widget.rococo2d = _this2;
        widget.mount();
      });
    }
  }, {
    key: "_initObject",
    value: function _initObject(obj) {
      obj.setupState();
      obj.setCoords();
      obj.canvas = this;
    } // 初始化主画布

  }, {
    key: "_initMainCanvas",
    value: function _initMainCanvas() {
      this.mainCanvas = document.createElement("canvas");
      this.wrapperElement.appendChild(this.mainCanvas);

      this._applyCanvasStyle(this.mainCanvas);

      this.mCtx = this.mainCanvas.getContext("2d");
      this.calcOffset();
    } // 初始化操作画布

  }, {
    key: "_initInteractiveCanvas",
    value: function _initInteractiveCanvas() {
      this._currentTransform = null;
      this._groupSelector = null;
      this.topCanvas = document.createElement("canvas");
      this.wrapperElement.appendChild(this.topCanvas);

      this._applyCanvasStyle(this.topCanvas);

      this.tCtx = this.topCanvas.getContext("2d");

      this._initEvents();
    } // 初始化缓冲画布

  }, {
    key: "_initCacheCanvas",
    value: function _initCacheCanvas() {
      this.cacheCanvas = document.createElement("canvas");

      this._applyCanvasStyle(this.cacheCanvas);

      this.cCtx = this.cacheCanvas.getContext("2d");
    } // 初始化视觉缩放比例

  }, {
    key: "_initRetinaScaling",
    value: function _initRetinaScaling() {
      var _this3 = this;

      var localInitRetinaScaling = function localInitRetinaScaling(canvas, ctx) {
        var width = _this3.width,
            height = _this3.height; // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点

        canvas.width = Math.round(width * _this3.dpr);
        canvas.height = Math.round(height * _this3.dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px"; // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作

        ctx.scale(_this3.dpr, _this3.dpr);
      };

      localInitRetinaScaling(this.mainCanvas, this.mCtx);
      localInitRetinaScaling(this.topCanvas, this.tCtx);
      localInitRetinaScaling(this.cacheCanvas, this.cCtx);
    } // #endregion
    // #region 事件系统

    /** 给上层画布增加鼠标事件 */

  }, {
    key: "_initEvents",
    value: function _initEvents() {
      this._handleMouseDown = this._handleMouseDown.bind(this);
      this._handleMouseMove = this._handleMouseMove.bind(this);
      this._handleMouseUp = this._handleMouseUp.bind(this);
      this._handleWindowResize = this._handleWindowResize.bind(this);
      this._handleMouseWheel = this._handleMouseWheel.bind(this);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(window, "resize", this._handleWindowResize);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(this.topCanvas, "mousedown", this._handleMouseDown);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(this.topCanvas, "mousemove", this._handleMouseMove);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(this.topCanvas, document.mozFullScreen ? "DOMMouseScroll" : "mousewheel", this._handleMouseWheel);
    } // 执行洋葱任务模型

  }, {
    key: "_executeCompose",
    value: function _executeCompose(key, ctx) {
      var widgetMiddles = [];
      this.widgets.forEach(function (widget) {
        if (widget[key]) {
          widgetMiddles.push(widget[key].bind(widget));
        }
      }); // 虽然设计有返回值，但是并不关心因此不处理

      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.compose([].concat(_toConsumableArray(this.plugins.filter(function (p) {
        return p[key];
      }).map(function (p) {
        return p[key];
      })), widgetMiddles))(ctx);
    } // 鼠标下压事件

  }, {
    key: "_handleMouseDown",
    value: function _handleMouseDown(e) {
      var pointer = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, this.topCanvas, this);

      this._executeCompose("mouseDown", {
        e: e,
        pointer: pointer,
        rococo2d: this
      });

      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(document, "mouseup", this._handleMouseUp); // 注销交互层 canvas 的监听事件，注册整个页面的事件，保证鼠标移动到屏幕外时 move 事件依旧执行

      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(document, "mousemove", this._handleMouseMove);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.removeListener(this.topCanvas, "mousemove", this._handleMouseMove);
    } // 鼠标移动事件

  }, {
    key: "_handleMouseMove",
    value: function _handleMouseMove(e) {
      var pointer = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, this.topCanvas, this);

      this._executeCompose("mouseMove", {
        e: e,
        pointer: pointer,
        rococo2d: this
      });

      e.preventDefault();
    } // 鼠标放开事件

  }, {
    key: "_handleMouseUp",
    value: function _handleMouseUp(e) {
      this._executeCompose("mouseUp", {
        e: e,
        rococo2d: this
      });

      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.removeListener(document, "mouseup", this._handleMouseUp); // 注销整个页面的事件，退回到只有交互层 canvas 事件舰艇，只在 canvas 内执行 move 事件

      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.removeListener(document, "mousemove", this._handleMouseMove);
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.addListener(this.topCanvas, "mousemove", this._handleMouseMove);
    } // 鼠标滚轮事件

  }, {
    key: "_handleMouseWheel",
    value: function _handleMouseWheel(e) {
      var pointer = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, this.topCanvas, this);

      this._executeCompose("mouseWheel", {
        e: e,
        pointer: pointer,
        rococo2d: this
      });
    } // 窗口缩放事件

  }, {
    key: "_handleWindowResize",
    value: function _handleWindowResize() {
      // TODO: 执行洋葱任务模型
      // this._executeCompose("", {canvas: this})
      this.calcOffset();
    } // #endregion
    // #region 对象操作

  }, {
    key: "setActiveObject",
    value: function setActiveObject(object, e) {
      if (this._activeShape) {
        // 如果当前有激活物体
        this._activeShape.setActive(false);
      }

      this._activeShape = object;
      object.setActive(true);
      this.renderAll(); // this.emit('object:selected', { target: object, e });
      // object.emit('selected', { e });

      return this;
    } // 获取当前选中的元素

  }, {
    key: "getActiveObject",
    value: function getActiveObject() {
      return this._activeShape;
    }
    /** 使所有元素失活，并触发相应事件 */

  }, {
    key: "deactivateAllWithDispatch",
    value: function deactivateAllWithDispatch() {
      // let activeObject = this.getActiveGroup() || this.getActiveObject();
      // if (activeObject) {
      //     this.emit('before:selection:cleared', { target: activeObject });
      // }
      this.deactivateAll(); // if (activeObject) {
      //     this.emit('selection:cleared');
      // }

      return this;
    }
    /** 将所有物体设置成未激活态 */

  }, {
    key: "deactivateAll",
    value: function deactivateAll() {
      var allObjects = this._shapes,
          i = 0,
          len = allObjects.length;

      for (; i < len; i++) {
        allObjects[i].setActive(false);
      }

      this.discardActiveGroup();
      this.discardActiveObject();
      return this;
    }
  }, {
    key: "resetObjectTransform",
    value: function resetObjectTransform(target) {
      target.scaleX = 1;
      target.scaleY = 1;
      target.setAngle(0);
    }
    /** 清空所有激活物体 */

  }, {
    key: "discardActiveObject",
    value: function discardActiveObject() {
      if (this._activeShape) {
        this._activeShape.setActive(false);
      }

      this._activeShape = null;
      return this;
    }
    /** 平移当前选中物体，注意这里我们没有用 += */

  }, {
    key: "translateObject",
    value: function translateObject(x, y) {
      var target = this._currentTransform.target;
      target.set("left", x - this._currentTransform.offsetX);
      target.set("top", y - this._currentTransform.offsetY);
    }
    /**
     * 缩放当前选中物体
     * @param x 鼠标点 x
     * @param y 鼠标点 y
     * @param by 是否等比缩放，x | y | equally
     */

  }, {
    key: "scaleObject",
    value: function scaleObject(x, y) {
      var by = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "equally";
      var t = this._currentTransform,
          target = t.target; // 缩放基点：比如拖拽右边中间的控制点，其实我们参考的变换基点是左边中间的控制点

      var constraintPosition = target.translateToOriginPoint(target.getCenterPoint(), t.originX, t.originY); // 以物体变换中心为原点的鼠标点坐标值

      var localMouse = target.toLocalPoint(new _base_point__WEBPACK_IMPORTED_MODULE_1__.Point(x, y), t.originX, t.originY);

      if (t.originX === "right") {
        localMouse.x *= -1;
      } else if (t.originX === "center") {
        localMouse.x *= t.mouseXSign * 2;

        if (localMouse.x < 0) {
          t.mouseXSign = -t.mouseXSign;
        }
      }

      if (t.originY === "bottom") {
        localMouse.y *= -1;
      } else if (t.originY === "center") {
        localMouse.y *= t.mouseYSign * 2;

        if (localMouse.y < 0) {
          t.mouseYSign = -t.mouseYSign;
        }
      } // 计算新的缩放值，以变换中心为原点，根据本地鼠标坐标点/原始宽度进行计算，重新设定物体缩放值


      var newScaleX = target.scaleX,
          newScaleY = target.scaleY;

      if (by === "equally") {
        var dist = localMouse.y + localMouse.x;
        var lastDist = target.height * t.original.scaleY + target.width * t.original.scaleX + target.padding * 2 - target.strokeWidth * 2 + 1;
        /* additional offset needed probably due to subpixel rendering, and avoids jerk when scaling an object */
        // We use t.scaleX/Y instead of target.scaleX/Y because the object may have a min scale and we'll loose the proportions

        newScaleX = t.original.scaleX * dist / lastDist;
        newScaleY = t.original.scaleY * dist / lastDist;
        target.set("scaleX", newScaleX);
        target.set("scaleY", newScaleY);
      } else if (!by) {
        newScaleX = localMouse.x / (target.width + target.padding);
        newScaleY = localMouse.y / (target.height + target.padding);
        target.set("scaleX", newScaleX);
        target.set("scaleY", newScaleY);
      } else if (by === "x") {
        newScaleX = localMouse.x / (target.width + target.padding);
        target.set("scaleX", newScaleX);
      } else if (by === "y") {
        newScaleY = localMouse.y / (target.height + target.padding);
        target.set("scaleY", newScaleY);
      } // 如果是反向拉伸 x


      if (newScaleX < 0) {
        if (t.originX === "left") t.originX = "right";else if (t.originX === "right") t.originX = "left";
      } // 如果是反向拉伸 y


      if (newScaleY < 0) {
        if (t.originY === "top") t.originY = "bottom";else if (t.originY === "bottom") t.originY = "top";
      } // 缩放会改变物体位置，所以要重新设置


      target.setPositionByOrigin(constraintPosition, t.originX, t.originY);
    }
    /** 旋转当前选中物体，这里用的是 += */

  }, {
    key: "rotateObject",
    value: function rotateObject(x, y) {
      var t = this._currentTransform; // 鼠标按下的点与物体中心点连线和 x 轴正方向形成的弧度

      var lastAngle = Math.atan2(t.ey - t.top, t.ex - t.left); // 鼠标拖拽的终点与物体中心点连线和 x 轴正方向形成的弧度

      var curAngle = Math.atan2(y - t.top, x - t.left);
      var angle = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.radiansToDegrees(curAngle - lastAngle + t.theta); // 新的角度 = 变换的角度 + 原来的角度

      if (angle < 0) {
        angle = 360 + angle;
      }

      angle = angle % 360;
      t.target.angle = angle;
    }
    /**
     * 获取拖蓝选区包围的元素
     * 可能只有一个物体，那就是普通的点选
     * 如果有多个物体，那就生成一个组
     */

  }, {
    key: "findSelectedObjects",
    value: function findSelectedObjects(e) {
      var objects = [],
          // 存储最终框选的元素
      x1 = this._groupSelector.ex,
          y1 = this._groupSelector.ey,
          x2 = x1 + this._groupSelector.left,
          y2 = y1 + this._groupSelector.top,
          selectionX1Y1 = new _base_point__WEBPACK_IMPORTED_MODULE_1__.Point(Math.min(x1, x2), Math.min(y1, y2)),
          selectionX2Y2 = new _base_point__WEBPACK_IMPORTED_MODULE_1__.Point(Math.max(x1, x2), Math.max(y1, y2));

      for (var i = 0, len = this._shapes.length; i < len; ++i) {
        var currentObject = this._shapes[i];
        if (!currentObject) continue; // 物体是否与拖蓝选区相交或者被选区包含

        if (currentObject.intersectsWithRect(selectionX1Y1, selectionX2Y2) || currentObject.isContainedWithinRect(selectionX1Y1, selectionX2Y2)) {
          currentObject.setActive(true);
          objects.push(currentObject);
        }
      }

      if (objects.length === 1) {
        this.setActiveObject(objects[0], e);
      } else if (objects.length > 1) {
        var newGroup = new _base_group__WEBPACK_IMPORTED_MODULE_2__.Group(objects);
        this.setActiveGroup(newGroup); // newGroup.saveCoords();
        // this.emit('selection:created', { target: newGroup });
      }

      this.renderAll();
    }
    /** 记录当前物体的变换状态 */

  }, {
    key: "setupCurrentTransform",
    value: function setupCurrentTransform(e, target) {
      var action = "drag",
          corner,
          pointer = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, target.canvas.topCanvas, this);
      corner = target._findTargetCorner(e);

      if (corner) {
        // 根据点击的控制点判断此次操作是什么
        action = corner === "ml" || corner === "mr" ? "scaleX" : corner === "mt" || corner === "mb" ? "scaleY" : corner === "mtr" ? "rotate" : "scale";
      }

      var originX = "center",
          originY = "center";

      if (corner === "ml" || corner === "tl" || corner === "bl") {
        // 如果点击的是左边的控制点，则变换基点就是右边，以右边为基准向左变换
        originX = "right";
      } else if (corner === "mr" || corner === "tr" || corner === "br") {
        originX = "left";
      }

      if (corner === "tl" || corner === "mt" || corner === "tr") {
        // 如果点击的是上方的控制点，则变换基点就是底部，以底边为基准向上变换
        originY = "bottom";
      } else if (corner === "bl" || corner === "mb" || corner === "br") {
        originY = "top";
      }

      if (corner === "mtr") {
        // 如果是旋转操作，则基点就是中心点
        originX = "center";
        originY = "center";
      } // let center = target.getCenterPoint();


      this._currentTransform = {
        target: target,
        action: action,
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        offsetX: pointer.x - target.left,
        offsetY: pointer.y - target.top,
        originX: originX,
        originY: originY,
        ex: pointer.x,
        ey: pointer.y,
        left: target.left,
        top: target.top,
        theta: _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.degreesToRadians(target.angle),
        width: target.width * target.scaleX,
        mouseXSign: 1,
        mouseYSign: 1
      }; // 记录物体原始的 original 变换参数

      this._currentTransform.original = {
        left: target.left,
        top: target.top,
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        originX: originX,
        originY: originY
      };

      var _a = this._currentTransform,
          target2 = _a.target,
          other = __rest(_a, ["target"]); // this.resetCurrentTransform(e); // 好像没必要重新赋值？除非按下了 altKey 键

    }
    /** 重置当前 transform 状态为 original，并设置 resizing 的基点 */

  }, {
    key: "resetCurrentTransform",
    value: function resetCurrentTransform(e) {
      var t = this._currentTransform;
      t.target.set("scaleX", t.original.scaleX);
      t.target.set("scaleY", t.original.scaleY);
      t.target.set("left", t.original.left);
      t.target.set("top", t.original.top);

      if (e.altKey) {
        if (t.originX !== "center") {
          if (t.originX === "right") {
            t.mouseXSign = -1;
          } else {
            t.mouseXSign = 1;
          }
        }

        if (t.originY !== "center") {
          if (t.originY === "bottom") {
            t.mouseYSign = -1;
          } else {
            t.mouseYSign = 1;
          }
        }

        t.originX = "center";
        t.originY = "center";
      } else {
        t.originX = t.original.originX;
        t.originY = t.original.originY;
      }
    } // #endregion
    // #region 组操作

  }, {
    key: "getActiveGroup",
    value: function getActiveGroup() {
      return this._activeGroup;
    }
  }, {
    key: "setActiveGroup",
    value: function setActiveGroup(group) {
      this._activeGroup = group;

      if (group) {
        group.canvas = this;
        group.setActive(true);
      }

      return this;
    }
    /** 将当前选中组失活 */

  }, {
    key: "discardActiveGroup",
    value: function discardActiveGroup() {
      var g = this.getActiveGroup();
      if (g) g.destroy();
      return this.setActiveGroup(null);
    }
    /** 是否要处理组的逻辑 */

  }, {
    key: "shouldHandleGroupLogic",
    value: function shouldHandleGroupLogic(e, target) {
      var activeObject = this._activeShape;
      return e.shiftKey && (this.getActiveGroup() || activeObject && activeObject !== target);
    }
  }, {
    key: "handleGroupLogic",
    value: function handleGroupLogic(e, target) {
      if (target === this.getActiveGroup()) {
        // if it's a group, find target again, this time skipping group
        target = this.findTarget(e, true); // if even object is not found, bail out

        if (!target || target.isType("group")) {
          return;
        }
      }

      var activeGroup = this.getActiveGroup();

      if (activeGroup) {
        if (activeGroup.contains(target)) {
          activeGroup.removeWithUpdate(target);
          this.resetObjectTransform(activeGroup);
          target.setActive(false);

          if (activeGroup.size() === 1) {
            this.discardActiveGroup();
          }
        } else {
          activeGroup.addWithUpdate(target);
          this.resetObjectTransform(activeGroup);
        }

        activeGroup.setActive(true);
      } else {
        if (this._activeShape) {
          if (target !== this._activeShape) {
            var group = new _base_group__WEBPACK_IMPORTED_MODULE_2__.Group([this._activeShape, target]);
            this.setActiveGroup(group);
            activeGroup = this.getActiveGroup();
          }
        }

        target.setActive(true);
      }
    } // #endregion
    // #region 画布操作

    /** 添加元素
     * 目前的模式是调用 add 添加物体的时候就立马渲染，
     * 如果一次性加入大量元素，就会做很多无用功，
     * 所以可以加一个属性来先批量添加元素，最后再一次渲染（手动调用 renderAll 函数即可）
     */

  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._shapes.push.apply(this._shapes, args);

      for (var i = args.length; i--;) {
        this._initObject(args[i]);
      }

      this.renderAll();
      return this;
    } // 设置 canvas 的宽高以及起始点

  }, {
    key: "_applyCanvasStyle",
    value: function _applyCanvasStyle(el) {
      var width = this.width || el.width;
      var height = this.height || el.height;
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.setStyle(el, {
        position: "absolute",
        width: width + "px",
        height: height + "px",
        "margin-left": 0,
        "margin-top": 0
      });
      el.width = width;
      el.height = height;
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.makeElementUnselectable(el);
    }
    /** 如果当前的物体在当前的组内，则要考虑扣去组的 top、left 值 */

  }, {
    key: "_normalizePointer",
    value: function _normalizePointer(object, pointer) {
      var activeGroup = this.getActiveGroup(),
          x = pointer.x,
          y = pointer.y;
      var isObjectInGroup = activeGroup && object.type !== "group" && activeGroup.contains(object);

      if (isObjectInGroup) {
        x -= activeGroup.left;
        y -= activeGroup.top;
      }

      return {
        x: x,
        y: y
      };
    }
    /** 将所有物体分成两个组，一组是未激活态，一组是激活态，然后将激活组放在最后，这样就能够绘制到最上层 */

  }, {
    key: "_chooseObjectsToRender",
    value: function _chooseObjectsToRender() {
      // 当前有没有激活的物体
      var activeObject = this.getActiveObject(); // 当前有没有激活的组（也就是多个物体）

      var activeGroup = this.getActiveGroup(); // 最终要渲染的物体顺序，也就是把激活的物体放在后面绘制

      var objsToRender = [];

      if (activeGroup) {
        // 如果选中多个物体
        var activeGroupObjects = [];

        for (var i = 0, length = this._shapes.length; i < length; i++) {
          var object = this._shapes[i];

          if (activeGroup.contains(object)) {
            activeGroupObjects.push(object);
          } else {
            objsToRender.push(object);
          }
        }

        objsToRender.push(activeGroup);
      } else if (activeObject) {
        // 如果只选中一个物体
        var index = this._shapes.indexOf(activeObject);

        objsToRender = this._shapes.slice();

        if (index > -1) {
          objsToRender.splice(index, 1);
          objsToRender.push(activeObject);
        }
      } else {
        // 所有物体都没被选中
        objsToRender = this._shapes;
      }

      return objsToRender;
    }
  }, {
    key: "_draw",
    value: function _draw(ctx, object) {
      if (!object) return;
      object.render(ctx);
    }
  }, {
    key: "zoom",
    value: function zoom() {
      var is_mouse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pointer = arguments.length > 1 ? arguments[1] : undefined;

      // 是否居中放大
      if (!is_mouse) {// this._canvasOffset.left = this.width / 2;
        // this._canvasOffset.top = this.height / 2;
      } else {
        this._canvasOffset.left = pointer.x - (pointer.x - this._canvasOffset.left) * this.scale / this.preScale;
        this._canvasOffset.top = pointer.y - (pointer.y - this._canvasOffset.top) * this.scale / this.preScale;
      }

      this.renderAll();
      this.preScale = this.scale;
    } // 放大

  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var is_mouse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pointer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (this.scaleMax > this.scale) {
        this.scale += this.scaleStep;
        this.zoom(is_mouse, pointer);
      } else {
        return;
      }
    } // 缩小

  }, {
    key: "zoomOut",
    value: function zoomOut() {
      var is_mouse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var pointer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (this.scaleMin < this.scale) {
        this.scale -= this.scaleStep;
        this.zoom(is_mouse, pointer);
      } else {
        return;
      }
    }
    /** 删除所有物体和清空画布 */

  }, {
    key: "clear",
    value: function clear() {
      this._shapes.length = 0;
      this.discardActiveGroup();
      this.clearContext(this.mCtx);
      this.clearContext(this.tCtx);
      this.renderAll();
      return this;
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas(canvas) {
      canvas.width = this.width;
      canvas.height = this.height;
    }
  }, {
    key: "clearContext",
    value: function clearContext(ctx) {
      ctx && ctx.clearRect(0, 0, this.width, this.height);
      return this;
    }
    /** 获取画布的偏移量，到时计算鼠标点击位置需要用到 */

  }, {
    key: "calcOffset",
    value: function calcOffset() {
      // TODO: 这边的外部偏移量计算有点问题
      this._offset = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getElementOffset(this.mainCanvas);
      return this;
    }
    /** 大部分是在 main-canvas 上先画未激活物体，再画激活物体 */

  }, {
    key: "renderAll",
    value: function renderAll() {
      var _this4 = this;

      var ctxs = [this.mCtx, this.cCtx
      /** this.tCtx */
      ];

      if (this.tCtx) {
        this.clearContext(this.tCtx);
      }

      this.clearContext(this.mCtx);
      ctxs.forEach(function (c) {
        return c.save();
      });
      ctxs.forEach(function (c) {
        return c.translate(_this4._canvasOffset.left, _this4._canvasOffset.top);
      });
      ctxs.forEach(function (c) {
        return c.scale(_this4.scale, _this4.scale);
      }); // 先绘制未激活物体，再绘制激活物体

      var sortedObjects = this._chooseObjectsToRender();

      for (var i = 0, len = sortedObjects.length; i < len; ++i) {
        this._draw(this.mCtx, sortedObjects[i]);
      }

      ctxs.forEach(function (c) {
        return c.restore();
      });
      return this;
    }
  }, {
    key: "getPointer",
    value: function getPointer(e) {
      var pointer = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getPointer(e, this.topCanvas, this);
      return {
        x: pointer.x,
        y: pointer.y
      };
    }
    /** 检测是否有物体在鼠标位置 */

  }, {
    key: "findTarget",
    value: function findTarget(e) {
      var skipGroup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var target; // let pointer = this.getPointer(e);
      // 优先考虑当前组中的物体，因为激活的物体被选中的概率大

      var activeGroup = this.getActiveGroup();

      if (activeGroup && !skipGroup && this.containsPoint(e, activeGroup)) {
        target = activeGroup;
        return target;
      } // 遍历所有物体，判断鼠标点是否在物体包围盒内


      for (var i = this._shapes.length; i--;) {
        if (this._shapes[i] && this.containsPoint(e, this._shapes[i])) {
          target = this._shapes[i];
          break;
        }
      }

      if (target) return target;
    } // 判断鼠标点位是否存在图形中

  }, {
    key: "containsPoint",
    value: function containsPoint(e, target) {
      var pointer = this.getPointer(e),
          xy = this._normalizePointer(target, pointer),
          x = xy.x,
          y = xy.y; // 下面这是参考文献，不过好像打不开
      // http://www.geog.ubc.ca/courses/klink/gis.notes/ncgia/u32.html
      // http://idav.ucdavis.edu/~okreylos/TAship/Spring2000/PointInPolygon.html
      // we iterate through each object. If target found, return it.


      var iLines = target._getImageLines(target.oCoords),
          xpoints = target._findCrossPoints(x, y, iLines); // if xcount is odd then we clicked inside the object
      // For the specific case of square images xcount === 1 in all true cases


      if (xpoints && xpoints % 2 === 1 || target._findTargetCorner(e)) {
        return true;
      }

      return false;
    } // #endregion
    // #region 顶层交互层操作

    /** 渲染 top-canvas，一般用于渲染拖蓝多选区域和涂鸦 */

  }, {
    key: "renderTop",
    value: function renderTop(shapes) {
      var _this5 = this;

      var ctx = this.tCtx;
      this.clearContext(ctx);
      ctx.save();

      var _Util$getScroll = _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.getScroll(this.topCanvas),
          scrollLeft = _Util$getScroll.scrollLeft,
          scrollTop = _Util$getScroll.scrollTop;

      ctx.translate(scrollLeft + this._offset.left + this._canvasOffset.left, scrollTop + this._offset.top + this._canvasOffset.top);
      ctx.scale(this.scale, this.scale); // 绘制拖蓝选区

      if (this._groupSelector) this.drawSelection(); // 绘制正在绘制的图形

      if (this._drawingShape) this._draw(this.tCtx, this._drawingShape);
      if (shapes) shapes.forEach(function (shp) {
        return _this5._draw(_this5.tCtx, shp);
      }); // 如果有选中物体
      // let activeGroup = this.getActiveGroup();
      // if (activeGroup) activeGroup.render(ctx);

      ctx.restore();
      this.emit("after:render");
      return this;
    }
    /** 绘制框选区域 */

  }, {
    key: "drawSelection",
    value: function drawSelection() {
      var ctx = this.tCtx,
          groupSelector = this._groupSelector,
          left = groupSelector.left,
          top = groupSelector.top,
          aleft = Math.abs(left),
          atop = Math.abs(top);
      ctx.fillStyle = this.selectionColor;
      ctx.fillRect(groupSelector.ex - (left > 0 ? 0 : -left), groupSelector.ey - (top > 0 ? 0 : -top), aleft, atop);
      ctx.lineWidth = this.selectionLineWidth;
      ctx.strokeStyle = this.selectionBorderColor;
      ctx.strokeRect(groupSelector.ex + STROKE_OFFSET - (left > 0 ? 0 : aleft), groupSelector.ey + STROKE_OFFSET - (top > 0 ? 0 : atop), aleft, atop);
    }
    /** 是否是拖蓝事件，也就是没有点选到物体 */

  }, {
    key: "shouldClearSelection",
    value: function shouldClearSelection(e) {
      var target = this.findTarget(e),
          activeGroup = this.getActiveGroup();
      return !target || target && activeGroup && !activeGroup.contains(target) && activeGroup !== target && !e.shiftKey;
    } // #endregion
    // #region 鼠标样式相关

    /** 设置鼠标样式 */

  }, {
    key: "setCursor",
    value: function setCursor(value) {
      this.topCanvas.style.cursor = value;
    }
    /** 根据鼠标位置来设置相应的鼠标样式 */

  }, {
    key: "setCursorFromEvent",
    value: function setCursorFromEvent(e, target) {
      var s = this.topCanvas.style;

      if (target) {
        var activeGroup = this.getActiveGroup();

        var corner = (!activeGroup || !activeGroup.contains(target)) && target._findTargetCorner(e);

        if (corner) {
          corner = corner;

          if (corner in cursorMap) {
            s.cursor = cursorMap[corner];
          } else if (corner === "mtr" && target.hasRotatingPoint) {
            s.cursor = CursorStyle.rotation;
          } else {
            s.cursor = CursorStyle.default;
            return false;
          }
        } else {
          s.cursor = CursorStyle.hover;
        }

        return true;
      } else {
        s.cursor = CursorStyle.default;
        return false;
      }
    }
  }]);

  return Canvas;
}(_base_event__WEBPACK_IMPORTED_MODULE_3__.EventCenter);

/***/ }),

/***/ "../core/2d/src/entities/elements/image.entity.ts":
/*!********************************************************!*\
  !*** ../core/2d/src/entities/elements/image.entity.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RococoImage": () => (/* binding */ RococoImage)
/* harmony export */ });
/* harmony import */ var _base_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/shape */ "../core/2d/src/base/shape.ts");
/* harmony import */ var _base_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/utils */ "../core/2d/src/base/utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var RococoImage = /*#__PURE__*/function (_Shape) {
  _inherits(RococoImage, _Shape);

  var _super = _createSuper(RococoImage);

  /** 默认通过 img 标签来绘制，因为最终都是要通过该标签绘制的 */
  function RococoImage(element, options) {
    var _this;

    _classCallCheck(this, RococoImage);

    _this = _super.call(this, options);
    _this.type = "image";

    _this._initElement(element, options);

    return _this;
  }

  _createClass(RococoImage, [{
    key: "_initElement",
    value: function _initElement(element, options) {
      this.setElement(element, options);
    }
  }, {
    key: "setElement",
    value: function setElement(element, options) {
      this._element = element;

      this._initConfig(options);

      return this;
    }
  }, {
    key: "_initConfig",
    value: function _initConfig() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.setOptions(options);

      this._setWidthHeight(options);
    }
    /** 设置图像大小 */

  }, {
    key: "_setWidthHeight",
    value: function _setWidthHeight(options) {
      this.width = "width" in options ? options.width : this.getElement() ? this.getElement().width || 0 : 0;
      this.height = "height" in options ? options.height : this.getElement() ? this.getElement().height || 0 : 0;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this._element;
    }
    /** 直接调用 drawImage 绘制图像 */

  }, {
    key: "_render",
    value: function _render(ctx) {
      var _this2 = this;

      var noTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _a;

      var x, y;
      x = noTransform ? this.left : -this.width / 2;
      y = noTransform ? this.top : -this.height / 2;

      if ((_a = this._element) === null || _a === void 0 ? void 0 : _a.complete) {
        ctx.drawImage(this._element, x, y, this.width, this.height);
      } else {
        // 当图片素材未加载完毕，先绘制骨架
        var rx = 2,
            ry = 2,
            w = this.width,
            h = this.height;
        ctx.beginPath();
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + w - rx, y);
        ctx.bezierCurveTo(x + w, y, x + w, y + ry, x + w, y + ry);
        ctx.lineTo(x + w, y + h - ry);
        ctx.bezierCurveTo(x + w, y + h, x + w - rx, y + h, x + w - rx, y + h);
        ctx.lineTo(x + rx, y + h);
        ctx.bezierCurveTo(x, y + h, x, y + h - ry, x, y + h - ry);
        ctx.lineTo(x, y + ry);
        ctx.bezierCurveTo(x, y, x + rx, y, x + rx, y);
        ctx.closePath();
        ctx.strokeStyle = "#e8e8e860";
        ctx.fillStyle = "#90909060";
        ctx.fill();
        ctx.stroke();
        ctx.drawImage(this._element, x, y, this.width, this.height);

        this._element.onload = function () {
          _this2.canvas.renderAll();
        };
      }
    }
    /** 如果是根据 url 或者本地路径加载图像，本质都是取加载图片完成之后在转成 img 标签 */

  }], [{
    key: "fromURL",
    value: function fromURL(url, callback, imgOptions) {
      _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.loadImage(url).then(function (img) {
        callback && callback(new RococoImage(img, imgOptions));
      });
    }
  }]);

  return RococoImage;
}(_base_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);
RococoImage.async = true;

/***/ }),

/***/ "../core/2d/src/entities/elements/line.entity.ts":
/*!*******************************************************!*\
  !*** ../core/2d/src/entities/elements/line.entity.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Line": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var _base_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/shape */ "../core/2d/src/base/shape.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/**
 * Produces a function that calculates distance from canvas edge to Line origin.
 */

function makeEdgeToOriginGetter(propertyNames, originValues) {
  var origin = propertyNames.origin,
      axis1 = propertyNames.axis1,
      axis2 = propertyNames.axis2,
      dimension = propertyNames.dimension,
      nearest = originValues.nearest,
      center = originValues.center,
      farthest = originValues.farthest;
  return function () {
    switch (this.get(origin)) {
      case nearest:
        return Math.min(this.get(axis1), this.get(axis2));

      case center:
        return Math.min(this.get(axis1), this.get(axis2)) + 0.5 * this.get(dimension);

      case farthest:
        return Math.max(this.get(axis1), this.get(axis2));
    }
  };
}
/** 线类 */


var Line = /*#__PURE__*/function (_Shape) {
  _inherits(Line, _Shape);

  var _super = _createSuper(Line);

  function Line(points, options) {
    var _this;

    _classCallCheck(this, Line);

    _this = _super.call(this, options);
    _this.type = "line";
    _this.x1 = 0;
    _this.y1 = 0;
    _this.x2 = 0;
    _this.y2 = 0;
    _this.coordProps = {
      x1: 1,
      x2: 1,
      y1: 1,
      y2: 1
    };
    /**
     * @private
     * @return {Number} leftToOriginX Distance from left edge of canvas to originX of Line.
     */

    _this._getLeftToOriginX = makeEdgeToOriginGetter({
      // property names
      origin: "originX",
      axis1: "x1",
      axis2: "x2",
      dimension: "width"
    }, {
      // possible values of origin
      nearest: "left",
      center: "center",
      farthest: "right"
    });
    /**
     * @private
     * @return {Number} topToOriginY Distance from top edge of canvas to originY of Line.
     */

    _this._getTopToOriginY = makeEdgeToOriginGetter({
      // property names
      origin: "originY",
      axis1: "y1",
      axis2: "y2",
      dimension: "height"
    }, {
      // possible values of origin
      nearest: "top",
      center: "center",
      farthest: "bottom"
    });

    if (!points) {
      points = [0, 0, 0, 0];
    }

    _this.x1 = points[0];
    _this.y1 = points[1];
    _this.x2 = points[2];
    _this.y2 = points[3];

    _this._setWidthHeight(options);

    return _this;
  }

  _createClass(Line, [{
    key: "setEnd",
    value: function setEnd(x2, y2) {
      this.x2 = x2;
      this.y2 = y2;
      this.width = Math.abs(this.x2 - this.x1);
      this.height = Math.abs(this.y2 - this.y1);
    }
    /**
     * @private
     * @param {Object} [options] Options
     */

  }, {
    key: "_setWidthHeight",
    value: function _setWidthHeight(options) {
      options || (options = {});
      this.width = Math.abs(this.x2 - this.x1);
      this.height = Math.abs(this.y2 - this.y1);
      this.left = "left" in options ? options.left : this._getLeftToOriginX();
      this.top = "top" in options ? options.top : this._getTopToOriginY();
    }
  }, {
    key: "_render",
    value: function _render(ctx) {
      ctx.beginPath();
      var p = this.calcLinePoints();
      ctx.moveTo(p.x1, p.y1);
      ctx.lineTo(p.x2, p.y2);
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.stroke || ctx.fillStyle;
      ctx.stroke();
    }
  }, {
    key: "toObject",
    value: function toObject(propertiesToInclude) {
      return Object.assign(_get(_getPrototypeOf(Line.prototype), "toObject", this).call(this, propertiesToInclude), {
        rx: this.get("rx") || 0,
        ry: this.get("ry") || 0
      });
    }
    /**
     * This function is an helper for svg import. it returns the center of the object in the svg
     * untransformed coordinates
     * @private
     * @return {Object} center point from element coordinates
     */

  }, {
    key: "_findCenterFromElement",
    value: function _findCenterFromElement() {
      return {
        x: (this.x1 + this.x2) / 2,
        y: (this.y1 + this.y2) / 2
      };
    }
    /**
     * Recalculates line points given width and height
     * @private
     */

  }, {
    key: "calcLinePoints",
    value: function calcLinePoints() {
      var xMult = this.x1 <= this.x2 ? -1 : 1,
          yMult = this.y1 <= this.y2 ? -1 : 1,
          x1 = xMult * this.width * 0.5,
          y1 = yMult * this.height * 0.5,
          x2 = xMult * this.width * -0.5,
          y2 = yMult * this.height * -0.5;
      return {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
      };
    }
  }, {
    key: "_toSVG",
    value: function _toSVG() {
      var p = this.calcLinePoints();
      return ["<line ", "COMMON_PARTS", 'x1="', p.x1, '" y1="', p.y1, '" x2="', p.x2, '" y2="', p.y2, '" />\n'];
    }
  }]);

  return Line;
}(_base_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);

/***/ }),

/***/ "../core/2d/src/entities/elements/path.entity.ts":
/*!*******************************************************!*\
  !*** ../core/2d/src/entities/elements/path.entity.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Path": () => (/* binding */ Path)
/* harmony export */ });
/* harmony import */ var _base_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/shape */ "../core/2d/src/base/shape.ts");
/* harmony import */ var _base_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/utils */ "../core/2d/src/base/utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



/** 路径类 */

var Path = /*#__PURE__*/function (_Shape) {
  _inherits(Path, _Shape);

  var _super = _createSuper(Path);

  function Path(path, options) {
    var _this;

    _classCallCheck(this, Path);

    _this = _super.call(this, options);
    _this.type = "path";
    /**
     * Array of path points
     * @type Array
     * @default
     */

    _this.path = null;
    _this.pathOffset = {
      x: 0,
      y: 0
    };
    _this.coordProps = {
      x1: 1,
      x2: 1,
      y1: 1,
      y2: 1
    };
    _this.path = path;

    _this._setPath(path || [], options);

    var _this$_calcDimensions = _this._calcDimensions(),
        width = _this$_calcDimensions.width,
        height = _this$_calcDimensions.height,
        left = _this$_calcDimensions.left,
        top = _this$_calcDimensions.top;

    _this.width = width;
    _this.height = height;
    _this.left = left;
    _this.top = top;
    _this.pathOffset = {
      x: width / 2,
      y: height / 2
    };
    _this.top = options.top;
    _this.left = options.left;
    return _this;
  }

  _createClass(Path, [{
    key: "_setPath",
    value: function _setPath(path, options) {// this.path = Util.makePathSimpler(
      //   Array.isArray(path) ? path : Util.parsePath(path)
      // );
      // fabric.Polyline.prototype._setPositionDimensions.call(this, options || {});
    }
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */

  }, {
    key: "_renderPathCommands",
    value: function _renderPathCommands(ctx) {
      var current,
          // current instruction
      subpathStartX = 0,
          subpathStartY = 0,
          x = 0,
          // current x
      y = 0,
          // current y
      controlX = 0,
          // current control point x
      controlY = 0,
          // current control point y
      l = -this.pathOffset.x,
          t = -this.pathOffset.y;
      ctx.beginPath();

      for (var i = 0, len = this.path.length; i < len; ++i) {
        current = this.path[i];

        switch (current[0] // first letter
        ) {
          case "L":
            // lineto, absolute
            x = current[1];
            y = current[2];
            ctx.lineTo(x + l, y + t);
            break;

          case "M":
            // moveTo, absolute
            x = current[1];
            y = current[2];
            subpathStartX = x;
            subpathStartY = y;
            ctx.moveTo(x + l, y + t);
            break;

          case "C":
            // bezierCurveTo, absolute
            x = current[5];
            y = current[6];
            controlX = current[3];
            controlY = current[4];
            ctx.bezierCurveTo(current[1] + l, current[2] + t, controlX + l, controlY + t, x + l, y + t);
            break;

          case "Q":
            // quadraticCurveTo, absolute
            ctx.quadraticCurveTo(current[1] + l, current[2] + t, current[3] + l, current[4] + t);
            x = current[3];
            y = current[4];
            controlX = current[1];
            controlY = current[2];
            break;

          case "z":
          case "Z":
            x = subpathStartX;
            y = subpathStartY;
            ctx.closePath();
            break;
        }
      }

      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.stroke || ctx.fillStyle;
      ctx.stroke();
    }
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */

  }, {
    key: "_render",
    value: function _render(ctx) {
      this._renderPathCommands(ctx); // this._renderPaintInOrder(ctx);

    }
    /**
     * Returns string representation of an instance
     * @return {String} string representation of an instance
     */

  }, {
    key: "toString",
    value: function toString() {
      return "#<Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>";
    }
    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    //   toObject(propertiesToInclude) {
    // return extend(this.callSuper("toObject", propertiesToInclude), {
    //   path: this.path.map(function (item) {
    //     return item.slice();
    //   }),
    // });
    //   }

    /**
     * Returns dataless object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */

  }, {
    key: "toDatalessObject",
    value: function toDatalessObject(propertiesToInclude) {
      var o = this.toObject(["sourcePath"].concat(propertiesToInclude));

      if (o.sourcePath) {
        delete o.path;
      }

      return o;
    }
    /* _TO_SVG_START_ */

    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    //   _toSVG() {
    // var path = fabric.util.joinPath(this.path);
    // return [
    //   "<path ",
    //   "COMMON_PARTS",
    //   'd="',
    //   path,
    //   '" stroke-linecap="round" ',
    //   "/>\n",
    // ];
    //   }

  }, {
    key: "_getOffsetTransform",
    value: function _getOffsetTransform() {// var digits = fabric.Object.NUM_FRACTION_DIGITS;
      // return ' translate(' + toFixed(-this.pathOffset.x, digits) + ', ' +
      //     toFixed(-this.pathOffset.y, digits) + ')';
    }
    /**
     * Returns svg clipPath representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */

  }, {
    key: "toClipPathSVG",
    value: function toClipPathSVG(reviver) {// var additionalTransform = this._getOffsetTransform();
      // return '\t' + this._createBaseClipPathSVGMarkup(
      //   this._toSVG(), { reviver: reviver, additionalTransform: additionalTransform }
      // );
    }
    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */

  }, {
    key: "toSVG",
    value: function toSVG(reviver) {// var additionalTransform = this._getOffsetTransform();
      // return this._createBaseSVGMarkup(this._toSVG(), {
      //   reviver: reviver,
      //   additionalTransform: additionalTransform,
      // });
    }
    /* _TO_SVG_END_ */

    /**
     * Returns number representation of an instance complexity
     * @return {Number} complexity of this instance
     */

  }, {
    key: "complexity",
    value: function complexity() {
      return this.path.length;
    }
    /**
     * @private
     */

  }, {
    key: "_calcDimensions",
    value: function _calcDimensions() {
      var aX = [],
          aY = [],
          current,
          // current instruction
      subpathStartX = 0,
          subpathStartY = 0,
          x = 0,
          // current x
      y = 0,
          // current y
      bounds;

      for (var i = 0, len = this.path.length; i < len; ++i) {
        current = this.path[i];

        switch (current[0] // first letter
        ) {
          case "L":
            // lineto, absolute
            x = current[1];
            y = current[2];
            bounds = [];
            break;

          case "M":
            // moveTo, absolute
            x = current[1];
            y = current[2];
            subpathStartX = x;
            subpathStartY = y;
            bounds = [];
            break;

          case "C":
            // bezierCurveTo, absolute
            bounds = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.getBoundsOfCurve(x, y, current[1], current[2], current[3], current[4], current[5], current[6]);
            x = current[5];
            y = current[6];
            break;

          case "Q":
            // quadraticCurveTo, absolute
            bounds = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.getBoundsOfCurve(x, y, current[1], current[2], current[1], current[2], current[3], current[4]);
            x = current[3];
            y = current[4];
            break;

          case "z":
          case "Z":
            x = subpathStartX;
            y = subpathStartY;
            break;
        }

        bounds.forEach(function (point) {
          aX.push(point.x);
          aY.push(point.y);
        });
        aX.push(x);
        aY.push(y);
      }

      var minX = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.min(aX) || 0,
          minY = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.min(aY) || 0,
          maxX = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.max(aX) || 0,
          maxY = _base_utils__WEBPACK_IMPORTED_MODULE_1__.Util.max(aY) || 0,
          deltaX = maxX - minX,
          deltaY = maxY - minY;
      return {
        left: minX,
        top: minY,
        width: deltaX,
        height: deltaY
      };
    }
  }]);

  return Path;
}(_base_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);

/***/ }),

/***/ "../core/2d/src/entities/elements/rect.entity.ts":
/*!*******************************************************!*\
  !*** ../core/2d/src/entities/elements/rect.entity.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => (/* binding */ Rect)
/* harmony export */ });
/* harmony import */ var _base_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/shape */ "../core/2d/src/base/shape.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/** 矩形类 */

var Rect = /*#__PURE__*/function (_Shape) {
  _inherits(Rect, _Shape);

  var _super = _createSuper(Rect);

  function Rect(options) {
    var _this;

    _classCallCheck(this, Rect);

    _this = _super.call(this, options);
    _this.type = "rect";
    /** 圆角 rx */

    _this.rx = 0;
    /** 圆角 ry */

    _this.ry = 0;

    _this._initStateProperties();

    _this._initRxRy(options);

    return _this;
  }

  _createClass(Rect, [{
    key: "_initStateProperties",
    value: function _initStateProperties() {
      this.stateProperties = this.stateProperties.concat(["rx", "ry"]);
    }
    /** 初始化圆角 */

  }, {
    key: "_initRxRy",
    value: function _initRxRy(options) {
      this.rx = options.rx || 0;
      this.ry = options.ry || 0;
      /** 如果 rx 或者 ry 只传了一个，默认二者相等 */

      if (this.rx && !this.ry) {
        this.ry = this.rx;
      } else if (this.ry && !this.rx) {
        this.rx = this.ry;
      }
    }
  }, {
    key: "_render",
    value: function _render(ctx) {
      var rx = this.rx || 0,
          ry = this.ry || 0,
          x = -this.width / 2,
          y = -this.height / 2,
          w = this.width,
          h = this.height; // 绘制一个新的东西，大部分情况下都要开启一个新路径，要养成习惯

      ctx.beginPath(); // if (this.transformMatrix && this.group) {
      //     ctx.translate(this.width / 2, this.height / 2);
      // }
      // if (!this.transformMatrix && this.group) {
      //     ctx.translate(-this.group.width / 2 + this.width / 2, -this.group.height / 2 + this.height / 2);
      // }

      if (this.group) ctx.translate(-this.group.width / 2 + this.width / 2, -this.group.height / 2 + this.height / 2); // 从左上角开始顺时针画矩形，这里就是单纯的绘制一个规规矩矩的矩形，不考虑旋转缩放啥的，因为旋转缩放会在调用 _render 函数之前处理

      ctx.moveTo(x + rx, y);
      ctx.lineTo(x + w - rx, y);
      ctx.bezierCurveTo(x + w, y, x + w, y + ry, x + w, y + ry);
      ctx.lineTo(x + w, y + h - ry);
      ctx.bezierCurveTo(x + w, y + h, x + w - rx, y + h, x + w - rx, y + h);
      ctx.lineTo(x + rx, y + h);
      ctx.bezierCurveTo(x, y + h, x, y + h - ry, x, y + h - ry);
      ctx.lineTo(x, y + ry);
      ctx.bezierCurveTo(x, y, x + rx, y, x + rx, y);
      ctx.closePath();
      if (this.fill) ctx.fill();
      if (this.stroke) ctx.stroke();
    }
  }, {
    key: "toObject",
    value: function toObject(propertiesToInclude) {
      return Object.assign(_get(_getPrototypeOf(Rect.prototype), "toObject", this).call(this, propertiesToInclude), {
        rx: this.get("rx") || 0,
        ry: this.get("ry") || 0
      });
    }
  }, {
    key: "_toSVG",
    value: function _toSVG() {
      var x = -this.width / 2,
          y = -this.height / 2;
      return ["<rect ", 'x="', x, '" y="', y, '" rx="', this.rx, '" ry="', this.ry, '" width="', this.width, '" height="', this.height, '" />\n'];
    }
  }]);

  return Rect;
}(_base_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);

/***/ }),

/***/ "../core/2d/src/entities/elements/text.entity.ts":
/*!*******************************************************!*\
  !*** ../core/2d/src/entities/elements/text.entity.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _base_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base/shape */ "../core/2d/src/base/shape.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


/** 文字类 */

var Text = /*#__PURE__*/function (_Shape) {
  _inherits(Text, _Shape);

  var _super = _createSuper(Text);

  function Text(text, options) {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this, options);
    _this.type = "text";
    _this.text = text;
    return _this;
  }

  _createClass(Text, [{
    key: "_render",
    value: function _render(ctx) {
      ctx.font = "22px sans-serif"; // 字符分隔为数组

      var arrText = this.text.split("");
      var line = "";
      var x = -(this.width / 2);
      var y = -(this.height / 2);
      var lineNumber = 1; // 用来处理分行逻辑

      for (var n = 0; n < arrText.length; n++) {
        var textLine = line + arrText[n];
        var metrics = ctx.measureText(textLine);
        var textWidth = metrics.width;

        if (textWidth > this.width && n > 0) {
          ctx.fillText(line, x, y);
          line = arrText[n];
          y += this.lineHeight;
          lineNumber++;
        } else {
          line = textLine;
        }
      }

      ctx.fillText(line, x, y); // 从新计算高度

      this.height = lineNumber * this.lineHeight;
    }
  }]);

  return Text;
}(_base_shape__WEBPACK_IMPORTED_MODULE_0__.Shape);

/***/ }),

/***/ "../core/2d/src/index.ts":
/*!*******************************!*\
  !*** ../core/2d/src/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrushWidget": () => (/* reexport safe */ _widgets_brush_widget__WEBPACK_IMPORTED_MODULE_8__.BrushWidget),
/* harmony export */   "Line": () => (/* reexport safe */ _entities_elements_line_entity__WEBPACK_IMPORTED_MODULE_2__.Line),
/* harmony export */   "LineDrawWidget": () => (/* reexport safe */ _widgets_line_draw_widget__WEBPACK_IMPORTED_MODULE_9__.LineDrawWidget),
/* harmony export */   "Path": () => (/* reexport safe */ _entities_elements_path_entity__WEBPACK_IMPORTED_MODULE_3__.Path),
/* harmony export */   "Rect": () => (/* reexport safe */ _entities_elements_rect_entity__WEBPACK_IMPORTED_MODULE_1__.Rect),
/* harmony export */   "RectDrawWidget": () => (/* reexport safe */ _widgets_rect_draw_widget__WEBPACK_IMPORTED_MODULE_7__.RectDrawWidget),
/* harmony export */   "Rococo2DView": () => (/* reexport safe */ _entities_canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas),
/* harmony export */   "RococoImage": () => (/* reexport safe */ _entities_elements_image_entity__WEBPACK_IMPORTED_MODULE_5__.RococoImage),
/* harmony export */   "Text": () => (/* reexport safe */ _entities_elements_text_entity__WEBPACK_IMPORTED_MODULE_4__.Text),
/* harmony export */   "Widget": () => (/* reexport safe */ _widgets_widget__WEBPACK_IMPORTED_MODULE_6__.Widget),
/* harmony export */   "ZoomWidget": () => (/* reexport safe */ _widgets_zoom_widget__WEBPACK_IMPORTED_MODULE_10__.ZoomWidget)
/* harmony export */ });
/* harmony import */ var _entities_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/canvas */ "../core/2d/src/entities/canvas.ts");
/* harmony import */ var _entities_elements_rect_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/elements/rect.entity */ "../core/2d/src/entities/elements/rect.entity.ts");
/* harmony import */ var _entities_elements_line_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/elements/line.entity */ "../core/2d/src/entities/elements/line.entity.ts");
/* harmony import */ var _entities_elements_path_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/elements/path.entity */ "../core/2d/src/entities/elements/path.entity.ts");
/* harmony import */ var _entities_elements_text_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/elements/text.entity */ "../core/2d/src/entities/elements/text.entity.ts");
/* harmony import */ var _entities_elements_image_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities/elements/image.entity */ "../core/2d/src/entities/elements/image.entity.ts");
/* harmony import */ var _widgets_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widgets/widget */ "../core/2d/src/widgets/widget.ts");
/* harmony import */ var _widgets_rect_draw_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widgets/rect-draw.widget */ "../core/2d/src/widgets/rect-draw.widget.ts");
/* harmony import */ var _widgets_brush_widget__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./widgets/brush.widget */ "../core/2d/src/widgets/brush.widget.ts");
/* harmony import */ var _widgets_line_draw_widget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./widgets/line-draw.widget */ "../core/2d/src/widgets/line-draw.widget.ts");
/* harmony import */ var _widgets_zoom_widget__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./widgets/zoom.widget */ "../core/2d/src/widgets/zoom.widget.ts");












/***/ }),

/***/ "../core/2d/src/plugins/default.plugin.ts":
/*!************************************************!*\
  !*** ../core/2d/src/plugins/default.plugin.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** 一些鼠标样式 */
var CursorStyle;

(function (CursorStyle) {
  CursorStyle["default"] = "default";
  CursorStyle["move"] = "move";
  CursorStyle["hover"] = "move";
  CursorStyle["rotation"] = "crosshair";
})(CursorStyle || (CursorStyle = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mouseDown: function mouseDown(_ref, next) {
    var e = _ref.e,
        pointer = _ref.pointer,
        rococo2d = _ref.rococo2d;
    next();
    if (rococo2d.action !== "default") return; // 只处理左键点击，要么是拖蓝事件、要么是点选事件

    var isLeftClick = "which" in e ? e.which === 1 : e.button === 1;
    if (!isLeftClick) return; // 这个我猜是为了保险起见，ignore if some object is being transformed at rococo2d moment

    if (rococo2d._currentTransform) return;
    var target = rococo2d.findTarget(e);
    var corner;
    rococo2d._previousPointer = pointer;

    if (rococo2d.shouldClearSelection(e)) {
      // 如果是拖蓝选区事件
      rococo2d._groupSelector = {
        // 重置选区状态`
        ex: pointer.x,
        ey: pointer.y,
        top: 0,
        left: 0
      }; // 让所有元素失去激活状态

      rococo2d.deactivateAllWithDispatch();
    } else {
      // 如果是点选操作，接下来就要为各种变换做准备
      target.saveState(); // 判断点击的是不是控制点

      corner = target._findTargetCorner(e, rococo2d._offset);

      if (rococo2d.shouldHandleGroupLogic(e, target)) {
        // 如果是选中组
        rococo2d.handleGroupLogic(e, target);
        target = rococo2d.getActiveGroup();
      } else {
        // 如果是选中单个物体
        if (target !== rococo2d.getActiveGroup()) {
          rococo2d.deactivateAll();
        }

        rococo2d.setActiveObject(target, e);
      }

      rococo2d.setupCurrentTransform(e, target);
    } // 不论是拖蓝选区事件还是点选事件，都需要重新绘制
    // 拖蓝选区：需要把之前激活的物体取消选中态
    // 点选事件：需要把当前激活的物体置顶


    rococo2d.renderAll();
  },
  mouseMove: function mouseMove(_ref2, next) {
    var e = _ref2.e,
        pointer = _ref2.pointer,
        rococo2d = _ref2.rococo2d;
    next();
    if (rococo2d.action !== "default") return;
    var target;
    var groupSelector = rococo2d._groupSelector;

    if (groupSelector) {
      // 如果有拖蓝框选区域
      groupSelector.left = pointer.x - rococo2d._offset.left - groupSelector.ex;
      groupSelector.top = pointer.y - rococo2d._offset.top - groupSelector.ey;
      rococo2d.renderTop();
    } else if (!rococo2d._currentTransform) {
      // 如果是 hover 事件，这里我们只需要改变鼠标样式，并不会重新渲染
      var style = rococo2d.topCanvas.style;
      target = rococo2d.findTarget(e);

      if (target) {
        rococo2d.setCursorFromEvent(e, target);
      } else {
        style.cursor = CursorStyle.default;
      }
    } else {
      // 如果是旋转、缩放、平移等操作
      var x = pointer.x,
          y = pointer.y;
      rococo2d._currentTransform.target.isMoving = true;
      var t = rococo2d._currentTransform,
          reset = false;

      if (rococo2d._currentTransform.action === "rotate") {
        // 如果是旋转操作
        rococo2d.rotateObject(x, y);
      } else if (rococo2d._currentTransform.action === "scale") {
        // 如果是整体缩放操作
        if (e.shiftKey) {
          rococo2d._currentTransform.currentAction = "scale";
          rococo2d.scaleObject(x, y);
        } else {
          if (!reset && t.currentAction === "scale") {
            rococo2d.resetCurrentTransform(e);
          }

          rococo2d._currentTransform.currentAction = "scaleEqually";
          rococo2d.scaleObject(x, y, "equally");
        }
      } else if (rococo2d._currentTransform.action === "scaleX") {
        // 如果只是缩放 x
        rococo2d.scaleObject(x, y, "x");
      } else if (rococo2d._currentTransform.action === "scaleY") {
        // 如果只是缩放 y
        rococo2d.scaleObject(x, y, "y");
      } else {
        // 如果是拖拽物体
        rococo2d.translateObject(x, y);
        rococo2d.setCursor(CursorStyle.move);
      }

      rococo2d.renderAll();
    }
  },
  mouseUp: function mouseUp(_ref3, next) {
    var e = _ref3.e,
        rococo2d = _ref3.rococo2d;
    next();
    if (rococo2d.action !== "default") return;
    var target;

    if (rococo2d._currentTransform) {
      var transform = rococo2d._currentTransform;
      target = transform.target;

      if (target._scaling) {
        target._scaling = false;
      } // 每次物体更改都要重新计算新的控制点


      var i = rococo2d._shapes.length;

      while (i--) {
        rococo2d._shapes[i].setCoords();
      }

      target.isMoving = false; // 在点击之间如果物体状态改变了才派发事件

      if (target.hasStateChanged()) {// rococo2d.emit("object:modified", { target });
        // target.emit("modified");
      }
    }

    rococo2d._currentTransform = null;

    if (rococo2d._groupSelector) {
      // 如果有拖蓝框选区域
      rococo2d.findSelectedObjects(e);
    }

    var activeGroup = rococo2d.getActiveGroup();

    if (activeGroup) {
      //重新设置 激活组 中的物体
      activeGroup.setObjectsCoords();
      activeGroup.set("isMoving", false);
      rococo2d.setCursor(CursorStyle.default);
    }

    rococo2d._groupSelector = null;
    rococo2d.renderAll();
    rococo2d.setCursorFromEvent(e, target);
  },
  mouseWheel: function mouseWheel(_ref4, next) {
    var e = _ref4.e,
        pointer = _ref4.pointer,
        rococo2d = _ref4.rococo2d;
    var b = true;

    if (e.wheelDelta) {
      b = e.wheelDelta > 0;
    } else {
      b = e.detail < 0;
    }

    if (b) {
      rococo2d.zoomIn(true, pointer);
    } else {
      rococo2d.zoomOut(true, pointer);
    }

    next();
  }
});

/***/ }),

/***/ "../core/2d/src/plugins/move.plugin.ts":
/*!*********************************************!*\
  !*** ../core/2d/src/plugins/move.plugin.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** 一些鼠标样式 */
var CursorStyle;

(function (CursorStyle) {
  CursorStyle["default"] = "default";
  CursorStyle["move"] = "move";
  CursorStyle["hover"] = "move";
  CursorStyle["rotation"] = "crosshair";
  CursorStyle["grab"] = "grab";
})(CursorStyle || (CursorStyle = {}));

var position = {
  x: 0,
  y: 0
};
var dragStart = false; // 是否是通过滚轮点击切换至 grab 状态

var isMouseWheelGrab = false;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mouseDown: function mouseDown(_ref, next) {
    var e = _ref.e,
        pointer = _ref.pointer,
        rococo2d = _ref.rococo2d;
    next(); // 滚轮点击会将操作转台转化为 grab

    if (e.buttons === 4) {
      rococo2d.action = "grab";
      isMouseWheelGrab = true;
    }

    if (rococo2d.action !== "grab") return;
    rococo2d.setCursor(CursorStyle.grab);
    position.x = pointer.x;
    position.y = pointer.y;
    dragStart = true;
  },
  mouseMove: function mouseMove(_ref2, next) {
    var pointer = _ref2.pointer,
        rococo2d = _ref2.rococo2d;
    next();
    if (rococo2d.action !== "grab") return;
    if (!dragStart) return;
    rococo2d._canvasOffset.left += pointer.x - position.x;
    rococo2d._canvasOffset.top += pointer.y - position.y;
    rococo2d.renderAll();
  },
  mouseUp: function mouseUp(_ref3, next) {
    var rococo2d = _ref3.rococo2d;
    next();
    if (rococo2d.action !== "grab") return;
    position.x = 0;
    position.y = 0;
    dragStart = false;

    if (isMouseWheelGrab) {
      isMouseWheelGrab = false;
      rococo2d.action = "default";
      rococo2d.setCursor(CursorStyle.default);
    }
  }
});

/***/ }),

/***/ "../core/2d/src/widgets/brush.widget.ts":
/*!**********************************************!*\
  !*** ../core/2d/src/widgets/brush.widget.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrushWidget": () => (/* binding */ BrushWidget)
/* harmony export */ });
/* harmony import */ var _entities_elements_path_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/elements/path.entity */ "../core/2d/src/entities/elements/path.entity.ts");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../core/2d/src/widgets/widget.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var brushSvg = '<svg focusable="false" class="" data-icon="highlight" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M957.6 507.4L603.2 158.2a7.9 7.9 0 00-11.2 0L353.3 393.4a8.03 8.03 0 00-.1 11.3l.1.1 40 39.4-117.2 115.3a8.03 8.03 0 00-.1 11.3l.1.1 39.5 38.9-189.1 187H72.1c-4.4 0-8.1 3.6-8.1 8V860c0 4.4 3.6 8 8 8h344.9c2.1 0 4.1-.8 5.6-2.3l76.1-75.6 40.4 39.8a7.9 7.9 0 0011.2 0l117.1-115.6 40.1 39.5a7.9 7.9 0 0011.2 0l238.7-235.2c3.4-3 3.4-8 .3-11.2zM389.8 796.2H229.6l134.4-133 80.1 78.9-54.3 54.1zm154.8-62.1L373.2 565.2l68.6-67.6 171.4 168.9-68.6 67.6zM713.1 658L450.3 399.1 597.6 254l262.8 259-147.3 145z"></path></svg>';
var BrushWidget = /*#__PURE__*/function (_Widget) {
  _inherits(BrushWidget, _Widget);

  var _super = _createSuper(BrushWidget);

  function BrushWidget() {
    var _this;

    _classCallCheck(this, BrushWidget);

    _this = _super.apply(this, arguments);
    _this.innerHTML = "\n      <style>\n      .widget-btn {\n          height: 36px;\n          width: 36px;\n          color: #8638e5;\n          background-color: #ffffff;\n          font-weight: 400;\n          font-size: 16px;\n          border-radius: 50%;\n          cursor: pointer;\n          path-height: 1.499;\n          position: relative;\n          display: inline-block;\n          font-weight: 500;\n          white-space: nowrap;\n          text-align: center;\n          background-image: none;\n          border: 1px solid transparent;\n          cursor: pointer;\n          transition: all .3s cubic-bezier(.645,.045,.355,1);\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          user-select: none;\n          touch-action: manipulation;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          margin: 10px;\n          box-shadow: 0 0 3px #000000;\n      }\n      .widget-btn:hover{\n          background-color: #f0f0f0;\n      }\n    </style>\n    <button id=\"brush-widget\" class=\"widget-btn\">\n      ".concat(brushSvg, "\n    </button>\n  ");
    _this.isDrawingLine = false;
    return _this;
  }

  _createClass(BrushWidget, [{
    key: "onMounted",
    value: function onMounted() {
      this.dom.querySelector("#brush-widget").onclick = this.onClick.bind(this);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(_ref, next) {
      var rococo2d = _ref.rococo2d,
          pointer = _ref.pointer;

      if (this.isDrawingLine) {
        // 让所有元素失去激活状态
        rococo2d.deactivateAllWithDispatch();
        rococo2d.renderAll();
        var x = pointer.x,
            y = pointer.y;
        this.path = new _entities_elements_path_entity__WEBPACK_IMPORTED_MODULE_0__.Path([0, 0, 0, 0], {
          top: y,
          left: x,
          strokeWidth: 2,
          originX: "left",
          originY: "top"
        });
        this.path.setupState();
        this.path.setCoords();
        this.path.canvas = rococo2d;
        rococo2d.renderTop([this.path]);
        return;
      } else {
        next();
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(_ref2, next) {
      var pointer = _ref2.pointer,
          rococo2d = _ref2.rococo2d;

      if (this.isDrawingLine && this.path) {
        var x = pointer.x,
            y = pointer.y;
        this.path.setEnd(x - this.path.left, y - this.path.top);
        rococo2d.renderTop([this.path]);
        return;
      } else {
        next();
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(_ref3, next) {
      var rococo2d = _ref3.rococo2d;

      if (this.isDrawingLine) {
        rococo2d._shapes.push(this.path);

        rococo2d.renderAll();
        this.path = null; // 取消高亮

        rococo2d.renderTop();
        this.rococo2d._activeGroup = null;
        this.onClick();
        return;
      } else {
        next();
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (!this.isDrawingLine) {
        console.log("开始绘制");
        this.rococo2d.setCursor("crosshair");
        this.rococo2d.action = "draw";
        this.isDrawingLine = true;
      } else {
        console.log("结束绘制");
        this.rococo2d.setCursor("default");
        this.rococo2d.action = "default";
        this.isDrawingLine = false;
      }
    }
  }]);

  return BrushWidget;
}(_widget__WEBPACK_IMPORTED_MODULE_1__.Widget);

/***/ }),

/***/ "../core/2d/src/widgets/line-draw.widget.ts":
/*!**************************************************!*\
  !*** ../core/2d/src/widgets/line-draw.widget.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineDrawWidget": () => (/* binding */ LineDrawWidget)
/* harmony export */ });
/* harmony import */ var _entities_elements_line_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/elements/line.entity */ "../core/2d/src/entities/elements/line.entity.ts");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../core/2d/src/widgets/widget.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var brushSvg = '<svg focusable="false" class="" data-icon="highlight" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M957.6 507.4L603.2 158.2a7.9 7.9 0 00-11.2 0L353.3 393.4a8.03 8.03 0 00-.1 11.3l.1.1 40 39.4-117.2 115.3a8.03 8.03 0 00-.1 11.3l.1.1 39.5 38.9-189.1 187H72.1c-4.4 0-8.1 3.6-8.1 8V860c0 4.4 3.6 8 8 8h344.9c2.1 0 4.1-.8 5.6-2.3l76.1-75.6 40.4 39.8a7.9 7.9 0 0011.2 0l117.1-115.6 40.1 39.5a7.9 7.9 0 0011.2 0l238.7-235.2c3.4-3 3.4-8 .3-11.2zM389.8 796.2H229.6l134.4-133 80.1 78.9-54.3 54.1zm154.8-62.1L373.2 565.2l68.6-67.6 171.4 168.9-68.6 67.6zM713.1 658L450.3 399.1 597.6 254l262.8 259-147.3 145z"></path></svg>';
var LineDrawWidget = /*#__PURE__*/function (_Widget) {
  _inherits(LineDrawWidget, _Widget);

  var _super = _createSuper(LineDrawWidget);

  function LineDrawWidget() {
    var _this;

    _classCallCheck(this, LineDrawWidget);

    _this = _super.apply(this, arguments);
    _this.innerHTML = "\n      <style>\n      .widget-btn {\n          height: 36px;\n          width: 36px;\n          color: #8638e5;\n          background-color: #ffffff;\n          font-weight: 400;\n          font-size: 16px;\n          border-radius: 50%;\n          cursor: pointer;\n          line-height: 1.499;\n          position: relative;\n          display: inline-block;\n          font-weight: 500;\n          white-space: nowrap;\n          text-align: center;\n          background-image: none;\n          border: 1px solid transparent;\n          cursor: pointer;\n          transition: all .3s cubic-bezier(.645,.045,.355,1);\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          user-select: none;\n          touch-action: manipulation;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          margin: 10px;\n          box-shadow: 0 0 3px #000000;\n      }\n      .widget-btn:hover{\n          background-color: #f0f0f0;\n      }\n    </style>\n    <button id=\"brush-widget\" class=\"widget-btn\">\n      ".concat(brushSvg, "\n    </button>\n  ");
    _this.isDrawingLine = false;
    return _this;
  }

  _createClass(LineDrawWidget, [{
    key: "onMounted",
    value: function onMounted() {
      this.dom.querySelector("#brush-widget").onclick = this.onClick.bind(this);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(_ref, next) {
      var rococo2d = _ref.rococo2d,
          pointer = _ref.pointer;

      if (this.isDrawingLine) {
        // 让所有元素失去激活状态
        rococo2d.deactivateAllWithDispatch();
        rococo2d.renderAll();
        var x = pointer.x,
            y = pointer.y;
        this.line = new _entities_elements_line_entity__WEBPACK_IMPORTED_MODULE_0__.Line([0, 0, 0, 0], {
          top: y,
          left: x,
          strokeWidth: 2,
          originX: "left",
          originY: "top"
        });
        this.line.setupState();
        this.line.setCoords();
        this.line.canvas = rococo2d;
        rococo2d.renderTop([this.line]);
        return;
      } else {
        next();
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(_ref2, next) {
      var pointer = _ref2.pointer,
          rococo2d = _ref2.rococo2d;

      if (this.isDrawingLine && this.line) {
        var x = pointer.x,
            y = pointer.y;
        this.line.setEnd(x - this.line.left, y - this.line.top);
        rococo2d.renderTop([this.line]);
        return;
      } else {
        next();
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(_ref3, next) {
      var rococo2d = _ref3.rococo2d;

      if (this.isDrawingLine) {
        rococo2d._shapes.push(this.line);

        rococo2d.renderAll();
        this.line = null; // 取消高亮

        rococo2d.renderTop();
        this.rococo2d._activeGroup = null;
        this.onClick();
        return;
      } else {
        next();
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (!this.isDrawingLine) {
        console.log("开始绘制");
        this.rococo2d.setCursor("crosshair");
        this.rococo2d.action = "draw";
        this.isDrawingLine = true;
      } else {
        console.log("结束绘制");
        this.rococo2d.setCursor("default");
        this.rococo2d.action = "default";
        this.isDrawingLine = false;
      }
    }
  }]);

  return LineDrawWidget;
}(_widget__WEBPACK_IMPORTED_MODULE_1__.Widget);

/***/ }),

/***/ "../core/2d/src/widgets/rect-draw.widget.ts":
/*!**************************************************!*\
  !*** ../core/2d/src/widgets/rect-draw.widget.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RectDrawWidget": () => (/* binding */ RectDrawWidget)
/* harmony export */ });
/* harmony import */ var _entities_elements_rect_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/elements/rect.entity */ "../core/2d/src/entities/elements/rect.entity.ts");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../core/2d/src/widgets/widget.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



var rectDrawSvg = '<svg focusable="false" class="" data-icon="border" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>';
/**
 * 矩形绘制挂件
 */

var RectDrawWidget = /*#__PURE__*/function (_Widget) {
  _inherits(RectDrawWidget, _Widget);

  var _super = _createSuper(RectDrawWidget);

  function RectDrawWidget() {
    var _this;

    _classCallCheck(this, RectDrawWidget);

    _this = _super.apply(this, arguments);
    _this.innerHTML = "\n    <style>\n      .widget-btn {\n          height: 36px;\n          width: 36px;\n          color: #8638e5;\n          background-color: #ffffff;\n          font-weight: 400;\n          font-size: 16px;\n          border-radius: 50%;\n          cursor: pointer;\n          line-height: 1.499;\n          position: relative;\n          display: inline-block;\n          font-weight: 500;\n          white-space: nowrap;\n          text-align: center;\n          background-image: none;\n          border: 1px solid transparent;\n          cursor: pointer;\n          transition: all .3s cubic-bezier(.645,.045,.355,1);\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          user-select: none;\n          touch-action: manipulation;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          margin: 10px;\n          box-shadow: 0 0 2px #000000;\n      }\n      .widget-btn:hover{\n          background-color: #f0f0f0;\n      }\n    </style>\n    <button id=\"rect-draw-widget\" class=\"widget-btn\">\n      ".concat(rectDrawSvg, "\n    </button>\n  ");
    _this.isDrawingRect = false;
    return _this;
  }

  _createClass(RectDrawWidget, [{
    key: "mouseDown",
    value: function mouseDown(_ref, next) {
      var rococo2d = _ref.rococo2d,
          pointer = _ref.pointer;
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isDrawingRect) {
                  _context.next = 7;
                  break;
                }

                rococo2d._groupSelector = {
                  // 重置选区状态
                  ex: pointer.x,
                  ey: pointer.y,
                  top: 0,
                  left: 0
                }; // 让所有元素失去激活状态

                rococo2d.deactivateAllWithDispatch();
                rococo2d.renderAll();
                return _context.abrupt("return");

              case 7:
                _context.next = 9;
                return next();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(_ref2, next) {
      var pointer = _ref2.pointer,
          rococo2d = _ref2.rococo2d;
      var groupSelector = rococo2d._groupSelector;

      if (this.isDrawingRect) {
        if (groupSelector) {
          // 如果有拖蓝框选区域
          groupSelector.left = pointer.x - rococo2d._offset.left - groupSelector.ex;
          groupSelector.top = pointer.y - rococo2d._offset.top - groupSelector.ey;
          rococo2d.renderTop();
        }

        return;
      } else {
        next();
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(_ref3, next) {
      var rococo2d = _ref3.rococo2d;

      if (this.isDrawingRect) {
        console.log(rococo2d._groupSelector);
        var _rococo2d$_groupSelec = rococo2d._groupSelector,
            ex = _rococo2d$_groupSelec.ex,
            ey = _rococo2d$_groupSelec.ey,
            left = _rococo2d$_groupSelec.left,
            top = _rococo2d$_groupSelec.top; // 绘制新增出来的矩形

        var rect = new _entities_elements_rect_entity__WEBPACK_IMPORTED_MODULE_0__.Rect({
          top: ey + top / 2,
          left: ex + left / 2,
          width: left,
          height: top,
          fill: "#0c99ff50",
          stroke: "#0c99ff"
        });

        rococo2d._shapes.push(rect);

        rect.setupState();
        rect.setCoords();
        rect.canvas = rococo2d;
        rococo2d.renderAll(); // 取消高亮

        rococo2d._groupSelector = null;
        rococo2d.renderTop();
        this.rococo2d._activeGroup = null;
        this.onClick();
        return;
      } else {
        next();
      }
    } // 挂件成功挂载，为挂件 dom 元素绑定事件

  }, {
    key: "onMounted",
    value: function onMounted() {
      this.dom.querySelector("#rect-draw-widget").onclick = this.onClick.bind(this);
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (!this.isDrawingRect) {
        console.log("开始绘制");
        this.rococo2d.setCursor("crosshair");
        this.rococo2d.action = "draw";
        this.isDrawingRect = true;
      } else {
        console.log("结束绘制");
        this.rococo2d.setCursor("default");
        this.rococo2d.action = "default";
        this.isDrawingRect = false;
      }
    }
  }]);

  return RectDrawWidget;
}(_widget__WEBPACK_IMPORTED_MODULE_1__.Widget);

/***/ }),

/***/ "../core/2d/src/widgets/widget.ts":
/*!****************************************!*\
  !*** ../core/2d/src/widgets/widget.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Widget": () => (/* binding */ Widget)
/* harmony export */ });
/* harmony import */ var _base_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/utils */ "../core/2d/src/base/utils.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Widget = /*#__PURE__*/function () {
  function Widget() {
    _classCallCheck(this, Widget);

    this.innerHTML = "";
    this.style = {};
  }

  _createClass(Widget, [{
    key: "setStyle",
    value: function setStyle(style) {
      for (var key in style) {
        this.style[key] = style[key];
      }

      if (this.dom) {
        _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.setStyle(this.dom, style);
      }

      return this;
    }
  }, {
    key: "mount",
    value: function mount() {
      _base_utils__WEBPACK_IMPORTED_MODULE_0__.Util.setStyle(this.dom, this.style);
      this.onMounted();
    }
  }, {
    key: "onMounted",
    value: function onMounted() {}
  }]);

  return Widget;
}();

/***/ }),

/***/ "../core/2d/src/widgets/zoom.widget.ts":
/*!*********************************************!*\
  !*** ../core/2d/src/widgets/zoom.widget.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZoomWidget": () => (/* binding */ ZoomWidget)
/* harmony export */ });
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widget */ "../core/2d/src/widgets/widget.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var zoomInSvg = '<svg focusable="false" class="" data-icon="zoom-in" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>';
var zoomOutSvg = '<svg focusable="false" class="" data-icon="zoom-out" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>';
/**
 * 矩形绘制挂件
 */

var ZoomWidget = /*#__PURE__*/function (_Widget) {
  _inherits(ZoomWidget, _Widget);

  var _super = _createSuper(ZoomWidget);

  function ZoomWidget() {
    var _this;

    _classCallCheck(this, ZoomWidget);

    _this = _super.apply(this, arguments);
    _this.innerHTML = "\n    <style>\n        .widget-btn {\n            height: 36px;\n            width: 36px;\n            color: #8638e5;\n            background-color: #ffffff;\n            font-weight: 400;\n            font-size: 16px;\n            border-radius: 50%;\n            cursor: pointer;\n            line-height: 1.499;\n            position: relative;\n            display: inline-block;\n            font-weight: 500;\n            white-space: nowrap;\n            text-align: center;\n            background-image: none;\n            border: 1px solid transparent;\n            cursor: pointer;\n            transition: all .3s cubic-bezier(.645,.045,.355,1);\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            user-select: none;\n            touch-action: manipulation;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin: 10px;\n            box-shadow: 0 0 2px #000000;\n        }\n        .widget-btn:hover{\n            background-color: #f0f0f0;\n        }\n    </style>\n    <button id=\"zoom-in-widget\" class=\"widget-btn\" title=\"\u653E\u5927\">\n        ".concat(zoomInSvg, "\n    </button>\n    <button id=\"zoom-out-widget\" class=\"widget-btn\" title=\"\u7F29\u5C0F\">\n        ").concat(zoomOutSvg, "\n    </button>\n  ");
    return _this;
  } // 挂件成功挂载，为挂件 dom 元素绑定事件


  _createClass(ZoomWidget, [{
    key: "onMounted",
    value: function onMounted() {
      this.dom.querySelector("#zoom-in-widget").onclick = this.zoomIn.bind(this);
      this.dom.querySelector("#zoom-out-widget").onclick = this.zoomOut.bind(this);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(_ref, next) {
      var e = _ref.e;
      next();
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      this.rococo2d.zoomIn();
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      this.rococo2d.zoomOut();
    }
  }]);

  return ZoomWidget;
}(_widget__WEBPACK_IMPORTED_MODULE_0__.Widget);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rococojs/2d */ "../core/2d/src/index.ts");
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



window.onload = function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var zoomWidget = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.ZoomWidget().setStyle({
    left: "0px"
  });
  var rectdrawWidget = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.RectDrawWidget().setStyle({
    left: "0px",
    top: "92px"
  });
  var lineDrawWidget = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.LineDrawWidget().setStyle({
    left: "0px",
    top: "138px"
  });
  var canvas = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.Rococo2DView(document.getElementById("canvas"), {
    width: width,
    height: height,
    // scale: 2,
    // preScale: 2,
    widgets: [zoomWidget, rectdrawWidget, lineDrawWidget]
  });
  var rect = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.Rect({
    top: 980,
    left: 500,
    width: 400,
    height: 150,
    fill: "#8920a580",
    rx: 10,
    ry: 10 // angle: 45,

  });
  var line = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.Line([0, 0, 170, 200], {
    top: 400,
    left: 985,
    strokeWidth: 2,
    strokeStyle: "red",
    fillStyle: "red"
  });
  var path = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.Path([["M", 0, 0], ["L", 200, 100], ["L", 170, 200]], {
    fill: null,
    stroke: "red",
    strokeWidth: 2,
    top: 400,
    left: 1000 // strokeLineCap: this.strokeLineCap,
    // strokeMiterLimit: this.strokeMiterLimit,
    // strokeLineJoin: this.strokeLineJoin,
    // strokeDashArray: this.strokeDashArray,

  });
  var text = new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.Text("\uD83C\uDF89\uD83C\uDF89\uD83C\uDF89\uD83C\uDF39\uD83C\uDF39\uD83C\uDF39                 \n    \u6B22\u8FCE\u4F7F\u7528 Rococojs\uFF0C\u60A8\u53EF\u4EE5\u957F\u6309\u6EDA\u8F6E\u62D6\u62FD\u753B\u5E03\u79FB\u52A8\u89C6\u89D2", {
    lineHeight: 28,
    top: 1000,
    left: 500,
    width: 300,
    height: 100
  });
  var imgs = [{
    src: "https://fabrie-prod.oss-cn-shanghai.aliyuncs.com/image/61de5a0bcb60742ee8c98b6b/1642411781348-0.6689313774101535",
    top: 300,
    left: 250,
    width: 300,
    height: 500
  }, {
    src: "https://fabrie-prod.oss-cn-shanghai.aliyuncs.com/image/61de5a0bcb60742ee8c98b6b/1642413324130-0.5006085671887177",
    top: 150,
    left: 600,
    width: 400,
    height: 200
  }, {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-171452-2678.jpg",
    top: 700,
    left: 250,
    width: 300,
    height: 300
  }, {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165904-3a69.jpg",
    top: 400,
    left: 500,
    width: 200,
    height: 300
  }, {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165934-5ad5.jpg",
    top: 400,
    left: 700,
    width: 200,
    height: 300
  }, {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165939-1986.jpg",
    top: 700,
    left: 500,
    width: 200,
    height: 300
  }, {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165947-d938.jpg",
    top: 700,
    left: 700,
    width: 200,
    height: 300
  }].map(function (_a) {
    var src = _a.src,
        ops = __rest(_a, ["src"]);

    var img = new Image();
    img.src = src;
    return new _rococojs_2d__WEBPACK_IMPORTED_MODULE_0__.RococoImage(img, ops);
  });
  imgs.forEach(function (img) {
    canvas.add(img);
  });
  canvas.add(rect).add(path).add(line).add(text);
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBVkE7QUFBQTtBQUFBO0FBWUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBMUJBO0FBQUE7QUFBQTtBQTJCQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBeENBO0FBQUE7QUFBQTtBQTBDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUF0REE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUFBOztBQUFBOztBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQVBBO0FBUUE7QUFDQTs7O0FBVkE7QUFBQTtBQUFBO0FBWUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQXRCQTtBQUFBO0FBQUE7QUF3QkE7QUFDQTtBQUNBOztBQTFCQTtBQUFBO0FBQUE7QUE0QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQWxDQTtBQUFBO0FBQUE7QUFvQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdkNBO0FBQUE7QUFBQTtBQXlDQTtBQUNBO0FBQ0E7QUFDQTs7QUE1Q0E7QUFBQTtBQUFBO0FBOENBOztBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQXJEQTtBQUFBO0FBQUE7QUF1REE7QUFDQTtBQUNBOztBQXpEQTtBQUFBO0FBQUE7QUEyREE7QUFDQTtBQTVEQTtBQUFBO0FBQUE7QUE4REE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFuRkE7QUFBQTtBQUFBO0FBcUZBO0FBQ0E7QUFDQTs7QUF2RkE7QUFBQTtBQUFBO0FBeUZBO0FBQ0E7QUFDQTtBQUNBOztBQTVGQTtBQUFBO0FBQUE7QUE4RkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBNUdBO0FBQUE7QUFBQTtBQThHQTtBQUNBO0FBQ0E7O0FBaEhBO0FBQUE7QUFBQTtBQWtIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdkhBO0FBQUE7QUFBQTtBQXlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBOUhBO0FBQUE7QUFBQTtBQWdJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwSkE7QUFBQTtBQUFBO0FBc0pBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQTNKQTtBQUFBO0FBQUE7QUE2SkE7QUFDQTtBQUNBO0FBL0pBO0FBQUE7QUFBQTtBQWlLQTtBQUNBO0FBQ0E7QUFuS0E7O0FBQUE7QUFBQTtBQXFLQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUtBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOztBQUNBO0FBQ0E7O0FBSEE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBU0E7QUFDQTtBQVZBO0FBQUE7QUFBQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwQkE7QUFBQTtBQUFBO0FBc0JBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQUlBO0FBSkE7QUFNQTs7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBMURBO0FBQUE7QUFBQTtBQTREQTtBQUFBOztBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUF2RUE7QUFBQTtBQUFBO0FBeUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBekZBO0FBQUE7QUFBQTtBQTJGQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFHQTtBQUhBO0FBSUE7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQTFHQTs7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBTEE7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQUNBOztBQVRBO0FBQUE7QUFBQTtBQVdBO0FBQ0E7QUFDQTs7QUFiQTtBQUFBO0FBQUE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQW5CQTtBQUFBO0FBQUE7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUF4QkE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBSUE7O0FBeEVBO0FBeUVBOztBQTFFQTtBQUFBO0FBQUE7QUE0RUE7QUFDQTtBQTdFQTtBQUFBO0FBQUE7QUErRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFuRkE7QUFBQTtBQUFBO0FBb0ZBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUF0SEE7QUFBQTtBQUFBO0FBd0hBO0FBQ0E7QUFDQTtBQUNBOztBQTNIQTtBQUFBO0FBQUE7QUE2SEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXZKQTtBQUFBO0FBQUE7QUF5SkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUEvS0E7QUFBQTtBQUFBO0FBaUxBOztBQUdBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQW5QQTtBQUFBO0FBQUE7QUFxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUE1UEE7QUFBQTtBQUFBO0FBOFBBO0FBQ0E7QUFDQTtBQUNBOztBQWpRQTtBQUFBO0FBQUE7QUFrUUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXhRQTtBQUFBO0FBQUE7QUEwUUE7QUFDQTtBQUNBOztBQTVRQTtBQUFBO0FBQUE7QUE4UUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBelNBO0FBQUE7QUFBQTtBQTJTQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOztBQTVUQTtBQUFBO0FBQUE7QUE4VEE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQTFWQTtBQUFBO0FBQUE7QUE0VkE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQTNXQTtBQUFBO0FBQUE7QUE2V0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQWJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwWUE7QUFBQTtBQUFBO0FBc1lBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFGQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBSkE7QUFLQTs7QUFDQTtBQUNBOztBQUVBOztBQUdBOztBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUE3YUE7QUFBQTtBQUFBO0FBOGFBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFoY0E7QUFBQTtBQUFBO0FBaWNBOztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBcEJBO0FBc0JBO0FBbmVBO0FBQUE7QUFBQTtBQW9lQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTllQTtBQUFBO0FBQUE7QUFnZkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBeGZBO0FBQUE7QUFBQTtBQTBmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQXpoQkE7QUFBQTtBQUFBO0FBMmhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwaUJBO0FBQUE7QUFBQTtBQXNpQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWxqQkE7QUFBQTtBQUFBO0FBb2pCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXBrQkE7QUFBQTtBQUFBO0FBc2tCQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQTFrQkE7QUFBQTtBQUFBO0FBNGtCQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWpsQkE7QUFBQTtBQUFBO0FBbWxCQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQTNsQkE7QUFBQTtBQUFBO0FBNGxCQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBYkE7QUFBQTtBQUFBOztBQWtCQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBMW5CQTtBQUFBO0FBQUE7QUE0bkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQTlyQkE7QUFBQTtBQUFBO0FBZ3NCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFFQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7O0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7O0FBenZCQTtBQUFBO0FBQUE7QUEydkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBYkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQWJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFiQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBYkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQWJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFiQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBYkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQWJBO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFiQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBbjZCQTtBQUFBO0FBQUE7QUFvNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQTtBQXNCQTtBQUNBO0FBQ0E7QUEvN0JBO0FBQUE7QUFBQTtBQWk4QkE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXg4QkE7QUFBQTtBQUFBO0FBMDhCQTtBQUNBO0FBMzhCQTtBQUFBO0FBQUE7QUE2OEJBO0FBQUE7QUFDQTtBQUNBO0FBLzhCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrOUJBO0FBQ0E7QUFuOUJBO0FBQUE7QUFBQTtBQXE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUF0K0JBO0FBQUE7QUFBQTtBQXcrQkE7QUFDQTtBQUNBOztBQTErQkE7QUFBQTtBQUFBO0FBNCtCQTtBQUNBO0FBQ0E7O0FBOStCQTtBQUFBO0FBQUE7QUFnL0JBO0FBQ0E7QUFqL0JBO0FBQUE7QUFBQTtBQW0vQkE7QUFDQTtBQXAvQkE7QUFBQTtBQUFBO0FBcy9CQTtBQUNBO0FBdi9CQTs7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBZUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBcENBO0FBQUE7QUFBQTtBQXNDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFsREE7QUFBQTtBQUFBO0FBb0RBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFJQTtBQUFBO0FBSkE7QUFLQTtBQUFBO0FBTEE7QUFBQTtBQU1BO0FBTkE7QUFPQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFoRkE7QUFBQTtBQUFBO0FBa0ZBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTFGQTtBQUFBO0FBQUE7QUEyRkE7QUFDQTtBQUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFqSEE7QUFBQTtBQUFBO0FBa0hBO0FBQ0E7QUFFQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUF0SUE7QUFBQTtBQUFBO0FBd0lBO0FBQ0E7QUFDQTs7QUExSUE7QUFBQTtBQUFBO0FBMklBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBS0E7QUFOQTtBQVNBO0FBM0tBO0FBQUE7QUFBQTtBQTZLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7O0FBdk1BO0FBQUE7QUFBQTtBQXlNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFuTkE7QUFBQTtBQUFBO0FBcU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBek5BO0FBQUE7QUFBQTtBQTBOQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQS9OQTtBQUFBO0FBQUE7QUFnT0E7QUFDQTtBQUNBO0FBUUE7QUExT0E7QUFBQTtBQUFBO0FBNE9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQW5QQTtBQUFBO0FBQUE7QUFxUEE7QUFDQTtBQXRQQTtBQUFBO0FBQUE7QUF3UEE7QUFDQTtBQUNBOztBQTFQQTtBQUFBO0FBQUE7QUE0UEE7QUFDQTtBQUNBOztBQTlQQTtBQUFBO0FBQUE7QUFnUUE7QUFDQTtBQUNBOztBQWxRQTtBQUFBO0FBQUE7QUFvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTVRQTtBQUFBO0FBQUE7QUE4UUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwUkE7QUFBQTtBQUFBO0FBc1JBO0FBQ0E7QUFDQTtBQUNBOztBQXpSQTtBQUFBO0FBQUE7QUEyUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUEvUkE7QUFBQTtBQUFBO0FBaVNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBelNBO0FBQUE7QUFBQTtBQTJTQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXBUQTtBQUFBO0FBQUE7QUFzVEE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQWpVQTtBQUFBO0FBQUE7QUFtVUE7O0FBQ0E7QUFDQTtBQUNBO0FBR0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQXBWQTtBQUFBO0FBQUE7QUFzVkE7QUFDQTtBQUNBO0FBQ0E7O0FBelZBO0FBQUE7QUFBQTtBQTJWQTtBQUNBO0FBQ0E7QUE3VkE7QUFBQTtBQUFBO0FBK1ZBO0FBQ0E7QUFoV0E7QUFBQTtBQUFBO0FBa1dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBclhBO0FBQUE7QUFBQTtBQXVYQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQU1BO0FBQ0E7O0FBQ0E7QUFDQTtBQXBZQTtBQUFBO0FBQUE7QUFzWUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFyWkE7QUFBQTtBQUFBO0FBdVpBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBNVpBO0FBQUE7QUFBQTtBQThaQTtBQUdBO0FBQ0E7QUFHQTs7QUFyYUE7QUFBQTtBQUFBO0FBd2FBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5YkE7QUFBQTtBQUFBO0FBZ2NBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBS0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQW5nQkE7QUFBQTtBQUFBO0FBcWdCQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQTVnQkE7QUFBQTtBQUFBO0FBOGdCQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBTkE7O0FBUUE7QUFDQTtBQS9oQkE7QUFBQTtBQUFBO0FBaWlCQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFMQTs7QUFPQTtBQUNBO0FBaGpCQTtBQUFBO0FBQUE7QUFrakJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXBqQkE7QUFBQTtBQUFBO0FBc2pCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBdGxCQTtBQUFBO0FBQUE7QUF3bEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBbG1CQTtBQUFBO0FBQUE7QUFvbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFQQTtBQUFBO0FBQUE7O0FBUUE7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQTlJQTs7QUFnSkE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQXh3QkE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUNBOzs7QUFFQTs7O0FBRUE7OztBQUVBOzs7QUFFQTs7QUF4REE7QUF5REE7QUFFQTtBQUNBOzs7QUE3REE7QUFBQTtBQUFBO0FBK0RBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQTlFQTtBQUFBO0FBQUE7QUFnRkE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0ZBO0FBQUE7QUFBQTtBQTZGQTtBQUNBO0FBQ0E7QUFDQTs7QUFoR0E7QUFBQTtBQUFBO0FBbUdBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQXhHQTtBQUFBO0FBQUE7QUEyR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTs7QUFsSEE7QUFBQTtBQUFBO0FBcUhBOztBQUNBOztBQUNBO0FBQ0E7O0FBeEhBO0FBQUE7QUFBQTtBQTBIQTs7QUFDQTtBQUNBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBOztBQTNJQTtBQUFBO0FBQUE7QUE2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdEpBO0FBQUE7QUFBQTtBQXlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBOztBQXBLQTtBQUFBO0FBQUE7QUF1S0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBN0tBO0FBQUE7QUFBQTtBQWdMQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7O0FBbkxBO0FBQUE7QUFBQTtBQXNMQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBM0xBO0FBQUE7QUFBQTtBQThMQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBaE1BO0FBQUE7QUFBQTtBQW1NQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQXhNQTtBQUFBO0FBQUE7QUEwTUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTs7QUFwTkE7QUFBQTtBQUFBO0FBdU5BO0FBQ0E7QUFDQTs7QUF6TkE7QUFBQTtBQUFBO0FBMk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFyT0E7QUFBQTtBQUFBO0FBdU9BO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5T0E7QUFBQTtBQUFBO0FBZ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBcFBBO0FBQUE7QUFBQTtBQXNQQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBNVBBO0FBQUE7QUFBQTtBQThQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF2UUE7QUFBQTtBQUFBO0FBd1FBO0FBQ0E7QUFBQTs7QUFFQTs7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBSUE7OztBQUVBO0FBQ0E7QUFJQTs7O0FBRUE7QUFDQTtBQUNBOztBQTlVQTtBQUFBO0FBQUE7QUFnVkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFoV0E7QUFBQTtBQUFBO0FBa1dBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOztBQXpYQTtBQUFBO0FBQUE7QUEyWEE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBUUE7O0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkE7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7O0FBUUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7O0FBM2JBO0FBQUE7QUFBQTtBQTZiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUE1ZEE7QUFBQTtBQUFBO0FBOGRBO0FBQ0E7QUEvZEE7QUFBQTtBQUFBO0FBaWVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUF4ZUE7QUFBQTtBQUFBO0FBMGVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBL2VBO0FBQUE7QUFBQTtBQWlmQTtBQUNBO0FBRUE7QUFwZkE7QUFBQTtBQUFBO0FBc2ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQS9oQkE7QUFBQTtBQUFBO0FBZ2lCQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUF2aUJBO0FBQUE7QUFBQTtBQTBpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF2akJBO0FBQUE7QUFBQTtBQXlqQkE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQWprQkE7QUFBQTtBQUFBO0FBbWtCQTtBQUNBOztBQUVBOztBQUVBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFybUJBO0FBQUE7QUFBQTtBQXVtQkE7QUFFQTtBQUNBO0FBMW1CQTtBQUFBO0FBQUE7QUEybUJBO0FBQUE7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBR0E7O0FBQ0E7QUFDQTtBQUNBOztBQTNuQkE7QUFBQTtBQUFBO0FBNm5CQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQXJvQkE7QUFBQTtBQUFBO0FBdW9CQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBaHBCQTtBQUFBO0FBQUE7QUFrcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeHBCQTtBQUFBO0FBQUE7QUEwcEJBO0FBQ0E7QUFDQTtBQTVwQkE7QUFBQTtBQUFBO0FBOHBCQTtBQUNBO0FBQ0E7QUFDQTs7QUFqcUJBO0FBQUE7QUFBQTtBQW1xQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF2cUJBO0FBQUE7QUFBQTtBQXdxQkE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXhyQkE7QUFBQTtBQUFBO0FBMHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTs7QUFoc0JBO0FBQUE7QUFBQTtBQWlzQkE7QUFDQTtBQUVBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTs7QUFudEJBO0FBQUE7QUFBQTtBQXN0QkE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTs7QUFDQTs7QUFydUJBO0FBQUE7QUFBQTtBQXN1QkE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBOztBQUVBOztBQUdBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTV2QkE7QUFBQTtBQUFBO0FBOHZCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFyd0JBO0FBQUE7QUFBQTtBQXV3QkE7QUFBQTtBQUNBO0FBTUE7QUFFQTs7QUFDQTs7QUFqeEJBO0FBQUE7QUFBQTtBQW14QkE7QUFDQTtBQUNBOztBQXJ4QkE7QUFBQTtBQUFBO0FBdXhCQTs7QUFDQTtBQUNBOztBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFsekJBOztBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUNBOztBQUNBOztBQUhBO0FBSUE7O0FBTkE7QUFBQTtBQUFBO0FBUUE7QUFDQTtBQVRBO0FBQUE7QUFBQTtBQVdBOztBQUNBOztBQUNBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFlQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFuQkE7QUFBQTtBQUFBO0FBcUJBO0FBTUE7QUFNQTtBQWpDQTtBQUFBO0FBQUE7QUFtQ0E7QUFDQTtBQUNBOztBQXJDQTtBQUFBO0FBQUE7QUFzQ0E7O0FBQUE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdEVBO0FBQUE7QUFBQTtBQXdFQTtBQUNBO0FBRUE7QUFDQTtBQTVFQTs7QUFBQTtBQUFBO0FBOEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7OztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSkE7O0FBTUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQS9DQTtBQWdEQTs7QUFqREE7QUFBQTtBQUFBO0FBbURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUEzREE7QUFBQTtBQUFBO0FBNkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxFQTtBQUFBO0FBQUE7QUFvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNFQTtBQUFBO0FBQUE7QUE2RUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF2RkE7QUFBQTtBQUFBO0FBeUZBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFqR0E7QUFBQTtBQUFBO0FBbUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBMUdBO0FBQUE7QUFBQTtBQTRHQTtBQUNBO0FBYUE7QUExSEE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQTFCQTtBQTJCQTs7QUE1QkE7QUFBQTtBQUFBO0FBK0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdENBO0FBQUE7QUFBQTtBQXdDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUlBO0FBSkE7QUFLQTtBQUxBO0FBTUE7O0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpDQTtBQW1DQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTVGQTtBQUFBO0FBQUE7QUE4RkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwR0E7QUFBQTtBQUFBO0FBc0dBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE5SEE7QUFBQTtBQUFBO0FBZ0lBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBdEpBO0FBQUE7QUFBQTtBQXlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWhLQTtBQUFBO0FBQUE7QUFtS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTNLQTtBQUFBO0FBQUE7QUE4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXZMQTtBQUFBO0FBQUE7QUF5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE3TEE7QUFBQTtBQUFBO0FBK0xBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUZBO0FBR0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNUJBOztBQThCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQWpQQTs7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQVJBO0FBU0E7O0FBVkE7QUFBQTtBQUFBO0FBWUE7QUFDQTtBQUNBOztBQWRBO0FBQUE7QUFBQTtBQWdCQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBekJBO0FBQUE7QUFBQTtBQTJCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBckRBO0FBQUE7QUFBQTtBQXVEQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBM0RBO0FBQUE7QUFBQTtBQTZEQTtBQUFBO0FBQ0E7QUFnQkE7QUE5RUE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7O0FBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7O0FBTEE7QUFBQTtBQUFBO0FBT0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTtBQWhDQTs7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBOztBQUdBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTs7QUFRQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUVBO0FBRUE7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUF2S0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBckNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQXVDQTtBQXpDQTtBQTBDQTs7QUEzQ0E7QUFBQTtBQUFBO0FBNkNBO0FBRUE7QUEvQ0E7QUFBQTtBQUFBO0FBZ0RBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUF0RUE7QUFBQTtBQUFBO0FBdUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFqRkE7QUFBQTtBQUFBO0FBa0ZBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBaEdBO0FBQUE7QUFBQTtBQWtHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5R0E7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQXVDQTtBQXpDQTtBQTBDQTs7QUEzQ0E7QUFBQTtBQUFBO0FBNkNBO0FBRUE7QUEvQ0E7QUFBQTtBQUFBO0FBZ0RBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUF0RUE7QUFBQTtBQUFBO0FBdUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFqRkE7QUFBQTtBQUFBO0FBa0ZBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBaEdBO0FBQUE7QUFBQTtBQWtHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5R0E7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQXVDQTtBQXpDQTtBQTBDQTs7QUEzQ0E7QUFBQTtBQUFBO0FBNENBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7O0FBUUE7QUFDQTtBQVhBOztBQUFBO0FBQUE7QUFlQTs7QUFmQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCQTtBQS9EQTtBQUFBO0FBQUE7QUFnRUE7QUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUEvRUE7QUFBQTtBQUFBO0FBZ0ZBOztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7O0FBUUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQTVHQTtBQUFBO0FBQUE7QUErR0E7QUFFQTtBQWpIQTtBQUFBO0FBQUE7QUFtSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0hBOztBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTs7QUFKQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFiQTtBQUFBO0FBQUE7QUFlQTtBQUNBO0FBQ0E7QUFqQkE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBOztBQUFBOztBQUNBO0FBQUE7O0FBQUE7O0FBQ0E7QUFDQTtBQUZBO0FBNENBOzs7QUE3Q0E7QUFBQTtBQUFBO0FBZ0RBO0FBRUE7QUFFQTtBQXBEQTtBQUFBO0FBQUE7QUFxREE7QUFDQTtBQUNBO0FBdkRBO0FBQUE7QUFBQTtBQXlEQTtBQUNBO0FBMURBO0FBQUE7QUFBQTtBQTREQTtBQUNBO0FBN0RBOztBQUFBO0FBQUE7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBOztBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBUEE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFUQTtBQVdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2Jhc2UvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvLi4vY29yZS8yZC9zcmMvYmFzZS9ncm91cC50cyIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uLi9jb3JlLzJkL3NyYy9iYXNlL2ludGVyc2VjdGlvbi50cyIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uLi9jb3JlLzJkL3NyYy9iYXNlL3BvaW50LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2Jhc2Uvc2hhcGUudHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvLi4vY29yZS8yZC9zcmMvYmFzZS91dGlscy50cyIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uLi9jb3JlLzJkL3NyYy9lbnRpdGllcy9jYW52YXMudHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvLi4vY29yZS8yZC9zcmMvZW50aXRpZXMvZWxlbWVudHMvaW1hZ2UuZW50aXR5LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2VudGl0aWVzL2VsZW1lbnRzL2xpbmUuZW50aXR5LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2VudGl0aWVzL2VsZW1lbnRzL3BhdGguZW50aXR5LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2VudGl0aWVzL2VsZW1lbnRzL3JlY3QuZW50aXR5LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2VudGl0aWVzL2VsZW1lbnRzL3RleHQuZW50aXR5LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL2luZGV4LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL3BsdWdpbnMvZGVmYXVsdC5wbHVnaW4udHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvLi4vY29yZS8yZC9zcmMvcGx1Z2lucy9tb3ZlLnBsdWdpbi50cyIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uLi9jb3JlLzJkL3NyYy93aWRnZXRzL2JydXNoLndpZGdldC50cyIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uLi9jb3JlLzJkL3NyYy93aWRnZXRzL2xpbmUtZHJhdy53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvLi4vY29yZS8yZC9zcmMvd2lkZ2V0cy9yZWN0LWRyYXcud2lkZ2V0LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL3dpZGdldHMvd2lkZ2V0LnRzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlLy4uL2NvcmUvMmQvc3JjL3dpZGdldHMvem9vbS53aWRnZXQudHMiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0Byb2NvY29qcy9leGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHJvY29jb2pzL2V4YW1wbGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Acm9jb2NvanMvZXhhbXBsZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOWPkeW4g+iuoumYhe+8jOS6i+S7tuS4reW/g1xuICog5bqU55So5Zy65pmv77ya5Y+v5Lul5Zyo5riy5p+T5YmN5ZCO44CB5Yid5aeL5YyW54mp5L2T5YmN5ZCO44CB54mp5L2T54q25oCB5pS55Y+Y5pe26Kem5Y+R5LiA57O75YiX5LqL5Lu2XG4gKi9cbmV4cG9ydCBjbGFzcyBFdmVudENlbnRlciB7XG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8g5aaC5p6c5rKh5pyJ5Y+C5pWw77yM5bCx5piv6Kej57uR5omA5pyJ5LqL5Lu2XG4gICAgICAgICAgICBmb3IgKGV2ZW50TmFtZSBpbiB0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcywgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOino+e7keWNleS4quS6i+S7tlxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZlbnROYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsaXN0ZW5lcnNGb3JFdmVudCA9IHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVyc0ZvckV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdGVuZXJzRm9yRXZlbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3RlbmVyc0ZvckV2ZW50W2ldICYmIGxpc3RlbmVyc0ZvckV2ZW50W2ldLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnNGb3JFdmVudC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2V2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZXZlbnRMaXN0ZW5lciA9IHRoaXMuX19ldmVudExpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICAvLyDms6jmhI/vvJrov5nph4zmiJHku6zliKDpmaTnm5HlkKzkuIDoiKzpg73mmK/nva7kuLogbnVsbCDmiJbogIUgZmFsc2VcbiAgICAgICAgLy8g5b2T54S25Lmf5Y+v5Lul55SoIHNwbGljZSDliKDpmaTvvIzkuI3ov4cgc3BsaWNlIOS8muaUueWPmOaVsOe7hOmVv+W6pu+8jOi/meeCueimgeWwpOS4uuazqOaEj1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcltldmVudExpc3RlbmVyLmluZGV4T2YoaGFuZGxlcildID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmZpbGwoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi9zaGFwZVwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuL3V0aWxzXCI7XG4vKipcbiAqIOe7hOexu++8jOS5n+WwseaYr+aLluiTneahhumAieWMuuWfn+WMheWbtOeahOmCo+S6m+eJqeS9k+aehOaIkOS6huS4gOS4que7hFxuICogR3JvdXAg6Jm954S257un5om/6IezIFNoYXBl77yM5L2G5piv6KaB5rOo5oSP6I635Y+W5p+Q5Lqb5bGe5oCn5pyJ5pe25piv5rKh5pyJ55qEXG4gKi9cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIFNoYXBlIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3RzLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiZ3JvdXBcIjtcbiAgICAgICAgdGhpcy5vYmplY3RzID0gb2JqZWN0cyB8fCBbXTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFN0YXRlID0ge307XG4gICAgICAgIHRoaXMuX2NhbGNCb3VuZHMoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlT2JqZWN0c0Nvb3JkcygpO1xuICAgICAgICB0aGlzLnNldENvb3JkcygpO1xuICAgIH1cbiAgICAvKiog5pu05paw5omA5pyJ54mp5L2T5Z2Q5qCH57O7ICovXG4gICAgX3VwZGF0ZU9iamVjdHNDb29yZHMoKSB7XG4gICAgICAgIGxldCBncm91cERlbHRhWCA9IHRoaXMubGVmdCwgZ3JvdXBEZWx0YVkgPSB0aGlzLnRvcDtcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9iamVjdExlZnQgPSBvYmplY3QuZ2V0KFwibGVmdFwiKSwgb2JqZWN0VG9wID0gb2JqZWN0LmdldChcInRvcFwiKTtcbiAgICAgICAgICAgIG9iamVjdC5zZXQoXCJsZWZ0XCIsIG9iamVjdExlZnQgLSBncm91cERlbHRhWCk7XG4gICAgICAgICAgICBvYmplY3Quc2V0KFwidG9wXCIsIG9iamVjdFRvcCAtIGdyb3VwRGVsdGFZKTtcbiAgICAgICAgICAgIG9iamVjdC5zZXRDb29yZHMoKTtcbiAgICAgICAgICAgIC8vIOW9k+aciemAieS4ree7hOeahOaXtuWAme+8jOS4jeaYvuekuueJqeS9k+eahOaOp+WItueCuVxuICAgICAgICAgICAgb2JqZWN0Lm9yaWduSGFzQ29udHJvbHMgPSBvYmplY3QuaGFzQ29udHJvbHM7XG4gICAgICAgICAgICBvYmplY3QuaGFzQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHM7XG4gICAgfVxuICAgIC8qKiDlsIbniankvZPmt7vliqDliLAgZ3JvdXAg5Lit77yM5bm26YeN5paw6K6h566X5L2N572u5bC65a+4562JICovXG4gICAgYWRkV2l0aFVwZGF0ZShvYmplY3QpIHtcbiAgICAgICAgdGhpcy5fcmVzdG9yZU9iamVjdHNTdGF0ZSgpO1xuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICB0aGlzLl9jYWxjQm91bmRzKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU9iamVjdHNDb29yZHMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDlsIbniankvZPmt7vliqDliLAgZ3JvdXAg5LitICovXG4gICAgYWRkKG9iamVjdCkge1xuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOWwhueJqeS9k+S7jiBncm91cCDkuK3np7vpmaQgKi9cbiAgICByZW1vdmUob2JqZWN0KSB7XG4gICAgICAgIFV0aWwucmVtb3ZlRnJvbUFycmF5KHRoaXMub2JqZWN0cywgb2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDlsIbniankvZPku47nu4TkuK3np7vpmaTvvIzlubbph43mlrDorqHnrpfnu4TnmoTlpKflsI/kvY3nva4gKi9cbiAgICByZW1vdmVXaXRoVXBkYXRlKG9iamVjdCkge1xuICAgICAgICB0aGlzLl9yZXN0b3JlT2JqZWN0c1N0YXRlKCk7XG4gICAgICAgIFV0aWwucmVtb3ZlRnJvbUFycmF5KHRoaXMub2JqZWN0cywgb2JqZWN0KTtcbiAgICAgICAgb2JqZWN0LnNldEFjdGl2ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NhbGNCb3VuZHMoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlT2JqZWN0c0Nvb3JkcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOeJqeS9k+aYr+WQpuWcqCBncm91cCDkuK0gKi9cbiAgICBjb250YWlucyhvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPiAtMTtcbiAgICB9XG4gICAgLyoqIOiOt+WPliBncm91cCDlsLrlr7ggKi9cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RzKCkubGVuZ3RoO1xuICAgIH1cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKGN0eCk7XG4gICAgICAgIC8vIGxldCBncm91cFNjYWxlRmFjdG9yID0gTWF0aC5tYXgodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMub2JqZWN0c1tpXSwgXG4gICAgICAgICAgICAvLyBvcmlnaW5hbFNjYWxlRmFjdG9yID0gb2JqZWN0LmJvcmRlclNjYWxlRmFjdG9yLFxuICAgICAgICAgICAgb3JpZ2luYWxIYXNSb3RhdGluZ1BvaW50ID0gb2JqZWN0Lmhhc1JvdGF0aW5nUG9pbnQ7XG4gICAgICAgICAgICAvLyBvYmplY3QuYm9yZGVyU2NhbGVGYWN0b3IgPSBncm91cFNjYWxlRmFjdG9yO1xuICAgICAgICAgICAgb2JqZWN0Lmhhc1JvdGF0aW5nUG9pbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXIoY3R4KTtcbiAgICAgICAgICAgIC8vIG9iamVjdC5ib3JkZXJTY2FsZUZhY3RvciA9IG9yaWdpbmFsU2NhbGVGYWN0b3I7XG4gICAgICAgICAgICBvYmplY3QuaGFzUm90YXRpbmdQb2ludCA9IG9yaWdpbmFsSGFzUm90YXRpbmdQb2ludDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIGlmICghbm9UcmFuc2Zvcm0gJiYgdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0JvcmRlcnMoY3R4KTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0NvbnRyb2xzKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgdGhpcy5zZXRDb29yZHMoKTtcbiAgICB9XG4gICAgLyoqIOagueaNriBpbmRleCDojrflj5YgZ3JvdXAg5Lit55qE5p+Q5Liq54mp5L2TICovXG4gICAgaXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RzKClbaW5kZXhdO1xuICAgIH1cbiAgICAvKiog6L+Y5Y6f5Yib5bu6IGdyb3VwIOS5i+WJjeeahOeKtuaAgSAqL1xuICAgIF9yZXN0b3JlT2JqZWN0c1N0YXRlKCkge1xuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCh0aGlzLl9yZXN0b3JlT2JqZWN0U3RhdGUsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOi/mOWOnyBncm91cCDkuK3mn5DkuKrniankvZPnmoTliJ3lp4vnirbmgIEgKi9cbiAgICBfcmVzdG9yZU9iamVjdFN0YXRlKG9iamVjdCkge1xuICAgICAgICBsZXQgZ3JvdXBMZWZ0ID0gdGhpcy5nZXQoXCJsZWZ0XCIpLCBncm91cFRvcCA9IHRoaXMuZ2V0KFwidG9wXCIpLCBncm91cEFuZ2xlID0gdGhpcy5nZXRBbmdsZSgpICogKE1hdGguUEkgLyAxODApLCByb3RhdGVkVG9wID0gTWF0aC5jb3MoZ3JvdXBBbmdsZSkgKiBvYmplY3QuZ2V0KFwidG9wXCIpICtcbiAgICAgICAgICAgIE1hdGguc2luKGdyb3VwQW5nbGUpICogb2JqZWN0LmdldChcImxlZnRcIiksIHJvdGF0ZWRMZWZ0ID0gLU1hdGguc2luKGdyb3VwQW5nbGUpICogb2JqZWN0LmdldChcInRvcFwiKSArXG4gICAgICAgICAgICBNYXRoLmNvcyhncm91cEFuZ2xlKSAqIG9iamVjdC5nZXQoXCJsZWZ0XCIpO1xuICAgICAgICBvYmplY3Quc2V0QW5nbGUob2JqZWN0LmdldEFuZ2xlKCkgKyB0aGlzLmdldEFuZ2xlKCkpO1xuICAgICAgICBvYmplY3Quc2V0KFwibGVmdFwiLCBncm91cExlZnQgKyByb3RhdGVkTGVmdCAqIHRoaXMuZ2V0KFwic2NhbGVYXCIpKTtcbiAgICAgICAgb2JqZWN0LnNldChcInRvcFwiLCBncm91cFRvcCArIHJvdGF0ZWRUb3AgKiB0aGlzLmdldChcInNjYWxlWVwiKSk7XG4gICAgICAgIG9iamVjdC5zZXQoXCJzY2FsZVhcIiwgb2JqZWN0LmdldChcInNjYWxlWFwiKSAqIHRoaXMuZ2V0KFwic2NhbGVYXCIpKTtcbiAgICAgICAgb2JqZWN0LnNldChcInNjYWxlWVwiLCBvYmplY3QuZ2V0KFwic2NhbGVZXCIpICogdGhpcy5nZXQoXCJzY2FsZVlcIikpO1xuICAgICAgICBvYmplY3Quc2V0Q29vcmRzKCk7XG4gICAgICAgIG9iamVjdC5oYXNDb250cm9scyA9IG9iamVjdC5vcmlnbkhhc0NvbnRyb2xzO1xuICAgICAgICAvLyBkZWxldGUgb2JqZWN0Ll9fb3JpZ0hhc0NvbnRyb2xzO1xuICAgICAgICBvYmplY3Quc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgb2JqZWN0LnNldENvb3JkcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RvcmVPYmplY3RzU3RhdGUoKTtcbiAgICB9XG4gICAgLyoqIOmHjeaWsOiuvue9ruW9k+WJjee7hOS4reaJgOacieeahOeJqeS9k+eahOi+ueahhuOAgeaOp+WItueCueOAgeS9jee9ruWSjOWkp+Wwj+etiSAqL1xuICAgIHNldE9iamVjdHNDb29yZHMoKSB7XG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIG9iamVjdC5zZXRDb29yZHMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiog5r+A5rS75omA5pyJIGdyb3VwIOS4reeahOeJqeS9kyAqL1xuICAgIGFjdGl2YXRlQWxsT2JqZWN0cygpIHtcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgb2JqZWN0LnNldEFjdGl2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiog6K6h566X57uE55qE5YyF5Zu055uSICovXG4gICAgX2NhbGNCb3VuZHMoKSB7XG4gICAgICAgIGxldCBhWCA9IFtdLCBhWSA9IFtdLCBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCBvLCB3aWR0aCwgaGVpZ2h0LCBpID0gMCwgbGVuID0gdGhpcy5vYmplY3RzLmxlbmd0aDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgbyA9IHRoaXMub2JqZWN0c1tpXTtcbiAgICAgICAgICAgIG8uc2V0Q29vcmRzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIG8ub0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgIGFYLnB1c2goby5vQ29vcmRzW3Byb3BdLngpO1xuICAgICAgICAgICAgICAgIGFZLnB1c2goby5vQ29vcmRzW3Byb3BdLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1pblggPSBVdGlsLm1pbihhWCk7XG4gICAgICAgIG1heFggPSBVdGlsLm1heChhWCk7XG4gICAgICAgIG1pblkgPSBVdGlsLm1pbihhWSk7XG4gICAgICAgIG1heFkgPSBVdGlsLm1heChhWSk7XG4gICAgICAgIHdpZHRoID0gbWF4WCAtIG1pblggfHwgMDtcbiAgICAgICAgaGVpZ2h0ID0gbWF4WSAtIG1pblkgfHwgMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbWluWCArIHdpZHRoIC8gMiB8fCAwO1xuICAgICAgICB0aGlzLnRvcCA9IG1pblkgKyBoZWlnaHQgLyAyIHx8IDA7XG4gICAgfVxuICAgIC8qKiDmo4Dmn6XngrnmmK/pg73lnKggZ3JvdXAg5LitICovXG4gICAgY29udGFpbnNQb2ludChwb2ludCkge1xuICAgICAgICBsZXQgaGFsZldpZHRoID0gdGhpcy5nZXQoXCJ3aWR0aFwiKSAvIDIsIGhhbGZIZWlnaHQgPSB0aGlzLmdldChcImhlaWdodFwiKSAvIDIsIGNlbnRlclggPSB0aGlzLmdldChcImxlZnRcIiksIGNlbnRlclkgPSB0aGlzLmdldChcInRvcFwiKTtcbiAgICAgICAgcmV0dXJuIChjZW50ZXJYIC0gaGFsZldpZHRoIDwgcG9pbnQueCAmJlxuICAgICAgICAgICAgY2VudGVyWCArIGhhbGZXaWR0aCA+IHBvaW50LnggJiZcbiAgICAgICAgICAgIGNlbnRlclkgLSBoYWxmSGVpZ2h0IDwgcG9pbnQueSAmJlxuICAgICAgICAgICAgY2VudGVyWSArIGhhbGZIZWlnaHQgPiBwb2ludC55KTtcbiAgICB9XG4gICAgZ2V0KHByb3ApIHtcbiAgICAgICAgLy8g57uE6YeM6Z2i5pyJ5b6I5aSa5YWD57Sg77yM5omA5Lul6Jm954S257un5om/6IezIEZhYnJpY++8jOS9huaYr+acieW+iOWkmuWxnuaAp+ivu+WPluaYr+aXoOaViOeahO+8jOiuvue9ruWQjOeQhlxuICAgICAgICByZXR1cm4gdGhpc1twcm9wXTtcbiAgICB9XG4gICAgX3NldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4vKiog5byC5q2l5qCH6K+G77yM6K+05piO6L+Z5Liq5Lic6KW/5piv5ZCO6Z2i5Yib5bu655qE77yM5q+U5aaC5b6X546w5pyJ5Yeg5Liq54mp5L2T5omN6IO95pyJIEdyb3Vw77yb57G75Ly855qE6L+Y5pyJ5Zu+54mH77yM55uu5YmN6L+Z6YeM5rKh55So5YiwICovXG5Hcm91cC5hc3luYyA9IHRydWU7XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3BvaW50XCI7XG4vKiog5qOA5rWL5aSa6L655b2i44CB57q/5q615piv5ZCm55u45Lqk55qE5LiA5Liq57G7ICovXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0dXMpIHtcbiAgICAgICAgdGhpcy5pbml0KHN0YXR1cyk7XG4gICAgfVxuICAgIGluaXQoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgIH1cbiAgICBhcHBlbmRQb2ludChwb2ludCkge1xuICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KTtcbiAgICB9XG4gICAgYXBwZW5kUG9pbnRzKHBvaW50cykge1xuICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMucG9pbnRzLmNvbmNhdChwb2ludHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3kuKTmnaHnur/mrrXmmK/lkKbmg7PkuqRcbiAgICAgKiBAcGFyYW0gYTEg57q/5q61MSDotbfngrlcbiAgICAgKiBAcGFyYW0gYTIg57q/5q61MSDnu4jngrlcbiAgICAgKiBAcGFyYW0gYjEg57q/5q61MiDotbfngrlcbiAgICAgKiBAcGFyYW0gYjIg57q/5q61MyDnu4jngrlcbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJzZWN0TGluZUxpbmUoYTEsIGEyLCBiMSwgYjIpIHtcbiAgICAgICAgLy8g5ZCR6YeP5Y+J5LmY5YWs5byPIGBh4pyW77iPYiA9ICh4MSwgeTEp4pyW77iPKHgyLCB5MikgPSB4MXkyIC0geDJ5MWBcbiAgICAgICAgLy8gaHR0cDovL2Jsb2cubGV0b3cudG9wLzIwMTcvMTEvMTMvdmVjdG9yLWNyb3NzLXByb2R1Y3QtY2FsLWludGVyc2VjdGlvbi9cbiAgICAgICAgbGV0IHJlc3VsdCwgXG4gICAgICAgIC8vIGIxLT5iMuWQkemHjyDkuI4gYTEtPmIx5ZCR6YeP55qE5ZCR6YeP5Y+J5LmYXG4gICAgICAgIHVhX3QgPSAoYjIueCAtIGIxLngpICogKGExLnkgLSBiMS55KSAtIChiMi55IC0gYjEueSkgKiAoYTEueCAtIGIxLngpLCBcbiAgICAgICAgLy8gYTEtPmEy5ZCR6YePIOS4jiBhMS0+YjHlkJHph4/nmoTlkJHph4/lj4nkuZhcbiAgICAgICAgdWJfdCA9IChhMi54IC0gYTEueCkgKiAoYTEueSAtIGIxLnkpIC0gKGEyLnkgLSBhMS55KSAqIChhMS54IC0gYjEueCksIFxuICAgICAgICAvLyBhMS0+YTLlkJHph48g5LiOIGIxLT5iMuWQkemHj+eahOWQkemHj+WPieS5mFxuICAgICAgICB1X2IgPSAoYjIueSAtIGIxLnkpICogKGEyLnggLSBhMS54KSAtIChiMi54IC0gYjEueCkgKiAoYTIueSAtIGExLnkpO1xuICAgICAgICBpZiAodV9iICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgdWEgPSB1YV90IC8gdV9iLCB1YiA9IHViX3QgLyB1X2I7XG4gICAgICAgICAgICBpZiAoMCA8PSB1YSAmJiB1YSA8PSAxICYmIDAgPD0gdWIgJiYgdWIgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBJbnRlcnNlY3Rpb24oXCJJbnRlcnNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnBvaW50cy5wdXNoKG5ldyBQb2ludChhMS54ICsgdWEgKiAoYTIueCAtIGExLngpLCBhMS55ICsgdWEgKiAoYTIueSAtIGExLnkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgSW50ZXJzZWN0aW9uKFwiTm8gSW50ZXJzZWN0aW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdV9iID09IDDml7bvvIzop5LluqbkuLow5oiW6ICFMTgwIOW5s+ihjOaIluiAheWFsee6v+S4jeWxnuS6juebuOS6pFxuICAgICAgICAgICAgaWYgKHVhX3QgPT09IDAgfHwgdWJfdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBJbnRlcnNlY3Rpb24oXCJDb2luY2lkZW50XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IEludGVyc2VjdGlvbihcIlBhcmFsbGVsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOajgOa1i+e6v+auteWSjOWkmui+ueW9ouaYr+WQpuebuOS6pFxuICAgICAqIEBwYXJhbSBhMSDnur/mrrXotbfngrlcbiAgICAgKiBAcGFyYW0gYTIg57q/5q6157uI54K5XG4gICAgICogQHBhcmFtIHBvaW50cyDlpJrovrnlvaLpobbngrlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHN0YXRpYyBpbnRlcnNlY3RMaW5lUG9seWdvbihhMSwgYTIsIHBvaW50cykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEludGVyc2VjdGlvbihcIk5vIEludGVyc2VjdGlvblwiKSwgbGVuZ3RoID0gcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGIxID0gcG9pbnRzW2ldLCAvLyDlpJrovrnlvaLmr4/mnaHovrnnmoTotbfngrlcbiAgICAgICAgICAgIGIyID0gcG9pbnRzWyhpICsgMSkgJSBsZW5ndGhdLCAvLyDlpJrovrnlvaLmr4/mnaHovrnnmoTnu4jngrlcbiAgICAgICAgICAgIGludGVyID0gSW50ZXJzZWN0aW9uLmludGVyc2VjdExpbmVMaW5lKGExLCBhMiwgYjEsIGIyKTtcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmRQb2ludHMoaW50ZXIucG9pbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0LnBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gXCJJbnRlcnNlY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgaW50ZXJzZWN0UG9seWdvblBvbHlnb24ocG9pbnRzMSwgcG9pbnRzMikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IEludGVyc2VjdGlvbihcIk5vIEludGVyc2VjdGlvblwiKSwgbGVuZ3RoID0gcG9pbnRzMS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBhMSA9IHBvaW50czFbaV0sIGEyID0gcG9pbnRzMVsoaSArIDEpICUgbGVuZ3RoXSwgaW50ZXIgPSBJbnRlcnNlY3Rpb24uaW50ZXJzZWN0TGluZVBvbHlnb24oYTEsIGEyLCBwb2ludHMyKTtcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmRQb2ludHMoaW50ZXIucG9pbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0LnBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gXCJJbnRlcnNlY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmo4DmtYvniankvZPmmK/lkKbkuI7mi5bok53pgInljLrnm7jkuqRcbiAgICAgKiBAcGFyYW0gcG9pbnRzIOeJqeS9k+WMheWbtOebkueahOWbm+S4qumhtueCueeahOWdkOagh1xuICAgICAqIEBwYXJhbSByMSDmi5bok53pgInljLrlt6bkuIrop5LnmoTngrlcbiAgICAgKiBAcGFyYW0gcjIg5ouW6JOd6YCJ5Yy65Y+z5LiL6KeS55qE54K5XG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJzZWN0UG9seWdvblJlY3RhbmdsZShwb2ludHMsIHIxLCByMikge1xuICAgICAgICBsZXQgdG9wTGVmdCA9IHIxLm1pbihyMiksIC8vIOaLluiTnemAieWMuuW3puS4iuinklxuICAgICAgICBib3R0b21SaWdodCA9IHIxLm1heChyMiksIC8vIOaLluiTnemAieWMuuWPs+S4i+inklxuICAgICAgICB0b3BSaWdodCA9IG5ldyBQb2ludChib3R0b21SaWdodC54LCB0b3BMZWZ0LnkpLCAvLyDmi5bok53pgInljLrlj7PkuIrop5JcbiAgICAgICAgYm90dG9tTGVmdCA9IG5ldyBQb2ludCh0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LnkpLCAvLyDmi5bok53pgInljLrlt6bkuIvop5JcbiAgICAgICAgLy8g5qOA5rWL5q+P5p2h6L655piv5ZCm5LiO54mp5L2T55u45LqkXG4gICAgICAgIGludGVyMSA9IEludGVyc2VjdGlvbi5pbnRlcnNlY3RMaW5lUG9seWdvbih0b3BMZWZ0LCB0b3BSaWdodCwgcG9pbnRzKSwgaW50ZXIyID0gSW50ZXJzZWN0aW9uLmludGVyc2VjdExpbmVQb2x5Z29uKHRvcFJpZ2h0LCBib3R0b21SaWdodCwgcG9pbnRzKSwgaW50ZXIzID0gSW50ZXJzZWN0aW9uLmludGVyc2VjdExpbmVQb2x5Z29uKGJvdHRvbVJpZ2h0LCBib3R0b21MZWZ0LCBwb2ludHMpLCBpbnRlcjQgPSBJbnRlcnNlY3Rpb24uaW50ZXJzZWN0TGluZVBvbHlnb24oYm90dG9tTGVmdCwgdG9wTGVmdCwgcG9pbnRzKSwgcmVzdWx0ID0gbmV3IEludGVyc2VjdGlvbihcIk5vIEludGVyc2VjdGlvblwiKTtcbiAgICAgICAgcmVzdWx0LmFwcGVuZFBvaW50cyhpbnRlcjEucG9pbnRzKTtcbiAgICAgICAgcmVzdWx0LmFwcGVuZFBvaW50cyhpbnRlcjIucG9pbnRzKTtcbiAgICAgICAgcmVzdWx0LmFwcGVuZFBvaW50cyhpbnRlcjMucG9pbnRzKTtcbiAgICAgICAgcmVzdWx0LmFwcGVuZFBvaW50cyhpbnRlcjQucG9pbnRzKTtcbiAgICAgICAgaWYgKHJlc3VsdC5wb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8g5aaC5p6c5pyJ6Iez5bCR5LiA5p2h6L655LiO54mp5L2T55u45LqkXG4gICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gXCJJbnRlcnNlY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQb2ludCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICAvKiog6L+U5Zue5LiA5Liq5paw55qE54K577yM5YC85Li65Lik5Liq54K555qE5pyA5bCPeOOAgXnlgLwgKi9cbiAgICBtaW4ob3RoZXJQb2ludCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KE1hdGgubWluKHRoaXMueCwgb3RoZXJQb2ludC54KSwgTWF0aC5taW4odGhpcy55LCBvdGhlclBvaW50LnkpKTtcbiAgICB9XG4gICAgLyoqIOi/lOWbnuS4gOS4quaWsOeahOeCue+8jOWAvOS4uuS4pOS4queCueeahOacgOWkp3jjgIF55YC8ICovXG4gICAgbWF4KG90aGVyUG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChNYXRoLm1heCh0aGlzLngsIG90aGVyUG9pbnQueCksIE1hdGgubWF4KHRoaXMueSwgb3RoZXJQb2ludC55KSk7XG4gICAgfVxuICAgIC8qKiArPSDnmoTmhI/mgJ3vvIzkvJrmlLnlj5joh6rouqvnmoTlgLwgKi9cbiAgICBhZGRFcXVhbHMocG9pbnQpIHtcbiAgICAgICAgdGhpcy54ICs9IHBvaW50Lng7XG4gICAgICAgIHRoaXMueSArPSBwb2ludC55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIC09IOeahOaEj+aAne+8jOS8muaUueWPmOiHqui6q+eahOWAvCAqL1xuICAgIHN1YnRyYWN0RXF1YWxzKHBvaW50KSB7XG4gICAgICAgIHRoaXMueCAtPSBwb2ludC54O1xuICAgICAgICB0aGlzLnkgLT0gcG9pbnQueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3BvaW50XCI7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9pbnRlcnNlY3Rpb25cIjtcbmltcG9ydCB7IEV2ZW50Q2VudGVyIH0gZnJvbSBcIi4vZXZlbnRcIjtcbi8qKiDniankvZPln7rnsbvvvIzmnInkuIDkupvlhbHlkIzlsZ7mgKflkozmlrnms5UgKi9cbmV4cG9ydCBjbGFzcyBTaGFwZSBleHRlbmRzIEV2ZW50Q2VudGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKiDniankvZPnsbvlnovmoIfor4YgKi9cbiAgICAgICAgdGhpcy50eXBlID0gXCJvYmplY3RcIjtcbiAgICAgICAgLyoqIOaYr+WQpuWkhOS6jua/gOa0u+aAge+8jOS5n+WwseaYr+aYr+WQpuiiq+mAieS4rSAqL1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvKiog5piv5ZCm5Y+v6KeBICovXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8qKiDpu5jorqTmsLTlubPlj5jmjaLkuK3lv4MgbGVmdCB8IHJpZ2h0IHwgY2VudGVyICovXG4gICAgICAgIHRoaXMub3JpZ2luWCA9IFwiY2VudGVyXCI7XG4gICAgICAgIC8qKiDpu5jorqTlnoLnm7Tlj5jmjaLkuK3lv4MgdG9wIHwgYm90dG9tIHwgY2VudGVyICovXG4gICAgICAgIHRoaXMub3JpZ2luWSA9IFwiY2VudGVyXCI7XG4gICAgICAgIC8qKiDniankvZPkvY3nva4gdG9wIOWAvCAqL1xuICAgICAgICB0aGlzLnRvcCA9IDA7XG4gICAgICAgIC8qKiDniankvZPkvY3nva4gbGVmdCDlgLwgKi9cbiAgICAgICAgdGhpcy5sZWZ0ID0gMDtcbiAgICAgICAgLyoqIOeJqeS9k+WOn+Wni+WuveW6piAqL1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgLyoqIOeJqeS9k+WOn+Wni+mrmOW6piAqL1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIC8qKiDniankvZPlvZPliY3nmoTnvKnmlL7lgI3mlbAgeCAqL1xuICAgICAgICB0aGlzLnNjYWxlWCA9IDE7XG4gICAgICAgIC8qKiDniankvZPlvZPliY3nmoTnvKnmlL7lgI3mlbAgeSAqL1xuICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XG4gICAgICAgIC8qKiDniankvZPlvZPliY3nmoTml4vovazop5LluqYgKi9cbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgICAgIC8qKiDlt6blj7PplZzlg4/vvIzmr5TlpoLlj43lkJHmi4nkvLjmjqfliLbngrkgKi9cbiAgICAgICAgdGhpcy5mbGlwWCA9IGZhbHNlO1xuICAgICAgICAvKiog5LiK5LiL6ZWc5YOP77yM5q+U5aaC5Y+N5ZCR5ouJ5Ly45o6n5Yi254K5ICovXG4gICAgICAgIHRoaXMuZmxpcFkgPSBmYWxzZTtcbiAgICAgICAgLyoqIOmAieS4reaAgeeJqeS9k+WSjOi+ueahhuS5i+mXtOeahOi3neemuyAqL1xuICAgICAgICB0aGlzLnBhZGRpbmcgPSAwO1xuICAgICAgICAvKiog54mp5L2T57yp5pS+5ZCO55qE5a695bqmICovXG4gICAgICAgIHRoaXMuY3VycmVudFdpZHRoID0gMDtcbiAgICAgICAgLyoqIOeJqeS9k+e8qeaUvuWQjueahOmrmOW6piAqL1xuICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSAwO1xuICAgICAgICAvKiog5r+A5rS75oCB6L655qGG6aKc6ImyICovXG4gICAgICAgIHRoaXMuYm9yZGVyQ29sb3IgPSBcIiNiYTg2ZmVcIjtcbiAgICAgICAgLyoqIOa/gOa0u+aAgeaOp+WItueCueminOiJsiAqL1xuICAgICAgICB0aGlzLmNvcm5lckNvbG9yID0gXCIjYmE4NmZlXCI7XG4gICAgICAgIC8qKiDniankvZPpu5jorqTloavlhYXpopzoibIgKi9cbiAgICAgICAgdGhpcy5maWxsID0gXCJyZ2IoMCwwLDApXCI7XG4gICAgICAgIC8qKiDniankvZPpu5jorqTmj4/ovrnlrr3luqYgKi9cbiAgICAgICAgdGhpcy5zdHJva2VXaWR0aCA9IDE7XG4gICAgICAgIC8qKiDnn6npmLXlj5jmjaIgKi9cbiAgICAgICAgLy8gcHVibGljIHRyYW5zZm9ybU1hdHJpeDogbnVtYmVyW107XG4gICAgICAgIC8qKiDmnIDlsI/nvKnmlL7lgLwgKi9cbiAgICAgICAgLy8gcHVibGljIG1pblNjYWxlTGltaXQ6IG51bWJlciA9IDAuMDE7XG4gICAgICAgIC8qKiDmmK/lkKbmnInmjqfliLbngrkgKi9cbiAgICAgICAgdGhpcy5oYXNDb250cm9scyA9IHRydWU7XG4gICAgICAgIC8qKiDmmK/lkKbmnInml4vovazmjqfliLbngrkgKi9cbiAgICAgICAgdGhpcy5oYXNSb3RhdGluZ1BvaW50ID0gdHJ1ZTtcbiAgICAgICAgLyoqIOaXi+i9rOaOp+WItueCueWBj+enu+mHjyAqL1xuICAgICAgICB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQgPSA0MDtcbiAgICAgICAgLyoqIOenu+WKqOeahOaXtuWAmei+ueahhumAj+aYjuW6piAqL1xuICAgICAgICB0aGlzLmJvcmRlck9wYWNpdHlXaGVuTW92aW5nID0gMC40O1xuICAgICAgICAvKiog54mp5L2T5piv5ZCm5Zyo56e75Yqo5LitICovXG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgLyoqIOmAieS4reaAgeeahOi+ueahhuWuveW6piAqL1xuICAgICAgICB0aGlzLmJvcmRlcldpZHRoID0gMTtcbiAgICAgICAgLyoqIOeJqeS9k+aOp+WItueCueeUqCBzdHJva2Ug6L+Y5pivIGZpbGwgKi9cbiAgICAgICAgdGhpcy50cmFuc3BhcmVudENvcm5lcnMgPSBmYWxzZTtcbiAgICAgICAgLyoqIOeJqeS9k+aOp+WItueCueWkp+Wwj++8jOWNleS9jSBweCAqL1xuICAgICAgICB0aGlzLmNvcm5lclNpemUgPSAxMjtcbiAgICAgICAgLyoqIOmAmui/h+WDj+e0oOadpeajgOa1i+eJqeS9k+iAjOS4jeaYr+mAmui/h+WMheWbtOebkiAqL1xuICAgICAgICB0aGlzLnBlclBpeGVsVGFyZ2V0RmluZCA9IGZhbHNlO1xuICAgICAgICAvKiog54mp5L2T6KKr5ouW6JOd6YCJ5Yy65L+d5a2Y55qE5pe25YCZ6ZyA6KaB5Li05pe25L+d5a2Y5LiLIGhhc0NvbnRyb2xzIOeahOWAvCAqL1xuICAgICAgICB0aGlzLm9yaWduSGFzQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXRlUHJvcGVydGllcyA9IChcInRvcCBsZWZ0IHdpZHRoIGhlaWdodCBzY2FsZVggc2NhbGVZIFwiICtcbiAgICAgICAgICAgIFwiZmxpcFggZmxpcFkgYW5nbGUgY29ybmVyU2l6ZSBmaWxsIG9yaWdpblggb3JpZ2luWSBcIiArXG4gICAgICAgICAgICBcInN0cm9rZSBzdHJva2VXaWR0aCBcIiArXG4gICAgICAgICAgICBcImJvcmRlcldpZHRoIHRyYW5zZm9ybU1hdHJpeCB2aXNpYmxlXCIpLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKG9wdGlvbnMpO1xuICAgIH1cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyAmJiB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBwcm9wIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDmuLLmn5PniankvZPvvIzpu5jorqTnlKggZmlsbCDloavlhYUgKi9cbiAgICByZW5kZXIoY3R4LCBub1RyYW5zZm9ybSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLndpZHRoID09PSAwIHx8IHRoaXMuaGVpZ2h0ID09PSAwIHx8ICF0aGlzLnZpc2libGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIC8vIGxldCBtID0gdGhpcy50cmFuc2Zvcm1NYXRyaXg7XG4gICAgICAgIC8vIGlmIChtICYmICF0aGlzLmdyb3VwKSB7XG4gICAgICAgIC8vICAgICBjdHguc2V0VHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmICghbm9UcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5zdHJva2VXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpbGwpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmZpbGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKG0gJiYgdGhpcy5ncm91cCkge1xuICAgICAgICAvLyAgICAgY3R4LnRyYW5zbGF0ZSgtdGhpcy5ncm91cC53aWR0aCAvIDIsIC10aGlzLmdyb3VwLmhlaWdodCAvIDIpO1xuICAgICAgICAvLyAgICAgY3R4LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyDnu5jliLbniankvZNcbiAgICAgICAgdGhpcy5fcmVuZGVyKGN0eCk7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhbm9UcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIC8vIOe7mOWItua/gOa0u+eJqeS9k+i+ueahhlxuICAgICAgICAgICAgdGhpcy5kcmF3Qm9yZGVycyhjdHgpO1xuICAgICAgICAgICAgLy8g57uY5Yi25r+A5rS754mp5L2T5Zub5ZGo55qE5o6n5Yi254K5XG4gICAgICAgICAgICB0aGlzLmRyYXdDb250cm9scyhjdHgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOeUu+iHqui6q+WdkOagh+ezu1xuICAgICAgICB0aGlzLmRyYXdBeGlzKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIC8qKiDnlLHlrZDnsbvlrp7njrDvvIzlsLHmmK/nlLHlhbfkvZPniankvZPnsbvmnaXlrp7njrAgKi9cbiAgICBfcmVuZGVyKGN0eCkgeyB9XG4gICAgLyoqIOe7mOWItuWJjemcgOimgei/m+ihjOWQhOenjeWPmOaNou+8iOWMheaLrOW5s+enu+OAgeaXi+i9rOOAgee8qeaUvu+8iVxuICAgICAqIOazqOaEj+WPmOaNoumhuuW6j+W+iOmHjeimge+8jOmhuuW6j+S4jeS4gOagt+S8muWvvOiHtOS4jeS4gOagt+eahOe7k+aenO+8jOaJgOS7peS4gOS4quahhuaetuS4gOaXpuWumuS4i+adpeS6hu+8jOWQjumdouWkp+amgueOh+aYr+S4jeiDveabtOaUueeahFxuICAgICAqIOaIkeS7rOmHh+eUqOeahOmhuuW6j+aYr++8muW5s+enuyAtPiDml4vovawgLT4g57yp5pS+77yM6L+Z5qC35Y+v5Lul5YeP5bCR5Lqb6K6h566X6YeP77yM5aaC5p6c5oiR5Lus5YWI5peL6L2s77yM54K555qE5Z2Q5qCH5YC85LiA6Iis5bCx5LiN5piv5pW05pWw77yM6YKj5LmI5ZCO6Z2i55qE5Y+Y5o2i5Z+65LqO6Z2e5pW05pWw5p2l6K6h566XXG4gICAgICovXG4gICAgdHJhbnNmb3JtKGN0eCkge1xuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJQb2ludCgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKGNlbnRlci54LCBjZW50ZXIueSk7XG4gICAgICAgIGN0eC5yb3RhdGUoVXRpbC5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICAgICAgY3R4LnNjYWxlKHRoaXMuZmxpcFggPyAtMSA6IDEsIHRoaXMuZmxpcFkgPyAtMSA6IDEpO1xuICAgICAgICAvLyDorr7nva7mlrDmlbDmja5cbiAgICAgICAgdGhpcy53aWR0aCAqPSB0aGlzLnNjYWxlWDtcbiAgICAgICAgdGhpcy5oZWlnaHQgKj0gdGhpcy5zY2FsZVk7XG4gICAgICAgIHRoaXMuc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLmxlZnQgPSBjZW50ZXIueDtcbiAgICAgICAgdGhpcy50b3AgPSBjZW50ZXIueTtcbiAgICAgICAgLy8gY29uc3QgbSA9IFV0aWwuY29tcG9zZU1hdHJpeCh7XG4gICAgICAgIC8vICAgICBhbmdsZTogdGhpcy5hbmdsZSxcbiAgICAgICAgLy8gICAgIHRyYW5zbGF0ZVg6IGNlbnRlci54LFxuICAgICAgICAvLyAgICAgdHJhbnNsYXRlWTogY2VudGVyLnksXG4gICAgICAgIC8vICAgICBzY2FsZVg6IHRoaXMuc2NhbGVYLFxuICAgICAgICAvLyAgICAgc2NhbGVZOiB0aGlzLnNjYWxlWSxcbiAgICAgICAgLy8gICAgIGZsaXBYOiB0aGlzLmZsaXBYLFxuICAgICAgICAvLyAgICAgZmxpcFk6IHRoaXMuZmxpcFksXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBjdHgudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAvLyBjb25zdCByYWRpYW4gPSBVdGlsLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5hbmdsZSk7XG4gICAgICAgIC8vIGNvbnN0IGNvcyA9IE1hdGguY29zKHJhZGlhbik7XG4gICAgICAgIC8vIGNvbnN0IHNpbiA9IE1hdGguc2luKHJhZGlhbik7XG4gICAgICAgIC8vIGNvbnN0IG0gPSBbY29zICogdGhpcy5zY2FsZVgsIHNpbiAqIHRoaXMuc2NhbGVYLCAtc2luICogdGhpcy5zY2FsZVksIGNvcyAqIHRoaXMuc2NhbGVZLCBjZW50ZXIueCwgY2VudGVyLnldO1xuICAgIH1cbiAgICAvKiog57uY5Yi25r+A5rS754mp5L2T6L655qGGICovXG4gICAgZHJhd0JvcmRlcnMoY3R4KSB7XG4gICAgICAgIGxldCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nLCBwYWRkaW5nMiA9IHBhZGRpbmcgKiAyLCBzdHJva2VXaWR0aCA9IHRoaXMuYm9yZGVyV2lkdGg7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuaXNNb3ZpbmcgPyB0aGlzLmJvcmRlck9wYWNpdHlXaGVuTW92aW5nIDogMTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5ib3JkZXJDb2xvcjtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICAgICAgICAvKiog55S76L655qGG55qE5pe25YCZ6ZyA6KaB5oqKIHRyYW5zZm9ybSDlj5jmjaLkuK3nmoQgc2NhbGUg5pWI5p6c5oq15raI77yM6L+Z5qC35omN6IO955S75Ye65Y6f5aeL5aSn5bCP55qE57q/5p2hICovXG4gICAgICAgIC8vIGN0eC5zY2FsZSgxIC8gdGhpcy5zY2FsZVgsIDEgLyB0aGlzLnNjYWxlWSk7XG4gICAgICAgIGxldCB3ID0gdGhpcy5nZXRXaWR0aCgpLCBoID0gdGhpcy5nZXRIZWlnaHQoKTtcbiAgICAgICAgLy8g55S754mp5L2T5r+A5rS75pe25YCZ55qE6L655qGG77yM5Lmf5bCx5piv5YyF5Zu055uS77yMfn7lsLHmmK/lj5bmlbTnmoTmhI/mgJ1cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLSh3IC8gMikgLSBwYWRkaW5nIC0gc3Ryb2tlV2lkdGggLyAyLCAtKGggLyAyKSAtIHBhZGRpbmcgLSBzdHJva2VXaWR0aCAvIDIsIHcgKyBwYWRkaW5nMiArIHN0cm9rZVdpZHRoLCBoICsgcGFkZGluZzIgKyBzdHJva2VXaWR0aCk7XG4gICAgICAgIC8vIOeUu+aXi+i9rOaOp+WItueCueeahOmCo+adoee6v1xuICAgICAgICBpZiAodGhpcy5oYXNSb3RhdGluZ1BvaW50ICYmIHRoaXMuaGFzQ29udHJvbHMpIHtcbiAgICAgICAgICAgIGxldCByb3RhdGVIZWlnaHQgPSAoLWggLSBzdHJva2VXaWR0aCAtIHBhZGRpbmcgKiAyKSAvIDI7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIHJvdGF0ZUhlaWdodCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKDAsIHJvdGF0ZUhlaWdodCAtIHRoaXMucm90YXRpbmdQb2ludE9mZnNldCk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDnu5jliLbljIXlm7Tnm5LmqKHlnovnmoTmjqfliLbngrkgKi9cbiAgICBkcmF3Q29udHJvbHMoY3R4KSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNDb250cm9scylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8g5Zug5Li655S75biD5bey57uP57uP6L+H5Y+Y5o2i77yM5omA5Lul5aSn6YOo5YiG5pWw5YC86ZyA6KaB6Zmk5LulIHNjYWxlIOadpeaKtea2iOWPmOaNolxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY29ybmVyU2l6ZSwgc2l6ZTIgPSBzaXplIC8gMiwgc3Ryb2tlV2lkdGgyID0gdGhpcy5zdHJva2VXaWR0aCAvIDIsIFxuICAgICAgICAvLyB0b3Ag5ZKMIGxlZnQg5YC85Li654mp5L2T5bem5LiK6KeS55qE54K5XG4gICAgICAgIGxlZnQgPSAtKHRoaXMud2lkdGggLyAyKSwgdG9wID0gLSh0aGlzLmhlaWdodCAvIDIpLCBfbGVmdCwgX3RvcCwgc2l6ZVggPSBzaXplIC8gdGhpcy5zY2FsZVgsIHNpemVZID0gc2l6ZSAvIHRoaXMuc2NhbGVZLCBwYWRkaW5nWCA9IHRoaXMucGFkZGluZyAvIHRoaXMuc2NhbGVYLCBwYWRkaW5nWSA9IHRoaXMucGFkZGluZyAvIHRoaXMuc2NhbGVZLCBzY2FsZU9mZnNldFkgPSBzaXplMiAvIHRoaXMuc2NhbGVZLCBzY2FsZU9mZnNldFggPSBzaXplMiAvIHRoaXMuc2NhbGVYLCBzY2FsZU9mZnNldFNpemVYID0gKHNpemUyIC0gc2l6ZSkgLyB0aGlzLnNjYWxlWCwgc2NhbGVPZmZzZXRTaXplWSA9IChzaXplMiAtIHNpemUpIC8gdGhpcy5zY2FsZVksIGhlaWdodCA9IHRoaXMuaGVpZ2h0LCB3aWR0aCA9IHRoaXMud2lkdGgsIFxuICAgICAgICAvLyDmjqfliLbngrnmmK/lrp7lv4Pov5jmmK/nqbrlv4NcbiAgICAgICAgbWV0aG9kTmFtZSA9IHRoaXMudHJhbnNwYXJlbnRDb3JuZXJzID8gXCJzdHJva2VSZWN0XCIgOiBcImZpbGxSZWN0XCI7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoIC8gTWF0aC5tYXgodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5pc01vdmluZyA/IHRoaXMuYm9yZGVyT3BhY2l0eVdoZW5Nb3ZpbmcgOiAxO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjdHguZmlsbFN0eWxlID0gdGhpcy5jb3JuZXJDb2xvcjtcbiAgICAgICAgLy8gdG9wLWxlZnRcbiAgICAgICAgX2xlZnQgPSBsZWZ0IC0gc2NhbGVPZmZzZXRYIC0gc3Ryb2tlV2lkdGgyIC0gcGFkZGluZ1g7XG4gICAgICAgIF90b3AgPSB0b3AgLSBzY2FsZU9mZnNldFkgLSBzdHJva2VXaWR0aDIgLSBwYWRkaW5nWTtcbiAgICAgICAgY3R4LmNsZWFyUmVjdChfbGVmdCwgX3RvcCwgc2l6ZVgsIHNpemVZKTtcbiAgICAgICAgY3R4W21ldGhvZE5hbWVdKF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICAvLyB0b3AtcmlnaHRcbiAgICAgICAgX2xlZnQgPSBsZWZ0ICsgd2lkdGggLSBzY2FsZU9mZnNldFggKyBzdHJva2VXaWR0aDIgKyBwYWRkaW5nWDtcbiAgICAgICAgX3RvcCA9IHRvcCAtIHNjYWxlT2Zmc2V0WSAtIHN0cm9rZVdpZHRoMiAtIHBhZGRpbmdZO1xuICAgICAgICBjdHguY2xlYXJSZWN0KF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICBjdHhbbWV0aG9kTmFtZV0oX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIC8vIGJvdHRvbS1sZWZ0XG4gICAgICAgIF9sZWZ0ID0gbGVmdCAtIHNjYWxlT2Zmc2V0WCAtIHN0cm9rZVdpZHRoMiAtIHBhZGRpbmdYO1xuICAgICAgICBfdG9wID0gdG9wICsgaGVpZ2h0ICsgc2NhbGVPZmZzZXRTaXplWSArIHN0cm9rZVdpZHRoMiArIHBhZGRpbmdZO1xuICAgICAgICBjdHguY2xlYXJSZWN0KF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICBjdHhbbWV0aG9kTmFtZV0oX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIC8vIGJvdHRvbS1yaWdodFxuICAgICAgICBfbGVmdCA9IGxlZnQgKyB3aWR0aCArIHNjYWxlT2Zmc2V0U2l6ZVggKyBzdHJva2VXaWR0aDIgKyBwYWRkaW5nWDtcbiAgICAgICAgX3RvcCA9IHRvcCArIGhlaWdodCArIHNjYWxlT2Zmc2V0U2l6ZVkgKyBzdHJva2VXaWR0aDIgKyBwYWRkaW5nWTtcbiAgICAgICAgY3R4LmNsZWFyUmVjdChfbGVmdCwgX3RvcCwgc2l6ZVgsIHNpemVZKTtcbiAgICAgICAgY3R4W21ldGhvZE5hbWVdKF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICAvLyBtaWRkbGUtdG9wXG4gICAgICAgIF9sZWZ0ID0gbGVmdCArIHdpZHRoIC8gMiAtIHNjYWxlT2Zmc2V0WDtcbiAgICAgICAgX3RvcCA9IHRvcCAtIHNjYWxlT2Zmc2V0WSAtIHN0cm9rZVdpZHRoMiAtIHBhZGRpbmdZO1xuICAgICAgICBjdHguY2xlYXJSZWN0KF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICBjdHhbbWV0aG9kTmFtZV0oX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIC8vIG1pZGRsZS1ib3R0b21cbiAgICAgICAgX2xlZnQgPSBsZWZ0ICsgd2lkdGggLyAyIC0gc2NhbGVPZmZzZXRYO1xuICAgICAgICBfdG9wID0gdG9wICsgaGVpZ2h0ICsgc2NhbGVPZmZzZXRTaXplWSArIHN0cm9rZVdpZHRoMiArIHBhZGRpbmdZO1xuICAgICAgICBjdHguY2xlYXJSZWN0KF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICBjdHhbbWV0aG9kTmFtZV0oX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIC8vIG1pZGRsZS1yaWdodFxuICAgICAgICBfbGVmdCA9IGxlZnQgKyB3aWR0aCArIHNjYWxlT2Zmc2V0U2l6ZVggKyBzdHJva2VXaWR0aDIgKyBwYWRkaW5nWDtcbiAgICAgICAgX3RvcCA9IHRvcCArIGhlaWdodCAvIDIgLSBzY2FsZU9mZnNldFk7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIGN0eFttZXRob2ROYW1lXShfbGVmdCwgX3RvcCwgc2l6ZVgsIHNpemVZKTtcbiAgICAgICAgLy8gbWlkZGxlLWxlZnRcbiAgICAgICAgX2xlZnQgPSBsZWZ0IC0gc2NhbGVPZmZzZXRYIC0gc3Ryb2tlV2lkdGgyIC0gcGFkZGluZ1g7XG4gICAgICAgIF90b3AgPSB0b3AgKyBoZWlnaHQgLyAyIC0gc2NhbGVPZmZzZXRZO1xuICAgICAgICBjdHguY2xlYXJSZWN0KF9sZWZ0LCBfdG9wLCBzaXplWCwgc2l6ZVkpO1xuICAgICAgICBjdHhbbWV0aG9kTmFtZV0oX2xlZnQsIF90b3AsIHNpemVYLCBzaXplWSk7XG4gICAgICAgIC8vIOe7mOWItuaXi+i9rOaOp+WItueCuVxuICAgICAgICBpZiAodGhpcy5oYXNSb3RhdGluZ1BvaW50KSB7XG4gICAgICAgICAgICBfbGVmdCA9IGxlZnQgKyB3aWR0aCAvIDIgLSBzY2FsZU9mZnNldFg7XG4gICAgICAgICAgICBfdG9wID1cbiAgICAgICAgICAgICAgICB0b3AgLVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQgLyB0aGlzLnNjYWxlWSAtXG4gICAgICAgICAgICAgICAgICAgIHNpemVZIC8gMiAtXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoMiAtXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdZO1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdChfbGVmdCwgX3RvcCwgc2l6ZVgsIHNpemVZKTtcbiAgICAgICAgICAgIGN0eFttZXRob2ROYW1lXShfbGVmdCwgX3RvcCwgc2l6ZVgsIHNpemVZKTtcbiAgICAgICAgfVxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZHJhd0F4aXMoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IGxlbmd0aFJhdGlvID0gMS41O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFs0ICogbGVuZ3RoUmF0aW8sIDMgKiBsZW5ndGhSYXRpb10pO1xuICAgICAgICAvKiog55S75Z2Q5qCH6L2055qE5pe25YCZ6ZyA6KaB5oqKIHRyYW5zZm9ybSDlj5jmjaLkuK3nmoQgc2NhbGUg5pWI5p6c5oq15raI77yM6L+Z5qC35omN6IO955S75Ye65Y6f5aeL5aSn5bCP55qE57q/5p2hICovXG4gICAgICAgIGN0eC5zY2FsZSgxIC8gdGhpcy5zY2FsZVgsIDEgLyB0aGlzLnNjYWxlWSk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIHNldHVwU3RhdGUoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxTdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIH1cbiAgICAvKiog5L+d5a2Y54mp5L2T5b2T5YmN55qE54q25oCB5YiwIG9yaWdpbmFsU3RhdGUg5LitICovXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXRlUHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsU3RhdGVbcHJvcF0gPSB0aGlzW3Byb3BdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDojrflj5bniankvZPkuK3lv4PngrkgKi9cbiAgICBnZXRDZW50ZXJQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVG9DZW50ZXJQb2ludChuZXcgUG9pbnQodGhpcy5sZWZ0LCB0aGlzLnRvcCksIHRoaXMub3JpZ2luWCwgdGhpcy5vcmlnaW5ZKTtcbiAgICB9XG4gICAgLyoqIOWwhuS4reW/g+eCueenu+WIsOWPmOaNouWfuueCuSAqL1xuICAgIHRyYW5zbGF0ZVRvQ2VudGVyUG9pbnQocG9pbnQsIG9yaWdpblgsIG9yaWdpblkpIHtcbiAgICAgICAgbGV0IGN4ID0gcG9pbnQueCwgY3kgPSBwb2ludC55O1xuICAgICAgICBpZiAob3JpZ2luWCA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgIGN4ID0gcG9pbnQueCArIHRoaXMuZ2V0V2lkdGgoKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3JpZ2luWCA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICBjeCA9IHBvaW50LnggLSB0aGlzLmdldFdpZHRoKCkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmlnaW5ZID09PSBcInRvcFwiKSB7XG4gICAgICAgICAgICBjeSA9IHBvaW50LnkgKyB0aGlzLmdldEhlaWdodCgpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcmlnaW5ZID09PSBcImJvdHRvbVwiKSB7XG4gICAgICAgICAgICBjeSA9IHBvaW50LnkgLSB0aGlzLmdldEhlaWdodCgpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwID0gbmV3IFBvaW50KGN4LCBjeSk7XG4gICAgICAgIGlmICh0aGlzLmFuZ2xlKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC5yb3RhdGVQb2ludChwLCBwb2ludCwgVXRpbC5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuYW5nbGUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5s+enu+WdkOagh+ezu+WIsOS4reW/g+eCuVxuICAgICAqIEBwYXJhbSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luWCAgbGVmdCB8IGNlbnRlciB8IHJpZ2h0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpblkgIHRvcCB8IGNlbnRlciB8IGJvdHRvbVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgdHJhbnNsYXRlVG9PcmlnaW5Qb2ludChjZW50ZXIsIG9yaWdpblgsIG9yaWdpblkpIHtcbiAgICAgICAgbGV0IHggPSBjZW50ZXIueCwgeSA9IGNlbnRlci55O1xuICAgICAgICAvLyBHZXQgdGhlIHBvaW50IGNvb3JkaW5hdGVzXG4gICAgICAgIGlmIChvcmlnaW5YID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgeCA9IGNlbnRlci54IC0gdGhpcy5nZXRXaWR0aCgpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcmlnaW5YID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIHggPSBjZW50ZXIueCArIHRoaXMuZ2V0V2lkdGgoKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yaWdpblkgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgIHkgPSBjZW50ZXIueSAtIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9yaWdpblkgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgICAgICAgIHkgPSBjZW50ZXIueSArIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFwcGx5IHRoZSByb3RhdGlvbiB0byB0aGUgcG9pbnQgKGl0J3MgYWxyZWFkeSBzY2FsZWQgcHJvcGVybHkpXG4gICAgICAgIHJldHVybiBVdGlsLnJvdGF0ZVBvaW50KG5ldyBQb2ludCh4LCB5KSwgY2VudGVyLCBVdGlsLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5hbmdsZSkpO1xuICAgIH1cbiAgICAvKiog6L2s5o2i5oiQ5pys5Zyw5Z2Q5qCHICovXG4gICAgdG9Mb2NhbFBvaW50KHBvaW50LCBvcmlnaW5YLCBvcmlnaW5ZKSB7XG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLmdldENlbnRlclBvaW50KCk7XG4gICAgICAgIGxldCB4LCB5O1xuICAgICAgICBpZiAob3JpZ2luWCAhPT0gdW5kZWZpbmVkICYmIG9yaWdpblkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpblggPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgeCA9IGNlbnRlci54IC0gdGhpcy5nZXRXaWR0aCgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdpblggPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICAgIHggPSBjZW50ZXIueCArIHRoaXMuZ2V0V2lkdGgoKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gY2VudGVyLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3JpZ2luWSA9PT0gXCJ0b3BcIikge1xuICAgICAgICAgICAgICAgIHkgPSBjZW50ZXIueSAtIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob3JpZ2luWSA9PT0gXCJib3R0b21cIikge1xuICAgICAgICAgICAgICAgIHkgPSBjZW50ZXIueSArIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeSA9IGNlbnRlci55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IHRoaXMubGVmdDtcbiAgICAgICAgICAgIHkgPSB0aGlzLnRvcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXRpbC5yb3RhdGVQb2ludChuZXcgUG9pbnQocG9pbnQueCwgcG9pbnQueSksIGNlbnRlciwgLVV0aWwuZGVncmVlc1RvUmFkaWFucyh0aGlzLmFuZ2xlKSkuc3VidHJhY3RFcXVhbHMobmV3IFBvaW50KHgsIHkpKTtcbiAgICB9XG4gICAgLyoqIOajgOa1i+WTquS4quaOp+WItueCueiiq+eCueWHu+S6hiAqL1xuICAgIF9maW5kVGFyZ2V0Q29ybmVyKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnRyb2xzIHx8ICF0aGlzLmFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgbGV0IHBvaW50ZXIgPSBVdGlsLmdldFBvaW50ZXIoZSwgdGhpcy5jYW52YXMudG9wQ2FudmFzLCB0aGlzLmNhbnZhcyksIGV4ID0gcG9pbnRlci54LCBleSA9IHBvaW50ZXIueSwgeHBvaW50cywgbGluZXM7XG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5vQ29vcmRzKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gXCJtdHJcIiAmJiAhdGhpcy5oYXNSb3RhdGluZ1BvaW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lcyA9IHRoaXMuX2dldEltYWdlTGluZXModGhpcy5vQ29vcmRzW2ldLmNvcm5lcik7XG4gICAgICAgICAgICB4cG9pbnRzID0gdGhpcy5fZmluZENyb3NzUG9pbnRzKGV4LCBleSwgbGluZXMpO1xuICAgICAgICAgICAgaWYgKHhwb2ludHMgJSAyID09PSAxICYmIHhwb2ludHMgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKiDojrflj5bljIXlm7Tnm5LnmoTlm5vmnaHovrkgKi9cbiAgICBfZ2V0SW1hZ2VMaW5lcyhjb3JuZXIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBvOiBjb3JuZXIudGwsXG4gICAgICAgICAgICAgICAgZDogY29ybmVyLnRyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJpZ2h0bGluZToge1xuICAgICAgICAgICAgICAgIG86IGNvcm5lci50cixcbiAgICAgICAgICAgICAgICBkOiBjb3JuZXIuYnIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm90dG9tbGluZToge1xuICAgICAgICAgICAgICAgIG86IGNvcm5lci5icixcbiAgICAgICAgICAgICAgICBkOiBjb3JuZXIuYmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdGxpbmU6IHtcbiAgICAgICAgICAgICAgICBvOiBjb3JuZXIuYmwsXG4gICAgICAgICAgICAgICAgZDogY29ybmVyLnRsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCE57q/5qOA5rWL5rOV77ya5Lul6byg5qCH5Z2Q5qCH54K55Li65Y+C54Wn77yM5rC05bmz5ZCR5Y+z5YGa5LiA5p2h5bCE57q/77yM5rGC5Z2Q5qCH54K55LiO5aSa5p2h6L6555qE5Lqk54K55Liq5pWwXG4gICAgICog5aaC5p6c5ZKM54mp5L2T55u45Lqk55qE5Liq5pWw5Li65YG25pWw54K55YiZ54K55Zyo54mp5L2T5aSW6YOo77yb5aaC5p6c5Li65aWH5pWw54K55YiZ54K55Zyo5YaF6YOoXG4gICAgICog5LiN6L+HIGZhYnJpYyDnmoTngrnpgInlpJrovrnlvaLpg73mmK/nlKjkuo7ljIXlm7Tnm5LvvIzkuZ/lsLHmmK/nn6nlvaLvvIzmiYDku6Xor6Xmlrnms5XmmK/kuJPpl6jpkojlr7nnn6nlvaLnmoTvvIzlubbkuJTpkojlr7nnn6nlvaLlgZrkuobkuIDkupvkvJjljJZcbiAgICAgKi9cbiAgICBfZmluZENyb3NzUG9pbnRzKGV4LCBleSwgbGluZXMpIHtcbiAgICAgICAgbGV0IGIxLCAvLyDlsITnur/nmoTmlpznjodcbiAgICAgICAgYjIsIC8vIOi+ueeahOaWnOeOh1xuICAgICAgICBhMSwgYTIsIHhpLCAvLyDlsITnur/kuI7ovrnnmoTkuqTngrlcbiAgICAgICAgLy8geWksIC8vIOWwhOe6v+S4jui+ueeahOS6pOeCuVxuICAgICAgICB4Y291bnQgPSAwLCBpTGluZTsgLy8g5b2T5YmN6L65XG4gICAgICAgIC8vIOmBjeWOhuWMheWbtOebkueahOWbm+adoei+uVxuICAgICAgICBmb3IgKGxldCBsaW5lS2V5IGluIGxpbmVzKSB7XG4gICAgICAgICAgICBpTGluZSA9IGxpbmVzW2xpbmVLZXldO1xuICAgICAgICAgICAgLy8g5LyY5YyWMe+8muWmguaenOi+ueeahOS4pOS4querr+eCueeahCB5IOWAvOmDveWwj+S6jum8oOagh+eCueeahCB5IOWAvO+8jOWImei3s+i/h1xuICAgICAgICAgICAgaWYgKGlMaW5lLm8ueSA8IGV5ICYmIGlMaW5lLmQueSA8IGV5KVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8g5LyY5YyWMu+8muWmguaenOi+ueeahOS4pOS4querr+eCueeahCB5IOWAvOmDveWkp+S6jum8oOagh+eCueeahCB5IOWAvO+8jOWImei3s+i/h1xuICAgICAgICAgICAgaWYgKGlMaW5lLm8ueSA+PSBleSAmJiBpTGluZS5kLnkgPj0gZXkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyDkvJjljJYz77ya5aaC5p6c6L655piv5LiA5p2h5Z6C57q/XG4gICAgICAgICAgICBpZiAoaUxpbmUuby54ID09PSBpTGluZS5kLnggJiYgaUxpbmUuby54ID49IGV4KSB7XG4gICAgICAgICAgICAgICAgeGkgPSBpTGluZS5vLng7XG4gICAgICAgICAgICAgICAgLy8geWkgPSBleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOeugOWNleiuoeeul+S4i+WwhOe6v+S4jui+ueeahOS6pOeCue+8jOeci+W8j+WtkOWuueaYk+aZle+8jOW7uuiuruiHquW3seaJi+WKqOeul+S4gOS4i1xuICAgICAgICAgICAgICAgIGIxID0gMDtcbiAgICAgICAgICAgICAgICBiMiA9IChpTGluZS5kLnkgLSBpTGluZS5vLnkpIC8gKGlMaW5lLmQueCAtIGlMaW5lLm8ueCk7XG4gICAgICAgICAgICAgICAgYTEgPSBleSAtIGIxICogZXg7XG4gICAgICAgICAgICAgICAgYTIgPSBpTGluZS5vLnkgLSBiMiAqIGlMaW5lLm8ueDtcbiAgICAgICAgICAgICAgICB4aSA9IC0oYTEgLSBhMikgLyAoYjEgLSBiMik7XG4gICAgICAgICAgICAgICAgLy8geWkgPSBhMSArIGIxICogeGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlj6rpnIDopoHorqHmlbAgeGkgPj0gZXgg55qE5oOF5Ya1XG4gICAgICAgICAgICBpZiAoeGkgPj0gZXgpIHtcbiAgICAgICAgICAgICAgICB4Y291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOS8mOWMljTvvJrlm6DkuLogZmFicmljIOS4reeahOWkmui+ueW9ouWPqumcgOimgeeUqOWIsOefqeW9ou+8jOaJgOS7peagueaNruefqeW9oueahOeJuei0qO+8jOmhtuWkmuWPquacieS4pOS4quS6pOeCue+8jOaJgOS7peaIkeS7rOWPr+S7peaPkOWJjee7k+adn+W+queOr1xuICAgICAgICAgICAgaWYgKHhjb3VudCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4Y291bnQ7XG4gICAgfVxuICAgIC8qKiDniankvZPliqjnlLsgKi9cbiAgICBhbmltYXRlKHByb3BzLCBhbmltYXRlT3B0aW9ucykge1xuICAgICAgICBsZXQgcHJvcHNUb0FuaW1hdGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgcHJvcHNUb0FuaW1hdGUucHVzaChwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW4gPSBwcm9wc1RvQW5pbWF0ZS5sZW5ndGg7XG4gICAgICAgIHByb3BzVG9BbmltYXRlLmZvckVhY2goKHByb3AsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraXBDYWxsYmFja3MgPSBpICE9PSBsZW4gLSAxO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZShwcm9wLCBwcm9wc1twcm9wXSwgYW5pbWF0ZU9wdGlvbnMsIHNraXBDYWxsYmFja3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuqeeJqeS9k+ecn+ato+WKqOi1t+adpVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSDniankvZPpnIDopoHliqjnlLvnmoTlsZ7mgKdcbiAgICAgKiBAcGFyYW0gdG8g54mp5L2T5bGe5oCn55qE5pyA57uI5YC8XG4gICAgICogQHBhcmFtIG9wdGlvbnMg5LiA5Lqb5Yqo55S76YCJ6aG5XG4gICAgICogQHBhcmFtIHNraXBDYWxsYmFja3Mg5piv5ZCm6Lez6L+H57uY5Yi2XG4gICAgICovXG4gICAgX2FuaW1hdGUocHJvcGVydHksIHRvLCBvcHRpb25zID0ge30sIHNraXBDYWxsYmFja3MpIHtcbiAgICAgICAgb3B0aW9ucyA9IFV0aWwuY2xvbmUob3B0aW9ucyk7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLmdldChwcm9wZXJ0eSk7XG4gICAgICAgIGlmICghb3B0aW9ucy5mcm9tKVxuICAgICAgICAgICAgb3B0aW9ucy5mcm9tID0gY3VycmVudFZhbHVlO1xuICAgICAgICB0byA9IHRvLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh+dG8uaW5kZXhPZihcIj1cIikpIHtcbiAgICAgICAgICAgIHRvID0gY3VycmVudFZhbHVlICsgcGFyc2VGbG9hdCh0by5yZXBsYWNlKFwiPVwiLCBcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0byA9IHBhcnNlRmxvYXQodG8pO1xuICAgICAgICB9XG4gICAgICAgIFV0aWwuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzdGFydFZhbHVlOiBvcHRpb25zLmZyb20sXG4gICAgICAgICAgICBlbmRWYWx1ZTogdG8sXG4gICAgICAgICAgICBieVZhbHVlOiBvcHRpb25zLmJ5LFxuICAgICAgICAgICAgZWFzaW5nOiBvcHRpb25zLmVhc2luZyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICAgICAgICAgICAgYWJvcnQ6IG9wdGlvbnMuYWJvcnQgJiYgKCgpID0+IG9wdGlvbnMuYWJvcnQuY2FsbCh0aGlzKSksXG4gICAgICAgICAgICBvbkNoYW5nZTogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnMub25DaGFuZ2UgJiYgb3B0aW9ucy5vbkNoYW5nZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29vcmRzKCk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlICYmIG9wdGlvbnMub25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFjdGl2ZShhY3RpdmUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9ICEhYWN0aXZlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5qC55o2u54mp5L2T55qEIG9yaWdpbiDmnaXorr7nva7niankvZPnmoTkvY3nva5cbiAgICAgKiBAbWV0aG9kIHNldFBvc2l0aW9uQnlPcmlnaW5cbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luWCBsZWZ0IHwgY2VudGVyIHwgcmlnaHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luWSB0b3AgfCBjZW50ZXIgfCBib3R0b21cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbkJ5T3JpZ2luKHBvcywgb3JpZ2luWCwgb3JpZ2luWSkge1xuICAgICAgICBsZXQgY2VudGVyID0gdGhpcy50cmFuc2xhdGVUb0NlbnRlclBvaW50KHBvcywgb3JpZ2luWCwgb3JpZ2luWSk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMudHJhbnNsYXRlVG9PcmlnaW5Qb2ludChjZW50ZXIsIHRoaXMub3JpZ2luWCwgdGhpcy5vcmlnaW5ZKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYOabtOaWsOe8qeaUvueahOeJqeS9k+S9jee9rjpbJHtwb3NpdGlvbi54fe+8jCR7cG9zaXRpb24ueX1dYCk7XG4gICAgICAgIHRoaXMuc2V0KFwibGVmdFwiLCBwb3NpdGlvbi54KTtcbiAgICAgICAgdGhpcy5zZXQoXCJ0b3BcIiwgcG9zaXRpb24ueSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0byBsZWZ0LCBjZW50ZXIsIHJpZ2h0IOS4reeahOS4gOS4qlxuICAgICAqL1xuICAgIGFkanVzdFBvc2l0aW9uKHRvKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IFV0aWwuZGVncmVlc1RvUmFkaWFucyh0aGlzLmFuZ2xlKTtcbiAgICAgICAgbGV0IGh5cG90SGFsZiA9IHRoaXMuZ2V0V2lkdGgoKSAvIDI7XG4gICAgICAgIGxldCB4SGFsZiA9IE1hdGguY29zKGFuZ2xlKSAqIGh5cG90SGFsZjtcbiAgICAgICAgbGV0IHlIYWxmID0gTWF0aC5zaW4oYW5nbGUpICogaHlwb3RIYWxmO1xuICAgICAgICBsZXQgaHlwb3RGdWxsID0gdGhpcy5nZXRXaWR0aCgpO1xuICAgICAgICBsZXQgeEZ1bGwgPSBNYXRoLmNvcyhhbmdsZSkgKiBoeXBvdEZ1bGw7XG4gICAgICAgIGxldCB5RnVsbCA9IE1hdGguc2luKGFuZ2xlKSAqIGh5cG90RnVsbDtcbiAgICAgICAgaWYgKCh0aGlzLm9yaWdpblggPT09IFwiY2VudGVyXCIgJiYgdG8gPT09IFwibGVmdFwiKSB8fFxuICAgICAgICAgICAgKHRoaXMub3JpZ2luWCA9PT0gXCJyaWdodFwiICYmIHRvID09PSBcImNlbnRlclwiKSkge1xuICAgICAgICAgICAgLy8gbW92ZSBoYWxmIGxlZnRcbiAgICAgICAgICAgIHRoaXMubGVmdCAtPSB4SGFsZjtcbiAgICAgICAgICAgIHRoaXMudG9wIC09IHlIYWxmO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCh0aGlzLm9yaWdpblggPT09IFwibGVmdFwiICYmIHRvID09PSBcImNlbnRlclwiKSB8fFxuICAgICAgICAgICAgKHRoaXMub3JpZ2luWCA9PT0gXCJjZW50ZXJcIiAmJiB0byA9PT0gXCJyaWdodFwiKSkge1xuICAgICAgICAgICAgLy8gbW92ZSBoYWxmIHJpZ2h0XG4gICAgICAgICAgICB0aGlzLmxlZnQgKz0geEhhbGY7XG4gICAgICAgICAgICB0aGlzLnRvcCArPSB5SGFsZjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm9yaWdpblggPT09IFwibGVmdFwiICYmIHRvID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIC8vIG1vdmUgZnVsbCByaWdodFxuICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHhGdWxsO1xuICAgICAgICAgICAgdGhpcy50b3AgKz0geUZ1bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5vcmlnaW5YID09PSBcInJpZ2h0XCIgJiYgdG8gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAvLyBtb3ZlIGZ1bGwgbGVmdFxuICAgICAgICAgICAgdGhpcy5sZWZ0IC09IHhGdWxsO1xuICAgICAgICAgICAgdGhpcy50b3AgLT0geUZ1bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRDb29yZHMoKTtcbiAgICAgICAgdGhpcy5vcmlnaW5YID0gdG87XG4gICAgfVxuICAgIGhhc1N0YXRlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVQcm9wZXJ0aWVzLnNvbWUoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3Byb3BdICE9PSB0aGlzLm9yaWdpbmFsU3RhdGVbcHJvcF07XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDniankvZPkuI7moYbpgInljLrln5/mmK/lkKbnm7jkuqTvvIznlKjmoYbpgInljLrln5/nmoTlm5vmnaHovrnliIbliKvkuI7niankvZPnmoTlm5vmnaHovrnmsYLkuqRcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBzZWxlY3Rpb25UTCDmi5bok53moYbpgInljLrln5/lt6bkuIrop5LnmoTngrlcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBzZWxlY3Rpb25CUiDmi5bok53moYbpgInljLrln5/lj7PkuIvop5LnmoTngrlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RzV2l0aFJlY3Qoc2VsZWN0aW9uVEwsIHNlbGVjdGlvbkJSKSB7XG4gICAgICAgIGxldCBvQ29vcmRzID0gdGhpcy5vQ29vcmRzLCB0bCA9IG5ldyBQb2ludChvQ29vcmRzLnRsLngsIG9Db29yZHMudGwueSksIHRyID0gbmV3IFBvaW50KG9Db29yZHMudHIueCwgb0Nvb3Jkcy50ci55KSwgYmwgPSBuZXcgUG9pbnQob0Nvb3Jkcy5ibC54LCBvQ29vcmRzLmJsLnkpLCBiciA9IG5ldyBQb2ludChvQ29vcmRzLmJyLngsIG9Db29yZHMuYnIueSk7XG4gICAgICAgIGxldCBpbnRlcnNlY3Rpb24gPSBJbnRlcnNlY3Rpb24uaW50ZXJzZWN0UG9seWdvblJlY3RhbmdsZShbdGwsIHRyLCBiciwgYmxdLCBzZWxlY3Rpb25UTCwgc2VsZWN0aW9uQlIpO1xuICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLnN0YXR1cyA9PT0gXCJJbnRlcnNlY3Rpb25cIjtcbiAgICB9XG4gICAgLy8gaXNDb250YWluZWRXaXRoaW5PYmplY3Qob3RoZXIpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuaXNDb250YWluZWRXaXRoaW5SZWN0KG90aGVyLm9Db29yZHMudGwsIG90aGVyLm9Db29yZHMuYnIpO1xuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiDniankvZPmmK/lkKbooqvmoYbpgInljLrln5/ljIXlkKtcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBzZWxlY3Rpb25UTCDmi5bok53moYbpgInljLrln5/lt6bkuIrop5LnmoTngrlcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBzZWxlY3Rpb25CUiDmi5bok53moYbpgInljLrln5/lj7PkuIvop5LnmoTngrlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NvbnRhaW5lZFdpdGhpblJlY3Qoc2VsZWN0aW9uVEwsIHNlbGVjdGlvbkJSKSB7XG4gICAgICAgIGxldCBvQ29vcmRzID0gdGhpcy5vQ29vcmRzLCB0bCA9IG5ldyBQb2ludChvQ29vcmRzLnRsLngsIG9Db29yZHMudGwueSksIHRyID0gbmV3IFBvaW50KG9Db29yZHMudHIueCwgb0Nvb3Jkcy50ci55KSwgYmwgPSBuZXcgUG9pbnQob0Nvb3Jkcy5ibC54LCBvQ29vcmRzLmJsLnkpO1xuICAgICAgICByZXR1cm4gKHRsLnggPiBzZWxlY3Rpb25UTC54ICYmXG4gICAgICAgICAgICB0ci54IDwgc2VsZWN0aW9uQlIueCAmJlxuICAgICAgICAgICAgdGwueSA+IHNlbGVjdGlvblRMLnkgJiZcbiAgICAgICAgICAgIGJsLnkgPCBzZWxlY3Rpb25CUi55KTtcbiAgICB9XG4gICAgLyoqIOehruS/nee8qeaUvuWAvOacieaViO+8jOacieaEj+S5iSAqL1xuICAgIC8vIF9jb25zdHJhaW5TY2FsZSh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAvLyAgICAgaWYgKE1hdGguYWJzKHZhbHVlKSA8IHRoaXMubWluU2NhbGVMaW1pdCkge1xuICAgIC8vICAgICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiAtdGhpcy5taW5TY2FsZUxpbWl0O1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5taW5TY2FsZUxpbWl0O1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiB2YWx1ZTtcbiAgICAvLyB9XG4gICAgZ2V0Vmlld3BvcnRUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbnZhcyAmJiB0aGlzLmNhbnZhcy52aWV3cG9ydFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLnZpZXdwb3J0VHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgfVxuICAgIF9jYWxjdWxhdGVDdXJyZW50RGltZW5zaW9ucygpIHtcbiAgICAgICAgbGV0IHZwdCA9IHRoaXMuZ2V0Vmlld3BvcnRUcmFuc2Zvcm0oKSwgZGltID0gdGhpcy5fZ2V0VHJhbnNmb3JtZWREaW1lbnNpb25zKCksIHcgPSBkaW0ueCwgaCA9IGRpbS55O1xuICAgICAgICB3ICs9IDIgKiB0aGlzLnBhZGRpbmc7XG4gICAgICAgIGggKz0gMiAqIHRoaXMucGFkZGluZztcbiAgICAgICAgcmV0dXJuIFV0aWwudHJhbnNmb3JtUG9pbnQobmV3IFBvaW50KHcsIGgpLCB2cHQsIHRydWUpO1xuICAgIH1cbiAgICAvKiog6I635Y+W54mp5L2T5rKh5pyJ5Y+Y5o2i5pe255qE5aSn5bCP77yM5YyF5ousIHN0cm9rZVdpZHRoIOeahCAxcHggKi9cbiAgICBfZ2V0Tm9uVHJhbnNmb3JtZWREaW1lbnNpb25zKCkge1xuICAgICAgICBsZXQgc3Ryb2tlV2lkdGggPSB0aGlzLnN0cm9rZVdpZHRoLCB3ID0gdGhpcy53aWR0aCwgaCA9IHRoaXMuaGVpZ2h0LCBhZGRTdHJva2VUb1cgPSB0cnVlLCBhZGRTdHJva2VUb0ggPSB0cnVlO1xuICAgICAgICBpZiAoYWRkU3Ryb2tlVG9IKSB7XG4gICAgICAgICAgICBoICs9IGggPCAwID8gLXN0cm9rZVdpZHRoIDogc3Ryb2tlV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkZFN0cm9rZVRvVykge1xuICAgICAgICAgICAgdyArPSB3IDwgMCA/IC1zdHJva2VXaWR0aCA6IHN0cm9rZVdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHg6IHcsIHk6IGggfTtcbiAgICB9XG4gICAgX2dldFRyYW5zZm9ybWVkRGltZW5zaW9ucyhza2V3WCA9IDAsIHNrZXdZID0gMCkge1xuICAgICAgICAvLyBpZiAodHlwZW9mIHNrZXdYID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyAgICAgc2tld1ggPSB0aGlzLnNrZXdYO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmICh0eXBlb2Ygc2tld1kgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vICAgICBza2V3WSA9IHRoaXMuc2tld1k7XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB0aGlzLl9nZXROb25UcmFuc2Zvcm1lZERpbWVuc2lvbnMoKSwgZGltWCA9IGRpbWVuc2lvbnMueCAvIDIsIGRpbVkgPSBkaW1lbnNpb25zLnkgLyAyLCBwb2ludHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogLWRpbVgsXG4gICAgICAgICAgICAgICAgeTogLWRpbVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IGRpbVgsXG4gICAgICAgICAgICAgICAgeTogLWRpbVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IC1kaW1YLFxuICAgICAgICAgICAgICAgIHk6IGRpbVksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IGRpbVgsXG4gICAgICAgICAgICAgICAgeTogZGltWSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sIGksIHRyYW5zZm9ybU1hdHJpeCA9IHRoaXMuX2NhbGNEaW1lbnNpb25zVHJhbnNmb3JtTWF0cml4KHNrZXdYLCBza2V3WSwgZmFsc2UpLCBiYm94O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwb2ludHNbaV0gPSBVdGlsLnRyYW5zZm9ybVBvaW50KHBvaW50c1tpXSwgdHJhbnNmb3JtTWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBiYm94ID0gVXRpbC5tYWtlQm91bmRpbmdCb3hGcm9tUG9pbnRzKHBvaW50cyk7XG4gICAgICAgIHJldHVybiB7IHg6IGJib3gud2lkdGgsIHk6IGJib3guaGVpZ2h0IH07XG4gICAgfVxuICAgIF9jYWxjRGltZW5zaW9uc1RyYW5zZm9ybU1hdHJpeChza2V3WCwgc2tld1ksIGZsaXBwaW5nKSB7XG4gICAgICAgIGxldCBza2V3TWF0cml4WCA9IFsxLCAwLCBNYXRoLnRhbihVdGlsLmRlZ3JlZXNUb1JhZGlhbnMoc2tld1gpKSwgMV0sIHNrZXdNYXRyaXhZID0gWzEsIE1hdGgudGFuKFV0aWwuZGVncmVlc1RvUmFkaWFucyhza2V3WSkpLCAwLCAxXSwgc2NhbGVYID0gdGhpcy5zY2FsZVgsIHNjYWxlWSA9IHRoaXMuc2NhbGVZLCBzY2FsZU1hdHJpeCA9IFtzY2FsZVgsIDAsIDAsIHNjYWxlWV0sIG0gPSBVdGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoc2NhbGVNYXRyaXgsIHNrZXdNYXRyaXhYLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIFV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhtLCBza2V3TWF0cml4WSwgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIHNldENvb3JkcygpIHtcbiAgICAvLyAgICAgbGV0IHRoZXRhID0gVXRpbC5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuYW5nbGUpLFxuICAgIC8vICAgICAgICAgdnB0ID0gdGhpcy5nZXRWaWV3cG9ydFRyYW5zZm9ybSgpLFxuICAgIC8vICAgICAgICAgZGltID0gdGhpcy5fY2FsY3VsYXRlQ3VycmVudERpbWVuc2lvbnMoKSxcbiAgICAvLyAgICAgICAgIGN1cnJlbnRXaWR0aCA9IGRpbS54LFxuICAgIC8vICAgICAgICAgY3VycmVudEhlaWdodCA9IGRpbS55O1xuICAgIC8vICAgICAvLyBJZiB3aWR0aCBpcyBuZWdhdGl2ZSwgbWFrZSBwb3N0aXZlLiBGaXhlcyBwYXRoIHNlbGVjdGlvbiBpc3N1ZVxuICAgIC8vICAgICAvLyBpZiAoY3VycmVudFdpZHRoIDwgMCkge1xuICAgIC8vICAgICAvLyAgICAgY3VycmVudFdpZHRoID0gTWF0aC5hYnMoY3VycmVudFdpZHRoKTtcbiAgICAvLyAgICAgLy8gfVxuICAgIC8vICAgICBsZXQgc2luVGggPSBNYXRoLnNpbih0aGV0YSksXG4gICAgLy8gICAgICAgICBjb3NUaCA9IE1hdGguY29zKHRoZXRhKSxcbiAgICAvLyAgICAgICAgIF9hbmdsZSA9IGN1cnJlbnRXaWR0aCA+IDAgPyBNYXRoLmF0YW4oY3VycmVudEhlaWdodCAvIGN1cnJlbnRXaWR0aCkgOiAwLFxuICAgIC8vICAgICAgICAgX2h5cG90ZW51c2UgPSBjdXJyZW50V2lkdGggLyBNYXRoLmNvcyhfYW5nbGUpIC8gMixcbiAgICAvLyAgICAgICAgIG9mZnNldFggPSBNYXRoLmNvcyhfYW5nbGUgKyB0aGV0YSkgKiBfaHlwb3RlbnVzZSxcbiAgICAvLyAgICAgICAgIG9mZnNldFkgPSBNYXRoLnNpbihfYW5nbGUgKyB0aGV0YSkgKiBfaHlwb3RlbnVzZSxcbiAgICAvLyAgICAgICAgIC8vIG9mZnNldCBhZGRlZCBmb3Igcm90YXRlIGFuZCBzY2FsZSBhY3Rpb25zXG4gICAgLy8gICAgICAgICBjb29yZHMgPSBVdGlsLnRyYW5zZm9ybVBvaW50KHRoaXMuZ2V0Q2VudGVyUG9pbnQoKSwgdnB0KSxcbiAgICAvLyAgICAgICAgIHRsID0gbmV3IFBvaW50KGNvb3Jkcy54IC0gb2Zmc2V0WCwgY29vcmRzLnkgLSBvZmZzZXRZKSxcbiAgICAvLyAgICAgICAgIHRyID0gbmV3IFBvaW50KHRsLnggKyBjdXJyZW50V2lkdGggKiBjb3NUaCwgdGwueSArIGN1cnJlbnRXaWR0aCAqIHNpblRoKSxcbiAgICAvLyAgICAgICAgIGJsID0gbmV3IFBvaW50KHRsLnggLSBjdXJyZW50SGVpZ2h0ICogc2luVGgsIHRsLnkgKyBjdXJyZW50SGVpZ2h0ICogY29zVGgpLFxuICAgIC8vICAgICAgICAgYnIgPSBuZXcgUG9pbnQoY29vcmRzLnggKyBvZmZzZXRYLCBjb29yZHMueSArIG9mZnNldFkpLFxuICAgIC8vICAgICAgICAgbWwgPSBuZXcgUG9pbnQoKHRsLnggKyBibC54KSAvIDIsICh0bC55ICsgYmwueSkgLyAyKSxcbiAgICAvLyAgICAgICAgIG10ID0gbmV3IFBvaW50KCh0ci54ICsgdGwueCkgLyAyLCAodHIueSArIHRsLnkpIC8gMiksXG4gICAgLy8gICAgICAgICBtciA9IG5ldyBQb2ludCgoYnIueCArIHRyLngpIC8gMiwgKGJyLnkgKyB0ci55KSAvIDIpLFxuICAgIC8vICAgICAgICAgbWIgPSBuZXcgUG9pbnQoKGJyLnggKyBibC54KSAvIDIsIChici55ICsgYmwueSkgLyAyKSxcbiAgICAvLyAgICAgICAgIG10ciA9IG5ldyBQb2ludChtdC54ICsgc2luVGggKiB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQsIG10LnkgLSBjb3NUaCAqIHRoaXMucm90YXRpbmdQb2ludE9mZnNldCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNpblRoLCBjb3NUaCwgbXQsIG10cik7XG4gICAgLy8gICAgIC8vIGxldCBtdHIgPSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgICAgIHg6IHRsLnggKyAodGhpcy5jdXJyZW50V2lkdGggLyAyKSAqIGNvc1RoLFxuICAgIC8vICAgICAvLyAgICAgICAgICAgICB5OiB0bC55ICsgKHRoaXMuY3VycmVudFdpZHRoIC8gMikgKiBzaW5UaCxcbiAgICAvLyAgICAgLy8gICAgICAgICB9O1xuICAgIC8vICAgICAvLyBkZWJ1Z2dpbmdcbiAgICAvLyAgICAgLyogc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgY2FudmFzLmNvbnRleHRUb3AuZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgICAvLyAgICAgICAgY2FudmFzLmNvbnRleHRUb3AuZmlsbFJlY3QobWIueCwgbWIueSwgMywgMyk7XG4gICAgLy8gICAgICAgIGNhbnZhcy5jb250ZXh0VG9wLmZpbGxSZWN0KGJsLngsIGJsLnksIDMsIDMpO1xuICAgIC8vICAgICAgICBjYW52YXMuY29udGV4dFRvcC5maWxsUmVjdChici54LCBici55LCAzLCAzKTtcbiAgICAvLyAgICAgICAgY2FudmFzLmNvbnRleHRUb3AuZmlsbFJlY3QodGwueCwgdGwueSwgMywgMyk7XG4gICAgLy8gICAgICAgIGNhbnZhcy5jb250ZXh0VG9wLmZpbGxSZWN0KHRyLngsIHRyLnksIDMsIDMpO1xuICAgIC8vICAgICAgICBjYW52YXMuY29udGV4dFRvcC5maWxsUmVjdChtbC54LCBtbC55LCAzLCAzKTtcbiAgICAvLyAgICAgICAgY2FudmFzLmNvbnRleHRUb3AuZmlsbFJlY3QobXIueCwgbXIueSwgMywgMyk7XG4gICAgLy8gICAgICAgIGNhbnZhcy5jb250ZXh0VG9wLmZpbGxSZWN0KG10LngsIG10LnksIDMsIDMpO1xuICAgIC8vICAgICAgICBjYW52YXMuY29udGV4dFRvcC5maWxsUmVjdChtdHIueCwgbXRyLnksIDMsIDMpO1xuICAgIC8vICAgICAgfSwgNTApOyAqL1xuICAgIC8vICAgICB0aGlzLm9Db29yZHMgPSB7XG4gICAgLy8gICAgICAgICAvLyBjb3JuZXJzXG4gICAgLy8gICAgICAgICB0bCxcbiAgICAvLyAgICAgICAgIHRyLFxuICAgIC8vICAgICAgICAgYnIsXG4gICAgLy8gICAgICAgICBibCxcbiAgICAvLyAgICAgICAgIC8vIG1pZGRsZVxuICAgIC8vICAgICAgICAgbWwsXG4gICAgLy8gICAgICAgICBtdCxcbiAgICAvLyAgICAgICAgIG1yLFxuICAgIC8vICAgICAgICAgbWIsXG4gICAgLy8gICAgICAgICAvLyByb3RhdGluZyBwb2ludFxuICAgIC8vICAgICAgICAgbXRyLFxuICAgIC8vICAgICB9O1xuICAgIC8vICAgICAvLyBzZXQgY29vcmRpbmF0ZXMgb2YgdGhlIGRyYWdnYWJsZSBib3hlcyBpbiB0aGUgY29ybmVycyB1c2VkIHRvIHNjYWxlL3JvdGF0ZSB0aGUgaW1hZ2VcbiAgICAvLyAgICAgdGhpcy5fc2V0Q29ybmVyQ29vcmRzICYmIHRoaXMuX3NldENvcm5lckNvb3JkcygpO1xuICAgIC8vICAgICByZXR1cm4gdGhpcztcbiAgICAvLyB9XG4gICAgLyoqIOmHjeaWsOiuvue9rueJqeS9k+WMheWbtOebkueahOi+ueahhuWSjOWQhOS4quaOp+WItueCue+8jOWMheaLrOS9jee9ruWSjOWkp+WwjyAqL1xuICAgIHNldENvb3JkcygpIHtcbiAgICAgICAgbGV0IHN0cm9rZVdpZHRoID0gdGhpcy5zdHJva2VXaWR0aCA+IDEgPyB0aGlzLnN0cm9rZVdpZHRoIDogMCwgcGFkZGluZyA9IHRoaXMucGFkZGluZywgcmFkaWFuID0gVXRpbC5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuYW5nbGUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWR0aCA9ICh0aGlzLndpZHRoICsgc3Ryb2tlV2lkdGgpICogdGhpcy5zY2FsZVggKyBwYWRkaW5nICogMjtcbiAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID1cbiAgICAgICAgICAgICh0aGlzLmhlaWdodCArIHN0cm9rZVdpZHRoKSAqIHRoaXMuc2NhbGVZICsgcGFkZGluZyAqIDI7XG4gICAgICAgIC8vIElmIHdpZHRoIGlzIG5lZ2F0aXZlLCBtYWtlIHBvc3RpdmUuIEZpeGVzIHBhdGggc2VsZWN0aW9uIGlzc3VlXG4gICAgICAgIC8vIGlmICh0aGlzLmN1cnJlbnRXaWR0aCA8IDApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY3VycmVudFdpZHRoID0gTWF0aC5hYnModGhpcy5jdXJyZW50V2lkdGgpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIOeJqeS9k+S4reW/g+eCueWIsOmhtueCueeahOaWnOi+uemVv+W6plxuICAgICAgICBsZXQgX2h5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5jdXJyZW50V2lkdGggLyAyLCAyKSArIE1hdGgucG93KHRoaXMuY3VycmVudEhlaWdodCAvIDIsIDIpKTtcbiAgICAgICAgbGV0IF9hbmdsZSA9IE1hdGguYXRhbih0aGlzLmN1cnJlbnRIZWlnaHQgLyB0aGlzLmN1cnJlbnRXaWR0aCk7XG4gICAgICAgIC8vIGxldCBfYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMuY3VycmVudEhlaWdodCwgdGhpcy5jdXJyZW50V2lkdGgpO1xuICAgICAgICAvLyBvZmZzZXQgYWRkZWQgZm9yIHJvdGF0ZSBhbmQgc2NhbGUgYWN0aW9uc1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IE1hdGguY29zKF9hbmdsZSArIHJhZGlhbikgKiBfaHlwb3RlbnVzZSwgb2Zmc2V0WSA9IE1hdGguc2luKF9hbmdsZSArIHJhZGlhbikgKiBfaHlwb3RlbnVzZSwgc2luVGggPSBNYXRoLnNpbihyYWRpYW4pLCBjb3NUaCA9IE1hdGguY29zKHJhZGlhbik7XG4gICAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldENlbnRlclBvaW50KCk7XG4gICAgICAgIGxldCB0bCA9IHtcbiAgICAgICAgICAgIHg6IGNvb3Jkcy54IC0gb2Zmc2V0WCxcbiAgICAgICAgICAgIHk6IGNvb3Jkcy55IC0gb2Zmc2V0WSxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHRyID0ge1xuICAgICAgICAgICAgeDogdGwueCArIHRoaXMuY3VycmVudFdpZHRoICogY29zVGgsXG4gICAgICAgICAgICB5OiB0bC55ICsgdGhpcy5jdXJyZW50V2lkdGggKiBzaW5UaCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGJyID0ge1xuICAgICAgICAgICAgeDogdHIueCAtIHRoaXMuY3VycmVudEhlaWdodCAqIHNpblRoLFxuICAgICAgICAgICAgeTogdHIueSArIHRoaXMuY3VycmVudEhlaWdodCAqIGNvc1RoLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgYmwgPSB7XG4gICAgICAgICAgICB4OiB0bC54IC0gdGhpcy5jdXJyZW50SGVpZ2h0ICogc2luVGgsXG4gICAgICAgICAgICB5OiB0bC55ICsgdGhpcy5jdXJyZW50SGVpZ2h0ICogY29zVGgsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBtbCA9IHtcbiAgICAgICAgICAgIHg6IHRsLnggLSAodGhpcy5jdXJyZW50SGVpZ2h0IC8gMikgKiBzaW5UaCxcbiAgICAgICAgICAgIHk6IHRsLnkgKyAodGhpcy5jdXJyZW50SGVpZ2h0IC8gMikgKiBjb3NUaCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG10ID0ge1xuICAgICAgICAgICAgeDogdGwueCArICh0aGlzLmN1cnJlbnRXaWR0aCAvIDIpICogY29zVGgsXG4gICAgICAgICAgICB5OiB0bC55ICsgKHRoaXMuY3VycmVudFdpZHRoIC8gMikgKiBzaW5UaCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG1yID0ge1xuICAgICAgICAgICAgeDogdHIueCAtICh0aGlzLmN1cnJlbnRIZWlnaHQgLyAyKSAqIHNpblRoLFxuICAgICAgICAgICAgeTogdHIueSArICh0aGlzLmN1cnJlbnRIZWlnaHQgLyAyKSAqIGNvc1RoLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbWIgPSB7XG4gICAgICAgICAgICB4OiBibC54ICsgKHRoaXMuY3VycmVudFdpZHRoIC8gMikgKiBjb3NUaCxcbiAgICAgICAgICAgIHk6IGJsLnkgKyAodGhpcy5jdXJyZW50V2lkdGggLyAyKSAqIHNpblRoLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbXRyID0ge1xuICAgICAgICAgICAgeDogdGwueCArICh0aGlzLmN1cnJlbnRXaWR0aCAvIDIpICogY29zVGgsXG4gICAgICAgICAgICB5OiB0bC55ICsgKHRoaXMuY3VycmVudFdpZHRoIC8gMikgKiBzaW5UaCxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY2xvY2t3aXNlXG4gICAgICAgIHRoaXMub0Nvb3JkcyA9IHsgdGwsIHRyLCBiciwgYmwsIG1sLCBtdCwgbXIsIG1iLCBtdHIgfTtcbiAgICAgICAgLy8gc2V0IGNvb3JkaW5hdGVzIG9mIHRoZSBkcmFnZ2FibGUgYm94ZXMgaW4gdGhlIGNvcm5lcnMgdXNlZCB0byBzY2FsZS9yb3RhdGUgdGhlIGltYWdlXG4gICAgICAgIHRoaXMuX3NldENvcm5lckNvb3JkcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOmHjeaWsOiuvue9rueJqeS9k+eahOavj+S4quaOp+WItueCue+8jOWMheaLrOS9jee9ruWSjOWkp+WwjyAqL1xuICAgIF9zZXRDb3JuZXJDb29yZHMoKSB7XG4gICAgICAgIGxldCBjb29yZHMgPSB0aGlzLm9Db29yZHMsIHJhZGlhbiA9IFV0aWwuZGVncmVlc1RvUmFkaWFucyh0aGlzLmFuZ2xlKSwgbmV3VGhldGEgPSBVdGlsLmRlZ3JlZXNUb1JhZGlhbnMoNDUgLSB0aGlzLmFuZ2xlKSwgY29ybmVySHlwb3RlbnVzZSA9IE1hdGguc3FydCgyICogTWF0aC5wb3codGhpcy5jb3JuZXJTaXplLCAyKSkgLyAyLCBjb3NIYWxmT2Zmc2V0ID0gY29ybmVySHlwb3RlbnVzZSAqIE1hdGguY29zKG5ld1RoZXRhKSwgc2luSGFsZk9mZnNldCA9IGNvcm5lckh5cG90ZW51c2UgKiBNYXRoLnNpbihuZXdUaGV0YSksIHNpblRoID0gTWF0aC5zaW4ocmFkaWFuKSwgY29zVGggPSBNYXRoLmNvcyhyYWRpYW4pO1xuICAgICAgICBjb29yZHMudGwuY29ybmVyID0ge1xuICAgICAgICAgICAgdGw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMudGwueCAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLnRsLnkgLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLnRsLnggKyBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy50bC55IC0gc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibDoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy50bC54IC0gY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMudGwueSArIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMudGwueCArIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLnRsLnkgKyBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29vcmRzLnRyLmNvcm5lciA9IHtcbiAgICAgICAgICAgIHRsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLnRyLnggLSBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy50ci55IC0gY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy50ci54ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMudHIueSAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMudHIueCArIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLnRyLnkgKyBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLnRyLnggLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy50ci55ICsgc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvb3Jkcy5ibC5jb3JuZXIgPSB7XG4gICAgICAgICAgICB0bDoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5ibC54IC0gc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMuYmwueSAtIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMuYmwueCAtIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLmJsLnkgKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLmJsLnggKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5ibC55ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5ibC54ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMuYmwueSAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb29yZHMuYnIuY29ybmVyID0ge1xuICAgICAgICAgICAgdHI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMuYnIueCArIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLmJyLnkgLSBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLmJyLnggLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5ici55ICsgc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5ici54ICsgc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMuYnIueSArIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMuYnIueCAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLmJyLnkgLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29vcmRzLm1sLmNvcm5lciA9IHtcbiAgICAgICAgICAgIHRsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm1sLnggLSBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tbC55IC0gY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tbC54ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubWwueSAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubWwueCAtIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm1sLnkgKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm1sLnggKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tbC55ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvb3Jkcy5tdC5jb3JuZXIgPSB7XG4gICAgICAgICAgICB0bDoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tdC54IC0gc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubXQueSAtIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubXQueCArIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm10LnkgLSBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm10LnggLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tdC55ICsgc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tdC54ICsgc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubXQueSArIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb29yZHMubXIuY29ybmVyID0ge1xuICAgICAgICAgICAgdGw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubXIueCAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm1yLnkgLSBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm1yLnggKyBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tci55IC0gc2luSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibDoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tci54IC0gY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubXIueSArIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubXIueCArIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm1yLnkgKyBjb3NIYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29vcmRzLm1iLmNvcm5lciA9IHtcbiAgICAgICAgICAgIHRsOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm1iLnggLSBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tYi55IC0gY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cjoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tYi54ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubWIueSAtIHNpbkhhbGZPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubWIueCAtIGNvc0hhbGZPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm1iLnkgKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm1iLnggKyBzaW5IYWxmT2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tYi55ICsgY29zSGFsZk9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvb3Jkcy5tdHIuY29ybmVyID0ge1xuICAgICAgICAgICAgdGw6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubXRyLnggLSBzaW5IYWxmT2Zmc2V0ICsgc2luVGggKiB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm10ci55IC0gY29zSGFsZk9mZnNldCAtIGNvc1RoICogdGhpcy5yb3RhdGluZ1BvaW50T2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyOiB7XG4gICAgICAgICAgICAgICAgeDogY29vcmRzLm10ci54ICsgY29zSGFsZk9mZnNldCArIHNpblRoICogdGhpcy5yb3RhdGluZ1BvaW50T2Zmc2V0LFxuICAgICAgICAgICAgICAgIHk6IGNvb3Jkcy5tdHIueSAtIHNpbkhhbGZPZmZzZXQgLSBjb3NUaCAqIHRoaXMucm90YXRpbmdQb2ludE9mZnNldCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibDoge1xuICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy5tdHIueCAtIGNvc0hhbGZPZmZzZXQgKyBzaW5UaCAqIHRoaXMucm90YXRpbmdQb2ludE9mZnNldCxcbiAgICAgICAgICAgICAgICB5OiBjb29yZHMubXRyLnkgKyBzaW5IYWxmT2Zmc2V0IC0gY29zVGggKiB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnI6IHtcbiAgICAgICAgICAgICAgICB4OiBjb29yZHMubXRyLnggKyBzaW5IYWxmT2Zmc2V0ICsgc2luVGggKiB0aGlzLnJvdGF0aW5nUG9pbnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgeTogY29vcmRzLm10ci55ICsgY29zSGFsZk9mZnNldCAtIGNvc1RoICogdGhpcy5yb3RhdGluZ1BvaW50T2Zmc2V0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6L2s5oiQ5Z+656GA5qCH5YeG5a+56LGh77yM5pa55L6/5bqP5YiX5YyWXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXNUb0luY2x1ZGUg5L2g5Y+v6IO96ZyA6KaB5re75Yqg5LiA5Lqb6aKd5aSW55qE6Ieq5a6a5LmJ5bGe5oCnXG4gICAgICogQHJldHVybnMg5qCH5YeG5a+56LGhXG4gICAgICovXG4gICAgdG9PYmplY3QocHJvcGVydGllc1RvSW5jbHVkZSA9IFtdKSB7XG4gICAgICAgIC8vIOS/neWtmOaXtueahOaVsOWtl+eyvuW6plxuICAgICAgICBjb25zdCBOVU1fRlJBQ1RJT05fRElHSVRTID0gMjtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0ge1xuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgb3JpZ2luWDogdGhpcy5vcmlnaW5YLFxuICAgICAgICAgICAgb3JpZ2luWTogdGhpcy5vcmlnaW5ZLFxuICAgICAgICAgICAgbGVmdDogVXRpbC50b0ZpeGVkKHRoaXMubGVmdCwgTlVNX0ZSQUNUSU9OX0RJR0lUUyksXG4gICAgICAgICAgICB0b3A6IFV0aWwudG9GaXhlZCh0aGlzLnRvcCwgTlVNX0ZSQUNUSU9OX0RJR0lUUyksXG4gICAgICAgICAgICB3aWR0aDogVXRpbC50b0ZpeGVkKHRoaXMud2lkdGgsIE5VTV9GUkFDVElPTl9ESUdJVFMpLFxuICAgICAgICAgICAgaGVpZ2h0OiBVdGlsLnRvRml4ZWQodGhpcy5oZWlnaHQsIE5VTV9GUkFDVElPTl9ESUdJVFMpLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5maWxsLFxuICAgICAgICAgICAgc3Ryb2tlOiB0aGlzLnN0cm9rZSxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiB0aGlzLnN0cm9rZVdpZHRoLFxuICAgICAgICAgICAgc2NhbGVYOiBVdGlsLnRvRml4ZWQodGhpcy5zY2FsZVgsIE5VTV9GUkFDVElPTl9ESUdJVFMpLFxuICAgICAgICAgICAgc2NhbGVZOiBVdGlsLnRvRml4ZWQodGhpcy5zY2FsZVksIE5VTV9GUkFDVElPTl9ESUdJVFMpLFxuICAgICAgICAgICAgYW5nbGU6IFV0aWwudG9GaXhlZCh0aGlzLmdldEFuZ2xlKCksIE5VTV9GUkFDVElPTl9ESUdJVFMpLFxuICAgICAgICAgICAgZmxpcFg6IHRoaXMuZmxpcFgsXG4gICAgICAgICAgICBmbGlwWTogdGhpcy5mbGlwWSxcbiAgICAgICAgICAgIGhhc0NvbnRyb2xzOiB0aGlzLmhhc0NvbnRyb2xzLFxuICAgICAgICAgICAgaGFzUm90YXRpbmdQb2ludDogdGhpcy5oYXNSb3RhdGluZ1BvaW50LFxuICAgICAgICAgICAgdHJhbnNwYXJlbnRDb3JuZXJzOiB0aGlzLnRyYW5zcGFyZW50Q29ybmVycyxcbiAgICAgICAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdGhpcy5wZXJQaXhlbFRhcmdldEZpbmQsXG4gICAgICAgICAgICB2aXNpYmxlOiB0aGlzLnZpc2libGUsXG4gICAgICAgIH07XG4gICAgICAgIFV0aWwucG9wdWxhdGVXaXRoUHJvcGVydGllcyh0aGlzLCBvYmplY3QsIHByb3BlcnRpZXNUb0luY2x1ZGUpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICB0b1N2ZygpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gW107XG4gICAgICAgIGNvbnN0IG9ialN2ZyA9IHRoaXMuX3RvU1ZHKCk7XG4gICAgICAgIG1hcmt1cC5wdXNoKFwiPGcgXCIsIHRoaXMuZ2V0U3ZnVHJhbnNmb3JtKCksIFwiID5cXG5cIik7XG4gICAgICAgIG1hcmt1cC5wdXNoKG9ialN2Zy5qb2luKFwiXCIpKTtcbiAgICAgICAgbWFya3VwLnB1c2goXCI8L2c+XFxuXCIpO1xuICAgICAgICByZXR1cm4gbWFya3VwLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIC8qKiDnlLHlrZDnsbvlhbfkvZPlrp7njrAgKi9cbiAgICBfdG9TVkcoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgZ2V0U3ZnVHJhbnNmb3JtKCkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5jYWxjT3duTWF0cml4KCksIHN2Z1RyYW5zZm9ybSA9ICd0cmFuc2Zvcm09XCInICsgVXRpbC5tYXRyaXhUb1NWRyh0cmFuc2Zvcm0pO1xuICAgICAgICByZXR1cm4gc3ZnVHJhbnNmb3JtICsgJ1wiICc7XG4gICAgfVxuICAgIGNhbGNPd25NYXRyaXgoKSB7IH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIC8vIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHZhbHVlID0gdmFsdWUodGhpcy5nZXQoa2V5KSk7XG4gICAgICAgIC8vIGlmIChrZXkgPT09ICdzY2FsZVgnIHx8IGtleSA9PT0gJ3NjYWxlWScpIHtcbiAgICAgICAgLy8gICAgIHZhbHVlID0gdGhpcy5fY29uc3RyYWluU2NhbGUodmFsdWUpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmIChrZXkgPT09ICd3aWR0aCcgfHwga2V5ID09PSAnaGVpZ2h0Jykge1xuICAgICAgICAvLyAgICAgdGhpcy5taW5TY2FsZUxpbWl0ID0gVXRpbC50b0ZpeGVkKE1hdGgubWluKDAuMSwgMSAvIE1hdGgubWF4KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSksIDIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmIChrZXkgPT09IFwic2NhbGVYXCIgJiYgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmZsaXBYID0gIXRoaXMuZmxpcFg7XG4gICAgICAgICAgICB2YWx1ZSAqPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09IFwic2NhbGVZXCIgJiYgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmZsaXBZID0gIXRoaXMuZmxpcFk7XG4gICAgICAgICAgICB2YWx1ZSAqPSAtMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBzY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzID8gdGhpcy5jYW52YXMuc2NhbGUgOiAxO1xuICAgIH1cbiAgICAvKiog6I635Y+W5b2T5YmN5aSn5bCP77yM5YyF5ZCr57yp5pS+5pWI5p6cICovXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoICogdGhpcy5zY2FsZVg7XG4gICAgfVxuICAgIC8qKiDojrflj5blvZPliY3lpKflsI/vvIzljIXlkKvnvKnmlL7mlYjmnpwgKi9cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodCAqIHRoaXMuc2NhbGVZO1xuICAgIH1cbiAgICBnZXRBbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5nbGU7XG4gICAgfVxuICAgIHNldEFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL3BvaW50XCI7XG5jb25zdCBQaUJ5MTgwID0gTWF0aC5QSSAvIDE4MDsgLy8g5YaZ5Zyo6L+Z6YeM55u45b2T5LqO57yT5a2Y77yM5Zug5Li65Lya6aKR57mB6LCD55SoXG5jb25zdCBpTWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuY29uc3QgUGlCeTIgPSBNYXRoLlBJICogMjtcbmV4cG9ydCBjbGFzcyBVdGlsIHtcbiAgICAvKipcbiAgICAgKiDmiormupDlr7nosaHnmoTmn5DkupvlsZ7mgKfotYvlgLznu5nnm67moIflr7nosaFcbiAgICAgKiBAcGFyYW0gc291cmNlIOa6kOWvueixoVxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiDnm67moIflr7nosaFcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyDpnIDopoHotYvlgLznmoTlsZ7mgKdcbiAgICAgKi9cbiAgICBzdGF0aWMgcG9wdWxhdGVXaXRoUHJvcGVydGllcyhzb3VyY2UsIGRlc3RpbmF0aW9uLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzICYmXG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvcGVydGllcykgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHByb3BlcnRpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0aWVzW2ldXSA9IHNvdXJjZVtwcm9wZXJ0aWVzW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgbG9hZEltYWdlKHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIGxldCBkb25lID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBpbWcub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZG9uZTtcbiAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkVycm9yIGxvYWRpbmcgXCIgKyBpbWcuc3JjKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBvcHRpb25zICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY3Jvc3NPcmlnaW4gJiZcbiAgICAgICAgICAgICAgICAgICAgKGltZy5jcm9zc09yaWdpbiA9IG9wdGlvbnMuY3Jvc3NPcmlnaW4pO1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgY2xvbmUob2JqKSB7XG4gICAgICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICBsZXQgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKCFvYmpba2V5XSB8fCB0eXBlb2Ygb2JqW2tleV0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICB0ZW1wW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBba2V5XSA9IFV0aWwuY2xvbmUob2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZW1wO1xuICAgIH1cbiAgICBzdGF0aWMgYW5pbWF0ZShvcHRpb25zKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGltZXN0YW1wIHx8ICtuZXcgRGF0ZSgpLCAvLyDlvIDlp4vml7bpl7RcbiAgICAgICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCA1MDAsIC8vIOWKqOeUu+aXtumXtFxuICAgICAgICAgICAgZmluaXNoID0gc3RhcnQgKyBkdXJhdGlvbiwgLy8g57uT5p2f5pe26Ze0XG4gICAgICAgICAgICB0aW1lLCAvLyDlvZPliY3ml7bpl7RcbiAgICAgICAgICAgIG9uQ2hhbmdlID0gb3B0aW9ucy5vbkNoYW5nZSB8fCAoKCkgPT4geyB9KSwgYWJvcnQgPSBvcHRpb25zLmFib3J0IHx8ICgoKSA9PiBmYWxzZSksIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nIHx8XG4gICAgICAgICAgICAgICAgKCh0LCBiLCBjLCBkKSA9PiAtYyAqIE1hdGguY29zKCh0IC8gZCkgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiKSwgc3RhcnRWYWx1ZSA9IG9wdGlvbnMuc3RhcnRWYWx1ZSB8fCAwLCAvLyDliJ3lp4vlgLxcbiAgICAgICAgICAgIGVuZFZhbHVlID0gb3B0aW9ucy5lbmRWYWx1ZSB8fCAxMDAsIC8vIOe7k+adn+WAvFxuICAgICAgICAgICAgYnlWYWx1ZSA9IG9wdGlvbnMuYnlWYWx1ZSB8fCBlbmRWYWx1ZSAtIHN0YXJ0VmFsdWU7IC8vIOWAvOeahOWPmOWMluiMg+WbtFxuICAgICAgICAgICAgZnVuY3Rpb24gdGljayh0aWNrdGltZSkge1xuICAgICAgICAgICAgICAgIC8vIHRpY2sg55qE5Li76KaB5Lu75Yqh5bCx5piv5qC55o2u5pe26Ze05pu05paw5YC8XG4gICAgICAgICAgICAgICAgdGltZSA9IHRpY2t0aW1lIHx8ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VGltZSA9IHRpbWUgPiBmaW5pc2ggPyBkdXJhdGlvbiA6IHRpbWUgLSBzdGFydDsgLy8g5b2T5YmN5bey57uP5omn6KGM5LqG5aSa5LmF5pe26Ze077yI5LuL5LqOMH5kdXJhdGlvbu+8iVxuICAgICAgICAgICAgICAgIGlmIChhYm9ydCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25Db21wbGV0ZSAmJiBvcHRpb25zLm9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZShlYXNpbmcoY3VycmVudFRpbWUsIHN0YXJ0VmFsdWUsIGJ5VmFsdWUsIGR1cmF0aW9uKSk7IC8vIOWFtuWuniBhbmltYXRlIOWHveaVsOWPquaYr+agueaNriBlYXNpbmcg5Ye95pWw6K6h566X5Ye65LqG5p+Q5Liq5YC877yM54S25ZCO5Lyg57uZ6LCD55So6ICF6ICM5beyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWUgPiBmaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlICYmIG9wdGlvbnMub25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLm9uU3RhcnQgJiYgb3B0aW9ucy5vblN0YXJ0KCk7IC8vIOWKqOeUu+W8gOWni+WJjeeahOWbnuiwg1xuICAgICAgICAgICAgdGljayhzdGFydCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiog5LuO5pWw57uE5Lit5rqi5Ye65p+Q5Liq5YWD57SgICovXG4gICAgc3RhdGljIHJlbW92ZUZyb21BcnJheShhcnJheSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IGlkeCA9IGFycmF5LmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmlbDnu4TnmoTmnIDlsI/lgLxcbiAgICAgKi9cbiAgICBzdGF0aWMgbWluKGFycmF5LCBieVByb3BlcnR5ID0gXCJcIikge1xuICAgICAgICBpZiAoIWFycmF5IHx8IGFycmF5Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMSwgcmVzdWx0ID0gYnlQcm9wZXJ0eSA/IGFycmF5W2ldW2J5UHJvcGVydHldIDogYXJyYXlbaV07XG4gICAgICAgIGlmIChieVByb3BlcnR5KSB7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2ldW2J5UHJvcGVydHldIDwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFycmF5W2ldW2J5UHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0gPCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXJyYXlbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaVsOe7hOeahOacgOWkp+WAvFxuICAgICAqL1xuICAgIHN0YXRpYyBtYXgoYXJyYXksIGJ5UHJvcGVydHkgPSBcIlwiKSB7XG4gICAgICAgIGlmICghYXJyYXkgfHwgYXJyYXkubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGkgPSBhcnJheS5sZW5ndGggLSAxLCByZXN1bHQgPSBieVByb3BlcnR5ID8gYXJyYXlbaV1bYnlQcm9wZXJ0eV0gOiBhcnJheVtpXTtcbiAgICAgICAgaWYgKGJ5UHJvcGVydHkpIHtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV1bYnlQcm9wZXJ0eV0gPj0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFycmF5W2ldW2J5UHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbaV0gPj0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKiog5ZKM5Y6f55Sf55qEIHRvRml4ZWQg5LiA5qC377yM5Y+q5LiN6L+H6L+U5Zue55qE5pWw5a2XICovXG4gICAgc3RhdGljIHRvRml4ZWQobnVtYmVyLCBmcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChOdW1iZXIobnVtYmVyKS50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzKSk7XG4gICAgfVxuICAgIC8qKiDojrflj5bpvKDmoIfnmoTngrnlh7vlnZDmoIfvvIznm7jlr7nkuo7pobXpnaLlt6bkuIrop5LvvIzms6jmhI/kuI3mmK/nlLvluIPnmoTlt6bkuIrop5LvvIzliLDml7blgJnkvJrlh4/mjokgb2Zmc2V0ICovXG4gICAgc3RhdGljIGdldFBvaW50ZXIoZXZlbnQsIHVwcGVyQ2FudmFzRWwsIHsgc2NhbGUgPSAxLCBfb2Zmc2V0LCBfY2FudmFzT2Zmc2V0IH0pIHtcbiAgICAgICAgZXZlbnQgfHwgKGV2ZW50ID0gd2luZG93LmV2ZW50KTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQsIGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IHsgc2Nyb2xsTGVmdDogMCwgc2Nyb2xsVG9wOiAwIH0sIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIG9yZ0VsZW1lbnQgPSBlbGVtZW50LCBzY3JvbGxMZWZ0ID0gMCwgc2Nyb2xsVG9wID0gMCwgZmlyc3RGaXhlZEFuY2VzdG9yO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50LnBhcmVudE5vZGUgJiYgIWZpcnN0Rml4ZWRBbmNlc3Rvcikge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudCAmJlxuICAgICAgICAgICAgICAgIFV0aWwuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpID09PSBcImZpeGVkXCIpXG4gICAgICAgICAgICAgICAgZmlyc3RGaXhlZEFuY2VzdG9yID0gZWxlbWVudDtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSBkb2N1bWVudCAmJlxuICAgICAgICAgICAgICAgIG9yZ0VsZW1lbnQgIT09IHVwcGVyQ2FudmFzRWwgJiZcbiAgICAgICAgICAgICAgICBVdGlsLmdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KSA9PT0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW1lbnQgPT09IGRvY3VtZW50ICYmIG9yZ0VsZW1lbnQgIT09IHVwcGVyQ2FudmFzRWwpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0ID0gYm9keS5zY3JvbGxMZWZ0IHx8IGRvY0VsZW1lbnQuc2Nyb2xsTGVmdCB8fCAwO1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA9IGJvZHkuc2Nyb2xsVG9wIHx8IGRvY0VsZW1lbnQuc2Nyb2xsVG9wIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0ICs9IGVsZW1lbnQuc2Nyb2xsTGVmdCB8fCAwO1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcCArPSBlbGVtZW50LnNjcm9sbFRvcCB8fCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAoVXRpbC5wb2ludGVyWChldmVudCkgLVxuICAgICAgICAgICAgICAgIF9vZmZzZXQubGVmdCAtXG4gICAgICAgICAgICAgICAgX2NhbnZhc09mZnNldC5sZWZ0ICtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0KSAvXG4gICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICB5OiAoVXRpbC5wb2ludGVyWShldmVudCkgLSBfb2Zmc2V0LnRvcCAtIF9jYW52YXNPZmZzZXQudG9wICsgc2Nyb2xsVG9wKSAvXG4gICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXRTY3JvbGwodXBwZXJDYW52YXNFbCkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldCwgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgeyBzY3JvbGxMZWZ0OiAwLCBzY3JvbGxUb3A6IDAgfSwgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgb3JnRWxlbWVudCA9IGVsZW1lbnQsIHNjcm9sbExlZnQgPSAwLCBzY3JvbGxUb3AgPSAwLCBmaXJzdEZpeGVkQW5jZXN0b3I7XG4gICAgICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSAmJiAhZmlyc3RGaXhlZEFuY2VzdG9yKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50ICYmXG4gICAgICAgICAgICAgICAgVXRpbC5nZXRFbGVtZW50UG9zaXRpb24oZWxlbWVudCkgPT09IFwiZml4ZWRcIilcbiAgICAgICAgICAgICAgICBmaXJzdEZpeGVkQW5jZXN0b3IgPSBlbGVtZW50O1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50ICYmXG4gICAgICAgICAgICAgICAgb3JnRWxlbWVudCAhPT0gdXBwZXJDYW52YXNFbCAmJlxuICAgICAgICAgICAgICAgIFV0aWwuZ2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQpID09PSBcImFic29sdXRlXCIpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQgJiYgb3JnRWxlbWVudCAhPT0gdXBwZXJDYW52YXNFbCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQgPSBib2R5LnNjcm9sbExlZnQgfHwgZG9jRWxlbWVudC5zY3JvbGxMZWZ0IHx8IDA7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wID0gYm9keS5zY3JvbGxUb3AgfHwgZG9jRWxlbWVudC5zY3JvbGxUb3AgfHwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQgKz0gZWxlbWVudC5zY3JvbGxMZWZ0IHx8IDA7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wICs9IGVsZW1lbnQuc2Nyb2xsVG9wIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5qC55o2u55+p6Zi15Y+N5o6o5Ye65YW35L2T5Y+Y5o2i5pWw5YC8ICovXG4gICAgc3RhdGljIHFyRGVjb21wb3NlKG0pIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihtWzFdLCBtWzBdKSwgZGVub20gPSBNYXRoLnBvdyhtWzBdLCAyKSArIE1hdGgucG93KG1bMV0sIDIpLCBzY2FsZVggPSBNYXRoLnNxcnQoZGVub20pLCBzY2FsZVkgPSAobVswXSAqIG1bM10gLSBtWzJdICogbVsxXSkgLyBzY2FsZVgsIHNrZXdYID0gTWF0aC5hdGFuMihtWzBdICogbVsyXSArIG1bMV0gKiBtWzNdLCBkZW5vbSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmdsZTogYW5nbGUgLyBQaUJ5MTgwLFxuICAgICAgICAgICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgICAgICAgICBzY2FsZVk6IHNjYWxlWSxcbiAgICAgICAgICAgIHNrZXdYOiBza2V3WCAvIFBpQnkxODAsXG4gICAgICAgICAgICBza2V3WTogMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6IG1bNF0sXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBtWzVdLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgaW52ZXJ0VHJhbnNmb3JtKHQpIHtcbiAgICAgICAgbGV0IGEgPSAxIC8gKHRbMF0gKiB0WzNdIC0gdFsxXSAqIHRbMl0pLCByID0gW2EgKiB0WzNdLCAtYSAqIHRbMV0sIC1hICogdFsyXSwgYSAqIHRbMF1dLCBvID0gVXRpbC50cmFuc2Zvcm1Qb2ludCh7IHg6IHRbNF0sIHk6IHRbNV0gfSwgciwgdHJ1ZSk7XG4gICAgICAgIHJbNF0gPSAtby54O1xuICAgICAgICByWzVdID0gLW8ueTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIHN0YXRpYyB0cmFuc2Zvcm1Qb2ludChwLCB0LCBpZ25vcmVPZmZzZXQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoaWdub3JlT2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRbMF0gKiBwLnggKyB0WzJdICogcC55LCB0WzFdICogcC54ICsgdFszXSAqIHAueSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh0WzBdICogcC54ICsgdFsyXSAqIHAueSArIHRbNF0sIHRbMV0gKiBwLnggKyB0WzNdICogcC55ICsgdFs1XSk7XG4gICAgfVxuICAgIHN0YXRpYyBtdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKGEsIGIsIGlzMngyID0gZmFsc2UpIHtcbiAgICAgICAgLy8gTWF0cml4IG11bHRpcGx5IGEgKiBiXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBhWzBdICogYlswXSArIGFbMl0gKiBiWzFdLFxuICAgICAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzNdICogYlsxXSxcbiAgICAgICAgICAgIGFbMF0gKiBiWzJdICsgYVsyXSAqIGJbM10sXG4gICAgICAgICAgICBhWzFdICogYlsyXSArIGFbM10gKiBiWzNdLFxuICAgICAgICAgICAgaXMyeDIgPyAwIDogYVswXSAqIGJbNF0gKyBhWzJdICogYls1XSArIGFbNF0sXG4gICAgICAgICAgICBpczJ4MiA/IDAgOiBhWzFdICogYls0XSArIGFbM10gKiBiWzVdICsgYVs1XSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgc3RhdGljIG1ha2VCb3VuZGluZ0JveEZyb21Qb2ludHMocG9pbnRzKSB7XG4gICAgICAgIGxldCB4UG9pbnRzID0gW3BvaW50c1swXS54LCBwb2ludHNbMV0ueCwgcG9pbnRzWzJdLngsIHBvaW50c1szXS54XSwgbWluWCA9IFV0aWwubWluKHhQb2ludHMpLCBtYXhYID0gVXRpbC5tYXgoeFBvaW50cyksIHdpZHRoID0gTWF0aC5hYnMobWluWCAtIG1heFgpLCB5UG9pbnRzID0gW3BvaW50c1swXS55LCBwb2ludHNbMV0ueSwgcG9pbnRzWzJdLnksIHBvaW50c1szXS55XSwgbWluWSA9IFV0aWwubWluKHlQb2ludHMpLCBtYXhZID0gVXRpbC5tYXgoeVBvaW50cyksIGhlaWdodCA9IE1hdGguYWJzKG1pblkgLSBtYXhZKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IG1pblgsXG4gICAgICAgICAgICB0b3A6IG1pblksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIHBvaW50ZXJYKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5jbGllbnRYIHx8IDA7XG4gICAgfVxuICAgIHN0YXRpYyBwb2ludGVyWShldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuY2xpZW50WSB8fCAwO1xuICAgIH1cbiAgICAvKiog6I635Y+W5YWD57Sg5L2N572uICovXG4gICAgc3RhdGljIGdldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5wb3NpdGlvbjtcbiAgICB9XG4gICAgLyoqIOinkuW6pui9rOW8p+W6pu+8jOazqOaEjyBjYW52YXMg5Lit55So55qE6YO95piv5byn5bqm77yM5L2G5piv6KeS5bqm5a+55oiR5Lus5p2l6K+05q+U6L6D55u06KeCICovXG4gICAgc3RhdGljIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgICAgICByZXR1cm4gZGVncmVlcyAqIFBpQnkxODA7XG4gICAgfVxuICAgIC8qKiDlvKfluqbovazop5LluqbvvIzms6jmhI8gY2FudmFzIOS4reeUqOeahOmDveaYr+W8p+W6pu+8jOS9huaYr+inkuW6puWvueaIkeS7rOadpeivtOavlOi+g+ebtOingiAqL1xuICAgIHN0YXRpYyByYWRpYW5zVG9EZWdyZWVzKHJhZGlhbnMpIHtcbiAgICAgICAgcmV0dXJuIHJhZGlhbnMgLyBQaUJ5MTgwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIYgcG9pbnQg57uVIG9yaWdpbiDml4vovawgcmFkaWFucyDlvKfluqZcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCDopoHml4vovaznmoTngrlcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBvcmlnaW4g5peL6L2s5Lit5b+D54K5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMg5rOo5oSPIGNhbnZhcyDkuK3nlKjnmoTpg73mmK/lvKfluqZcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVQb2ludChwb2ludCwgb3JpZ2luLCByYWRpYW5zKSB7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJhZGlhbnMpLCBjb3MgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICAgICAgcG9pbnQuc3VidHJhY3RFcXVhbHMob3JpZ2luKTtcbiAgICAgICAgY29uc3QgcnggPSBwb2ludC54ICogY29zIC0gcG9pbnQueSAqIHNpbjtcbiAgICAgICAgY29uc3QgcnkgPSBwb2ludC54ICogc2luICsgcG9pbnQueSAqIGNvcztcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludChyeCwgcnkpLmFkZEVxdWFscyhvcmlnaW4pO1xuICAgIH1cbiAgICAvKiog5Y2V57qv55qE5Yib5bu65LiA5Liq5paw55qEIGNhbnZhcyDlhYPntKAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQ2FudmFzRWxlbWVudCgpIHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gICAgLyoqIOe7meWFg+e0oOa3u+WKoOexu+WQjSAqL1xuICAgIHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKChcIiBcIiArIGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAoZWxlbWVudC5jbGFzc05hbWUgPyBcIiBcIiA6IFwiXCIpICsgY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDorqHnrpflhYPntKDlgY/np7vlgLwgKi9cbiAgICBzdGF0aWMgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIGxldCB2YWx1ZVQgPSAwLCB2YWx1ZUwgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YWx1ZVQgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgICAgIHZhbHVlTCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICAgICAgfSB3aGlsZSAoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiB7IGxlZnQ6IHZhbHVlTCwgdG9wOiB2YWx1ZVQgfTtcbiAgICB9XG4gICAgLyoqIOWMheijueWFg+e0oOW5tuabv+aNoiAqL1xuICAgIHN0YXRpYyB3cmFwRWxlbWVudChlbGVtZW50LCB3cmFwcGVyLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgd3JhcHBlciA9IFV0aWwubWFrZUVsZW1lbnQod3JhcHBlciwgYXR0cmlidXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLyoqIOaWsOW7uuWFg+e0oOW5tua3u+WKoOebuOW6lOWxnuaApyAqL1xuICAgIHN0YXRpYyBtYWtlRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKHByb3AgPT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGF0dHJpYnV0ZXNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocHJvcCwgYXR0cmlidXRlc1twcm9wXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICAvKiog57uZ5YWD57Sg6K6+572u5qC35byPICovXG4gICAgc3RhdGljIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlcykge1xuICAgICAgICBsZXQgZWxlbWVudFN0eWxlID0gZWxlbWVudC5zdHlsZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSBcIjtcIiArIHN0eWxlcztcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXMuaW5kZXhPZihcIm9wYWNpdHlcIikgPiAtMVxuICAgICAgICAgICAgICAgID8gVXRpbC5zZXRPcGFjaXR5KGVsZW1lbnQsIHN0eWxlcy5tYXRjaCgvb3BhY2l0eTpcXHMqKFxcZD9cXC4/XFxkKikvKVsxXSlcbiAgICAgICAgICAgICAgICA6IGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gc3R5bGVzKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IFwib3BhY2l0eVwiKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5zZXRPcGFjaXR5KGVsZW1lbnQsIHN0eWxlc1twcm9wZXJ0eV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIC8qKiDorr7nva7lhYPntKDpgI/mmI7luqYgKi9cbiAgICBzdGF0aWMgc2V0T3BhY2l0eShlbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIC8qKiDorr7nva4gY3NzIOeahCB1c2VyU2VsZWN0IOagt+W8j+S4uiBub25l77yM5Lmf5bCx5piv5LiN5Y+v6YCJ5Lit55qE54q25oCBICovXG4gICAgc3RhdGljIG1ha2VFbGVtZW50VW5zZWxlY3RhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS51c2VyU2VsZWN0ID0gXCJub25lXCI7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICBzdGF0aWMgYWRkTGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgc3RhdGljIHJlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB0cmFuc2Zvcm0gbWF0cml4IHN0YXJ0aW5nIGZyb20gYW4gb2JqZWN0IG9mIHRoZSBzYW1lIGtpbmQgb2ZcbiAgICAgKiB0aGUgb25lIHJldHVybmVkIGZyb20gcXJEZWNvbXBvc2UsIHVzZWZ1bCBhbHNvIGlmIHlvdSB3YW50IHRvIGNhbGN1bGF0ZSBzb21lXG4gICAgICogdHJhbnNmb3JtYXRpb25zIGZyb20gYW4gb2JqZWN0IHRoYXQgaXMgbm90IGVubGl2ZWQgeWV0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBmYWJyaWMudXRpbFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMuYW5nbGVdXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZVhdXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZVldXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMuZmxpcFhdXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gW29wdGlvbnMuZmxpcFldXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBbb3B0aW9ucy5za2V3WF1cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnNrZXdYXVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gW29wdGlvbnMudHJhbnNsYXRlWF1cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IFtvcHRpb25zLnRyYW5zbGF0ZVldXG4gICAgICogQHJldHVybiB7TnVtYmVyW119IHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgKi9cbiAgICBzdGF0aWMgY29tcG9zZU1hdHJpeChvcHRpb25zKSB7XG4gICAgICAgIHZhciBtYXRyaXggPSBbMSwgMCwgMCwgMSwgb3B0aW9ucy50cmFuc2xhdGVYIHx8IDAsIG9wdGlvbnMudHJhbnNsYXRlWSB8fCAwXSwgbXVsdGlwbHkgPSBVdGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXM7XG4gICAgICAgIGlmIChvcHRpb25zLmFuZ2xlKSB7XG4gICAgICAgICAgICBtYXRyaXggPSBtdWx0aXBseShtYXRyaXgsIFV0aWwuY2FsY1JvdGF0ZU1hdHJpeChvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGVYICE9PSAxIHx8XG4gICAgICAgICAgICBvcHRpb25zLnNjYWxlWSAhPT0gMSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5za2V3WCB8fFxuICAgICAgICAgICAgb3B0aW9ucy5za2V3WSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5mbGlwWCB8fFxuICAgICAgICAgICAgb3B0aW9ucy5mbGlwWSkge1xuICAgICAgICAgICAgbWF0cml4ID0gbXVsdGlwbHkobWF0cml4LCBVdGlsLmNhbGNEaW1lbnNpb25zTWF0cml4KG9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0cml4O1xuICAgIH1cbiAgICBzdGF0aWMgY2FsY0RpbWVuc2lvbnNNYXRyaXgob3B0aW9ucykge1xuICAgICAgICB2YXIgc2NhbGVYID0gdHlwZW9mIG9wdGlvbnMuc2NhbGVYID09PSBcInVuZGVmaW5lZFwiID8gMSA6IG9wdGlvbnMuc2NhbGVYLCBzY2FsZVkgPSB0eXBlb2Ygb3B0aW9ucy5zY2FsZVkgPT09IFwidW5kZWZpbmVkXCIgPyAxIDogb3B0aW9ucy5zY2FsZVksIHNjYWxlTWF0cml4ID0gW1xuICAgICAgICAgICAgb3B0aW9ucy5mbGlwWCA/IC1zY2FsZVggOiBzY2FsZVgsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmxpcFkgPyAtc2NhbGVZIDogc2NhbGVZLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgIF0sIG11bHRpcGx5ID0gVXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzLCBkZWdyZWVzVG9SYWRpYW5zID0gVXRpbC5kZWdyZWVzVG9SYWRpYW5zO1xuICAgICAgICBpZiAob3B0aW9ucy5za2V3WCkge1xuICAgICAgICAgICAgc2NhbGVNYXRyaXggPSBtdWx0aXBseShzY2FsZU1hdHJpeCwgWzEsIDAsIE1hdGgudGFuKGRlZ3JlZXNUb1JhZGlhbnMob3B0aW9ucy5za2V3WCkpLCAxXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tld1kpIHtcbiAgICAgICAgICAgIHNjYWxlTWF0cml4ID0gbXVsdGlwbHkoc2NhbGVNYXRyaXgsIFsxLCBNYXRoLnRhbihkZWdyZWVzVG9SYWRpYW5zKG9wdGlvbnMuc2tld1kpKSwgMCwgMV0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY2FsZU1hdHJpeDtcbiAgICB9XG4gICAgc3RhdGljIGNhbGNSb3RhdGVNYXRyaXgob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMuYW5nbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpTWF0cml4LmNvbmNhdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0aGV0YSA9IFV0aWwuZGVncmVlc1RvUmFkaWFucyhvcHRpb25zLmFuZ2xlKSwgY29zID0gTWF0aC5jb3ModGhldGEpLCBzaW4gPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgIHJldHVybiBbY29zLCBzaW4sIC1zaW4sIGNvcywgMCwgMF07XG4gICAgfVxuICAgIHN0YXRpYyBtYXRyaXhUb1NWRyh0cmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0dXJuIChcIm1hdHJpeChcIiArXG4gICAgICAgICAgICB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLnRvRml4ZWQodmFsdWUsIDIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiBcIikgK1xuICAgICAgICAgICAgXCIpXCIpO1xuICAgIH1cbiAgICAvLyDmtIvokbHku7vliqHmqKHlnotcbiAgICBzdGF0aWMgY29tcG9zZShtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgbmV4dCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goMCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBkaXNwYXRjaChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPD0gaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJuZXh0KCkgY2FsbGVkIG11bHRpcGxlIHRpbWVzXCIpKTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgbGV0IGZuID0gbWlkZGxld2FyZVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gbWlkZGxld2FyZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGZuID0gbmV4dDtcbiAgICAgICAgICAgICAgICBpZiAoIWZuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmbihjb250ZXh0LCBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdGljIGdldEJvdW5kc09mQ3VydmUoeDAsIHkwLCB4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHZhciBhcmdzU3RyaW5nO1xuICAgICAgICB2YXIgc3FydCA9IE1hdGguc3FydCwgbWluID0gTWF0aC5taW4sIG1heCA9IE1hdGgubWF4LCBhYnMgPSBNYXRoLmFicywgdHZhbHVlcyA9IFtdLCBib3VuZHMgPSBbW10sIFtdXSwgYSwgYiwgYywgdCwgdDEsIHQyLCBiMmFjLCBzcXJ0YjJhYztcbiAgICAgICAgYiA9IDYgKiB4MCAtIDEyICogeDEgKyA2ICogeDI7XG4gICAgICAgIGEgPSAtMyAqIHgwICsgOSAqIHgxIC0gOSAqIHgyICsgMyAqIHgzO1xuICAgICAgICBjID0gMyAqIHgxIC0gMyAqIHgwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI7ICsraSkge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYiA9IDYgKiB5MCAtIDEyICogeTEgKyA2ICogeTI7XG4gICAgICAgICAgICAgICAgYSA9IC0zICogeTAgKyA5ICogeTEgLSA5ICogeTIgKyAzICogeTM7XG4gICAgICAgICAgICAgICAgYyA9IDMgKiB5MSAtIDMgKiB5MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhYnMoYSkgPCAxZS0xMikge1xuICAgICAgICAgICAgICAgIGlmIChhYnMoYikgPCAxZS0xMikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCA9IC1jIC8gYjtcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHQgJiYgdCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdHZhbHVlcy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGIyYWMgPSBiICogYiAtIDQgKiBjICogYTtcbiAgICAgICAgICAgIGlmIChiMmFjIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FydGIyYWMgPSBzcXJ0KGIyYWMpO1xuICAgICAgICAgICAgdDEgPSAoLWIgKyBzcXJ0YjJhYykgLyAoMiAqIGEpO1xuICAgICAgICAgICAgaWYgKDAgPCB0MSAmJiB0MSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0dmFsdWVzLnB1c2godDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdDIgPSAoLWIgLSBzcXJ0YjJhYykgLyAoMiAqIGEpO1xuICAgICAgICAgICAgaWYgKDAgPCB0MiAmJiB0MiA8IDEpIHtcbiAgICAgICAgICAgICAgICB0dmFsdWVzLnB1c2godDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB4LCB5LCBqID0gdHZhbHVlcy5sZW5ndGgsIGpsZW4gPSBqLCBtdDtcbiAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgdCA9IHR2YWx1ZXNbal07XG4gICAgICAgICAgICBtdCA9IDEgLSB0O1xuICAgICAgICAgICAgeCA9XG4gICAgICAgICAgICAgICAgbXQgKiBtdCAqIG10ICogeDAgK1xuICAgICAgICAgICAgICAgICAgICAzICogbXQgKiBtdCAqIHQgKiB4MSArXG4gICAgICAgICAgICAgICAgICAgIDMgKiBtdCAqIHQgKiB0ICogeDIgK1xuICAgICAgICAgICAgICAgICAgICB0ICogdCAqIHQgKiB4MztcbiAgICAgICAgICAgIGJvdW5kc1swXVtqXSA9IHg7XG4gICAgICAgICAgICB5ID1cbiAgICAgICAgICAgICAgICBtdCAqIG10ICogbXQgKiB5MCArXG4gICAgICAgICAgICAgICAgICAgIDMgKiBtdCAqIG10ICogdCAqIHkxICtcbiAgICAgICAgICAgICAgICAgICAgMyAqIG10ICogdCAqIHQgKiB5MiArXG4gICAgICAgICAgICAgICAgICAgIHQgKiB0ICogdCAqIHkzO1xuICAgICAgICAgICAgYm91bmRzWzFdW2pdID0geTtcbiAgICAgICAgfVxuICAgICAgICBib3VuZHNbMF1bamxlbl0gPSB4MDtcbiAgICAgICAgYm91bmRzWzFdW2psZW5dID0geTA7XG4gICAgICAgIGJvdW5kc1swXVtqbGVuICsgMV0gPSB4MztcbiAgICAgICAgYm91bmRzWzFdW2psZW4gKyAxXSA9IHkzO1xuICAgICAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IG1pbi5hcHBseShudWxsLCBib3VuZHNbMF0pLFxuICAgICAgICAgICAgICAgIHk6IG1pbi5hcHBseShudWxsLCBib3VuZHNbMV0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiBtYXguYXBwbHkobnVsbCwgYm91bmRzWzBdKSxcbiAgICAgICAgICAgICAgICB5OiBtYXguYXBwbHkobnVsbCwgYm91bmRzWzFdKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBjYWxjVmVjdG9yQW5nbGUodXgsIHV5LCB2eCwgdnkpIHtcbiAgICAgICAgdmFyIHRhID0gTWF0aC5hdGFuMih1eSwgdXgpLCB0YiA9IE1hdGguYXRhbjIodnksIHZ4KTtcbiAgICAgICAgaWYgKHRiID49IHRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGIgLSB0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAyICogTWF0aC5QSSAtICh0YSAtIHRiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgc2luKGFuZ2xlKSB7XG4gICAgICAgIGlmIChhbmdsZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlU2xpY2UgPSBhbmdsZSAvIFBpQnkyLCBzaWduID0gMTtcbiAgICAgICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgICAgICAgLy8gc2luKC1hKSA9IC1zaW4oYSlcbiAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGFuZ2xlU2xpY2UpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gc2lnbjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gLXNpZ247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguc2luKGFuZ2xlKTtcbiAgICB9XG4gICAgc3RhdGljIGNvcyhhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gLWFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbmdsZVNsaWNlID0gYW5nbGUgLyBQaUJ5MjtcbiAgICAgICAgc3dpdGNoIChhbmdsZVNsaWNlKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgfVxuICAgIHN0YXRpYyBzZWdtZW50VG9CZXppZXIodGgyLCB0aDMsIGNvc1RoLCBzaW5UaCwgcngsIHJ5LCBjeDEsIGN5MSwgbVQsIGZyb21YLCBmcm9tWSkge1xuICAgICAgICB2YXIgY29zdGgyID0gVXRpbC5jb3ModGgyKSwgc2ludGgyID0gVXRpbC5zaW4odGgyKSwgY29zdGgzID0gVXRpbC5jb3ModGgzKSwgc2ludGgzID0gVXRpbC5zaW4odGgzKSwgdG9YID0gY29zVGggKiByeCAqIGNvc3RoMyAtIHNpblRoICogcnkgKiBzaW50aDMgKyBjeDEsIHRvWSA9IHNpblRoICogcnggKiBjb3N0aDMgKyBjb3NUaCAqIHJ5ICogc2ludGgzICsgY3kxLCBjcDFYID0gZnJvbVggKyBtVCAqICgtY29zVGggKiByeCAqIHNpbnRoMiAtIHNpblRoICogcnkgKiBjb3N0aDIpLCBjcDFZID0gZnJvbVkgKyBtVCAqICgtc2luVGggKiByeCAqIHNpbnRoMiArIGNvc1RoICogcnkgKiBjb3N0aDIpLCBjcDJYID0gdG9YICsgbVQgKiAoY29zVGggKiByeCAqIHNpbnRoMyArIHNpblRoICogcnkgKiBjb3N0aDMpLCBjcDJZID0gdG9ZICsgbVQgKiAoc2luVGggKiByeCAqIHNpbnRoMyAtIGNvc1RoICogcnkgKiBjb3N0aDMpO1xuICAgICAgICByZXR1cm4gW1wiQ1wiLCBjcDFYLCBjcDFZLCBjcDJYLCBjcDJZLCB0b1gsIHRvWV07XG4gICAgfVxuICAgIHN0YXRpYyBhcmNUb1NlZ21lbnRzKHRvWCwgdG9ZLCByeCwgcnksIGxhcmdlLCBzd2VlcCwgcm90YXRlWCkge1xuICAgICAgICB2YXIgUEkgPSBNYXRoLlBJLCB0aCA9IChyb3RhdGVYICogUEkpIC8gMTgwLCBzaW5UaCA9IFV0aWwuc2luKHRoKSwgY29zVGggPSBVdGlsLmNvcyh0aCksIGZyb21YID0gMCwgZnJvbVkgPSAwO1xuICAgICAgICByeCA9IE1hdGguYWJzKHJ4KTtcbiAgICAgICAgcnkgPSBNYXRoLmFicyhyeSk7XG4gICAgICAgIHZhciBweCA9IC1jb3NUaCAqIHRvWCAqIDAuNSAtIHNpblRoICogdG9ZICogMC41LCBweSA9IC1jb3NUaCAqIHRvWSAqIDAuNSArIHNpblRoICogdG9YICogMC41LCByeDIgPSByeCAqIHJ4LCByeTIgPSByeSAqIHJ5LCBweTIgPSBweSAqIHB5LCBweDIgPSBweCAqIHB4LCBwbCA9IHJ4MiAqIHJ5MiAtIHJ4MiAqIHB5MiAtIHJ5MiAqIHB4Miwgcm9vdCA9IDA7XG4gICAgICAgIGlmIChwbCA8IDApIHtcbiAgICAgICAgICAgIHZhciBzID0gTWF0aC5zcXJ0KDEgLSBwbCAvIChyeDIgKiByeTIpKTtcbiAgICAgICAgICAgIHJ4ICo9IHM7XG4gICAgICAgICAgICByeSAqPSBzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcm9vdCA9XG4gICAgICAgICAgICAgICAgKGxhcmdlID09PSBzd2VlcCA/IC0xLjAgOiAxLjApICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5zcXJ0KHBsIC8gKHJ4MiAqIHB5MiArIHJ5MiAqIHB4MikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjeCA9IChyb290ICogcnggKiBweSkgLyByeSwgY3kgPSAoLXJvb3QgKiByeSAqIHB4KSAvIHJ4LCBjeDEgPSBjb3NUaCAqIGN4IC0gc2luVGggKiBjeSArIHRvWCAqIDAuNSwgY3kxID0gc2luVGggKiBjeCArIGNvc1RoICogY3kgKyB0b1kgKiAwLjUsIG1UaGV0YSA9IFV0aWwuY2FsY1ZlY3RvckFuZ2xlKDEsIDAsIChweCAtIGN4KSAvIHJ4LCAocHkgLSBjeSkgLyByeSksIGR0aGV0YSA9IFV0aWwuY2FsY1ZlY3RvckFuZ2xlKChweCAtIGN4KSAvIHJ4LCAocHkgLSBjeSkgLyByeSwgKC1weCAtIGN4KSAvIHJ4LCAoLXB5IC0gY3kpIC8gcnkpO1xuICAgICAgICBpZiAoc3dlZXAgPT09IDAgJiYgZHRoZXRhID4gMCkge1xuICAgICAgICAgICAgZHRoZXRhIC09IDIgKiBQSTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzd2VlcCA9PT0gMSAmJiBkdGhldGEgPCAwKSB7XG4gICAgICAgICAgICBkdGhldGEgKz0gMiAqIFBJO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnZlcnQgaW50byBjdWJpYyBiZXppZXIgc2VnbWVudHMgPD0gOTBkZWdcbiAgICAgICAgdmFyIHNlZ21lbnRzID0gTWF0aC5jZWlsKE1hdGguYWJzKChkdGhldGEgLyBQSSkgKiAyKSksIHJlc3VsdCA9IFtdLCBtRGVsdGEgPSBkdGhldGEgLyBzZWdtZW50cywgbVQgPSAoKDggLyAzKSAqIE1hdGguc2luKG1EZWx0YSAvIDQpICogTWF0aC5zaW4obURlbHRhIC8gNCkpIC9cbiAgICAgICAgICAgIE1hdGguc2luKG1EZWx0YSAvIDIpLCB0aDMgPSBtVGhldGEgKyBtRGVsdGE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gVXRpbC5zZWdtZW50VG9CZXppZXIobVRoZXRhLCB0aDMsIGNvc1RoLCBzaW5UaCwgcngsIHJ5LCBjeDEsIGN5MSwgbVQsIGZyb21YLCBmcm9tWSk7XG4gICAgICAgICAgICBmcm9tWCA9IHJlc3VsdFtpXVs1XTtcbiAgICAgICAgICAgIGZyb21ZID0gcmVzdWx0W2ldWzZdO1xuICAgICAgICAgICAgbVRoZXRhID0gdGgzO1xuICAgICAgICAgICAgdGgzICs9IG1EZWx0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUFyY1RvQmV6aWVycyhmeCwgZnksIGNvb3Jkcykge1xuICAgICAgICB2YXIgcnggPSBjb29yZHNbMV0sIHJ5ID0gY29vcmRzWzJdLCByb3QgPSBjb29yZHNbM10sIGxhcmdlID0gY29vcmRzWzRdLCBzd2VlcCA9IGNvb3Jkc1s1XSwgdHggPSBjb29yZHNbNl0sIHR5ID0gY29vcmRzWzddLCBzZWdzTm9ybSA9IFV0aWwuYXJjVG9TZWdtZW50cyh0eCAtIGZ4LCB0eSAtIGZ5LCByeCwgcnksIGxhcmdlLCBzd2VlcCwgcm90KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlZ3NOb3JtLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBzZWdzTm9ybVtpXVsxXSArPSBmeDtcbiAgICAgICAgICAgIHNlZ3NOb3JtW2ldWzJdICs9IGZ5O1xuICAgICAgICAgICAgc2Vnc05vcm1baV1bM10gKz0gZng7XG4gICAgICAgICAgICBzZWdzTm9ybVtpXVs0XSArPSBmeTtcbiAgICAgICAgICAgIHNlZ3NOb3JtW2ldWzVdICs9IGZ4O1xuICAgICAgICAgICAgc2Vnc05vcm1baV1bNl0gKz0gZnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlZ3NOb3JtO1xuICAgIH1cbiAgICBzdGF0aWMgbWFrZVBhdGhTaW1wbGVyKHBhdGgpIHtcbiAgICAgICAgLy8geCBhbmQgeSByZXByZXNlbnQgdGhlIGxhc3QgcG9pbnQgb2YgdGhlIHBhdGguIHRoZSBwcmV2aW91cyBjb21tYW5kIHBvaW50LlxuICAgICAgICAvLyB3ZSBhZGQgdGhlbSB0byBlYWNoIHJlbGF0aXZlIGNvbW1hbmQgdG8gbWFrZSBpdCBhbiBhYnNvbHV0ZSBjb21tZW50LlxuICAgICAgICAvLyB3ZSBhbHNvIHN3YXAgdGhlIHYgViBoIEggd2l0aCBMLCBiZWNhdXNlIGFyZSBlYXNpZXIgdG8gdHJhbnNmb3JtLlxuICAgICAgICB2YXIgeCA9IDAsIHkgPSAwLCBsZW4gPSBwYXRoLmxlbmd0aCwgXG4gICAgICAgIC8vIHgxIGFuZCB5MSByZXByZXNlbnQgdGhlIGxhc3QgcG9pbnQgb2YgdGhlIHN1YnBhdGguIHRoZSBzdWJwYXRoIGlzIHN0YXJ0ZWQgd2l0aFxuICAgICAgICAvLyBtIG9yIE0gY29tbWFuZC4gV2hlbiBhIHogb3IgWiBjb21tYW5kIGlzIGRyYXduLCB4IGFuZCB5IG5lZWQgdG8gYmUgcmVzZXR0ZWQgdG9cbiAgICAgICAgLy8gdGhlIGxhc3QgeDEgYW5kIHkxLlxuICAgICAgICB4MSA9IDAsIHkxID0gMCwgY3VycmVudCwgaSwgY29udmVydGVkLCBcbiAgICAgICAgLy8gcHJldmlvdXMgd2lsbCBob3N0IHRoZSBsZXR0ZXIgb2YgdGhlIHByZXZpb3VzIGNvbW1hbmQsIHRvIGhhbmRsZSBTIGFuZCBULlxuICAgICAgICAvLyBjb250cm9sWCBhbmQgY29udHJvbFkgd2lsbCBob3N0IHRoZSBwcmV2aW91cyByZWZsZWN0ZWQgY29udHJvbCBwb2ludFxuICAgICAgICBkZXN0aW5hdGlvblBhdGggPSBbXSwgcHJldmlvdXMsIGNvbnRyb2xYLCBjb250cm9sWTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBjb252ZXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBwYXRoW2ldLnNsaWNlKDApO1xuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50WzBdIC8vIGZpcnN0IGxldHRlclxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxcIjogLy8gbGluZXRvLCByZWxhdGl2ZVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzBdID0gXCJMXCI7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMV0gKz0geDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsyXSArPSB5O1xuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiTFwiOlxuICAgICAgICAgICAgICAgICAgICB4ID0gY3VycmVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGN1cnJlbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoXCI6IC8vIGhvcml6b250YWwgbGluZXRvLCByZWxhdGl2ZVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzFdICs9IHg7XG4gICAgICAgICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIkxcIjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsyXSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidlwiOiAvLyB2ZXJ0aWNhbCBsaW5ldG8sIHJlbGF0aXZlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMV0gKz0geTtcbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcIlZcIjpcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFswXSA9IFwiTFwiO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsxXSA9IHg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMl0gPSB5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibVwiOiAvLyBtb3ZlVG8sIHJlbGF0aXZlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIk1cIjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsxXSArPSB4O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzJdICs9IHk7XG4gICAgICAgICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgeDEgPSBjdXJyZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IGN1cnJlbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjXCI6IC8vIGJlemllckN1cnZlVG8sIHJlbGF0aXZlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIkNcIjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsxXSArPSB4O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzJdICs9IHk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbM10gKz0geDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFs0XSArPSB5O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzVdICs9IHg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbNl0gKz0geTtcbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcIkNcIjpcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbFggPSBjdXJyZW50WzNdO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sWSA9IGN1cnJlbnRbNF07XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzVdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFs2XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjogLy8gc2hvcnRoYW5kIGN1YmljIGJlemllckN1cnZlVG8sIHJlbGF0aXZlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIlNcIjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsxXSArPSB4O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzJdICs9IHk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbM10gKz0geDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFs0XSArPSB5O1xuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyB3b3VsZCBiZSBzU2NDIGJ1dCBzaW5jZSB3ZSBhcmUgc3dhcHBpbmcgc1NjIGZvciBDLCB3ZSBjaGVjayBqdXN0IHRoYXQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gXCJDXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSByZWZsZWN0aW9uIG9mIHByZXZpb3VzIGNvbnRyb2wgcG9pbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sWCA9IDIgKiB4IC0gY29udHJvbFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sWSA9IDIgKiB5IC0gY29udHJvbFk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBwcmV2aW91cyBjb21tYW5kIG9yIGlmIHRoZSBwcmV2aW91cyBjb21tYW5kIHdhcyBub3QgYSBDLCBjLCBTLCBvciBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGNvbnRyb2wgcG9pbnQgaXMgY29pbmNpZGVudCB3aXRoIHRoZSBjdXJyZW50IHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sWCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sWSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeCA9IGN1cnJlbnRbM107XG4gICAgICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50WzRdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzBdID0gXCJDXCI7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbNV0gPSBjdXJyZW50WzNdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzZdID0gY3VycmVudFs0XTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFszXSA9IGN1cnJlbnRbMV07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbNF0gPSBjdXJyZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzFdID0gY29udHJvbFg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMl0gPSBjb250cm9sWTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudFszXSBhbmQgY3VycmVudFs0XSBhcmUgTk9XIHRoZSBzZWNvbmQgY29udHJvbCBwb2ludC5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2Uga2VlcCBpdCBmb3IgdGhlIG5leHQgcmVmbGVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgY29udHJvbFggPSBjdXJyZW50WzNdO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sWSA9IGN1cnJlbnRbNF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJxXCI6IC8vIHF1YWRyYXRpY0N1cnZlVG8sIHJlbGF0aXZlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIlFcIjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFsxXSArPSB4O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzJdICs9IHk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbM10gKz0geDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFs0XSArPSB5O1xuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiUVwiOlxuICAgICAgICAgICAgICAgICAgICBjb250cm9sWCA9IGN1cnJlbnRbMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xZID0gY3VycmVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGN1cnJlbnRbM107XG4gICAgICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50WzRdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidFwiOiAvLyBzaG9ydGhhbmQgcXVhZHJhdGljQ3VydmVUbywgcmVsYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFswXSA9IFwiVFwiO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzFdICs9IHg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMl0gKz0geTtcbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcIlRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBcIlFcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHJlZmxlY3Rpb24gb2YgcHJldmlvdXMgY29udHJvbCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbFggPSAyICogeCAtIGNvbnRyb2xYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbFkgPSAyICogeSAtIGNvbnRyb2xZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gcHJldmlvdXMgY29tbWFuZCBvciBpZiB0aGUgcHJldmlvdXMgY29tbWFuZCB3YXMgbm90IGEgUSwgcSwgVCBvciB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIHRoZSBjb250cm9sIHBvaW50IGlzIGNvaW5jaWRlbnQgd2l0aCB0aGUgY3VycmVudCBwb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbFggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbFkgPSB5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMF0gPSBcIlFcIjtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGN1cnJlbnRbMV07XG4gICAgICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzFdID0gY29udHJvbFg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMl0gPSBjb250cm9sWTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFszXSA9IHg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbNF0gPSB5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYVwiOlxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WzBdID0gXCJBXCI7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbNl0gKz0geDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFs3XSArPSB5O1xuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiQVwiOlxuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblBhdGggPSBkZXN0aW5hdGlvblBhdGguY29uY2F0KFV0aWwuZnJvbUFyY1RvQmV6aWVycyh4LCB5LCBjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzZdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFs3XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInpcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiWlwiOlxuICAgICAgICAgICAgICAgICAgICB4ID0geDE7XG4gICAgICAgICAgICAgICAgICAgIHkgPSB5MTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29udmVydGVkKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25QYXRoLnB1c2goY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnRbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uUGF0aDtcbiAgICB9XG59XG4iLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uL2Jhc2UvdXRpbHNcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL2Jhc2UvcG9pbnRcIjtcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSBcIi4uL2Jhc2UvZ3JvdXBcIjtcbmltcG9ydCB7IEV2ZW50Q2VudGVyIH0gZnJvbSBcIi4uL2Jhc2UvZXZlbnRcIjtcbmltcG9ydCBEZWZhdWx0UGx1Z2luIGZyb20gXCIuLi9wbHVnaW5zL2RlZmF1bHQucGx1Z2luXCI7XG5pbXBvcnQgTW92ZVBsdWdpbiBmcm9tIFwiLi4vcGx1Z2lucy9tb3ZlLnBsdWdpblwiO1xuY29uc3QgU1RST0tFX09GRlNFVCA9IDAuNTtcbi8vIOm8oOagh+aJi+WKv1xuY29uc3QgY3Vyc29yTWFwID0ge1xuICAgIHRyOiBcIm5lLXJlc2l6ZVwiLFxuICAgIGJyOiBcInNlLXJlc2l6ZVwiLFxuICAgIGJsOiBcInN3LXJlc2l6ZVwiLFxuICAgIHRsOiBcIm53LXJlc2l6ZVwiLFxuICAgIG1sOiBcInctcmVzaXplXCIsXG4gICAgbXQ6IFwibi1yZXNpemVcIixcbiAgICBtcjogXCJlLXJlc2l6ZVwiLFxuICAgIG1iOiBcInMtcmVzaXplXCIsXG59O1xuLyoqIOS4gOS6m+m8oOagh+agt+W8jyAqL1xudmFyIEN1cnNvclN0eWxlO1xuKGZ1bmN0aW9uIChDdXJzb3JTdHlsZSkge1xuICAgIEN1cnNvclN0eWxlW1wiZGVmYXVsdFwiXSA9IFwiZGVmYXVsdFwiO1xuICAgIEN1cnNvclN0eWxlW1wibW92ZVwiXSA9IFwibW92ZVwiO1xuICAgIEN1cnNvclN0eWxlW1wiaG92ZXJcIl0gPSBcIm1vdmVcIjtcbiAgICBDdXJzb3JTdHlsZVtcInJvdGF0aW9uXCJdID0gXCJjcm9zc2hhaXJcIjtcbn0pKEN1cnNvclN0eWxlIHx8IChDdXJzb3JTdHlsZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgRXZlbnRDZW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vI3JlZ2lvbiDlsZ7mgKflrZfmrrVcbiAgICAgICAgLyoqIOW9k+WJjeaTjeS9nOexu+WeiyAqL1xuICAgICAgICB0aGlzLmFjdGlvbiA9IFwiZGVmYXVsdFwiO1xuICAgICAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgICAgICAvKiog55S75biD5Lit5omA5pyJ5re75Yqg55qE54mp5L2TICovXG4gICAgICAgIHRoaXMuX3NoYXBlcyA9IFtdO1xuICAgICAgICAvKiog5pW05Liq55S75biD6Led56a75Y6f54K555qE5YGP56e76YePICovXG4gICAgICAgIHRoaXMuX29mZnNldCA9IHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgICAgKiBXaW5kb3cg5o6l5Y+j55qEKipkZXZpY2VQaXhlbFJhdGlvXG4gICAgICAgICAqICDov5Tlm57lvZPliY3mmL7npLrorr7lpIfnmoTniannkIblg4/ntKDliIbovqjnjofkuI5DU1Mg5YOP57Sg5YiG6L6o546H5LmL5q+U44CCXG4gICAgICAgICAqICDmraTlgLzkuZ/lj6/ku6Xop6Pph4rkuLrlg4/ntKDlpKflsI/nmoTmr5TnjofvvJrkuIDkuKogQ1NTIOWDj+e0oOeahOWkp+Wwj+S4juS4gOS4queJqeeQhuWDj+e0oOeahOWkp+Wwj+OAglxuICAgICAgICAgKiAg566A5Y2V5p2l6K+077yM5a6D5ZGK6K+J5rWP6KeI5Zmo5bqU5L2/55So5aSa5bCR5bGP5bmV5a6e6ZmF5YOP57Sg5p2l57uY5Yi25Y2V5LiqIENTUyDlg4/ntKDjgIJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIC8vIOe8qeaUvuavlFxuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgLy8g5LiK5LiA5qyh55qE57yp5pS+5q+UXG4gICAgICAgIHRoaXMucHJlU2NhbGUgPSAxO1xuICAgICAgICAvLyDnlLvluIPlhoXnmoTlgY/np7vph49cbiAgICAgICAgdGhpcy5fY2FudmFzT2Zmc2V0ID0ge1xuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgLyoqKioqKioqKioqKioqICDlj6/phY3nva7pg6jliIYgICoqKioqKioqKioqKioqL1xuICAgICAgICAvKiog6YCJ5oup5Yy65Z+f5qGG55qE6IOM5pmv6aKc6ImyICovXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ29sb3IgPSBcIiMwYzk5ZmYyNlwiO1xuICAgICAgICAvKiog6YCJ5oup5Yy65Z+f5qGG55qE6L655qGG6aKc6ImyICovXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQm9yZGVyQ29sb3IgPSBcIiMwYzk5ZmZcIjtcbiAgICAgICAgLyoqIOmAieaLqeWMuuWfn+eahOi+ueahhuWkp+Wwj++8jOaLluiTneeahOe6v+WuvSAqL1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkxpbmVXaWR0aCA9IDE7XG4gICAgICAgIC8vIOavj+asoee8qeaUvueahOatpemVv1xuICAgICAgICB0aGlzLnNjYWxlU3RlcCA9IDAuMjtcbiAgICAgICAgLy8g5pyA5aSn57yp5pS+5q+UXG4gICAgICAgIHRoaXMuc2NhbGVNYXggPSA4O1xuICAgICAgICB0aGlzLnNjYWxlTWluID0gMC44O1xuICAgICAgICAvLyDmj5Lku7ZcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW0RlZmF1bHRQbHVnaW4sIE1vdmVQbHVnaW5dO1xuICAgICAgICAvLyDmjILku7ZcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIC8vIOWIneWni+WMlumFjee9rlxuICAgICAgICB0aGlzLndyYXBwZXJFbGVtZW50ID0gZWw7XG4gICAgICAgIHRoaXMuX2luaXRDb25maWcob3B0aW9ucyk7XG4gICAgICAgIC8vIOWIneWni+WMluS4i+WxgueUu+W4gyBtYWluLWNhbnZhc1xuICAgICAgICB0aGlzLl9pbml0TWFpbkNhbnZhcygpO1xuICAgICAgICAvLyDliJ3lp4vljJbkuIrlsYLnlLvluIMgdG9wLWNhbnZhc1xuICAgICAgICB0aGlzLl9pbml0SW50ZXJhY3RpdmVDYW52YXMoKTtcbiAgICAgICAgLy8g5Yid5aeL5YyW57yT5Yay5bGC55S75biDXG4gICAgICAgIHRoaXMuX2luaXRDYWNoZUNhbnZhcygpO1xuICAgICAgICAvLyDlpITnkIbmqKHns4rpl67pophcbiAgICAgICAgdGhpcy5faW5pdFJldGluYVNjYWxpbmcoKTtcbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG4gICAgLy8jcmVnaW9uIOWIneWni+WMlumAu+i+kVxuICAgIC8vIOWIneWni+WMlumFjee9rlxuICAgIF9pbml0Q29uZmlnKG9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJwbHVnaW5zXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbnMucHVzaCguLi5vcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSBcIndpZGdldHNcIikge1xuICAgICAgICAgICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKC4uLm9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8g5Yid5aeL5YyW5oyC5Lu2XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFdpZGdldHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcHBlckVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgXCJweFwiO1xuICAgICAgICB0aGlzLndyYXBwZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgICAvLyDliJ3lp4vljJbmjILovb3mjILku7ZcbiAgICBfaW5pdFdpZGdldHMoKSB7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHdpZGdldC5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgd2lkZ2V0LmRvbS5pbm5lckhUTUwgPSB3aWRnZXQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgd2lkZ2V0LmRvbS5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB3aWRnZXQuZG9tLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgd2lkZ2V0LmRvbS5zdHlsZVtcInpJbmRleFwiXSA9IFwiMTBcIjtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQod2lkZ2V0LmRvbSk7XG4gICAgICAgICAgICB3aWRnZXQucm9jb2NvMmQgPSB0aGlzO1xuICAgICAgICAgICAgd2lkZ2V0Lm1vdW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaW5pdE9iamVjdChvYmopIHtcbiAgICAgICAgb2JqLnNldHVwU3RhdGUoKTtcbiAgICAgICAgb2JqLnNldENvb3JkcygpO1xuICAgICAgICBvYmouY2FudmFzID0gdGhpcztcbiAgICB9XG4gICAgLy8g5Yid5aeL5YyW5Li755S75biDXG4gICAgX2luaXRNYWluQ2FudmFzKCkge1xuICAgICAgICB0aGlzLm1haW5DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLndyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWFpbkNhbnZhcyk7XG4gICAgICAgIHRoaXMuX2FwcGx5Q2FudmFzU3R5bGUodGhpcy5tYWluQ2FudmFzKTtcbiAgICAgICAgdGhpcy5tQ3R4ID0gdGhpcy5tYWluQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5jYWxjT2Zmc2V0KCk7XG4gICAgfVxuICAgIC8vIOWIneWni+WMluaTjeS9nOeUu+W4g1xuICAgIF9pbml0SW50ZXJhY3RpdmVDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUcmFuc2Zvcm0gPSBudWxsO1xuICAgICAgICB0aGlzLl9ncm91cFNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy50b3BDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLndyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9wQ2FudmFzKTtcbiAgICAgICAgdGhpcy5fYXBwbHlDYW52YXNTdHlsZSh0aGlzLnRvcENhbnZhcyk7XG4gICAgICAgIHRoaXMudEN0eCA9IHRoaXMudG9wQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuICAgIH1cbiAgICAvLyDliJ3lp4vljJbnvJPlhrLnlLvluINcbiAgICBfaW5pdENhY2hlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmNhY2hlQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5fYXBwbHlDYW52YXNTdHlsZSh0aGlzLmNhY2hlQ2FudmFzKTtcbiAgICAgICAgdGhpcy5jQ3R4ID0gdGhpcy5jYWNoZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuICAgIC8vIOWIneWni+WMluinhuiniee8qeaUvuavlOS+i1xuICAgIF9pbml0UmV0aW5hU2NhbGluZygpIHtcbiAgICAgICAgY29uc3QgbG9jYWxJbml0UmV0aW5hU2NhbGluZyA9IChjYW52YXMsIGN0eCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzO1xuICAgICAgICAgICAgLy8g6YeN5paw6K6+572uIGNhbnZhcyDoh6rouqvlrr3pq5jlpKflsI/lkowgY3NzIOWkp+Wwj+OAguaUvuWkpyBjYW52YXPvvJtjc3Mg5L+d5oyB5LiN5Y+Y77yM5Zug5Li65oiR5Lus6ZyA6KaB6YKj5LmI5aSa55qE54K5XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogdGhpcy5kcHIpO1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogdGhpcy5kcHIpO1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgLy8g55u05o6l55SoIHNjYWxlIOaUvuWkp+aVtOS4quWdkOagh+ezu++8jOebuOWvueadpeivtOWwseaYr+aUvuWkp+S6huavj+S4que7mOWItuaTjeS9nFxuICAgICAgICAgICAgY3R4LnNjYWxlKHRoaXMuZHByLCB0aGlzLmRwcik7XG4gICAgICAgIH07XG4gICAgICAgIGxvY2FsSW5pdFJldGluYVNjYWxpbmcodGhpcy5tYWluQ2FudmFzLCB0aGlzLm1DdHgpO1xuICAgICAgICBsb2NhbEluaXRSZXRpbmFTY2FsaW5nKHRoaXMudG9wQ2FudmFzLCB0aGlzLnRDdHgpO1xuICAgICAgICBsb2NhbEluaXRSZXRpbmFTY2FsaW5nKHRoaXMuY2FjaGVDYW52YXMsIHRoaXMuY0N0eCk7XG4gICAgfVxuICAgIC8vICNlbmRyZWdpb25cbiAgICAvLyAjcmVnaW9uIOS6i+S7tuezu+e7n1xuICAgIC8qKiDnu5nkuIrlsYLnlLvluIPlop7liqDpvKDmoIfkuovku7YgKi9cbiAgICBfaW5pdEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlTW91c2VEb3duID0gdGhpcy5faGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSA9IHRoaXMuX2hhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9oYW5kbGVNb3VzZVVwID0gdGhpcy5faGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUgPSB0aGlzLl9oYW5kbGVXaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5faGFuZGxlTW91c2VXaGVlbCA9IHRoaXMuX2hhbmRsZU1vdXNlV2hlZWwuYmluZCh0aGlzKTtcbiAgICAgICAgVXRpbC5hZGRMaXN0ZW5lcih3aW5kb3csIFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVdpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIFV0aWwuYWRkTGlzdGVuZXIodGhpcy50b3BDYW52YXMsIFwibW91c2Vkb3duXCIsIHRoaXMuX2hhbmRsZU1vdXNlRG93bik7XG4gICAgICAgIFV0aWwuYWRkTGlzdGVuZXIodGhpcy50b3BDYW52YXMsIFwibW91c2Vtb3ZlXCIsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIFV0aWwuYWRkTGlzdGVuZXIodGhpcy50b3BDYW52YXMsIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gPyBcIkRPTU1vdXNlU2Nyb2xsXCIgOiBcIm1vdXNld2hlZWxcIiwgdGhpcy5faGFuZGxlTW91c2VXaGVlbCk7XG4gICAgfVxuICAgIC8vIOaJp+ihjOa0i+iRseS7u+WKoeaooeWei1xuICAgIF9leGVjdXRlQ29tcG9zZShrZXksIGN0eCkge1xuICAgICAgICBjb25zdCB3aWRnZXRNaWRkbGVzID0gW107XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKCh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIGlmICh3aWRnZXRba2V5XSkge1xuICAgICAgICAgICAgICAgIHdpZGdldE1pZGRsZXMucHVzaCh3aWRnZXRba2V5XS5iaW5kKHdpZGdldCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g6Jm954S26K6+6K6h5pyJ6L+U5Zue5YC877yM5L2G5piv5bm25LiN5YWz5b+D5Zug5q2k5LiN5aSE55CGXG4gICAgICAgIFV0aWwuY29tcG9zZShbXG4gICAgICAgICAgICAuLi50aGlzLnBsdWdpbnMuZmlsdGVyKChwKSA9PiBwW2tleV0pLm1hcCgocCkgPT4gcFtrZXldKSxcbiAgICAgICAgICAgIC4uLndpZGdldE1pZGRsZXMsXG4gICAgICAgIF0pKGN0eCk7XG4gICAgfVxuICAgIC8vIOm8oOagh+S4i+WOi+S6i+S7tlxuICAgIF9oYW5kbGVNb3VzZURvd24oZSkge1xuICAgICAgICBsZXQgcG9pbnRlciA9IFV0aWwuZ2V0UG9pbnRlcihlLCB0aGlzLnRvcENhbnZhcywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGVDb21wb3NlKFwibW91c2VEb3duXCIsIHsgZSwgcG9pbnRlciwgcm9jb2NvMmQ6IHRoaXMgfSk7XG4gICAgICAgIFV0aWwuYWRkTGlzdGVuZXIoZG9jdW1lbnQsIFwibW91c2V1cFwiLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICAgICAgLy8g5rOo6ZSA5Lqk5LqS5bGCIGNhbnZhcyDnmoTnm5HlkKzkuovku7bvvIzms6jlhozmlbTkuKrpobXpnaLnmoTkuovku7bvvIzkv53or4HpvKDmoIfnp7vliqjliLDlsY/luZXlpJbml7YgbW92ZSDkuovku7bkvp3ml6fmiafooYxcbiAgICAgICAgVXRpbC5hZGRMaXN0ZW5lcihkb2N1bWVudCwgXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgVXRpbC5yZW1vdmVMaXN0ZW5lcih0aGlzLnRvcENhbnZhcywgXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcbiAgICB9XG4gICAgLy8g6byg5qCH56e75Yqo5LqL5Lu2XG4gICAgX2hhbmRsZU1vdXNlTW92ZShlKSB7XG4gICAgICAgIGxldCBwb2ludGVyID0gVXRpbC5nZXRQb2ludGVyKGUsIHRoaXMudG9wQ2FudmFzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZUNvbXBvc2UoXCJtb3VzZU1vdmVcIiwgeyBlLCBwb2ludGVyLCByb2NvY28yZDogdGhpcyB9KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyDpvKDmoIfmlL7lvIDkuovku7ZcbiAgICBfaGFuZGxlTW91c2VVcChlKSB7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGVDb21wb3NlKFwibW91c2VVcFwiLCB7IGUsIHJvY29jbzJkOiB0aGlzIH0pO1xuICAgICAgICBVdGlsLnJlbW92ZUxpc3RlbmVyKGRvY3VtZW50LCBcIm1vdXNldXBcIiwgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgICAgIC8vIOazqOmUgOaVtOS4qumhtemdoueahOS6i+S7tu+8jOmAgOWbnuWIsOWPquacieS6pOS6kuWxgiBjYW52YXMg5LqL5Lu26Iiw6ImH77yM5Y+q5ZyoIGNhbnZhcyDlhoXmiafooYwgbW92ZSDkuovku7ZcbiAgICAgICAgVXRpbC5yZW1vdmVMaXN0ZW5lcihkb2N1bWVudCwgXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgVXRpbC5hZGRMaXN0ZW5lcih0aGlzLnRvcENhbnZhcywgXCJtb3VzZW1vdmVcIiwgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcbiAgICB9XG4gICAgLy8g6byg5qCH5rua6L2u5LqL5Lu2XG4gICAgX2hhbmRsZU1vdXNlV2hlZWwoZSkge1xuICAgICAgICBsZXQgcG9pbnRlciA9IFV0aWwuZ2V0UG9pbnRlcihlLCB0aGlzLnRvcENhbnZhcywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGVDb21wb3NlKFwibW91c2VXaGVlbFwiLCB7IGUsIHBvaW50ZXIsIHJvY29jbzJkOiB0aGlzIH0pO1xuICAgIH1cbiAgICAvLyDnqpflj6PnvKnmlL7kuovku7ZcbiAgICBfaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgICAgICAvLyBUT0RPOiDmiafooYzmtIvokbHku7vliqHmqKHlnotcbiAgICAgICAgLy8gdGhpcy5fZXhlY3V0ZUNvbXBvc2UoXCJcIiwge2NhbnZhczogdGhpc30pXG4gICAgICAgIHRoaXMuY2FsY09mZnNldCgpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiDlr7nosaHmk43kvZxcbiAgICBzZXRBY3RpdmVPYmplY3Qob2JqZWN0LCBlKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVTaGFwZSkge1xuICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmN5pyJ5r+A5rS754mp5L2TXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVTaGFwZS5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZVNoYXBlID0gb2JqZWN0O1xuICAgICAgICBvYmplY3Quc2V0QWN0aXZlKHRydWUpO1xuICAgICAgICB0aGlzLnJlbmRlckFsbCgpO1xuICAgICAgICAvLyB0aGlzLmVtaXQoJ29iamVjdDpzZWxlY3RlZCcsIHsgdGFyZ2V0OiBvYmplY3QsIGUgfSk7XG4gICAgICAgIC8vIG9iamVjdC5lbWl0KCdzZWxlY3RlZCcsIHsgZSB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOiOt+WPluW9k+WJjemAieS4reeahOWFg+e0oFxuICAgIGdldEFjdGl2ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNoYXBlO1xuICAgIH1cbiAgICAvKiog5L2/5omA5pyJ5YWD57Sg5aSx5rS777yM5bm26Kem5Y+R55u45bqU5LqL5Lu2ICovXG4gICAgZGVhY3RpdmF0ZUFsbFdpdGhEaXNwYXRjaCgpIHtcbiAgICAgICAgLy8gbGV0IGFjdGl2ZU9iamVjdCA9IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKSB8fCB0aGlzLmdldEFjdGl2ZU9iamVjdCgpO1xuICAgICAgICAvLyBpZiAoYWN0aXZlT2JqZWN0KSB7XG4gICAgICAgIC8vICAgICB0aGlzLmVtaXQoJ2JlZm9yZTpzZWxlY3Rpb246Y2xlYXJlZCcsIHsgdGFyZ2V0OiBhY3RpdmVPYmplY3QgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gICAgICAgIC8vIGlmIChhY3RpdmVPYmplY3QpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZW1pdCgnc2VsZWN0aW9uOmNsZWFyZWQnKTtcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOWwhuaJgOacieeJqeS9k+iuvue9ruaIkOacqua/gOa0u+aAgSAqL1xuICAgIGRlYWN0aXZhdGVBbGwoKSB7XG4gICAgICAgIGxldCBhbGxPYmplY3RzID0gdGhpcy5fc2hhcGVzLCBpID0gMCwgbGVuID0gYWxsT2JqZWN0cy5sZW5ndGg7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGFsbE9iamVjdHNbaV0uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc2NhcmRBY3RpdmVHcm91cCgpO1xuICAgICAgICB0aGlzLmRpc2NhcmRBY3RpdmVPYmplY3QoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlc2V0T2JqZWN0VHJhbnNmb3JtKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuc2NhbGVYID0gMTtcbiAgICAgICAgdGFyZ2V0LnNjYWxlWSA9IDE7XG4gICAgICAgIHRhcmdldC5zZXRBbmdsZSgwKTtcbiAgICB9XG4gICAgLyoqIOa4heepuuaJgOaciea/gOa0u+eJqeS9kyAqL1xuICAgIGRpc2NhcmRBY3RpdmVPYmplY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVTaGFwZSkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlU2hhcGUuc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hY3RpdmVTaGFwZSA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiog5bmz56e75b2T5YmN6YCJ5Lit54mp5L2T77yM5rOo5oSP6L+Z6YeM5oiR5Lus5rKh5pyJ55SoICs9ICovXG4gICAgdHJhbnNsYXRlT2JqZWN0KHgsIHkpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2N1cnJlbnRUcmFuc2Zvcm0udGFyZ2V0O1xuICAgICAgICB0YXJnZXQuc2V0KFwibGVmdFwiLCB4IC0gdGhpcy5fY3VycmVudFRyYW5zZm9ybS5vZmZzZXRYKTtcbiAgICAgICAgdGFyZ2V0LnNldChcInRvcFwiLCB5IC0gdGhpcy5fY3VycmVudFRyYW5zZm9ybS5vZmZzZXRZKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57yp5pS+5b2T5YmN6YCJ5Lit54mp5L2TXG4gICAgICogQHBhcmFtIHgg6byg5qCH54K5IHhcbiAgICAgKiBAcGFyYW0geSDpvKDmoIfngrkgeVxuICAgICAqIEBwYXJhbSBieSDmmK/lkKbnrYnmr5TnvKnmlL7vvIx4IHwgeSB8IGVxdWFsbHlcbiAgICAgKi9cbiAgICBzY2FsZU9iamVjdCh4LCB5LCBieSA9IFwiZXF1YWxseVwiKSB7XG4gICAgICAgIGxldCB0ID0gdGhpcy5fY3VycmVudFRyYW5zZm9ybSwgdGFyZ2V0ID0gdC50YXJnZXQ7XG4gICAgICAgIC8vIOe8qeaUvuWfuueCue+8muavlOWmguaLluaLveWPs+i+ueS4remXtOeahOaOp+WItueCue+8jOWFtuWunuaIkeS7rOWPguiAg+eahOWPmOaNouWfuueCueaYr+W3pui+ueS4remXtOeahOaOp+WItueCuVxuICAgICAgICBsZXQgY29uc3RyYWludFBvc2l0aW9uID0gdGFyZ2V0LnRyYW5zbGF0ZVRvT3JpZ2luUG9pbnQodGFyZ2V0LmdldENlbnRlclBvaW50KCksIHQub3JpZ2luWCwgdC5vcmlnaW5ZKTtcbiAgICAgICAgLy8g5Lul54mp5L2T5Y+Y5o2i5Lit5b+D5Li65Y6f54K555qE6byg5qCH54K55Z2Q5qCH5YC8XG4gICAgICAgIGxldCBsb2NhbE1vdXNlID0gdGFyZ2V0LnRvTG9jYWxQb2ludChuZXcgUG9pbnQoeCwgeSksIHQub3JpZ2luWCwgdC5vcmlnaW5ZKTtcbiAgICAgICAgaWYgKHQub3JpZ2luWCA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICBsb2NhbE1vdXNlLnggKj0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodC5vcmlnaW5YID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgICAgICBsb2NhbE1vdXNlLnggKj0gdC5tb3VzZVhTaWduICogMjtcbiAgICAgICAgICAgIGlmIChsb2NhbE1vdXNlLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgdC5tb3VzZVhTaWduID0gLXQubW91c2VYU2lnbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodC5vcmlnaW5ZID09PSBcImJvdHRvbVwiKSB7XG4gICAgICAgICAgICBsb2NhbE1vdXNlLnkgKj0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodC5vcmlnaW5ZID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgICAgICBsb2NhbE1vdXNlLnkgKj0gdC5tb3VzZVlTaWduICogMjtcbiAgICAgICAgICAgIGlmIChsb2NhbE1vdXNlLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgdC5tb3VzZVlTaWduID0gLXQubW91c2VZU2lnbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpfmlrDnmoTnvKnmlL7lgLzvvIzku6Xlj5jmjaLkuK3lv4PkuLrljp/ngrnvvIzmoLnmja7mnKzlnLDpvKDmoIflnZDmoIfngrkv5Y6f5aeL5a695bqm6L+b6KGM6K6h566X77yM6YeN5paw6K6+5a6a54mp5L2T57yp5pS+5YC8XG4gICAgICAgIGxldCBuZXdTY2FsZVggPSB0YXJnZXQuc2NhbGVYLCBuZXdTY2FsZVkgPSB0YXJnZXQuc2NhbGVZO1xuICAgICAgICBpZiAoYnkgPT09IFwiZXF1YWxseVwiKSB7XG4gICAgICAgICAgICBsZXQgZGlzdCA9IGxvY2FsTW91c2UueSArIGxvY2FsTW91c2UueDtcbiAgICAgICAgICAgIGxldCBsYXN0RGlzdCA9IHRhcmdldC5oZWlnaHQgKiB0Lm9yaWdpbmFsLnNjYWxlWSArXG4gICAgICAgICAgICAgICAgdGFyZ2V0LndpZHRoICogdC5vcmlnaW5hbC5zY2FsZVggK1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYWRkaW5nICogMiAtXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0cm9rZVdpZHRoICogMiArXG4gICAgICAgICAgICAgICAgMTsgLyogYWRkaXRpb25hbCBvZmZzZXQgbmVlZGVkIHByb2JhYmx5IGR1ZSB0byBzdWJwaXhlbCByZW5kZXJpbmcsIGFuZCBhdm9pZHMgamVyayB3aGVuIHNjYWxpbmcgYW4gb2JqZWN0ICovXG4gICAgICAgICAgICAvLyBXZSB1c2UgdC5zY2FsZVgvWSBpbnN0ZWFkIG9mIHRhcmdldC5zY2FsZVgvWSBiZWNhdXNlIHRoZSBvYmplY3QgbWF5IGhhdmUgYSBtaW4gc2NhbGUgYW5kIHdlJ2xsIGxvb3NlIHRoZSBwcm9wb3J0aW9uc1xuICAgICAgICAgICAgbmV3U2NhbGVYID0gKHQub3JpZ2luYWwuc2NhbGVYICogZGlzdCkgLyBsYXN0RGlzdDtcbiAgICAgICAgICAgIG5ld1NjYWxlWSA9ICh0Lm9yaWdpbmFsLnNjYWxlWSAqIGRpc3QpIC8gbGFzdERpc3Q7XG4gICAgICAgICAgICB0YXJnZXQuc2V0KFwic2NhbGVYXCIsIG5ld1NjYWxlWCk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0KFwic2NhbGVZXCIsIG5ld1NjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWJ5KSB7XG4gICAgICAgICAgICBuZXdTY2FsZVggPSBsb2NhbE1vdXNlLnggLyAodGFyZ2V0LndpZHRoICsgdGFyZ2V0LnBhZGRpbmcpO1xuICAgICAgICAgICAgbmV3U2NhbGVZID0gbG9jYWxNb3VzZS55IC8gKHRhcmdldC5oZWlnaHQgKyB0YXJnZXQucGFkZGluZyk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0KFwic2NhbGVYXCIsIG5ld1NjYWxlWCk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0KFwic2NhbGVZXCIsIG5ld1NjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYnkgPT09IFwieFwiKSB7XG4gICAgICAgICAgICBuZXdTY2FsZVggPSBsb2NhbE1vdXNlLnggLyAodGFyZ2V0LndpZHRoICsgdGFyZ2V0LnBhZGRpbmcpO1xuICAgICAgICAgICAgdGFyZ2V0LnNldChcInNjYWxlWFwiLCBuZXdTY2FsZVgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJ5ID09PSBcInlcIikge1xuICAgICAgICAgICAgbmV3U2NhbGVZID0gbG9jYWxNb3VzZS55IC8gKHRhcmdldC5oZWlnaHQgKyB0YXJnZXQucGFkZGluZyk7XG4gICAgICAgICAgICB0YXJnZXQuc2V0KFwic2NhbGVZXCIsIG5ld1NjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5aaC5p6c5piv5Y+N5ZCR5ouJ5Ly4IHhcbiAgICAgICAgaWYgKG5ld1NjYWxlWCA8IDApIHtcbiAgICAgICAgICAgIGlmICh0Lm9yaWdpblggPT09IFwibGVmdFwiKVxuICAgICAgICAgICAgICAgIHQub3JpZ2luWCA9IFwicmlnaHRcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHQub3JpZ2luWCA9PT0gXCJyaWdodFwiKVxuICAgICAgICAgICAgICAgIHQub3JpZ2luWCA9IFwibGVmdFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWmguaenOaYr+WPjeWQkeaLieS8uCB5XG4gICAgICAgIGlmIChuZXdTY2FsZVkgPCAwKSB7XG4gICAgICAgICAgICBpZiAodC5vcmlnaW5ZID09PSBcInRvcFwiKVxuICAgICAgICAgICAgICAgIHQub3JpZ2luWSA9IFwiYm90dG9tXCI7XG4gICAgICAgICAgICBlbHNlIGlmICh0Lm9yaWdpblkgPT09IFwiYm90dG9tXCIpXG4gICAgICAgICAgICAgICAgdC5vcmlnaW5ZID0gXCJ0b3BcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyDnvKnmlL7kvJrmlLnlj5jniankvZPkvY3nva7vvIzmiYDku6XopoHph43mlrDorr7nva5cbiAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uQnlPcmlnaW4oY29uc3RyYWludFBvc2l0aW9uLCB0Lm9yaWdpblgsIHQub3JpZ2luWSk7XG4gICAgfVxuICAgIC8qKiDml4vovazlvZPliY3pgInkuK3niankvZPvvIzov5nph4znlKjnmoTmmK8gKz0gKi9cbiAgICByb3RhdGVPYmplY3QoeCwgeSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5fY3VycmVudFRyYW5zZm9ybTtcbiAgICAgICAgLy8g6byg5qCH5oyJ5LiL55qE54K55LiO54mp5L2T5Lit5b+D54K56L+e57q/5ZKMIHgg6L205q2j5pa55ZCR5b2i5oiQ55qE5byn5bqmXG4gICAgICAgIGNvbnN0IGxhc3RBbmdsZSA9IE1hdGguYXRhbjIodC5leSAtIHQudG9wLCB0LmV4IC0gdC5sZWZ0KTtcbiAgICAgICAgLy8g6byg5qCH5ouW5ou955qE57uI54K55LiO54mp5L2T5Lit5b+D54K56L+e57q/5ZKMIHgg6L205q2j5pa55ZCR5b2i5oiQ55qE5byn5bqmXG4gICAgICAgIGNvbnN0IGN1ckFuZ2xlID0gTWF0aC5hdGFuMih5IC0gdC50b3AsIHggLSB0LmxlZnQpO1xuICAgICAgICBsZXQgYW5nbGUgPSBVdGlsLnJhZGlhbnNUb0RlZ3JlZXMoY3VyQW5nbGUgLSBsYXN0QW5nbGUgKyB0LnRoZXRhKTsgLy8g5paw55qE6KeS5bqmID0g5Y+Y5o2i55qE6KeS5bqmICsg5Y6f5p2l55qE6KeS5bqmXG4gICAgICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gMzYwICsgYW5nbGU7XG4gICAgICAgIH1cbiAgICAgICAgYW5nbGUgPSBhbmdsZSAlIDM2MDtcbiAgICAgICAgdC50YXJnZXQuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5ouW6JOd6YCJ5Yy65YyF5Zu055qE5YWD57SgXG4gICAgICog5Y+v6IO95Y+q5pyJ5LiA5Liq54mp5L2T77yM6YKj5bCx5piv5pmu6YCa55qE54K56YCJXG4gICAgICog5aaC5p6c5pyJ5aSa5Liq54mp5L2T77yM6YKj5bCx55Sf5oiQ5LiA5Liq57uEXG4gICAgICovXG4gICAgZmluZFNlbGVjdGVkT2JqZWN0cyhlKSB7XG4gICAgICAgIGxldCBvYmplY3RzID0gW10sIC8vIOWtmOWCqOacgOe7iOahhumAieeahOWFg+e0oFxuICAgICAgICB4MSA9IHRoaXMuX2dyb3VwU2VsZWN0b3IuZXgsIHkxID0gdGhpcy5fZ3JvdXBTZWxlY3Rvci5leSwgeDIgPSB4MSArIHRoaXMuX2dyb3VwU2VsZWN0b3IubGVmdCwgeTIgPSB5MSArIHRoaXMuX2dyb3VwU2VsZWN0b3IudG9wLCBzZWxlY3Rpb25YMVkxID0gbmV3IFBvaW50KE1hdGgubWluKHgxLCB4MiksIE1hdGgubWluKHkxLCB5MikpLCBzZWxlY3Rpb25YMlkyID0gbmV3IFBvaW50KE1hdGgubWF4KHgxLCB4MiksIE1hdGgubWF4KHkxLCB5MikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fc2hhcGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMuX3NoYXBlc1tpXTtcbiAgICAgICAgICAgIGlmICghY3VycmVudE9iamVjdClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIOeJqeS9k+aYr+WQpuS4juaLluiTnemAieWMuuebuOS6pOaIluiAheiiq+mAieWMuuWMheWQq1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QuaW50ZXJzZWN0c1dpdGhSZWN0KHNlbGVjdGlvblgxWTEsIHNlbGVjdGlvblgyWTIpIHx8XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC5pc0NvbnRhaW5lZFdpdGhpblJlY3Qoc2VsZWN0aW9uWDFZMSwgc2VsZWN0aW9uWDJZMikpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnNldEFjdGl2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2goY3VycmVudE9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9iamVjdChvYmplY3RzWzBdLCBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwID0gbmV3IEdyb3VwKG9iamVjdHMpO1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVHcm91cChuZXdHcm91cCk7XG4gICAgICAgICAgICAvLyBuZXdHcm91cC5zYXZlQ29vcmRzKCk7XG4gICAgICAgICAgICAvLyB0aGlzLmVtaXQoJ3NlbGVjdGlvbjpjcmVhdGVkJywgeyB0YXJnZXQ6IG5ld0dyb3VwIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyQWxsKCk7XG4gICAgfSAvKiog6K6w5b2V5b2T5YmN54mp5L2T55qE5Y+Y5o2i54q25oCBICovXG4gICAgc2V0dXBDdXJyZW50VHJhbnNmb3JtKGUsIHRhcmdldCkge1xuICAgICAgICBsZXQgYWN0aW9uID0gXCJkcmFnXCIsIGNvcm5lciwgcG9pbnRlciA9IFV0aWwuZ2V0UG9pbnRlcihlLCB0YXJnZXQuY2FudmFzLnRvcENhbnZhcywgdGhpcyk7XG4gICAgICAgIGNvcm5lciA9IHRhcmdldC5fZmluZFRhcmdldENvcm5lcihlKTtcbiAgICAgICAgaWYgKGNvcm5lcikge1xuICAgICAgICAgICAgLy8g5qC55o2u54K55Ye755qE5o6n5Yi254K55Yik5pat5q2k5qyh5pON5L2c5piv5LuA5LmIXG4gICAgICAgICAgICBhY3Rpb24gPVxuICAgICAgICAgICAgICAgIGNvcm5lciA9PT0gXCJtbFwiIHx8IGNvcm5lciA9PT0gXCJtclwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJzY2FsZVhcIlxuICAgICAgICAgICAgICAgICAgICA6IGNvcm5lciA9PT0gXCJtdFwiIHx8IGNvcm5lciA9PT0gXCJtYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwic2NhbGVZXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogY29ybmVyID09PSBcIm10clwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJvdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInNjYWxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yaWdpblggPSBcImNlbnRlclwiLCBvcmlnaW5ZID0gXCJjZW50ZXJcIjtcbiAgICAgICAgaWYgKGNvcm5lciA9PT0gXCJtbFwiIHx8IGNvcm5lciA9PT0gXCJ0bFwiIHx8IGNvcm5lciA9PT0gXCJibFwiKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzngrnlh7vnmoTmmK/lt6bovrnnmoTmjqfliLbngrnvvIzliJnlj5jmjaLln7rngrnlsLHmmK/lj7PovrnvvIzku6Xlj7PovrnkuLrln7rlh4blkJHlt6blj5jmjaJcbiAgICAgICAgICAgIG9yaWdpblggPSBcInJpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29ybmVyID09PSBcIm1yXCIgfHwgY29ybmVyID09PSBcInRyXCIgfHwgY29ybmVyID09PSBcImJyXCIpIHtcbiAgICAgICAgICAgIG9yaWdpblggPSBcImxlZnRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ybmVyID09PSBcInRsXCIgfHwgY29ybmVyID09PSBcIm10XCIgfHwgY29ybmVyID09PSBcInRyXCIpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOeCueWHu+eahOaYr+S4iuaWueeahOaOp+WItueCue+8jOWImeWPmOaNouWfuueCueWwseaYr+W6lemDqO+8jOS7peW6lei+ueS4uuWfuuWHhuWQkeS4iuWPmOaNolxuICAgICAgICAgICAgb3JpZ2luWSA9IFwiYm90dG9tXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29ybmVyID09PSBcImJsXCIgfHwgY29ybmVyID09PSBcIm1iXCIgfHwgY29ybmVyID09PSBcImJyXCIpIHtcbiAgICAgICAgICAgIG9yaWdpblkgPSBcInRvcFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3JuZXIgPT09IFwibXRyXCIpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOaYr+aXi+i9rOaTjeS9nO+8jOWImeWfuueCueWwseaYr+S4reW/g+eCuVxuICAgICAgICAgICAgb3JpZ2luWCA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBvcmlnaW5ZID0gXCJjZW50ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsZXQgY2VudGVyID0gdGFyZ2V0LmdldENlbnRlclBvaW50KCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUcmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgICBzY2FsZVg6IHRhcmdldC5zY2FsZVgsXG4gICAgICAgICAgICBzY2FsZVk6IHRhcmdldC5zY2FsZVksXG4gICAgICAgICAgICBvZmZzZXRYOiBwb2ludGVyLnggLSB0YXJnZXQubGVmdCxcbiAgICAgICAgICAgIG9mZnNldFk6IHBvaW50ZXIueSAtIHRhcmdldC50b3AsXG4gICAgICAgICAgICBvcmlnaW5YLFxuICAgICAgICAgICAgb3JpZ2luWSxcbiAgICAgICAgICAgIGV4OiBwb2ludGVyLngsXG4gICAgICAgICAgICBleTogcG9pbnRlci55LFxuICAgICAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQsXG4gICAgICAgICAgICB0b3A6IHRhcmdldC50b3AsXG4gICAgICAgICAgICB0aGV0YTogVXRpbC5kZWdyZWVzVG9SYWRpYW5zKHRhcmdldC5hbmdsZSksXG4gICAgICAgICAgICB3aWR0aDogdGFyZ2V0LndpZHRoICogdGFyZ2V0LnNjYWxlWCxcbiAgICAgICAgICAgIG1vdXNlWFNpZ246IDEsXG4gICAgICAgICAgICBtb3VzZVlTaWduOiAxLFxuICAgICAgICB9O1xuICAgICAgICAvLyDorrDlvZXniankvZPljp/lp4vnmoQgb3JpZ2luYWwg5Y+Y5o2i5Y+C5pWwXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUcmFuc2Zvcm0ub3JpZ2luYWwgPSB7XG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXQubGVmdCxcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0LnRvcCxcbiAgICAgICAgICAgIHNjYWxlWDogdGFyZ2V0LnNjYWxlWCxcbiAgICAgICAgICAgIHNjYWxlWTogdGFyZ2V0LnNjYWxlWSxcbiAgICAgICAgICAgIG9yaWdpblgsXG4gICAgICAgICAgICBvcmlnaW5ZLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgX2EgPSB0aGlzLl9jdXJyZW50VHJhbnNmb3JtLCB7IHRhcmdldDogdGFyZ2V0MiB9ID0gX2EsIG90aGVyID0gX19yZXN0KF9hLCBbXCJ0YXJnZXRcIl0pO1xuICAgICAgICAvLyB0aGlzLnJlc2V0Q3VycmVudFRyYW5zZm9ybShlKTsgLy8g5aW95YOP5rKh5b+F6KaB6YeN5paw6LWL5YC877yf6Zmk6Z2e5oyJ5LiL5LqGIGFsdEtleSDplK5cbiAgICB9XG4gICAgLyoqIOmHjee9ruW9k+WJjSB0cmFuc2Zvcm0g54q25oCB5Li6IG9yaWdpbmFs77yM5bm26K6+572uIHJlc2l6aW5nIOeahOWfuueCuSAqL1xuICAgIHJlc2V0Q3VycmVudFRyYW5zZm9ybShlKSB7XG4gICAgICAgIGxldCB0ID0gdGhpcy5fY3VycmVudFRyYW5zZm9ybTtcbiAgICAgICAgdC50YXJnZXQuc2V0KFwic2NhbGVYXCIsIHQub3JpZ2luYWwuc2NhbGVYKTtcbiAgICAgICAgdC50YXJnZXQuc2V0KFwic2NhbGVZXCIsIHQub3JpZ2luYWwuc2NhbGVZKTtcbiAgICAgICAgdC50YXJnZXQuc2V0KFwibGVmdFwiLCB0Lm9yaWdpbmFsLmxlZnQpO1xuICAgICAgICB0LnRhcmdldC5zZXQoXCJ0b3BcIiwgdC5vcmlnaW5hbC50b3ApO1xuICAgICAgICBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIGlmICh0Lm9yaWdpblggIT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodC5vcmlnaW5YID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5tb3VzZVhTaWduID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0Lm1vdXNlWFNpZ24gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0Lm9yaWdpblkgIT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodC5vcmlnaW5ZID09PSBcImJvdHRvbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHQubW91c2VZU2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdC5tb3VzZVlTaWduID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0Lm9yaWdpblggPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgdC5vcmlnaW5ZID0gXCJjZW50ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHQub3JpZ2luWCA9IHQub3JpZ2luYWwub3JpZ2luWDtcbiAgICAgICAgICAgIHQub3JpZ2luWSA9IHQub3JpZ2luYWwub3JpZ2luWTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiDnu4Tmk43kvZxcbiAgICBnZXRBY3RpdmVHcm91cCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUdyb3VwO1xuICAgIH1cbiAgICBzZXRBY3RpdmVHcm91cChncm91cCkge1xuICAgICAgICB0aGlzLl9hY3RpdmVHcm91cCA9IGdyb3VwO1xuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGdyb3VwLmNhbnZhcyA9IHRoaXM7XG4gICAgICAgICAgICBncm91cC5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDlsIblvZPliY3pgInkuK3nu4TlpLHmtLsgKi9cbiAgICBkaXNjYXJkQWN0aXZlR3JvdXAoKSB7XG4gICAgICAgIGxldCBnID0gdGhpcy5nZXRBY3RpdmVHcm91cCgpO1xuICAgICAgICBpZiAoZylcbiAgICAgICAgICAgIGcuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVHcm91cChudWxsKTtcbiAgICB9XG4gICAgLyoqIOaYr+WQpuimgeWkhOeQhue7hOeahOmAu+i+kSAqL1xuICAgIHNob3VsZEhhbmRsZUdyb3VwTG9naWMoZSwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBhY3RpdmVPYmplY3QgPSB0aGlzLl9hY3RpdmVTaGFwZTtcbiAgICAgICAgcmV0dXJuIChlLnNoaWZ0S2V5ICYmXG4gICAgICAgICAgICAodGhpcy5nZXRBY3RpdmVHcm91cCgpIHx8IChhY3RpdmVPYmplY3QgJiYgYWN0aXZlT2JqZWN0ICE9PSB0YXJnZXQpKSk7XG4gICAgfVxuICAgIGhhbmRsZUdyb3VwTG9naWMoZSwgdGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKSkge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBhIGdyb3VwLCBmaW5kIHRhcmdldCBhZ2FpbiwgdGhpcyB0aW1lIHNraXBwaW5nIGdyb3VwXG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzLmZpbmRUYXJnZXQoZSwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBpZiBldmVuIG9iamVjdCBpcyBub3QgZm91bmQsIGJhaWwgb3V0XG4gICAgICAgICAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQuaXNUeXBlKFwiZ3JvdXBcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFjdGl2ZUdyb3VwID0gdGhpcy5nZXRBY3RpdmVHcm91cCgpO1xuICAgICAgICBpZiAoYWN0aXZlR3JvdXApIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmVHcm91cC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlR3JvdXAucmVtb3ZlV2l0aFVwZGF0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPYmplY3RUcmFuc2Zvcm0oYWN0aXZlR3JvdXApO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVHcm91cC5zaXplKCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNjYXJkQWN0aXZlR3JvdXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVHcm91cC5hZGRXaXRoVXBkYXRlKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE9iamVjdFRyYW5zZm9ybShhY3RpdmVHcm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3RpdmVHcm91cC5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlU2hhcGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9PSB0aGlzLl9hY3RpdmVTaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAoW3RoaXMuX2FjdGl2ZVNoYXBlLCB0YXJnZXRdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVHcm91cChncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwID0gdGhpcy5nZXRBY3RpdmVHcm91cCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gI2VuZHJlZ2lvblxuICAgIC8vICNyZWdpb24g55S75biD5pON5L2cXG4gICAgLyoqIOa3u+WKoOWFg+e0oFxuICAgICAqIOebruWJjeeahOaooeW8j+aYr+iwg+eUqCBhZGQg5re75Yqg54mp5L2T55qE5pe25YCZ5bCx56uL6ams5riy5p+T77yMXG4gICAgICog5aaC5p6c5LiA5qyh5oCn5Yqg5YWl5aSn6YeP5YWD57Sg77yM5bCx5Lya5YGa5b6I5aSa5peg55So5Yqf77yMXG4gICAgICog5omA5Lul5Y+v5Lul5Yqg5LiA5Liq5bGe5oCn5p2l5YWI5om56YeP5re75Yqg5YWD57Sg77yM5pyA5ZCO5YaN5LiA5qyh5riy5p+T77yI5omL5Yqo6LCD55SoIHJlbmRlckFsbCDlh73mlbDljbPlj6/vvIlcbiAgICAgKi9cbiAgICBhZGQoLi4uYXJncykge1xuICAgICAgICB0aGlzLl9zaGFwZXMucHVzaC5hcHBseSh0aGlzLl9zaGFwZXMsIGFyZ3MpO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJncy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRPYmplY3QoYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJBbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOiuvue9riBjYW52YXMg55qE5a696auY5Lul5Y+K6LW35aeL54K5XG4gICAgX2FwcGx5Q2FudmFzU3R5bGUoZWwpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy53aWR0aCB8fCBlbC53aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuaGVpZ2h0IHx8IGVsLmhlaWdodDtcbiAgICAgICAgVXRpbC5zZXRTdHlsZShlbCwge1xuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCArIFwicHhcIixcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgXCJweFwiLFxuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdFwiOiAwLFxuICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICBlbC53aWR0aCA9IHdpZHRoO1xuICAgICAgICBlbC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIFV0aWwubWFrZUVsZW1lbnRVbnNlbGVjdGFibGUoZWwpO1xuICAgIH1cbiAgICAvKiog5aaC5p6c5b2T5YmN55qE54mp5L2T5Zyo5b2T5YmN55qE57uE5YaF77yM5YiZ6KaB6ICD6JmR5omj5Y6757uE55qEIHRvcOOAgWxlZnQg5YC8ICovXG4gICAgX25vcm1hbGl6ZVBvaW50ZXIob2JqZWN0LCBwb2ludGVyKSB7XG4gICAgICAgIGxldCBhY3RpdmVHcm91cCA9IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKSwgeCA9IHBvaW50ZXIueCwgeSA9IHBvaW50ZXIueTtcbiAgICAgICAgbGV0IGlzT2JqZWN0SW5Hcm91cCA9IGFjdGl2ZUdyb3VwICYmIG9iamVjdC50eXBlICE9PSBcImdyb3VwXCIgJiYgYWN0aXZlR3JvdXAuY29udGFpbnMob2JqZWN0KTtcbiAgICAgICAgaWYgKGlzT2JqZWN0SW5Hcm91cCkge1xuICAgICAgICAgICAgeCAtPSBhY3RpdmVHcm91cC5sZWZ0O1xuICAgICAgICAgICAgeSAtPSBhY3RpdmVHcm91cC50b3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgeCwgeSB9O1xuICAgIH1cbiAgICAvKiog5bCG5omA5pyJ54mp5L2T5YiG5oiQ5Lik5Liq57uE77yM5LiA57uE5piv5pyq5r+A5rS75oCB77yM5LiA57uE5piv5r+A5rS75oCB77yM54S25ZCO5bCG5r+A5rS757uE5pS+5Zyo5pyA5ZCO77yM6L+Z5qC35bCx6IO95aSf57uY5Yi25Yiw5pyA5LiK5bGCICovXG4gICAgX2Nob29zZU9iamVjdHNUb1JlbmRlcigpIHtcbiAgICAgICAgLy8g5b2T5YmN5pyJ5rKh5pyJ5r+A5rS755qE54mp5L2TXG4gICAgICAgIGxldCBhY3RpdmVPYmplY3QgPSB0aGlzLmdldEFjdGl2ZU9iamVjdCgpO1xuICAgICAgICAvLyDlvZPliY3mnInmsqHmnInmv4DmtLvnmoTnu4TvvIjkuZ/lsLHmmK/lpJrkuKrniankvZPvvIlcbiAgICAgICAgbGV0IGFjdGl2ZUdyb3VwID0gdGhpcy5nZXRBY3RpdmVHcm91cCgpO1xuICAgICAgICAvLyDmnIDnu4jopoHmuLLmn5PnmoTniankvZPpobrluo/vvIzkuZ/lsLHmmK/miormv4DmtLvnmoTniankvZPmlL7lnKjlkI7pnaLnu5jliLZcbiAgICAgICAgbGV0IG9ianNUb1JlbmRlciA9IFtdO1xuICAgICAgICBpZiAoYWN0aXZlR3JvdXApIHtcbiAgICAgICAgICAgIC8vIOWmguaenOmAieS4reWkmuS4queJqeS9k1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlR3JvdXBPYmplY3RzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gdGhpcy5fc2hhcGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMuX3NoYXBlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlR3JvdXAuY29udGFpbnMob2JqZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVHcm91cE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2Jqc1RvUmVuZGVyLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpzVG9SZW5kZXIucHVzaChhY3RpdmVHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aXZlT2JqZWN0KSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlj6rpgInkuK3kuIDkuKrniankvZNcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3NoYXBlcy5pbmRleE9mKGFjdGl2ZU9iamVjdCk7XG4gICAgICAgICAgICBvYmpzVG9SZW5kZXIgPSB0aGlzLl9zaGFwZXMuc2xpY2UoKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgb2Jqc1RvUmVuZGVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgb2Jqc1RvUmVuZGVyLnB1c2goYWN0aXZlT2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOaJgOacieeJqeS9k+mDveayoeiiq+mAieS4rVxuICAgICAgICAgICAgb2Jqc1RvUmVuZGVyID0gdGhpcy5fc2hhcGVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpzVG9SZW5kZXI7XG4gICAgfVxuICAgIF9kcmF3KGN0eCwgb2JqZWN0KSB7XG4gICAgICAgIGlmICghb2JqZWN0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvYmplY3QucmVuZGVyKGN0eCk7XG4gICAgfVxuICAgIHpvb20oaXNfbW91c2UgPSBmYWxzZSwgcG9pbnRlcikge1xuICAgICAgICAvLyDmmK/lkKblsYXkuK3mlL7lpKdcbiAgICAgICAgaWYgKCFpc19tb3VzZSkge1xuICAgICAgICAgICAgLy8gdGhpcy5fY2FudmFzT2Zmc2V0LmxlZnQgPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgICAgIC8vIHRoaXMuX2NhbnZhc09mZnNldC50b3AgPSB0aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNPZmZzZXQubGVmdCA9XG4gICAgICAgICAgICAgICAgcG9pbnRlci54IC1cbiAgICAgICAgICAgICAgICAgICAgKChwb2ludGVyLnggLSB0aGlzLl9jYW52YXNPZmZzZXQubGVmdCkgKiB0aGlzLnNjYWxlKSAvIHRoaXMucHJlU2NhbGU7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNPZmZzZXQudG9wID1cbiAgICAgICAgICAgICAgICBwb2ludGVyLnkgLVxuICAgICAgICAgICAgICAgICAgICAoKHBvaW50ZXIueSAtIHRoaXMuX2NhbnZhc09mZnNldC50b3ApICogdGhpcy5zY2FsZSkgLyB0aGlzLnByZVNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyQWxsKCk7XG4gICAgICAgIHRoaXMucHJlU2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIH1cbiAgICAvLyDmlL7lpKdcbiAgICB6b29tSW4oaXNfbW91c2UgPSBmYWxzZSwgcG9pbnRlciA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy5zY2FsZU1heCA+IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgKz0gdGhpcy5zY2FsZVN0ZXA7XG4gICAgICAgICAgICB0aGlzLnpvb20oaXNfbW91c2UsIHBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOe8qeWwj1xuICAgIHpvb21PdXQoaXNfbW91c2UgPSBmYWxzZSwgcG9pbnRlciA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy5zY2FsZU1pbiA8IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgLT0gdGhpcy5zY2FsZVN0ZXA7XG4gICAgICAgICAgICB0aGlzLnpvb20oaXNfbW91c2UsIHBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDliKDpmaTmiYDmnInniankvZPlkozmuIXnqbrnlLvluIMgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fc2hhcGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGlzY2FyZEFjdGl2ZUdyb3VwKCk7XG4gICAgICAgIHRoaXMuY2xlYXJDb250ZXh0KHRoaXMubUN0eCk7XG4gICAgICAgIHRoaXMuY2xlYXJDb250ZXh0KHRoaXMudEN0eCk7XG4gICAgICAgIHRoaXMucmVuZGVyQWxsKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjbGVhckNhbnZhcyhjYW52YXMpIHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgICBjbGVhckNvbnRleHQoY3R4KSB7XG4gICAgICAgIGN0eCAmJiBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiDojrflj5bnlLvluIPnmoTlgY/np7vph4/vvIzliLDml7borqHnrpfpvKDmoIfngrnlh7vkvY3nva7pnIDopoHnlKjliLAgKi9cbiAgICBjYWxjT2Zmc2V0KCkge1xuICAgICAgICAvLyBUT0RPOiDov5novrnnmoTlpJbpg6jlgY/np7vph4/orqHnrpfmnInngrnpl67pophcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gVXRpbC5nZXRFbGVtZW50T2Zmc2V0KHRoaXMubWFpbkNhbnZhcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiog5aSn6YOo5YiG5piv5ZyoIG1haW4tY2FudmFzIOS4iuWFiOeUu+acqua/gOa0u+eJqeS9k++8jOWGjeeUu+a/gOa0u+eJqeS9kyAqL1xuICAgIHJlbmRlckFsbCgpIHtcbiAgICAgICAgY29uc3QgY3R4cyA9IFt0aGlzLm1DdHgsIHRoaXMuY0N0eCAvKiogdGhpcy50Q3R4ICovXTtcbiAgICAgICAgaWYgKHRoaXMudEN0eCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNvbnRleHQodGhpcy50Q3R4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyQ29udGV4dCh0aGlzLm1DdHgpO1xuICAgICAgICBjdHhzLmZvckVhY2goKGMpID0+IGMuc2F2ZSgpKTtcbiAgICAgICAgY3R4cy5mb3JFYWNoKChjKSA9PiBjLnRyYW5zbGF0ZSh0aGlzLl9jYW52YXNPZmZzZXQubGVmdCwgdGhpcy5fY2FudmFzT2Zmc2V0LnRvcCkpO1xuICAgICAgICBjdHhzLmZvckVhY2goKGMpID0+IGMuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSkpO1xuICAgICAgICAvLyDlhYjnu5jliLbmnKrmv4DmtLvniankvZPvvIzlho3nu5jliLbmv4DmtLvniankvZNcbiAgICAgICAgY29uc3Qgc29ydGVkT2JqZWN0cyA9IHRoaXMuX2Nob29zZU9iamVjdHNUb1JlbmRlcigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc29ydGVkT2JqZWN0cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhdyh0aGlzLm1DdHgsIHNvcnRlZE9iamVjdHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGN0eHMuZm9yRWFjaCgoYykgPT4gYy5yZXN0b3JlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0UG9pbnRlcihlKSB7XG4gICAgICAgIGxldCBwb2ludGVyID0gVXRpbC5nZXRQb2ludGVyKGUsIHRoaXMudG9wQ2FudmFzLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvaW50ZXIueCxcbiAgICAgICAgICAgIHk6IHBvaW50ZXIueSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqIOajgOa1i+aYr+WQpuacieeJqeS9k+WcqOm8oOagh+S9jee9riAqL1xuICAgIGZpbmRUYXJnZXQoZSwgc2tpcEdyb3VwID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgLy8gbGV0IHBvaW50ZXIgPSB0aGlzLmdldFBvaW50ZXIoZSk7XG4gICAgICAgIC8vIOS8mOWFiOiAg+iZkeW9k+WJjee7hOS4reeahOeJqeS9k++8jOWboOS4uua/gOa0u+eahOeJqeS9k+iiq+mAieS4reeahOamgueOh+Wkp1xuICAgICAgICBsZXQgYWN0aXZlR3JvdXAgPSB0aGlzLmdldEFjdGl2ZUdyb3VwKCk7XG4gICAgICAgIGlmIChhY3RpdmVHcm91cCAmJiAhc2tpcEdyb3VwICYmIHRoaXMuY29udGFpbnNQb2ludChlLCBhY3RpdmVHcm91cCkpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGFjdGl2ZUdyb3VwO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICAvLyDpgY3ljobmiYDmnInniankvZPvvIzliKTmlq3pvKDmoIfngrnmmK/lkKblnKjniankvZPljIXlm7Tnm5LlhoVcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3NoYXBlcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaGFwZXNbaV0gJiYgdGhpcy5jb250YWluc1BvaW50KGUsIHRoaXMuX3NoYXBlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLl9zaGFwZXNbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldClcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIC8vIOWIpOaWrem8oOagh+eCueS9jeaYr+WQpuWtmOWcqOWbvuW9ouS4rVxuICAgIGNvbnRhaW5zUG9pbnQoZSwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBwb2ludGVyID0gdGhpcy5nZXRQb2ludGVyKGUpLCB4eSA9IHRoaXMuX25vcm1hbGl6ZVBvaW50ZXIodGFyZ2V0LCBwb2ludGVyKSwgeCA9IHh5LngsIHkgPSB4eS55O1xuICAgICAgICAvLyDkuIvpnaLov5nmmK/lj4LogIPmlofnjK7vvIzkuI3ov4flpb3lg4/miZPkuI3lvIBcbiAgICAgICAgLy8gaHR0cDovL3d3dy5nZW9nLnViYy5jYS9jb3Vyc2VzL2tsaW5rL2dpcy5ub3Rlcy9uY2dpYS91MzIuaHRtbFxuICAgICAgICAvLyBodHRwOi8vaWRhdi51Y2RhdmlzLmVkdS9+b2tyZXlsb3MvVEFzaGlwL1NwcmluZzIwMDAvUG9pbnRJblBvbHlnb24uaHRtbFxuICAgICAgICAvLyB3ZSBpdGVyYXRlIHRocm91Z2ggZWFjaCBvYmplY3QuIElmIHRhcmdldCBmb3VuZCwgcmV0dXJuIGl0LlxuICAgICAgICBsZXQgaUxpbmVzID0gdGFyZ2V0Ll9nZXRJbWFnZUxpbmVzKHRhcmdldC5vQ29vcmRzKSwgeHBvaW50cyA9IHRhcmdldC5fZmluZENyb3NzUG9pbnRzKHgsIHksIGlMaW5lcyk7XG4gICAgICAgIC8vIGlmIHhjb3VudCBpcyBvZGQgdGhlbiB3ZSBjbGlja2VkIGluc2lkZSB0aGUgb2JqZWN0XG4gICAgICAgIC8vIEZvciB0aGUgc3BlY2lmaWMgY2FzZSBvZiBzcXVhcmUgaW1hZ2VzIHhjb3VudCA9PT0gMSBpbiBhbGwgdHJ1ZSBjYXNlc1xuICAgICAgICBpZiAoKHhwb2ludHMgJiYgeHBvaW50cyAlIDIgPT09IDEpIHx8IHRhcmdldC5fZmluZFRhcmdldENvcm5lcihlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiDpobblsYLkuqTkupLlsYLmk43kvZxcbiAgICAvKiog5riy5p+TIHRvcC1jYW52YXPvvIzkuIDoiKznlKjkuo7muLLmn5Pmi5bok53lpJrpgInljLrln5/lkozmtoLpuKYgKi9cbiAgICByZW5kZXJUb3Aoc2hhcGVzKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRDdHg7XG4gICAgICAgIHRoaXMuY2xlYXJDb250ZXh0KGN0eCk7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSBVdGlsLmdldFNjcm9sbCh0aGlzLnRvcENhbnZhcyk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoc2Nyb2xsTGVmdCArIHRoaXMuX29mZnNldC5sZWZ0ICsgdGhpcy5fY2FudmFzT2Zmc2V0LmxlZnQsIHNjcm9sbFRvcCArIHRoaXMuX29mZnNldC50b3AgKyB0aGlzLl9jYW52YXNPZmZzZXQudG9wKTtcbiAgICAgICAgY3R4LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgICAvLyDnu5jliLbmi5bok53pgInljLpcbiAgICAgICAgaWYgKHRoaXMuX2dyb3VwU2VsZWN0b3IpXG4gICAgICAgICAgICB0aGlzLmRyYXdTZWxlY3Rpb24oKTtcbiAgICAgICAgLy8g57uY5Yi25q2j5Zyo57uY5Yi255qE5Zu+5b2iXG4gICAgICAgIGlmICh0aGlzLl9kcmF3aW5nU2hhcGUpXG4gICAgICAgICAgICB0aGlzLl9kcmF3KHRoaXMudEN0eCwgdGhpcy5fZHJhd2luZ1NoYXBlKTtcbiAgICAgICAgaWYgKHNoYXBlcylcbiAgICAgICAgICAgIHNoYXBlcy5mb3JFYWNoKChzaHApID0+IHRoaXMuX2RyYXcodGhpcy50Q3R4LCBzaHApKTtcbiAgICAgICAgLy8g5aaC5p6c5pyJ6YCJ5Lit54mp5L2TXG4gICAgICAgIC8vIGxldCBhY3RpdmVHcm91cCA9IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKTtcbiAgICAgICAgLy8gaWYgKGFjdGl2ZUdyb3VwKSBhY3RpdmVHcm91cC5yZW5kZXIoY3R4KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWZ0ZXI6cmVuZGVyXCIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIOe7mOWItuahhumAieWMuuWfnyAqL1xuICAgIGRyYXdTZWxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRDdHgsIGdyb3VwU2VsZWN0b3IgPSB0aGlzLl9ncm91cFNlbGVjdG9yLCBsZWZ0ID0gZ3JvdXBTZWxlY3Rvci5sZWZ0LCB0b3AgPSBncm91cFNlbGVjdG9yLnRvcCwgYWxlZnQgPSBNYXRoLmFicyhsZWZ0KSwgYXRvcCA9IE1hdGguYWJzKHRvcCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnNlbGVjdGlvbkNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QoZ3JvdXBTZWxlY3Rvci5leCAtIChsZWZ0ID4gMCA/IDAgOiAtbGVmdCksIGdyb3VwU2VsZWN0b3IuZXkgLSAodG9wID4gMCA/IDAgOiAtdG9wKSwgYWxlZnQsIGF0b3ApO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5zZWxlY3Rpb25MaW5lV2lkdGg7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc2VsZWN0aW9uQm9yZGVyQ29sb3I7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KGdyb3VwU2VsZWN0b3IuZXggKyBTVFJPS0VfT0ZGU0VUIC0gKGxlZnQgPiAwID8gMCA6IGFsZWZ0KSwgZ3JvdXBTZWxlY3Rvci5leSArIFNUUk9LRV9PRkZTRVQgLSAodG9wID4gMCA/IDAgOiBhdG9wKSwgYWxlZnQsIGF0b3ApO1xuICAgIH1cbiAgICAvKiog5piv5ZCm5piv5ouW6JOd5LqL5Lu277yM5Lmf5bCx5piv5rKh5pyJ54K56YCJ5Yiw54mp5L2TICovXG4gICAgc2hvdWxkQ2xlYXJTZWxlY3Rpb24oZSkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5maW5kVGFyZ2V0KGUpLCBhY3RpdmVHcm91cCA9IHRoaXMuZ2V0QWN0aXZlR3JvdXAoKTtcbiAgICAgICAgcmV0dXJuICghdGFyZ2V0IHx8XG4gICAgICAgICAgICAodGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgYWN0aXZlR3JvdXAgJiZcbiAgICAgICAgICAgICAgICAhYWN0aXZlR3JvdXAuY29udGFpbnModGFyZ2V0KSAmJlxuICAgICAgICAgICAgICAgIGFjdGl2ZUdyb3VwICE9PSB0YXJnZXQgJiZcbiAgICAgICAgICAgICAgICAhZS5zaGlmdEtleSkpO1xuICAgIH1cbiAgICAvLyAjZW5kcmVnaW9uXG4gICAgLy8gI3JlZ2lvbiDpvKDmoIfmoLflvI/nm7jlhbNcbiAgICAvKiog6K6+572u6byg5qCH5qC35byPICovXG4gICAgc2V0Q3Vyc29yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudG9wQ2FudmFzLnN0eWxlLmN1cnNvciA9IHZhbHVlO1xuICAgIH1cbiAgICAvKiog5qC55o2u6byg5qCH5L2N572u5p2l6K6+572u55u45bqU55qE6byg5qCH5qC35byPICovXG4gICAgc2V0Q3Vyc29yRnJvbUV2ZW50KGUsIHRhcmdldCkge1xuICAgICAgICBsZXQgcyA9IHRoaXMudG9wQ2FudmFzLnN0eWxlO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgYWN0aXZlR3JvdXAgPSB0aGlzLmdldEFjdGl2ZUdyb3VwKCk7XG4gICAgICAgICAgICBsZXQgY29ybmVyID0gKCFhY3RpdmVHcm91cCB8fCAhYWN0aXZlR3JvdXAuY29udGFpbnModGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQuX2ZpbmRUYXJnZXRDb3JuZXIoZSk7XG4gICAgICAgICAgICBpZiAoY29ybmVyKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyID0gY29ybmVyO1xuICAgICAgICAgICAgICAgIGlmIChjb3JuZXIgaW4gY3Vyc29yTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuY3Vyc29yID0gY3Vyc29yTWFwW2Nvcm5lcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvcm5lciA9PT0gXCJtdHJcIiAmJiB0YXJnZXQuaGFzUm90YXRpbmdQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBzLmN1cnNvciA9IEN1cnNvclN0eWxlLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy5jdXJzb3IgPSBDdXJzb3JTdHlsZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5jdXJzb3IgPSBDdXJzb3JTdHlsZS5ob3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcy5jdXJzb3IgPSBDdXJzb3JTdHlsZS5kZWZhdWx0O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi4vLi4vYmFzZS9zaGFwZVwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi9iYXNlL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgUm9jb2NvSW1hZ2UgZXh0ZW5kcyBTaGFwZSB7XG4gICAgLyoqIOm7mOiupOmAmui/hyBpbWcg5qCH562+5p2l57uY5Yi277yM5Zug5Li65pyA57uI6YO95piv6KaB6YCa6L+H6K+l5qCH562+57uY5Yi255qEICovXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJpbWFnZVwiO1xuICAgICAgICB0aGlzLl9pbml0RWxlbWVudChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB9XG4gICAgX2luaXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBzZXRFbGVtZW50KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2luaXRDb25maWcob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfaW5pdENvbmZpZyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9zZXRXaWR0aEhlaWdodChvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqIOiuvue9ruWbvuWDj+Wkp+WwjyAqL1xuICAgIF9zZXRXaWR0aEhlaWdodChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMud2lkdGggPVxuICAgICAgICAgICAgXCJ3aWR0aFwiIGluIG9wdGlvbnNcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMud2lkdGhcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RWxlbWVudCgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5nZXRFbGVtZW50KCkud2lkdGggfHwgMFxuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID1cbiAgICAgICAgICAgIFwiaGVpZ2h0XCIgaW4gb3B0aW9uc1xuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RWxlbWVudCgpXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5nZXRFbGVtZW50KCkuaGVpZ2h0IHx8IDBcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICB9XG4gICAgLyoqIOebtOaOpeiwg+eUqCBkcmF3SW1hZ2Ug57uY5Yi25Zu+5YOPICovXG4gICAgX3JlbmRlcihjdHgsIG5vVHJhbnNmb3JtID0gZmFsc2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgeCwgeTtcbiAgICAgICAgeCA9IG5vVHJhbnNmb3JtID8gdGhpcy5sZWZ0IDogLXRoaXMud2lkdGggLyAyO1xuICAgICAgICB5ID0gbm9UcmFuc2Zvcm0gPyB0aGlzLnRvcCA6IC10aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIGlmICgoX2EgPSB0aGlzLl9lbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29tcGxldGUpIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fZWxlbWVudCwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8g5b2T5Zu+54mH57Sg5p2Q5pyq5Yqg6L295a6M5q+V77yM5YWI57uY5Yi26aqo5p62XG4gICAgICAgICAgICBjb25zdCByeCA9IDIsIHJ5ID0gMiwgdyA9IHRoaXMud2lkdGgsIGggPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCArIHJ4LCB5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIHcgLSByeCwgeSk7XG4gICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgdywgeSwgeCArIHcsIHkgKyByeSwgeCArIHcsIHkgKyByeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyB3LCB5ICsgaCAtIHJ5KTtcbiAgICAgICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHggKyB3LCB5ICsgaCwgeCArIHcgLSByeCwgeSArIGgsIHggKyB3IC0gcngsIHkgKyBoKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIHJ4LCB5ICsgaCk7XG4gICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4LCB5ICsgaCwgeCwgeSArIGggLSByeSwgeCwgeSArIGggLSByeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHgsIHkgKyByeSk7XG4gICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4LCB5LCB4ICsgcngsIHksIHggKyByeCwgeSk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNlOGU4ZTg2MFwiO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzkwOTA5MDYwXCI7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9lbGVtZW50LCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOWmguaenOaYr+agueaNriB1cmwg5oiW6ICF5pys5Zyw6Lev5b6E5Yqg6L295Zu+5YOP77yM5pys6LSo6YO95piv5Y+W5Yqg6L295Zu+54mH5a6M5oiQ5LmL5ZCO5Zyo6L2s5oiQIGltZyDmoIfnrb4gKi9cbiAgICBzdGF0aWMgZnJvbVVSTCh1cmwsIGNhbGxiYWNrLCBpbWdPcHRpb25zKSB7XG4gICAgICAgIFV0aWwubG9hZEltYWdlKHVybCkudGhlbigoaW1nKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJlxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBSb2NvY29JbWFnZShpbWcsIGltZ09wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuUm9jb2NvSW1hZ2UuYXN5bmMgPSB0cnVlO1xuIiwiaW1wb3J0IHsgU2hhcGUgfSBmcm9tIFwiLi4vLi4vYmFzZS9zaGFwZVwiO1xuLyoqXG4gKiBQcm9kdWNlcyBhIGZ1bmN0aW9uIHRoYXQgY2FsY3VsYXRlcyBkaXN0YW5jZSBmcm9tIGNhbnZhcyBlZGdlIHRvIExpbmUgb3JpZ2luLlxuICovXG5mdW5jdGlvbiBtYWtlRWRnZVRvT3JpZ2luR2V0dGVyKHByb3BlcnR5TmFtZXMsIG9yaWdpblZhbHVlcykge1xuICAgIHZhciBvcmlnaW4gPSBwcm9wZXJ0eU5hbWVzLm9yaWdpbiwgYXhpczEgPSBwcm9wZXJ0eU5hbWVzLmF4aXMxLCBheGlzMiA9IHByb3BlcnR5TmFtZXMuYXhpczIsIGRpbWVuc2lvbiA9IHByb3BlcnR5TmFtZXMuZGltZW5zaW9uLCBuZWFyZXN0ID0gb3JpZ2luVmFsdWVzLm5lYXJlc3QsIGNlbnRlciA9IG9yaWdpblZhbHVlcy5jZW50ZXIsIGZhcnRoZXN0ID0gb3JpZ2luVmFsdWVzLmZhcnRoZXN0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXQob3JpZ2luKSkge1xuICAgICAgICAgICAgY2FzZSBuZWFyZXN0OlxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLmdldChheGlzMSksIHRoaXMuZ2V0KGF4aXMyKSk7XG4gICAgICAgICAgICBjYXNlIGNlbnRlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gKE1hdGgubWluKHRoaXMuZ2V0KGF4aXMxKSwgdGhpcy5nZXQoYXhpczIpKSArIDAuNSAqIHRoaXMuZ2V0KGRpbWVuc2lvbikpO1xuICAgICAgICAgICAgY2FzZSBmYXJ0aGVzdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5nZXQoYXhpczEpLCB0aGlzLmdldChheGlzMikpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKiDnur/nsbsgKi9cbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKHBvaW50cywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJsaW5lXCI7XG4gICAgICAgIHRoaXMueDEgPSAwO1xuICAgICAgICB0aGlzLnkxID0gMDtcbiAgICAgICAgdGhpcy54MiA9IDA7XG4gICAgICAgIHRoaXMueTIgPSAwO1xuICAgICAgICB0aGlzLmNvb3JkUHJvcHMgPSB7IHgxOiAxLCB4MjogMSwgeTE6IDEsIHkyOiAxIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGxlZnRUb09yaWdpblggRGlzdGFuY2UgZnJvbSBsZWZ0IGVkZ2Ugb2YgY2FudmFzIHRvIG9yaWdpblggb2YgTGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2dldExlZnRUb09yaWdpblggPSBtYWtlRWRnZVRvT3JpZ2luR2V0dGVyKHtcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IG5hbWVzXG4gICAgICAgICAgICBvcmlnaW46IFwib3JpZ2luWFwiLFxuICAgICAgICAgICAgYXhpczE6IFwieDFcIixcbiAgICAgICAgICAgIGF4aXMyOiBcIngyXCIsXG4gICAgICAgICAgICBkaW1lbnNpb246IFwid2lkdGhcIixcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gcG9zc2libGUgdmFsdWVzIG9mIG9yaWdpblxuICAgICAgICAgICAgbmVhcmVzdDogXCJsZWZ0XCIsXG4gICAgICAgICAgICBjZW50ZXI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICBmYXJ0aGVzdDogXCJyaWdodFwiLFxuICAgICAgICB9KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcn0gdG9wVG9PcmlnaW5ZIERpc3RhbmNlIGZyb20gdG9wIGVkZ2Ugb2YgY2FudmFzIHRvIG9yaWdpblkgb2YgTGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2dldFRvcFRvT3JpZ2luWSA9IG1ha2VFZGdlVG9PcmlnaW5HZXR0ZXIoe1xuICAgICAgICAgICAgLy8gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgICAgIG9yaWdpbjogXCJvcmlnaW5ZXCIsXG4gICAgICAgICAgICBheGlzMTogXCJ5MVwiLFxuICAgICAgICAgICAgYXhpczI6IFwieTJcIixcbiAgICAgICAgICAgIGRpbWVuc2lvbjogXCJoZWlnaHRcIixcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gcG9zc2libGUgdmFsdWVzIG9mIG9yaWdpblxuICAgICAgICAgICAgbmVhcmVzdDogXCJ0b3BcIixcbiAgICAgICAgICAgIGNlbnRlcjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGZhcnRoZXN0OiBcImJvdHRvbVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFwb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50cyA9IFswLCAwLCAwLCAwXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLngxID0gcG9pbnRzWzBdO1xuICAgICAgICB0aGlzLnkxID0gcG9pbnRzWzFdO1xuICAgICAgICB0aGlzLngyID0gcG9pbnRzWzJdO1xuICAgICAgICB0aGlzLnkyID0gcG9pbnRzWzNdO1xuICAgICAgICB0aGlzLl9zZXRXaWR0aEhlaWdodChvcHRpb25zKTtcbiAgICB9XG4gICAgc2V0RW5kKHgyLCB5Mikge1xuICAgICAgICB0aGlzLngyID0geDI7XG4gICAgICAgIHRoaXMueTIgPSB5MjtcbiAgICAgICAgdGhpcy53aWR0aCA9IE1hdGguYWJzKHRoaXMueDIgLSB0aGlzLngxKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBPcHRpb25zXG4gICAgICovXG4gICAgX3NldFdpZHRoSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgICAgdGhpcy53aWR0aCA9IE1hdGguYWJzKHRoaXMueDIgLSB0aGlzLngxKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLnkyIC0gdGhpcy55MSk7XG4gICAgICAgIHRoaXMubGVmdCA9IFwibGVmdFwiIGluIG9wdGlvbnMgPyBvcHRpb25zLmxlZnQgOiB0aGlzLl9nZXRMZWZ0VG9PcmlnaW5YKCk7XG4gICAgICAgIHRoaXMudG9wID0gXCJ0b3BcIiBpbiBvcHRpb25zID8gb3B0aW9ucy50b3AgOiB0aGlzLl9nZXRUb3BUb09yaWdpblkoKTtcbiAgICB9XG4gICAgX3JlbmRlcihjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB2YXIgcCA9IHRoaXMuY2FsY0xpbmVQb2ludHMoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwLngxLCBwLnkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyhwLngyLCBwLnkyKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMuc3Ryb2tlV2lkdGg7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlIHx8IGN0eC5maWxsU3R5bGU7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgdG9PYmplY3QocHJvcGVydGllc1RvSW5jbHVkZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci50b09iamVjdChwcm9wZXJ0aWVzVG9JbmNsdWRlKSwge1xuICAgICAgICAgICAgcng6IHRoaXMuZ2V0KFwicnhcIikgfHwgMCxcbiAgICAgICAgICAgIHJ5OiB0aGlzLmdldChcInJ5XCIpIHx8IDAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGFuIGhlbHBlciBmb3Igc3ZnIGltcG9ydC4gaXQgcmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBvYmplY3QgaW4gdGhlIHN2Z1xuICAgICAqIHVudHJhbnNmb3JtZWQgY29vcmRpbmF0ZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIHBvaW50IGZyb20gZWxlbWVudCBjb29yZGluYXRlc1xuICAgICAqL1xuICAgIF9maW5kQ2VudGVyRnJvbUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAodGhpcy54MSArIHRoaXMueDIpIC8gMixcbiAgICAgICAgICAgIHk6ICh0aGlzLnkxICsgdGhpcy55MikgLyAyLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNhbGN1bGF0ZXMgbGluZSBwb2ludHMgZ2l2ZW4gd2lkdGggYW5kIGhlaWdodFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2FsY0xpbmVQb2ludHMoKSB7XG4gICAgICAgIHZhciB4TXVsdCA9IHRoaXMueDEgPD0gdGhpcy54MiA/IC0xIDogMSwgeU11bHQgPSB0aGlzLnkxIDw9IHRoaXMueTIgPyAtMSA6IDEsIHgxID0geE11bHQgKiB0aGlzLndpZHRoICogMC41LCB5MSA9IHlNdWx0ICogdGhpcy5oZWlnaHQgKiAwLjUsIHgyID0geE11bHQgKiB0aGlzLndpZHRoICogLTAuNSwgeTIgPSB5TXVsdCAqIHRoaXMuaGVpZ2h0ICogLTAuNTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHgxOiB4MSxcbiAgICAgICAgICAgIHgyOiB4MixcbiAgICAgICAgICAgIHkxOiB5MSxcbiAgICAgICAgICAgIHkyOiB5MixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX3RvU1ZHKCkge1xuICAgICAgICB2YXIgcCA9IHRoaXMuY2FsY0xpbmVQb2ludHMoKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiPGxpbmUgXCIsXG4gICAgICAgICAgICBcIkNPTU1PTl9QQVJUU1wiLFxuICAgICAgICAgICAgJ3gxPVwiJyxcbiAgICAgICAgICAgIHAueDEsXG4gICAgICAgICAgICAnXCIgeTE9XCInLFxuICAgICAgICAgICAgcC55MSxcbiAgICAgICAgICAgICdcIiB4Mj1cIicsXG4gICAgICAgICAgICBwLngyLFxuICAgICAgICAgICAgJ1wiIHkyPVwiJyxcbiAgICAgICAgICAgIHAueTIsXG4gICAgICAgICAgICAnXCIgLz5cXG4nLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNoYXBlIH0gZnJvbSBcIi4uLy4uL2Jhc2Uvc2hhcGVcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vYmFzZS91dGlsc1wiO1xuLyoqIOi3r+W+hOexuyAqL1xuZXhwb3J0IGNsYXNzIFBhdGggZXh0ZW5kcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IocGF0aCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJwYXRoXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcnJheSBvZiBwYXRoIHBvaW50c1xuICAgICAgICAgKiBAdHlwZSBBcnJheVxuICAgICAgICAgKiBAZGVmYXVsdFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRoID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXRoT2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29vcmRQcm9wcyA9IHsgeDE6IDEsIHgyOiAxLCB5MTogMSwgeTI6IDEgfTtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5fc2V0UGF0aChwYXRoIHx8IFtdLCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSA9IHRoaXMuX2NhbGNEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMudG9wID0gdG9wO1xuICAgICAgICB0aGlzLnBhdGhPZmZzZXQgPSB7XG4gICAgICAgICAgICB4OiB3aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiBoZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvcCA9IG9wdGlvbnMudG9wO1xuICAgICAgICB0aGlzLmxlZnQgPSBvcHRpb25zLmxlZnQ7XG4gICAgfVxuICAgIF9zZXRQYXRoKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdGhpcy5wYXRoID0gVXRpbC5tYWtlUGF0aFNpbXBsZXIoXG4gICAgICAgIC8vICAgQXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGggOiBVdGlsLnBhcnNlUGF0aChwYXRoKVxuICAgICAgICAvLyApO1xuICAgICAgICAvLyBmYWJyaWMuUG9seWxpbmUucHJvdG90eXBlLl9zZXRQb3NpdGlvbkRpbWVuc2lvbnMuY2FsbCh0aGlzLCBvcHRpb25zIHx8IHt9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4IGNvbnRleHQgdG8gcmVuZGVyIHBhdGggb25cbiAgICAgKi9cbiAgICBfcmVuZGVyUGF0aENvbW1hbmRzKGN0eCkge1xuICAgICAgICB2YXIgY3VycmVudCwgLy8gY3VycmVudCBpbnN0cnVjdGlvblxuICAgICAgICBzdWJwYXRoU3RhcnRYID0gMCwgc3VicGF0aFN0YXJ0WSA9IDAsIHggPSAwLCAvLyBjdXJyZW50IHhcbiAgICAgICAgeSA9IDAsIC8vIGN1cnJlbnQgeVxuICAgICAgICBjb250cm9sWCA9IDAsIC8vIGN1cnJlbnQgY29udHJvbCBwb2ludCB4XG4gICAgICAgIGNvbnRyb2xZID0gMCwgLy8gY3VycmVudCBjb250cm9sIHBvaW50IHlcbiAgICAgICAgbCA9IC10aGlzLnBhdGhPZmZzZXQueCwgdCA9IC10aGlzLnBhdGhPZmZzZXQueTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5wYXRoLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5wYXRoW2ldO1xuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50WzBdIC8vIGZpcnN0IGxldHRlclxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkxcIjogLy8gbGluZXRvLCBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgICB4ID0gY3VycmVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGN1cnJlbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIGwsIHkgKyB0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIk1cIjogLy8gbW92ZVRvLCBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgICB4ID0gY3VycmVudFsxXTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGN1cnJlbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIHN1YnBhdGhTdGFydFggPSB4O1xuICAgICAgICAgICAgICAgICAgICBzdWJwYXRoU3RhcnRZID0geTtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh4ICsgbCwgeSArIHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ1wiOiAvLyBiZXppZXJDdXJ2ZVRvLCBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgICB4ID0gY3VycmVudFs1XTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGN1cnJlbnRbNl07XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xYID0gY3VycmVudFszXTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbFkgPSBjdXJyZW50WzRdO1xuICAgICAgICAgICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyhjdXJyZW50WzFdICsgbCwgY3VycmVudFsyXSArIHQsIGNvbnRyb2xYICsgbCwgY29udHJvbFkgKyB0LCB4ICsgbCwgeSArIHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiUVwiOiAvLyBxdWFkcmF0aWNDdXJ2ZVRvLCBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhjdXJyZW50WzFdICsgbCwgY3VycmVudFsyXSArIHQsIGN1cnJlbnRbM10gKyBsLCBjdXJyZW50WzRdICsgdCk7XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzNdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFs0XTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbFggPSBjdXJyZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sWSA9IGN1cnJlbnRbMl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlpcIjpcbiAgICAgICAgICAgICAgICAgICAgeCA9IHN1YnBhdGhTdGFydFg7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBzdWJwYXRoU3RhcnRZO1xuICAgICAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZVdpZHRoO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnN0cm9rZSB8fCBjdHguZmlsbFN0eWxlO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eCBjb250ZXh0IHRvIHJlbmRlciBwYXRoIG9uXG4gICAgICovXG4gICAgX3JlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyUGF0aENvbW1hbmRzKGN0eCk7XG4gICAgICAgIC8vIHRoaXMuX3JlbmRlclBhaW50SW5PcmRlcihjdHgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhbiBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGFuIGluc3RhbmNlXG4gICAgICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAoXCIjPFBhdGggKFwiICtcbiAgICAgICAgICAgIHRoaXMuY29tcGxleGl0eSgpICtcbiAgICAgICAgICAgICcpOiB7IFwidG9wXCI6ICcgK1xuICAgICAgICAgICAgdGhpcy50b3AgK1xuICAgICAgICAgICAgJywgXCJsZWZ0XCI6ICcgK1xuICAgICAgICAgICAgdGhpcy5sZWZ0ICtcbiAgICAgICAgICAgIFwiIH0+XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiBhbiBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wZXJ0aWVzVG9JbmNsdWRlXSBBbnkgcHJvcGVydGllcyB0aGF0IHlvdSBtaWdodCB3YW50IHRvIGFkZGl0aW9uYWxseSBpbmNsdWRlIGluIHRoZSBvdXRwdXRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiBhbiBpbnN0YW5jZVxuICAgICAqL1xuICAgIC8vICAgdG9PYmplY3QocHJvcGVydGllc1RvSW5jbHVkZSkge1xuICAgIC8vIHJldHVybiBleHRlbmQodGhpcy5jYWxsU3VwZXIoXCJ0b09iamVjdFwiLCBwcm9wZXJ0aWVzVG9JbmNsdWRlKSwge1xuICAgIC8vICAgcGF0aDogdGhpcy5wYXRoLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIC8vICAgICByZXR1cm4gaXRlbS5zbGljZSgpO1xuICAgIC8vICAgfSksXG4gICAgLy8gfSk7XG4gICAgLy8gICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkYXRhbGVzcyBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgYW4gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbcHJvcGVydGllc1RvSW5jbHVkZV0gQW55IHByb3BlcnRpZXMgdGhhdCB5b3UgbWlnaHQgd2FudCB0byBhZGRpdGlvbmFsbHkgaW5jbHVkZSBpbiB0aGUgb3V0cHV0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgYW4gaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0b0RhdGFsZXNzT2JqZWN0KHByb3BlcnRpZXNUb0luY2x1ZGUpIHtcbiAgICAgICAgdmFyIG8gPSB0aGlzLnRvT2JqZWN0KFtcInNvdXJjZVBhdGhcIl0uY29uY2F0KHByb3BlcnRpZXNUb0luY2x1ZGUpKTtcbiAgICAgICAgaWYgKG8uc291cmNlUGF0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG8ucGF0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbztcbiAgICB9XG4gICAgLyogX1RPX1NWR19TVEFSVF8gKi9cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHN2ZyByZXByZXNlbnRhdGlvbiBvZiBhbiBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBvZiBzdHJpbmdzIHdpdGggdGhlIHNwZWNpZmljIHN2ZyByZXByZXNlbnRhdGlvblxuICAgICAqIG9mIHRoZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIC8vICAgX3RvU1ZHKCkge1xuICAgIC8vIHZhciBwYXRoID0gZmFicmljLnV0aWwuam9pblBhdGgodGhpcy5wYXRoKTtcbiAgICAvLyByZXR1cm4gW1xuICAgIC8vICAgXCI8cGF0aCBcIixcbiAgICAvLyAgIFwiQ09NTU9OX1BBUlRTXCIsXG4gICAgLy8gICAnZD1cIicsXG4gICAgLy8gICBwYXRoLFxuICAgIC8vICAgJ1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiAnLFxuICAgIC8vICAgXCIvPlxcblwiLFxuICAgIC8vIF07XG4gICAgLy8gICB9XG4gICAgX2dldE9mZnNldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgLy8gdmFyIGRpZ2l0cyA9IGZhYnJpYy5PYmplY3QuTlVNX0ZSQUNUSU9OX0RJR0lUUztcbiAgICAgICAgLy8gcmV0dXJuICcgdHJhbnNsYXRlKCcgKyB0b0ZpeGVkKC10aGlzLnBhdGhPZmZzZXQueCwgZGlnaXRzKSArICcsICcgK1xuICAgICAgICAvLyAgICAgdG9GaXhlZCgtdGhpcy5wYXRoT2Zmc2V0LnksIGRpZ2l0cykgKyAnKSc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgc3ZnIGNsaXBQYXRoIHJlcHJlc2VudGF0aW9uIG9mIGFuIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jldml2ZXJdIE1ldGhvZCBmb3IgZnVydGhlciBwYXJzaW5nIG9mIHN2ZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN2ZyByZXByZXNlbnRhdGlvbiBvZiBhbiBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRvQ2xpcFBhdGhTVkcocmV2aXZlcikge1xuICAgICAgICAvLyB2YXIgYWRkaXRpb25hbFRyYW5zZm9ybSA9IHRoaXMuX2dldE9mZnNldFRyYW5zZm9ybSgpO1xuICAgICAgICAvLyByZXR1cm4gJ1xcdCcgKyB0aGlzLl9jcmVhdGVCYXNlQ2xpcFBhdGhTVkdNYXJrdXAoXG4gICAgICAgIC8vICAgdGhpcy5fdG9TVkcoKSwgeyByZXZpdmVyOiByZXZpdmVyLCBhZGRpdGlvbmFsVHJhbnNmb3JtOiBhZGRpdGlvbmFsVHJhbnNmb3JtIH1cbiAgICAgICAgLy8gKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBzdmcgcmVwcmVzZW50YXRpb24gb2YgYW4gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmV2aXZlcl0gTWV0aG9kIGZvciBmdXJ0aGVyIHBhcnNpbmcgb2Ygc3ZnIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gc3ZnIHJlcHJlc2VudGF0aW9uIG9mIGFuIGluc3RhbmNlXG4gICAgICovXG4gICAgdG9TVkcocmV2aXZlcikge1xuICAgICAgICAvLyB2YXIgYWRkaXRpb25hbFRyYW5zZm9ybSA9IHRoaXMuX2dldE9mZnNldFRyYW5zZm9ybSgpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5fY3JlYXRlQmFzZVNWR01hcmt1cCh0aGlzLl90b1NWRygpLCB7XG4gICAgICAgIC8vICAgcmV2aXZlcjogcmV2aXZlcixcbiAgICAgICAgLy8gICBhZGRpdGlvbmFsVHJhbnNmb3JtOiBhZGRpdGlvbmFsVHJhbnNmb3JtLFxuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgLyogX1RPX1NWR19FTkRfICovXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudW1iZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gaW5zdGFuY2UgY29tcGxleGl0eVxuICAgICAqIEByZXR1cm4ge051bWJlcn0gY29tcGxleGl0eSBvZiB0aGlzIGluc3RhbmNlXG4gICAgICovXG4gICAgY29tcGxleGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NhbGNEaW1lbnNpb25zKCkge1xuICAgICAgICB2YXIgYVggPSBbXSwgYVkgPSBbXSwgY3VycmVudCwgLy8gY3VycmVudCBpbnN0cnVjdGlvblxuICAgICAgICBzdWJwYXRoU3RhcnRYID0gMCwgc3VicGF0aFN0YXJ0WSA9IDAsIHggPSAwLCAvLyBjdXJyZW50IHhcbiAgICAgICAgeSA9IDAsIC8vIGN1cnJlbnQgeVxuICAgICAgICBib3VuZHM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnBhdGgubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLnBhdGhbaV07XG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRbMF0gLy8gZmlyc3QgbGV0dGVyXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiTFwiOiAvLyBsaW5ldG8sIGFic29sdXRlXG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzFdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFsyXTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJNXCI6IC8vIG1vdmVUbywgYWJzb2x1dGVcbiAgICAgICAgICAgICAgICAgICAgeCA9IGN1cnJlbnRbMV07XG4gICAgICAgICAgICAgICAgICAgIHkgPSBjdXJyZW50WzJdO1xuICAgICAgICAgICAgICAgICAgICBzdWJwYXRoU3RhcnRYID0geDtcbiAgICAgICAgICAgICAgICAgICAgc3VicGF0aFN0YXJ0WSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ1wiOiAvLyBiZXppZXJDdXJ2ZVRvLCBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgICAgICBib3VuZHMgPSBVdGlsLmdldEJvdW5kc09mQ3VydmUoeCwgeSwgY3VycmVudFsxXSwgY3VycmVudFsyXSwgY3VycmVudFszXSwgY3VycmVudFs0XSwgY3VycmVudFs1XSwgY3VycmVudFs2XSk7XG4gICAgICAgICAgICAgICAgICAgIHggPSBjdXJyZW50WzVdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gY3VycmVudFs2XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlFcIjogLy8gcXVhZHJhdGljQ3VydmVUbywgYWJzb2x1dGVcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzID0gVXRpbC5nZXRCb3VuZHNPZkN1cnZlKHgsIHksIGN1cnJlbnRbMV0sIGN1cnJlbnRbMl0sIGN1cnJlbnRbMV0sIGN1cnJlbnRbMl0sIGN1cnJlbnRbM10sIGN1cnJlbnRbNF0pO1xuICAgICAgICAgICAgICAgICAgICB4ID0gY3VycmVudFszXTtcbiAgICAgICAgICAgICAgICAgICAgeSA9IGN1cnJlbnRbNF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIlpcIjpcbiAgICAgICAgICAgICAgICAgICAgeCA9IHN1YnBhdGhTdGFydFg7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBzdWJwYXRoU3RhcnRZO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvdW5kcy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgICAgIGFYLnB1c2gocG9pbnQueCk7XG4gICAgICAgICAgICAgICAgYVkucHVzaChwb2ludC55KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYVgucHVzaCh4KTtcbiAgICAgICAgICAgIGFZLnB1c2goeSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pblggPSBVdGlsLm1pbihhWCkgfHwgMCwgbWluWSA9IFV0aWwubWluKGFZKSB8fCAwLCBtYXhYID0gVXRpbC5tYXgoYVgpIHx8IDAsIG1heFkgPSBVdGlsLm1heChhWSkgfHwgMCwgZGVsdGFYID0gbWF4WCAtIG1pblgsIGRlbHRhWSA9IG1heFkgLSBtaW5ZO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbWluWCxcbiAgICAgICAgICAgIHRvcDogbWluWSxcbiAgICAgICAgICAgIHdpZHRoOiBkZWx0YVgsXG4gICAgICAgICAgICBoZWlnaHQ6IGRlbHRhWSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTaGFwZSB9IGZyb20gXCIuLi8uLi9iYXNlL3NoYXBlXCI7XG4vKiog55+p5b2i57G7ICovXG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIFNoYXBlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnR5cGUgPSBcInJlY3RcIjtcbiAgICAgICAgLyoqIOWchuinkiByeCAqL1xuICAgICAgICB0aGlzLnJ4ID0gMDtcbiAgICAgICAgLyoqIOWchuinkiByeSAqL1xuICAgICAgICB0aGlzLnJ5ID0gMDtcbiAgICAgICAgdGhpcy5faW5pdFN0YXRlUHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLl9pbml0UnhSeShvcHRpb25zKTtcbiAgICB9XG4gICAgX2luaXRTdGF0ZVByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhdGVQcm9wZXJ0aWVzID0gdGhpcy5zdGF0ZVByb3BlcnRpZXMuY29uY2F0KFtcInJ4XCIsIFwicnlcIl0pO1xuICAgIH1cbiAgICAvKiog5Yid5aeL5YyW5ZyG6KeSICovXG4gICAgX2luaXRSeFJ5KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yeCA9IG9wdGlvbnMucnggfHwgMDtcbiAgICAgICAgdGhpcy5yeSA9IG9wdGlvbnMucnkgfHwgMDtcbiAgICAgICAgLyoqIOWmguaenCByeCDmiJbogIUgcnkg5Y+q5Lyg5LqG5LiA5Liq77yM6buY6K6k5LqM6ICF55u4562JICovXG4gICAgICAgIGlmICh0aGlzLnJ4ICYmICF0aGlzLnJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJ5ID0gdGhpcy5yeDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnJ5ICYmICF0aGlzLnJ4KSB7XG4gICAgICAgICAgICB0aGlzLnJ4ID0gdGhpcy5yeTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcmVuZGVyKGN0eCkge1xuICAgICAgICBsZXQgcnggPSB0aGlzLnJ4IHx8IDAsIHJ5ID0gdGhpcy5yeSB8fCAwLCB4ID0gLXRoaXMud2lkdGggLyAyLCB5ID0gLXRoaXMuaGVpZ2h0IC8gMiwgdyA9IHRoaXMud2lkdGgsIGggPSB0aGlzLmhlaWdodDtcbiAgICAgICAgLy8g57uY5Yi25LiA5Liq5paw55qE5Lic6KW/77yM5aSn6YOo5YiG5oOF5Ya15LiL6YO96KaB5byA5ZCv5LiA5Liq5paw6Lev5b6E77yM6KaB5YW75oiQ5Lmg5oOvXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgLy8gaWYgKHRoaXMudHJhbnNmb3JtTWF0cml4ICYmIHRoaXMuZ3JvdXApIHtcbiAgICAgICAgLy8gICAgIGN0eC50cmFuc2xhdGUodGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKCF0aGlzLnRyYW5zZm9ybU1hdHJpeCAmJiB0aGlzLmdyb3VwKSB7XG4gICAgICAgIC8vICAgICBjdHgudHJhbnNsYXRlKC10aGlzLmdyb3VwLndpZHRoIC8gMiArIHRoaXMud2lkdGggLyAyLCAtdGhpcy5ncm91cC5oZWlnaHQgLyAyICsgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAodGhpcy5ncm91cClcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoLXRoaXMuZ3JvdXAud2lkdGggLyAyICsgdGhpcy53aWR0aCAvIDIsIC10aGlzLmdyb3VwLmhlaWdodCAvIDIgKyB0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICAvLyDku47lt6bkuIrop5LlvIDlp4vpobrml7bpkojnlLvnn6nlvaLvvIzov5nph4zlsLHmmK/ljZXnuq/nmoTnu5jliLbkuIDkuKrop4Top4Tnn6nnn6nnmoTnn6nlvaLvvIzkuI3ogIPomZHml4vovaznvKnmlL7llaXnmoTvvIzlm6DkuLrml4vovaznvKnmlL7kvJrlnKjosIPnlKggX3JlbmRlciDlh73mlbDkuYvliY3lpITnkIZcbiAgICAgICAgY3R4Lm1vdmVUbyh4ICsgcngsIHkpO1xuICAgICAgICBjdHgubGluZVRvKHggKyB3IC0gcngsIHkpO1xuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgdywgeSwgeCArIHcsIHkgKyByeSwgeCArIHcsIHkgKyByeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIHcsIHkgKyBoIC0gcnkpO1xuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgdywgeSArIGgsIHggKyB3IC0gcngsIHkgKyBoLCB4ICsgdyAtIHJ4LCB5ICsgaCk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIHJ4LCB5ICsgaCk7XG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHgsIHkgKyBoLCB4LCB5ICsgaCAtIHJ5LCB4LCB5ICsgaCAtIHJ5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5ICsgcnkpO1xuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4LCB5LCB4ICsgcngsIHksIHggKyByeCwgeSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgaWYgKHRoaXMuZmlsbClcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGlmICh0aGlzLnN0cm9rZSlcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gICAgdG9PYmplY3QocHJvcGVydGllc1RvSW5jbHVkZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci50b09iamVjdChwcm9wZXJ0aWVzVG9JbmNsdWRlKSwge1xuICAgICAgICAgICAgcng6IHRoaXMuZ2V0KFwicnhcIikgfHwgMCxcbiAgICAgICAgICAgIHJ5OiB0aGlzLmdldChcInJ5XCIpIHx8IDAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfdG9TVkcoKSB7XG4gICAgICAgIHZhciB4ID0gLXRoaXMud2lkdGggLyAyLCB5ID0gLXRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiPHJlY3QgXCIsXG4gICAgICAgICAgICAneD1cIicsXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgJ1wiIHk9XCInLFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICdcIiByeD1cIicsXG4gICAgICAgICAgICB0aGlzLnJ4LFxuICAgICAgICAgICAgJ1wiIHJ5PVwiJyxcbiAgICAgICAgICAgIHRoaXMucnksXG4gICAgICAgICAgICAnXCIgd2lkdGg9XCInLFxuICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgICdcIiBoZWlnaHQ9XCInLFxuICAgICAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICAnXCIgLz5cXG4nLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFNoYXBlIH0gZnJvbSBcIi4uLy4uL2Jhc2Uvc2hhcGVcIjtcbi8qKiDmloflrZfnsbsgKi9cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cbiAgICBfcmVuZGVyKGN0eCkge1xuICAgICAgICBjdHguZm9udCA9IFwiMjJweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIOWtl+espuWIhumalOS4uuaVsOe7hFxuICAgICAgICBsZXQgYXJyVGV4dCA9IHRoaXMudGV4dC5zcGxpdChcIlwiKTtcbiAgICAgICAgbGV0IGxpbmUgPSBcIlwiO1xuICAgICAgICBsZXQgeCA9IC0odGhpcy53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgeSA9IC0odGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgbGV0IGxpbmVOdW1iZXIgPSAxO1xuICAgICAgICAvLyDnlKjmnaXlpITnkIbliIbooYzpgLvovpFcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBhcnJUZXh0Lmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBsZXQgdGV4dExpbmUgPSBsaW5lICsgYXJyVGV4dFtuXTtcbiAgICAgICAgICAgIGxldCBtZXRyaWNzID0gY3R4Lm1lYXN1cmVUZXh0KHRleHRMaW5lKTtcbiAgICAgICAgICAgIGxldCB0ZXh0V2lkdGggPSBtZXRyaWNzLndpZHRoO1xuICAgICAgICAgICAgaWYgKHRleHRXaWR0aCA+IHRoaXMud2lkdGggJiYgbiA+IDApIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobGluZSwgeCwgeSk7XG4gICAgICAgICAgICAgICAgbGluZSA9IGFyclRleHRbbl07XG4gICAgICAgICAgICAgICAgeSArPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgbGluZU51bWJlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IHRleHRMaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsVGV4dChsaW5lLCB4LCB5KTtcbiAgICAgICAgLy8g5LuO5paw6K6h566X6auY5bqmXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gbGluZU51bWJlciAqIHRoaXMubGluZUhlaWdodDtcbiAgICB9XG59XG4iLCJleHBvcnQgeyBDYW52YXMgYXMgUm9jb2NvMkRWaWV3IH0gZnJvbSBcIi4vZW50aXRpZXMvY2FudmFzXCI7XG5leHBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vZW50aXRpZXMvZWxlbWVudHMvcmVjdC5lbnRpdHlcIjtcbmV4cG9ydCB7IExpbmUgfSBmcm9tIFwiLi9lbnRpdGllcy9lbGVtZW50cy9saW5lLmVudGl0eVwiO1xuZXhwb3J0IHsgUGF0aCB9IGZyb20gXCIuL2VudGl0aWVzL2VsZW1lbnRzL3BhdGguZW50aXR5XCI7XG5leHBvcnQgeyBUZXh0IH0gZnJvbSBcIi4vZW50aXRpZXMvZWxlbWVudHMvdGV4dC5lbnRpdHlcIjtcbmV4cG9ydCB7IFJvY29jb0ltYWdlIH0gZnJvbSBcIi4vZW50aXRpZXMvZWxlbWVudHMvaW1hZ2UuZW50aXR5XCI7XG5leHBvcnQgeyBXaWRnZXQgfSBmcm9tIFwiLi93aWRnZXRzL3dpZGdldFwiO1xuZXhwb3J0IHsgUmVjdERyYXdXaWRnZXQgfSBmcm9tIFwiLi93aWRnZXRzL3JlY3QtZHJhdy53aWRnZXRcIjtcbmV4cG9ydCB7IEJydXNoV2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0cy9icnVzaC53aWRnZXRcIjtcbmV4cG9ydCB7IExpbmVEcmF3V2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0cy9saW5lLWRyYXcud2lkZ2V0XCI7XG5leHBvcnQgeyBab29tV2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0cy96b29tLndpZGdldFwiO1xuIiwiLyoqIOS4gOS6m+m8oOagh+agt+W8jyAqL1xudmFyIEN1cnNvclN0eWxlO1xuKGZ1bmN0aW9uIChDdXJzb3JTdHlsZSkge1xuICAgIEN1cnNvclN0eWxlW1wiZGVmYXVsdFwiXSA9IFwiZGVmYXVsdFwiO1xuICAgIEN1cnNvclN0eWxlW1wibW92ZVwiXSA9IFwibW92ZVwiO1xuICAgIEN1cnNvclN0eWxlW1wiaG92ZXJcIl0gPSBcIm1vdmVcIjtcbiAgICBDdXJzb3JTdHlsZVtcInJvdGF0aW9uXCJdID0gXCJjcm9zc2hhaXJcIjtcbn0pKEN1cnNvclN0eWxlIHx8IChDdXJzb3JTdHlsZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbW91c2VEb3duOiAoeyBlLCBwb2ludGVyLCByb2NvY28yZCB9LCBuZXh0KSA9PiB7XG4gICAgICAgIG5leHQoKTtcbiAgICAgICAgaWYgKHJvY29jbzJkLmFjdGlvbiAhPT0gXCJkZWZhdWx0XCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIOWPquWkhOeQhuW3pumUrueCueWHu++8jOimgeS5iOaYr+aLluiTneS6i+S7tuOAgeimgeS5iOaYr+eCuemAieS6i+S7tlxuICAgICAgICBsZXQgaXNMZWZ0Q2xpY2sgPSBcIndoaWNoXCIgaW4gZSA/IGUud2hpY2ggPT09IDEgOiBlLmJ1dHRvbiA9PT0gMTtcbiAgICAgICAgaWYgKCFpc0xlZnRDbGljaylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8g6L+Z5Liq5oiR54yc5piv5Li65LqG5L+d6Zmp6LW36KeB77yMaWdub3JlIGlmIHNvbWUgb2JqZWN0IGlzIGJlaW5nIHRyYW5zZm9ybWVkIGF0IHJvY29jbzJkIG1vbWVudFxuICAgICAgICBpZiAocm9jb2NvMmQuX2N1cnJlbnRUcmFuc2Zvcm0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCB0YXJnZXQgPSByb2NvY28yZC5maW5kVGFyZ2V0KGUpO1xuICAgICAgICBsZXQgY29ybmVyO1xuICAgICAgICByb2NvY28yZC5fcHJldmlvdXNQb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgaWYgKHJvY29jbzJkLnNob3VsZENsZWFyU2VsZWN0aW9uKGUpKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmmK/mi5bok53pgInljLrkuovku7ZcbiAgICAgICAgICAgIHJvY29jbzJkLl9ncm91cFNlbGVjdG9yID0ge1xuICAgICAgICAgICAgICAgIC8vIOmHjee9rumAieWMuueKtuaAgWBcbiAgICAgICAgICAgICAgICBleDogcG9pbnRlci54LFxuICAgICAgICAgICAgICAgIGV5OiBwb2ludGVyLnksXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8g6K6p5omA5pyJ5YWD57Sg5aSx5Y675r+A5rS754q25oCBXG4gICAgICAgICAgICByb2NvY28yZC5kZWFjdGl2YXRlQWxsV2l0aERpc3BhdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmmK/ngrnpgInmk43kvZzvvIzmjqXkuIvmnaXlsLHopoHkuLrlkITnp43lj5jmjaLlgZrlh4blpIdcbiAgICAgICAgICAgIHRhcmdldC5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIC8vIOWIpOaWreeCueWHu+eahOaYr+S4jeaYr+aOp+WItueCuVxuICAgICAgICAgICAgY29ybmVyID0gdGFyZ2V0Ll9maW5kVGFyZ2V0Q29ybmVyKGUsIHJvY29jbzJkLl9vZmZzZXQpO1xuICAgICAgICAgICAgaWYgKHJvY29jbzJkLnNob3VsZEhhbmRsZUdyb3VwTG9naWMoZSwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+mAieS4ree7hFxuICAgICAgICAgICAgICAgIHJvY29jbzJkLmhhbmRsZUdyb3VwTG9naWMoZSwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSByb2NvY28yZC5nZXRBY3RpdmVHcm91cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv6YCJ5Lit5Y2V5Liq54mp5L2TXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPT0gcm9jb2NvMmQuZ2V0QWN0aXZlR3JvdXAoKSkge1xuICAgICAgICAgICAgICAgICAgICByb2NvY28yZC5kZWFjdGl2YXRlQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvY29jbzJkLnNldEFjdGl2ZU9iamVjdCh0YXJnZXQsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9jb2NvMmQuc2V0dXBDdXJyZW50VHJhbnNmb3JtKGUsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5LiN6K665piv5ouW6JOd6YCJ5Yy65LqL5Lu26L+Y5piv54K56YCJ5LqL5Lu277yM6YO96ZyA6KaB6YeN5paw57uY5Yi2XG4gICAgICAgIC8vIOaLluiTnemAieWMuu+8mumcgOimgeaKiuS5i+WJjea/gOa0u+eahOeJqeS9k+WPlua2iOmAieS4reaAgVxuICAgICAgICAvLyDngrnpgInkuovku7bvvJrpnIDopoHmiorlvZPliY3mv4DmtLvnmoTniankvZPnva7pobZcbiAgICAgICAgcm9jb2NvMmQucmVuZGVyQWxsKCk7XG4gICAgfSxcbiAgICBtb3VzZU1vdmU6ICh7IGUsIHBvaW50ZXIsIHJvY29jbzJkIH0sIG5leHQpID0+IHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgICBpZiAocm9jb2NvMmQuYWN0aW9uICE9PSBcImRlZmF1bHRcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHRhcmdldDtcbiAgICAgICAgbGV0IGdyb3VwU2VsZWN0b3IgPSByb2NvY28yZC5fZ3JvdXBTZWxlY3RvcjtcbiAgICAgICAgaWYgKGdyb3VwU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIC8vIOWmguaenOacieaLluiTneahhumAieWMuuWfn1xuICAgICAgICAgICAgZ3JvdXBTZWxlY3Rvci5sZWZ0ID0gcG9pbnRlci54IC0gcm9jb2NvMmQuX29mZnNldC5sZWZ0IC0gZ3JvdXBTZWxlY3Rvci5leDtcbiAgICAgICAgICAgIGdyb3VwU2VsZWN0b3IudG9wID0gcG9pbnRlci55IC0gcm9jb2NvMmQuX29mZnNldC50b3AgLSBncm91cFNlbGVjdG9yLmV5O1xuICAgICAgICAgICAgcm9jb2NvMmQucmVuZGVyVG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXJvY29jbzJkLl9jdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmmK8gaG92ZXIg5LqL5Lu277yM6L+Z6YeM5oiR5Lus5Y+q6ZyA6KaB5pS55Y+Y6byg5qCH5qC35byP77yM5bm25LiN5Lya6YeN5paw5riy5p+TXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSByb2NvY28yZC50b3BDYW52YXMuc3R5bGU7XG4gICAgICAgICAgICB0YXJnZXQgPSByb2NvY28yZC5maW5kVGFyZ2V0KGUpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJvY29jbzJkLnNldEN1cnNvckZyb21FdmVudChlLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gQ3Vyc29yU3R5bGUuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIOWmguaenOaYr+aXi+i9rOOAgee8qeaUvuOAgeW5s+enu+etieaTjeS9nFxuICAgICAgICAgICAgbGV0IHggPSBwb2ludGVyLngsIHkgPSBwb2ludGVyLnk7XG4gICAgICAgICAgICByb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybS50YXJnZXQuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHQgPSByb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybSwgcmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybS5hY3Rpb24gPT09IFwicm90YXRlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzmmK/ml4vovazmk43kvZxcbiAgICAgICAgICAgICAgICByb2NvY28yZC5yb3RhdGVPYmplY3QoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybS5hY3Rpb24gPT09IFwic2NhbGVcIikge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+aVtOS9k+e8qeaUvuaTjeS9nFxuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvY29jbzJkLl9jdXJyZW50VHJhbnNmb3JtLmN1cnJlbnRBY3Rpb24gPSBcInNjYWxlXCI7XG4gICAgICAgICAgICAgICAgICAgIHJvY29jbzJkLnNjYWxlT2JqZWN0KHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNldCAmJiB0LmN1cnJlbnRBY3Rpb24gPT09IFwic2NhbGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9jb2NvMmQucmVzZXRDdXJyZW50VHJhbnNmb3JtKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJvY29jbzJkLl9jdXJyZW50VHJhbnNmb3JtLmN1cnJlbnRBY3Rpb24gPSBcInNjYWxlRXF1YWxseVwiO1xuICAgICAgICAgICAgICAgICAgICByb2NvY28yZC5zY2FsZU9iamVjdCh4LCB5LCBcImVxdWFsbHlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9jb2NvMmQuX2N1cnJlbnRUcmFuc2Zvcm0uYWN0aW9uID09PSBcInNjYWxlWFwiKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+q5piv57yp5pS+IHhcbiAgICAgICAgICAgICAgICByb2NvY28yZC5zY2FsZU9iamVjdCh4LCB5LCBcInhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybS5hY3Rpb24gPT09IFwic2NhbGVZXCIpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzlj6rmmK/nvKnmlL4geVxuICAgICAgICAgICAgICAgIHJvY29jbzJkLnNjYWxlT2JqZWN0KHgsIHksIFwieVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+aLluaLveeJqeS9k1xuICAgICAgICAgICAgICAgIHJvY29jbzJkLnRyYW5zbGF0ZU9iamVjdCh4LCB5KTtcbiAgICAgICAgICAgICAgICByb2NvY28yZC5zZXRDdXJzb3IoQ3Vyc29yU3R5bGUubW92ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJBbGwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW91c2VVcDogKHsgZSwgcm9jb2NvMmQgfSwgbmV4dCkgPT4ge1xuICAgICAgICBuZXh0KCk7XG4gICAgICAgIGlmIChyb2NvY28yZC5hY3Rpb24gIT09IFwiZGVmYXVsdFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICBpZiAocm9jb2NvMmQuX2N1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSByb2NvY28yZC5fY3VycmVudFRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRhcmdldCA9IHRyYW5zZm9ybS50YXJnZXQ7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Ll9zY2FsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Ll9zY2FsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmr4/mrKHniankvZPmm7TmlLnpg73opoHph43mlrDorqHnrpfmlrDnmoTmjqfliLbngrlcbiAgICAgICAgICAgIGxldCBpID0gcm9jb2NvMmQuX3NoYXBlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgcm9jb2NvMmQuX3NoYXBlc1tpXS5zZXRDb29yZHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8g5Zyo54K55Ye75LmL6Ze05aaC5p6c54mp5L2T54q25oCB5pS55Y+Y5LqG5omN5rS+5Y+R5LqL5Lu2XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmhhc1N0YXRlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgICAgICAgLy8gcm9jb2NvMmQuZW1pdChcIm9iamVjdDptb2RpZmllZFwiLCB7IHRhcmdldCB9KTtcbiAgICAgICAgICAgICAgICAvLyB0YXJnZXQuZW1pdChcIm1vZGlmaWVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJvY29jbzJkLl9jdXJyZW50VHJhbnNmb3JtID0gbnVsbDtcbiAgICAgICAgaWYgKHJvY29jbzJkLl9ncm91cFNlbGVjdG9yKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmnInmi5bok53moYbpgInljLrln59cbiAgICAgICAgICAgIHJvY29jbzJkLmZpbmRTZWxlY3RlZE9iamVjdHMoZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFjdGl2ZUdyb3VwID0gcm9jb2NvMmQuZ2V0QWN0aXZlR3JvdXAoKTtcbiAgICAgICAgaWYgKGFjdGl2ZUdyb3VwKSB7XG4gICAgICAgICAgICAvL+mHjeaWsOiuvue9riDmv4DmtLvnu4Qg5Lit55qE54mp5L2TXG4gICAgICAgICAgICBhY3RpdmVHcm91cC5zZXRPYmplY3RzQ29vcmRzKCk7XG4gICAgICAgICAgICBhY3RpdmVHcm91cC5zZXQoXCJpc01vdmluZ1wiLCBmYWxzZSk7XG4gICAgICAgICAgICByb2NvY28yZC5zZXRDdXJzb3IoQ3Vyc29yU3R5bGUuZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcm9jb2NvMmQuX2dyb3VwU2VsZWN0b3IgPSBudWxsO1xuICAgICAgICByb2NvY28yZC5yZW5kZXJBbGwoKTtcbiAgICAgICAgcm9jb2NvMmQuc2V0Q3Vyc29yRnJvbUV2ZW50KGUsIHRhcmdldCk7XG4gICAgfSxcbiAgICBtb3VzZVdoZWVsOiAoeyBlLCBwb2ludGVyLCByb2NvY28yZCB9LCBuZXh0KSA9PiB7XG4gICAgICAgIGxldCBiID0gdHJ1ZTtcbiAgICAgICAgaWYgKGUud2hlZWxEZWx0YSkge1xuICAgICAgICAgICAgYiA9IGUud2hlZWxEZWx0YSA+IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBiID0gZS5kZXRhaWwgPCAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICByb2NvY28yZC56b29tSW4odHJ1ZSwgcG9pbnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByb2NvY28yZC56b29tT3V0KHRydWUsIHBvaW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQoKTtcbiAgICB9LFxufTtcbiIsIi8qKiDkuIDkupvpvKDmoIfmoLflvI8gKi9cbnZhciBDdXJzb3JTdHlsZTtcbihmdW5jdGlvbiAoQ3Vyc29yU3R5bGUpIHtcbiAgICBDdXJzb3JTdHlsZVtcImRlZmF1bHRcIl0gPSBcImRlZmF1bHRcIjtcbiAgICBDdXJzb3JTdHlsZVtcIm1vdmVcIl0gPSBcIm1vdmVcIjtcbiAgICBDdXJzb3JTdHlsZVtcImhvdmVyXCJdID0gXCJtb3ZlXCI7XG4gICAgQ3Vyc29yU3R5bGVbXCJyb3RhdGlvblwiXSA9IFwiY3Jvc3NoYWlyXCI7XG4gICAgQ3Vyc29yU3R5bGVbXCJncmFiXCJdID0gXCJncmFiXCI7XG59KShDdXJzb3JTdHlsZSB8fCAoQ3Vyc29yU3R5bGUgPSB7fSkpO1xuY29uc3QgcG9zaXRpb24gPSB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxufTtcbmxldCBkcmFnU3RhcnQgPSBmYWxzZTtcbi8vIOaYr+WQpuaYr+mAmui/h+a7mui9rueCueWHu+WIh+aNouiHsyBncmFiIOeKtuaAgVxubGV0IGlzTW91c2VXaGVlbEdyYWIgPSBmYWxzZTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtb3VzZURvd246ICh7IGUsIHBvaW50ZXIsIHJvY29jbzJkIH0sIG5leHQpID0+IHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgICAvLyDmu5rova7ngrnlh7vkvJrlsIbmk43kvZzovazlj7DovazljJbkuLogZ3JhYlxuICAgICAgICBpZiAoZS5idXR0b25zID09PSA0KSB7XG4gICAgICAgICAgICByb2NvY28yZC5hY3Rpb24gPSBcImdyYWJcIjtcbiAgICAgICAgICAgIGlzTW91c2VXaGVlbEdyYWIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb2NvY28yZC5hY3Rpb24gIT09IFwiZ3JhYlwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByb2NvY28yZC5zZXRDdXJzb3IoQ3Vyc29yU3R5bGUuZ3JhYik7XG4gICAgICAgIHBvc2l0aW9uLnggPSBwb2ludGVyLng7XG4gICAgICAgIHBvc2l0aW9uLnkgPSBwb2ludGVyLnk7XG4gICAgICAgIGRyYWdTdGFydCA9IHRydWU7XG4gICAgfSxcbiAgICBtb3VzZU1vdmU6ICh7IHBvaW50ZXIsIHJvY29jbzJkIH0sIG5leHQpID0+IHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgICBpZiAocm9jb2NvMmQuYWN0aW9uICE9PSBcImdyYWJcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFkcmFnU3RhcnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJvY29jbzJkLl9jYW52YXNPZmZzZXQubGVmdCArPSBwb2ludGVyLnggLSBwb3NpdGlvbi54O1xuICAgICAgICByb2NvY28yZC5fY2FudmFzT2Zmc2V0LnRvcCArPSBwb2ludGVyLnkgLSBwb3NpdGlvbi55O1xuICAgICAgICByb2NvY28yZC5yZW5kZXJBbGwoKTtcbiAgICB9LFxuICAgIG1vdXNlVXA6ICh7IHJvY29jbzJkIH0sIG5leHQpID0+IHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgICBpZiAocm9jb2NvMmQuYWN0aW9uICE9PSBcImdyYWJcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcG9zaXRpb24ueCA9IDA7XG4gICAgICAgIHBvc2l0aW9uLnkgPSAwO1xuICAgICAgICBkcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlzTW91c2VXaGVlbEdyYWIpIHtcbiAgICAgICAgICAgIGlzTW91c2VXaGVlbEdyYWIgPSBmYWxzZTtcbiAgICAgICAgICAgIHJvY29jbzJkLmFjdGlvbiA9IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgcm9jb2NvMmQuc2V0Q3Vyc29yKEN1cnNvclN0eWxlLmRlZmF1bHQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBQYXRoIH0gZnJvbSBcIi4uL2VudGl0aWVzL2VsZW1lbnRzL3BhdGguZW50aXR5XCI7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tIFwiLi93aWRnZXRcIjtcbmNvbnN0IGJydXNoU3ZnID0gJzxzdmcgZm9jdXNhYmxlPVwiZmFsc2VcIiBjbGFzcz1cIlwiIGRhdGEtaWNvbj1cImhpZ2hsaWdodFwiIHdpZHRoPVwiMWVtXCIgaGVpZ2h0PVwiMWVtXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHZpZXdCb3g9XCI2NCA2NCA4OTYgODk2XCI+PHBhdGggZD1cIk05NTcuNiA1MDcuNEw2MDMuMiAxNTguMmE3LjkgNy45IDAgMDAtMTEuMiAwTDM1My4zIDM5My40YTguMDMgOC4wMyAwIDAwLS4xIDExLjNsLjEuMSA0MCAzOS40LTExNy4yIDExNS4zYTguMDMgOC4wMyAwIDAwLS4xIDExLjNsLjEuMSAzOS41IDM4LjktMTg5LjEgMTg3SDcyLjFjLTQuNCAwLTguMSAzLjYtOC4xIDhWODYwYzAgNC40IDMuNiA4IDggOGgzNDQuOWMyLjEgMCA0LjEtLjggNS42LTIuM2w3Ni4xLTc1LjYgNDAuNCAzOS44YTcuOSA3LjkgMCAwMDExLjIgMGwxMTcuMS0xMTUuNiA0MC4xIDM5LjVhNy45IDcuOSAwIDAwMTEuMiAwbDIzOC43LTIzNS4yYzMuNC0zIDMuNC04IC4zLTExLjJ6TTM4OS44IDc5Ni4ySDIyOS42bDEzNC40LTEzMyA4MC4xIDc4LjktNTQuMyA1NC4xem0xNTQuOC02Mi4xTDM3My4yIDU2NS4ybDY4LjYtNjcuNiAxNzEuNCAxNjguOS02OC42IDY3LjZ6TTcxMy4xIDY1OEw0NTAuMyAzOTkuMSA1OTcuNiAyNTRsMjYyLjggMjU5LTE0Ny4zIDE0NXpcIj48L3BhdGg+PC9zdmc+JztcbmV4cG9ydCBjbGFzcyBCcnVzaFdpZGdldCBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgPHN0eWxlPlxuICAgICAgLndpZGdldC1idG4ge1xuICAgICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgICBjb2xvcjogIzg2MzhlNTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgcGF0aC1oZWlnaHQ6IDEuNDk5O1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgLjNzIGN1YmljLWJlemllciguNjQ1LC4wNDUsLjM1NSwxKTtcbiAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbjogMTBweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDAgM3B4ICMwMDAwMDA7XG4gICAgICB9XG4gICAgICAud2lkZ2V0LWJ0bjpob3ZlcntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPGJ1dHRvbiBpZD1cImJydXNoLXdpZGdldFwiIGNsYXNzPVwid2lkZ2V0LWJ0blwiPlxuICAgICAgJHticnVzaFN2Z31cbiAgICA8L2J1dHRvbj5cbiAgYDtcbiAgICAgICAgdGhpcy5pc0RyYXdpbmdMaW5lID0gZmFsc2U7XG4gICAgfVxuICAgIG9uTW91bnRlZCgpIHtcbiAgICAgICAgdGhpcy5kb20ucXVlcnlTZWxlY3RvcihcIiNicnVzaC13aWRnZXRcIikub25jbGljayA9XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB9XG4gICAgbW91c2VEb3duKHsgcm9jb2NvMmQsIHBvaW50ZXIgfSwgbmV4dCkge1xuICAgICAgICBpZiAodGhpcy5pc0RyYXdpbmdMaW5lKSB7XG4gICAgICAgICAgICAvLyDorqnmiYDmnInlhYPntKDlpLHljrvmv4DmtLvnirbmgIFcbiAgICAgICAgICAgIHJvY29jbzJkLmRlYWN0aXZhdGVBbGxXaXRoRGlzcGF0Y2goKTtcbiAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlckFsbCgpO1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBwb2ludGVyO1xuICAgICAgICAgICAgdGhpcy5wYXRoID0gbmV3IFBhdGgoWzAsIDAsIDAsIDBdLCB7XG4gICAgICAgICAgICAgICAgdG9wOiB5LFxuICAgICAgICAgICAgICAgIGxlZnQ6IHgsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgb3JpZ2luWDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogXCJ0b3BcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wYXRoLnNldHVwU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aC5zZXRDb29yZHMoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aC5jYW52YXMgPSByb2NvY28yZDtcbiAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlclRvcChbdGhpcy5wYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW91c2VNb3ZlKHsgcG9pbnRlciwgcm9jb2NvMmQgfSwgbmV4dCkge1xuICAgICAgICBpZiAodGhpcy5pc0RyYXdpbmdMaW5lICYmIHRoaXMucGF0aCkge1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBwb2ludGVyO1xuICAgICAgICAgICAgdGhpcy5wYXRoLnNldEVuZCh4IC0gdGhpcy5wYXRoLmxlZnQsIHkgLSB0aGlzLnBhdGgudG9wKTtcbiAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlclRvcChbdGhpcy5wYXRoXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW91c2VVcCh7IHJvY29jbzJkIH0sIG5leHQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nTGluZSkge1xuICAgICAgICAgICAgcm9jb2NvMmQuX3NoYXBlcy5wdXNoKHRoaXMucGF0aCk7XG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJBbGwoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IG51bGw7XG4gICAgICAgICAgICAvLyDlj5bmtojpq5jkuq5cbiAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlclRvcCgpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5fYWN0aXZlR3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhd2luZ0xpbmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL57uY5Yi2XCIpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5zZXRDdXJzb3IoXCJjcm9zc2hhaXJcIik7XG4gICAgICAgICAgICB0aGlzLnJvY29jbzJkLmFjdGlvbiA9IFwiZHJhd1wiO1xuICAgICAgICAgICAgdGhpcy5pc0RyYXdpbmdMaW5lID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi57uT5p2f57uY5Yi2XCIpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5zZXRDdXJzb3IoXCJkZWZhdWx0XCIpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5hY3Rpb24gPSBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgIHRoaXMuaXNEcmF3aW5nTGluZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTGluZSB9IGZyb20gXCIuLi9lbnRpdGllcy9lbGVtZW50cy9saW5lLmVudGl0eVwiO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0XCI7XG5jb25zdCBicnVzaFN2ZyA9ICc8c3ZnIGZvY3VzYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJcIiBkYXRhLWljb249XCJoaWdobGlnaHRcIiB3aWR0aD1cIjFlbVwiIGhlaWdodD1cIjFlbVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB2aWV3Qm94PVwiNjQgNjQgODk2IDg5NlwiPjxwYXRoIGQ9XCJNOTU3LjYgNTA3LjRMNjAzLjIgMTU4LjJhNy45IDcuOSAwIDAwLTExLjIgMEwzNTMuMyAzOTMuNGE4LjAzIDguMDMgMCAwMC0uMSAxMS4zbC4xLjEgNDAgMzkuNC0xMTcuMiAxMTUuM2E4LjAzIDguMDMgMCAwMC0uMSAxMS4zbC4xLjEgMzkuNSAzOC45LTE4OS4xIDE4N0g3Mi4xYy00LjQgMC04LjEgMy42LTguMSA4Vjg2MGMwIDQuNCAzLjYgOCA4IDhoMzQ0LjljMi4xIDAgNC4xLS44IDUuNi0yLjNsNzYuMS03NS42IDQwLjQgMzkuOGE3LjkgNy45IDAgMDAxMS4yIDBsMTE3LjEtMTE1LjYgNDAuMSAzOS41YTcuOSA3LjkgMCAwMDExLjIgMGwyMzguNy0yMzUuMmMzLjQtMyAzLjQtOCAuMy0xMS4yek0zODkuOCA3OTYuMkgyMjkuNmwxMzQuNC0xMzMgODAuMSA3OC45LTU0LjMgNTQuMXptMTU0LjgtNjIuMUwzNzMuMiA1NjUuMmw2OC42LTY3LjYgMTcxLjQgMTY4LjktNjguNiA2Ny42ek03MTMuMSA2NThMNDUwLjMgMzk5LjEgNTk3LjYgMjU0bDI2Mi44IDI1OS0xNDcuMyAxNDV6XCI+PC9wYXRoPjwvc3ZnPic7XG5leHBvcnQgY2xhc3MgTGluZURyYXdXaWRnZXQgZXh0ZW5kcyBXaWRnZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmlubmVySFRNTCA9IGBcbiAgICAgIDxzdHlsZT5cbiAgICAgIC53aWRnZXQtYnRuIHtcbiAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICAgICAgY29sb3I6ICM4NjM4ZTU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ5OTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBjdWJpYy1iZXppZXIoLjY0NSwuMDQ1LC4zNTUsMSk7XG4gICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW46IDEwcHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDNweCAjMDAwMDAwO1xuICAgICAgfVxuICAgICAgLndpZGdldC1idG46aG92ZXJ7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxidXR0b24gaWQ9XCJicnVzaC13aWRnZXRcIiBjbGFzcz1cIndpZGdldC1idG5cIj5cbiAgICAgICR7YnJ1c2hTdmd9XG4gICAgPC9idXR0b24+XG4gIGA7XG4gICAgICAgIHRoaXMuaXNEcmF3aW5nTGluZSA9IGZhbHNlO1xuICAgIH1cbiAgICBvbk1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoXCIjYnJ1c2gtd2lkZ2V0XCIpLm9uY2xpY2sgPVxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIG1vdXNlRG93bih7IHJvY29jbzJkLCBwb2ludGVyIH0sIG5leHQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nTGluZSkge1xuICAgICAgICAgICAgLy8g6K6p5omA5pyJ5YWD57Sg5aSx5Y675r+A5rS754q25oCBXG4gICAgICAgICAgICByb2NvY28yZC5kZWFjdGl2YXRlQWxsV2l0aERpc3BhdGNoKCk7XG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJBbGwoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9pbnRlcjtcbiAgICAgICAgICAgIHRoaXMubGluZSA9IG5ldyBMaW5lKFswLCAwLCAwLCAwXSwge1xuICAgICAgICAgICAgICAgIHRvcDogeSxcbiAgICAgICAgICAgICAgICBsZWZ0OiB4LFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgICAgICAgICAgICAgIG9yaWdpblg6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IFwidG9wXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubGluZS5zZXR1cFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmxpbmUuc2V0Q29vcmRzKCk7XG4gICAgICAgICAgICB0aGlzLmxpbmUuY2FudmFzID0gcm9jb2NvMmQ7XG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJUb3AoW3RoaXMubGluZV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vdXNlTW92ZSh7IHBvaW50ZXIsIHJvY29jbzJkIH0sIG5leHQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nTGluZSAmJiB0aGlzLmxpbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9pbnRlcjtcbiAgICAgICAgICAgIHRoaXMubGluZS5zZXRFbmQoeCAtIHRoaXMubGluZS5sZWZ0LCB5IC0gdGhpcy5saW5lLnRvcCk7XG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJUb3AoW3RoaXMubGluZV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vdXNlVXAoeyByb2NvY28yZCB9LCBuZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhd2luZ0xpbmUpIHtcbiAgICAgICAgICAgIHJvY29jbzJkLl9zaGFwZXMucHVzaCh0aGlzLmxpbmUpO1xuICAgICAgICAgICAgcm9jb2NvMmQucmVuZGVyQWxsKCk7XG4gICAgICAgICAgICB0aGlzLmxpbmUgPSBudWxsO1xuICAgICAgICAgICAgLy8g5Y+W5raI6auY5LquXG4gICAgICAgICAgICByb2NvY28yZC5yZW5kZXJUb3AoKTtcbiAgICAgICAgICAgIHRoaXMucm9jb2NvMmQuX2FjdGl2ZUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYXdpbmdMaW5lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+e7mOWItlwiKTtcbiAgICAgICAgICAgIHRoaXMucm9jb2NvMmQuc2V0Q3Vyc29yKFwiY3Jvc3NoYWlyXCIpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5hY3Rpb24gPSBcImRyYXdcIjtcbiAgICAgICAgICAgIHRoaXMuaXNEcmF3aW5nTGluZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIue7k+adn+e7mOWItlwiKTtcbiAgICAgICAgICAgIHRoaXMucm9jb2NvMmQuc2V0Q3Vyc29yKFwiZGVmYXVsdFwiKTtcbiAgICAgICAgICAgIHRoaXMucm9jb2NvMmQuYWN0aW9uID0gXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICB0aGlzLmlzRHJhd2luZ0xpbmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuLi9lbnRpdGllcy9lbGVtZW50cy9yZWN0LmVudGl0eVwiO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0XCI7XG5jb25zdCByZWN0RHJhd1N2ZyA9ICc8c3ZnIGZvY3VzYWJsZT1cImZhbHNlXCIgY2xhc3M9XCJcIiBkYXRhLWljb249XCJib3JkZXJcIiB3aWR0aD1cIjFlbVwiIGhlaWdodD1cIjFlbVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIiB2aWV3Qm94PVwiNjQgNjQgODk2IDg5NlwiPjxwYXRoIGQ9XCJNODgwIDExMkgxNDRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjczNmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg3MzZjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTQ0YzAtMTcuNy0xNC4zLTMyLTMyLTMyem0tNDAgNzI4SDE4NFYxODRoNjU2djY1NnpcIj48L3BhdGg+PC9zdmc+Jztcbi8qKlxuICog55+p5b2i57uY5Yi25oyC5Lu2XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWN0RHJhd1dpZGdldCBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgIDxzdHlsZT5cbiAgICAgIC53aWRnZXQtYnRuIHtcbiAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICAgICAgY29sb3I6ICM4NjM4ZTU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ5OTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBjdWJpYy1iZXppZXIoLjY0NSwuMDQ1LC4zNTUsMSk7XG4gICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW46IDEwcHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAwIDJweCAjMDAwMDAwO1xuICAgICAgfVxuICAgICAgLndpZGdldC1idG46aG92ZXJ7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxidXR0b24gaWQ9XCJyZWN0LWRyYXctd2lkZ2V0XCIgY2xhc3M9XCJ3aWRnZXQtYnRuXCI+XG4gICAgICAke3JlY3REcmF3U3ZnfVxuICAgIDwvYnV0dG9uPlxuICBgO1xuICAgICAgICB0aGlzLmlzRHJhd2luZ1JlY3QgPSBmYWxzZTtcbiAgICB9XG4gICAgbW91c2VEb3duKHsgcm9jb2NvMmQsIHBvaW50ZXIgfSwgbmV4dCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nUmVjdCkge1xuICAgICAgICAgICAgICAgIHJvY29jbzJkLl9ncm91cFNlbGVjdG9yID0ge1xuICAgICAgICAgICAgICAgICAgICAvLyDph43nva7pgInljLrnirbmgIFcbiAgICAgICAgICAgICAgICAgICAgZXg6IHBvaW50ZXIueCxcbiAgICAgICAgICAgICAgICAgICAgZXk6IHBvaW50ZXIueSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8g6K6p5omA5pyJ5YWD57Sg5aSx5Y675r+A5rS754q25oCBXG4gICAgICAgICAgICAgICAgcm9jb2NvMmQuZGVhY3RpdmF0ZUFsbFdpdGhEaXNwYXRjaCgpO1xuICAgICAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlckFsbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHlpZWxkIG5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1vdXNlTW92ZSh7IHBvaW50ZXIsIHJvY29jbzJkIH0sIG5leHQpIHtcbiAgICAgICAgbGV0IGdyb3VwU2VsZWN0b3IgPSByb2NvY28yZC5fZ3JvdXBTZWxlY3RvcjtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmF3aW5nUmVjdCkge1xuICAgICAgICAgICAgaWYgKGdyb3VwU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzmnInmi5bok53moYbpgInljLrln59cbiAgICAgICAgICAgICAgICBncm91cFNlbGVjdG9yLmxlZnQgPVxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyLnggLSByb2NvY28yZC5fb2Zmc2V0LmxlZnQgLSBncm91cFNlbGVjdG9yLmV4O1xuICAgICAgICAgICAgICAgIGdyb3VwU2VsZWN0b3IudG9wID0gcG9pbnRlci55IC0gcm9jb2NvMmQuX29mZnNldC50b3AgLSBncm91cFNlbGVjdG9yLmV5O1xuICAgICAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlclRvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vdXNlVXAoeyByb2NvY28yZCB9LCBuZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhd2luZ1JlY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvY29jbzJkLl9ncm91cFNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZXgsIGV5LCBsZWZ0LCB0b3AgfSA9IHJvY29jbzJkLl9ncm91cFNlbGVjdG9yO1xuICAgICAgICAgICAgLy8g57uY5Yi25paw5aKe5Ye65p2l55qE55+p5b2iXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgICAgICAgICAgIHRvcDogZXkgKyB0b3AgLyAyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGV4ICsgbGVmdCAvIDIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGxlZnQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0b3AsXG4gICAgICAgICAgICAgICAgZmlsbDogXCIjMGM5OWZmNTBcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzBjOTlmZlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb2NvY28yZC5fc2hhcGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICByZWN0LnNldHVwU3RhdGUoKTtcbiAgICAgICAgICAgIHJlY3Quc2V0Q29vcmRzKCk7XG4gICAgICAgICAgICByZWN0LmNhbnZhcyA9IHJvY29jbzJkO1xuICAgICAgICAgICAgcm9jb2NvMmQucmVuZGVyQWxsKCk7XG4gICAgICAgICAgICAvLyDlj5bmtojpq5jkuq5cbiAgICAgICAgICAgIHJvY29jbzJkLl9ncm91cFNlbGVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgIHJvY29jbzJkLnJlbmRlclRvcCgpO1xuICAgICAgICAgICAgdGhpcy5yb2NvY28yZC5fYWN0aXZlR3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g5oyC5Lu25oiQ5Yqf5oyC6L2977yM5Li65oyC5Lu2IGRvbSDlhYPntKDnu5Hlrprkuovku7ZcbiAgICBvbk1vdW50ZWQoKSB7XG4gICAgICAgIHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoXCIjcmVjdC1kcmF3LXdpZGdldFwiKS5vbmNsaWNrID1cbiAgICAgICAgICAgIHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBvbkNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmF3aW5nUmVjdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vnu5jliLZcIik7XG4gICAgICAgICAgICB0aGlzLnJvY29jbzJkLnNldEN1cnNvcihcImNyb3NzaGFpclwiKTtcbiAgICAgICAgICAgIHRoaXMucm9jb2NvMmQuYWN0aW9uID0gXCJkcmF3XCI7XG4gICAgICAgICAgICB0aGlzLmlzRHJhd2luZ1JlY3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnu5PmnZ/nu5jliLZcIik7XG4gICAgICAgICAgICB0aGlzLnJvY29jbzJkLnNldEN1cnNvcihcImRlZmF1bHRcIik7XG4gICAgICAgICAgICB0aGlzLnJvY29jbzJkLmFjdGlvbiA9IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgdGhpcy5pc0RyYXdpbmdSZWN0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uL2Jhc2UvdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBXaWRnZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlubmVySFRNTCA9IGBgO1xuICAgICAgICB0aGlzLnN0eWxlID0ge307XG4gICAgfVxuICAgIHNldFN0eWxlKHN0eWxlKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRvbSkge1xuICAgICAgICAgICAgVXRpbC5zZXRTdHlsZSh0aGlzLmRvbSwgc3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBtb3VudCgpIHtcbiAgICAgICAgVXRpbC5zZXRTdHlsZSh0aGlzLmRvbSwgdGhpcy5zdHlsZSk7XG4gICAgICAgIHRoaXMub25Nb3VudGVkKCk7XG4gICAgfVxuICAgIG9uTW91bnRlZCgpIHsgfVxufVxuIiwiaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSBcIi4vd2lkZ2V0XCI7XG5jb25zdCB6b29tSW5TdmcgPSAnPHN2ZyBmb2N1c2FibGU9XCJmYWxzZVwiIGNsYXNzPVwiXCIgZGF0YS1pY29uPVwiem9vbS1pblwiIHdpZHRoPVwiMWVtXCIgaGVpZ2h0PVwiMWVtXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHZpZXdCb3g9XCI2NCA2NCA4OTYgODk2XCI+PHBhdGggZD1cIk02MzcgNDQzSDUxOVYzMDljMC00LjQtMy42LTgtOC04aC02MGMtNC40IDAtOCAzLjYtOCA4djEzNEgzMjVjLTQuNCAwLTggMy42LTggOHY2MGMwIDQuNCAzLjYgOCA4IDhoMTE4djEzNGMwIDQuNCAzLjYgOCA4IDhoNjBjNC40IDAgOC0zLjYgOC04VjUxOWgxMThjNC40IDAgOC0zLjYgOC04di02MGMwLTQuNC0zLjYtOC04LTh6bTI4NCA0MjRMNzc1IDcyMWMxMjIuMS0xNDguOSAxMTMuNi0zNjkuNS0yNi01MDktMTQ4LTE0OC4xLTM4OC40LTE0OC4xLTUzNyAwLTE0OC4xIDE0OC42LTE0OC4xIDM4OSAwIDUzNyAxMzkuNSAxMzkuNiAzNjAuMSAxNDguMSA1MDkgMjZsMTQ2IDE0NmMzLjIgMi44IDguMyAyLjggMTEgMGw0My00M2MyLjgtMi43IDIuOC03LjggMC0xMXpNNjk2IDY5NmMtMTE4LjggMTE4LjctMzExLjIgMTE4LjctNDMwIDAtMTE4LjctMTE4LjgtMTE4LjctMzExLjIgMC00MzAgMTE4LjgtMTE4LjcgMzExLjItMTE4LjcgNDMwIDAgMTE4LjcgMTE4LjggMTE4LjcgMzExLjIgMCA0MzB6XCI+PC9wYXRoPjwvc3ZnPic7XG5jb25zdCB6b29tT3V0U3ZnID0gJzxzdmcgZm9jdXNhYmxlPVwiZmFsc2VcIiBjbGFzcz1cIlwiIGRhdGEtaWNvbj1cInpvb20tb3V0XCIgd2lkdGg9XCIxZW1cIiBoZWlnaHQ9XCIxZW1cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdmlld0JveD1cIjY0IDY0IDg5NiA4OTZcIj48cGF0aCBkPVwiTTYzNyA0NDNIMzI1Yy00LjQgMC04IDMuNi04IDh2NjBjMCA0LjQgMy42IDggOCA4aDMxMmM0LjQgMCA4LTMuNiA4LTh2LTYwYzAtNC40LTMuNi04LTgtOHptMjg0IDQyNEw3NzUgNzIxYzEyMi4xLTE0OC45IDExMy42LTM2OS41LTI2LTUwOS0xNDgtMTQ4LjEtMzg4LjQtMTQ4LjEtNTM3IDAtMTQ4LjEgMTQ4LjYtMTQ4LjEgMzg5IDAgNTM3IDEzOS41IDEzOS42IDM2MC4xIDE0OC4xIDUwOSAyNmwxNDYgMTQ2YzMuMiAyLjggOC4zIDIuOCAxMSAwbDQzLTQzYzIuOC0yLjcgMi44LTcuOCAwLTExek02OTYgNjk2Yy0xMTguOCAxMTguNy0zMTEuMiAxMTguNy00MzAgMC0xMTguNy0xMTguOC0xMTguNy0zMTEuMiAwLTQzMCAxMTguOC0xMTguNyAzMTEuMi0xMTguNyA0MzAgMCAxMTguNyAxMTguOCAxMTguNyAzMTEuMiAwIDQzMHpcIj48L3BhdGg+PC9zdmc+Jztcbi8qKlxuICog55+p5b2i57uY5Yi25oyC5Lu2XG4gKi9cbmV4cG9ydCBjbGFzcyBab29tV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgPHN0eWxlPlxuICAgICAgICAud2lkZ2V0LWJ0biB7XG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgICAgIGNvbG9yOiAjODYzOGU1O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS40OTk7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgY3ViaWMtYmV6aWVyKC42NDUsLjA0NSwuMzU1LDEpO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbjogMTBweDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAycHggIzAwMDAwMDtcbiAgICAgICAgfVxuICAgICAgICAud2lkZ2V0LWJ0bjpob3ZlcntcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG4gICAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxidXR0b24gaWQ9XCJ6b29tLWluLXdpZGdldFwiIGNsYXNzPVwid2lkZ2V0LWJ0blwiIHRpdGxlPVwi5pS+5aSnXCI+XG4gICAgICAgICR7em9vbUluU3ZnfVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gaWQ9XCJ6b29tLW91dC13aWRnZXRcIiBjbGFzcz1cIndpZGdldC1idG5cIiB0aXRsZT1cIue8qeWwj1wiPlxuICAgICAgICAke3pvb21PdXRTdmd9XG4gICAgPC9idXR0b24+XG4gIGA7XG4gICAgfVxuICAgIC8vIOaMguS7tuaIkOWKn+aMgui9ve+8jOS4uuaMguS7tiBkb20g5YWD57Sg57uR5a6a5LqL5Lu2XG4gICAgb25Nb3VudGVkKCkge1xuICAgICAgICB0aGlzLmRvbS5xdWVyeVNlbGVjdG9yKFwiI3pvb20taW4td2lkZ2V0XCIpLm9uY2xpY2sgPVxuICAgICAgICAgICAgdGhpcy56b29tSW4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kb20ucXVlcnlTZWxlY3RvcihcIiN6b29tLW91dC13aWRnZXRcIikub25jbGljayA9XG4gICAgICAgICAgICB0aGlzLnpvb21PdXQuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgbW91c2VEb3duKHsgZSB9LCBuZXh0KSB7XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG4gICAgem9vbUluKCkge1xuICAgICAgICB0aGlzLnJvY29jbzJkLnpvb21JbigpO1xuICAgIH1cbiAgICB6b29tT3V0KCkge1xuICAgICAgICB0aGlzLnJvY29jbzJkLnpvb21PdXQoKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IFJvY29jbzJEVmlldywgUmVjdCwgUm9jb2NvSW1hZ2UsIFpvb21XaWRnZXQsIFJlY3REcmF3V2lkZ2V0LCBMaW5lLCBQYXRoLCBUZXh0LCBMaW5lRHJhd1dpZGdldCwgfSBmcm9tIFwiQHJvY29jb2pzLzJkXCI7XG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHpvb21XaWRnZXQgPSBuZXcgWm9vbVdpZGdldCgpLnNldFN0eWxlKHtcbiAgICAgICAgbGVmdDogXCIwcHhcIixcbiAgICB9KTtcbiAgICBjb25zdCByZWN0ZHJhd1dpZGdldCA9IG5ldyBSZWN0RHJhd1dpZGdldCgpLnNldFN0eWxlKHtcbiAgICAgICAgbGVmdDogXCIwcHhcIixcbiAgICAgICAgdG9wOiBcIjkycHhcIixcbiAgICB9KTtcbiAgICBjb25zdCBsaW5lRHJhd1dpZGdldCA9IG5ldyBMaW5lRHJhd1dpZGdldCgpLnNldFN0eWxlKHtcbiAgICAgICAgbGVmdDogXCIwcHhcIixcbiAgICAgICAgdG9wOiBcIjEzOHB4XCIsXG4gICAgfSk7XG4gICAgY29uc3QgY2FudmFzID0gbmV3IFJvY29jbzJEVmlldyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSwge1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICAvLyBzY2FsZTogMixcbiAgICAgICAgLy8gcHJlU2NhbGU6IDIsXG4gICAgICAgIHdpZGdldHM6IFt6b29tV2lkZ2V0LCByZWN0ZHJhd1dpZGdldCwgbGluZURyYXdXaWRnZXRdLFxuICAgIH0pO1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICAgIHRvcDogOTgwLFxuICAgICAgICBsZWZ0OiA1MDAsXG4gICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgIGhlaWdodDogMTUwLFxuICAgICAgICBmaWxsOiBcIiM4OTIwYTU4MFwiLFxuICAgICAgICByeDogMTAsXG4gICAgICAgIHJ5OiAxMCxcbiAgICAgICAgLy8gYW5nbGU6IDQ1LFxuICAgIH0pO1xuICAgIGNvbnN0IGxpbmUgPSBuZXcgTGluZShbMCwgMCwgMTcwLCAyMDBdLCB7XG4gICAgICAgIHRvcDogNDAwLFxuICAgICAgICBsZWZ0OiA5ODUsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgICAgICBzdHJva2VTdHlsZTogXCJyZWRcIixcbiAgICAgICAgZmlsbFN0eWxlOiBcInJlZFwiLFxuICAgIH0pO1xuICAgIGNvbnN0IHBhdGggPSBuZXcgUGF0aChbXG4gICAgICAgIFtcIk1cIiwgMCwgMF0sXG4gICAgICAgIFtcIkxcIiwgMjAwLCAxMDBdLFxuICAgICAgICBbXCJMXCIsIDE3MCwgMjAwXSxcbiAgICBdLCB7XG4gICAgICAgIGZpbGw6IG51bGwsXG4gICAgICAgIHN0cm9rZTogXCJyZWRcIixcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgICAgIHRvcDogNDAwLFxuICAgICAgICBsZWZ0OiAxMDAwLFxuICAgICAgICAvLyBzdHJva2VMaW5lQ2FwOiB0aGlzLnN0cm9rZUxpbmVDYXAsXG4gICAgICAgIC8vIHN0cm9rZU1pdGVyTGltaXQ6IHRoaXMuc3Ryb2tlTWl0ZXJMaW1pdCxcbiAgICAgICAgLy8gc3Ryb2tlTGluZUpvaW46IHRoaXMuc3Ryb2tlTGluZUpvaW4sXG4gICAgICAgIC8vIHN0cm9rZURhc2hBcnJheTogdGhpcy5zdHJva2VEYXNoQXJyYXksXG4gICAgfSk7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0KGDwn46J8J+OifCfjonwn4y58J+MufCfjLkgICAgICAgICAgICAgICAgIFxuICAgIOasoui/juS9v+eUqCBSb2NvY29qc++8jOaCqOWPr+S7pemVv+aMiea7mui9ruaLluaLveeUu+W4g+enu+WKqOinhuinkmAsIHtcbiAgICAgICAgbGluZUhlaWdodDogMjgsXG4gICAgICAgIHRvcDogMTAwMCxcbiAgICAgICAgbGVmdDogNTAwLFxuICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICB9KTtcbiAgICBjb25zdCBpbWdzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiaHR0cHM6Ly9mYWJyaWUtcHJvZC5vc3MtY24tc2hhbmdoYWkuYWxpeXVuY3MuY29tL2ltYWdlLzYxZGU1YTBiY2I2MDc0MmVlOGM5OGI2Yi8xNjQyNDExNzgxMzQ4LTAuNjY4OTMxMzc3NDEwMTUzNVwiLFxuICAgICAgICAgICAgdG9wOiAzMDAsXG4gICAgICAgICAgICBsZWZ0OiAyNTAsXG4gICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA1MDAsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJodHRwczovL2ZhYnJpZS1wcm9kLm9zcy1jbi1zaGFuZ2hhaS5hbGl5dW5jcy5jb20vaW1hZ2UvNjFkZTVhMGJjYjYwNzQyZWU4Yzk4YjZiLzE2NDI0MTMzMjQxMzAtMC41MDA2MDg1NjcxODg3MTc3XCIsXG4gICAgICAgICAgICB0b3A6IDE1MCxcbiAgICAgICAgICAgIGxlZnQ6IDYwMCxcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vc3QtZ2R4LmRhbmNmLmNvbS9nYW9kaW5neC80NDQ5L2NvbmZpZ3MvYWN0aXZpdHkvMjAyMjA5MDgtMTcxNDUyLTI2NzguanBnXCIsXG4gICAgICAgICAgICB0b3A6IDcwMCxcbiAgICAgICAgICAgIGxlZnQ6IDI1MCxcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vc3QtZ2R4LmRhbmNmLmNvbS9nYW9kaW5neC80NDQ5L2NvbmZpZ3MvYWN0aXZpdHkvMjAyMjA5MDgtMTY1OTA0LTNhNjkuanBnXCIsXG4gICAgICAgICAgICB0b3A6IDQwMCxcbiAgICAgICAgICAgIGxlZnQ6IDUwMCxcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vc3QtZ2R4LmRhbmNmLmNvbS9nYW9kaW5neC80NDQ5L2NvbmZpZ3MvYWN0aXZpdHkvMjAyMjA5MDgtMTY1OTM0LTVhZDUuanBnXCIsXG4gICAgICAgICAgICB0b3A6IDQwMCxcbiAgICAgICAgICAgIGxlZnQ6IDcwMCxcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vc3QtZ2R4LmRhbmNmLmNvbS9nYW9kaW5neC80NDQ5L2NvbmZpZ3MvYWN0aXZpdHkvMjAyMjA5MDgtMTY1OTM5LTE5ODYuanBnXCIsXG4gICAgICAgICAgICB0b3A6IDcwMCxcbiAgICAgICAgICAgIGxlZnQ6IDUwMCxcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vc3QtZ2R4LmRhbmNmLmNvbS9nYW9kaW5neC80NDQ5L2NvbmZpZ3MvYWN0aXZpdHkvMjAyMjA5MDgtMTY1OTQ3LWQ5MzguanBnXCIsXG4gICAgICAgICAgICB0b3A6IDcwMCxcbiAgICAgICAgICAgIGxlZnQ6IDcwMCxcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgfSxcbiAgICBdLm1hcCgoX2EpID0+IHtcbiAgICAgICAgdmFyIHsgc3JjIH0gPSBfYSwgb3BzID0gX19yZXN0KF9hLCBbXCJzcmNcIl0pO1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgcmV0dXJuIG5ldyBSb2NvY29JbWFnZShpbWcsIG9wcyk7XG4gICAgfSk7XG4gICAgaW1ncy5mb3JFYWNoKChpbWcpID0+IHtcbiAgICAgICAgY2FudmFzLmFkZChpbWcpO1xuICAgIH0pO1xuICAgIGNhbnZhcy5hZGQocmVjdCkuYWRkKHBhdGgpLmFkZChsaW5lKS5hZGQodGV4dCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9