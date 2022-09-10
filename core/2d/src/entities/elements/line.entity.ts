import { Shape } from "../../base/shape";

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
        return (
          Math.min(this.get(axis1), this.get(axis2)) + 0.5 * this.get(dimension)
        );
      case farthest:
        return Math.max(this.get(axis1), this.get(axis2));
    }
  };
}

/** 线类 */
export class Line extends Shape {
  public type: string = "line";

  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;

  coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 };

  constructor(points, options) {
    super(options);
    if (!points) {
      points = [0, 0, 0, 0];
    }
    this.x1 = points[0];
    this.y1 = points[1];
    this.x2 = points[2];
    this.y2 = points[3];
    this._setWidthHeight(options);
  }

  setEnd(x2, y2) {
    this.x2 = x2;
    this.y2 = y2;
    this.width = Math.abs(this.x2 - this.x1);
    this.height = Math.abs(this.y2 - this.y1);
  }

  /**
   * @private
   * @param {Object} [options] Options
   */
  _setWidthHeight(options?) {
    options || (options = {});

    this.width = Math.abs(this.x2 - this.x1);
    this.height = Math.abs(this.y2 - this.y1);
    this.left = "left" in options ? options.left : this._getLeftToOriginX();
    this.top = "top" in options ? options.top : this._getTopToOriginY();
  }

  _render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    var p = this.calcLinePoints();
    ctx.moveTo(p.x1, p.y1);
    ctx.lineTo(p.x2, p.y2);

    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.stroke || ctx.fillStyle;
    ctx.stroke();
  }
  toObject(propertiesToInclude) {
    return Object.assign(super.toObject(propertiesToInclude), {
      rx: this.get("rx") || 0,
      ry: this.get("ry") || 0,
    });
  }

  /**
   * This function is an helper for svg import. it returns the center of the object in the svg
   * untransformed coordinates
   * @private
   * @return {Object} center point from element coordinates
   */
  _findCenterFromElement() {
    return {
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
    };
  }

  /**
   * @private
   * @return {Number} leftToOriginX Distance from left edge of canvas to originX of Line.
   */
  _getLeftToOriginX = makeEdgeToOriginGetter(
    {
      // property names
      origin: "originX",
      axis1: "x1",
      axis2: "x2",
      dimension: "width",
    },
    {
      // possible values of origin
      nearest: "left",
      center: "center",
      farthest: "right",
    }
  );
  /**
   * @private
   * @return {Number} topToOriginY Distance from top edge of canvas to originY of Line.
   */
  _getTopToOriginY = makeEdgeToOriginGetter(
    {
      // property names
      origin: "originY",
      axis1: "y1",
      axis2: "y2",
      dimension: "height",
    },
    {
      // possible values of origin
      nearest: "top",
      center: "center",
      farthest: "bottom",
    }
  );

  /**
   * Recalculates line points given width and height
   * @private
   */
  calcLinePoints() {
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
      y2: y2,
    };
  }

  _toSVG() {
    var p = this.calcLinePoints();
    return [
      "<line ",
      "COMMON_PARTS",
      'x1="',
      p.x1,
      '" y1="',
      p.y1,
      '" x2="',
      p.x2,
      '" y2="',
      p.y2,
      '" />\n',
    ];
  }
}
