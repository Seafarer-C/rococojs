import { Shape } from "../../base/shape";
import { Util } from "../../base/utils";

/** 路径类 */
export class Path extends Shape {
  public type: string = "path";
  /**
   * Array of path points
   * @type Array
   * @default
   */
  path = null;

  pathOffset = {
    x: 0,
    y: 0,
  };

  coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 };

  constructor(path, options) {
    super(options);
    this.path = path;
    this._setPath(path || [], options);

    const { width, height, left, top } = this._calcDimensions();
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.pathOffset = {
      x: width / 2,
      y: height / 2,
    };
    this.top = options.top;
    this.left = options.left;
  }

  _setPath(path, options) {
    // this.path = Util.makePathSimpler(
    //   Array.isArray(path) ? path : Util.parsePath(path)
    // );
    // fabric.Polyline.prototype._setPositionDimensions.call(this, options || {});
  }

  /**
   * @private
   * @param {CanvasRenderingContext2D} ctx context to render path on
   */
  _renderPathCommands(ctx) {
    var current, // current instruction
      subpathStartX = 0,
      subpathStartY = 0,
      x = 0, // current x
      y = 0, // current y
      controlX = 0, // current control point x
      controlY = 0, // current control point y
      l = -this.pathOffset.x,
      t = -this.pathOffset.y;

    ctx.beginPath();
    for (var i = 0, len = this.path.length; i < len; ++i) {
      current = this.path[i];

      switch (
        current[0] // first letter
      ) {
        case "L": // lineto, absolute
          x = current[1];
          y = current[2];
          ctx.lineTo(x + l, y + t);
          break;

        case "M": // moveTo, absolute
          x = current[1];
          y = current[2];
          subpathStartX = x;
          subpathStartY = y;
          ctx.moveTo(x + l, y + t);
          break;

        case "C": // bezierCurveTo, absolute
          x = current[5];
          y = current[6];
          controlX = current[3];
          controlY = current[4];
          ctx.bezierCurveTo(
            current[1] + l,
            current[2] + t,
            controlX + l,
            controlY + t,
            x + l,
            y + t
          );
          break;

        case "Q": // quadraticCurveTo, absolute
          ctx.quadraticCurveTo(
            current[1] + l,
            current[2] + t,
            current[3] + l,
            current[4] + t
          );
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
  _render(ctx) {
    this._renderPathCommands(ctx);
    // this._renderPaintInOrder(ctx);
  }

  /**
   * Returns string representation of an instance
   * @return {String} string representation of an instance
   */
  toString() {
    return (
      "#<Path (" +
      this.complexity() +
      '): { "top": ' +
      this.top +
      ', "left": ' +
      this.left +
      " }>"
    );
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
  toDatalessObject(propertiesToInclude) {
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

  _getOffsetTransform() {
    // var digits = fabric.Object.NUM_FRACTION_DIGITS;
    // return ' translate(' + toFixed(-this.pathOffset.x, digits) + ', ' +
    //     toFixed(-this.pathOffset.y, digits) + ')';
  }

  /**
   * Returns svg clipPath representation of an instance
   * @param {Function} [reviver] Method for further parsing of svg representation.
   * @return {String} svg representation of an instance
   */
  toClipPathSVG(reviver) {
    // var additionalTransform = this._getOffsetTransform();
    // return '\t' + this._createBaseClipPathSVGMarkup(
    //   this._toSVG(), { reviver: reviver, additionalTransform: additionalTransform }
    // );
  }

  /**
   * Returns svg representation of an instance
   * @param {Function} [reviver] Method for further parsing of svg representation.
   * @return {String} svg representation of an instance
   */
  toSVG(reviver) {
    // var additionalTransform = this._getOffsetTransform();
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
  complexity() {
    return this.path.length;
  }

  /**
   * @private
   */
  _calcDimensions() {
    var aX = [],
      aY = [],
      current, // current instruction
      subpathStartX = 0,
      subpathStartY = 0,
      x = 0, // current x
      y = 0, // current y
      bounds;

    for (var i = 0, len = this.path.length; i < len; ++i) {
      current = this.path[i];

      switch (
        current[0] // first letter
      ) {
        case "L": // lineto, absolute
          x = current[1];
          y = current[2];
          bounds = [];
          break;

        case "M": // moveTo, absolute
          x = current[1];
          y = current[2];
          subpathStartX = x;
          subpathStartY = y;
          bounds = [];
          break;

        case "C": // bezierCurveTo, absolute
          bounds = Util.getBoundsOfCurve(
            x,
            y,
            current[1],
            current[2],
            current[3],
            current[4],
            current[5],
            current[6]
          );
          x = current[5];
          y = current[6];
          break;

        case "Q": // quadraticCurveTo, absolute
          bounds = Util.getBoundsOfCurve(
            x,
            y,
            current[1],
            current[2],
            current[1],
            current[2],
            current[3],
            current[4]
          );
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

    var minX = Util.min(aX) || 0,
      minY = Util.min(aY) || 0,
      maxX = Util.max(aX) || 0,
      maxY = Util.max(aY) || 0,
      deltaX = maxX - minX,
      deltaY = maxY - minY;

    return {
      left: minX,
      top: minY,
      width: deltaX,
      height: deltaY,
    };
  }
}
