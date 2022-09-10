import { Point } from "./point";
import { IAnimationOption, Offset, Transform } from "./interface";

const PiBy180 = Math.PI / 180; // 写在这里相当于缓存，因为会频繁调用
const iMatrix = [1, 0, 0, 1, 0, 0];
const PiBy2 = Math.PI * 2;
export class Util {
  /**
   * 把源对象的某些属性赋值给目标对象
   * @param source 源对象
   * @param destination 目标对象
   * @param properties 需要赋值的属性
   */
  static populateWithProperties(source, destination, properties) {
    if (
      properties &&
      Object.prototype.toString.call(properties) === "[object Array]"
    ) {
      for (var i = 0, len = properties.length; i < len; i++) {
        destination[properties[i]] = source[properties[i]];
      }
    }
  }
  static loadImage(url, options: any = {}) {
    return new Promise(function (resolve, reject) {
      let img = document.createElement("img");
      let done = () => {
        img.onload = img.onerror = null;
        resolve(img);
      };
      if (url) {
        img.onload = done;
        img.onerror = () => {
          reject(new Error("Error loading " + img.src));
        };
        options &&
          options.crossOrigin &&
          (img.crossOrigin = options.crossOrigin);
        img.src = url;
      } else {
        done();
      }
    });
  }
  static clone(obj) {
    if (!obj || typeof obj !== "object") return obj;
    let temp = new obj.constructor();
    for (let key in obj) {
      if (!obj[key] || typeof obj[key] !== "object") {
        temp[key] = obj[key];
      } else {
        temp[key] = Util.clone(obj[key]);
      }
    }
    return temp;
  }
  static animate(options: IAnimationOption) {
    window.requestAnimationFrame((timestamp: number) => {
      let start = timestamp || +new Date(), // 开始时间
        duration = options.duration || 500, // 动画时间
        finish = start + duration, // 结束时间
        time, // 当前时间
        onChange = options.onChange || (() => {}),
        abort = options.abort || (() => false),
        easing =
          options.easing ||
          ((t, b, c, d) => -c * Math.cos((t / d) * (Math.PI / 2)) + c + b),
        startValue = options.startValue || 0, // 初始值
        endValue = options.endValue || 100, // 结束值
        byValue = options.byValue || endValue - startValue; // 值的变化范围

      function tick(ticktime: number) {
        // tick 的主要任务就是根据时间更新值
        time = ticktime || +new Date();
        let currentTime = time > finish ? duration : time - start; // 当前已经执行了多久时间（介于0~duration）
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
  static removeFromArray(array: any[], value: any) {
    let idx = array.indexOf(value);
    if (idx !== -1) {
      array.splice(idx, 1);
    }
    return array;
  }
  /**
   * 数组的最小值
   */
  static min(array: any[], byProperty = "") {
    if (!array || array.length === 0) return undefined;

    let i = array.length - 1,
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
  static max(array: any[], byProperty = "") {
    if (!array || array.length === 0) return undefined;

    let i = array.length - 1,
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
  static toFixed(number: number | string, fractionDigits: number): number {
    return parseFloat(Number(number).toFixed(fractionDigits));
  }
  /** 获取鼠标的点击坐标，相对于页面左上角，注意不是画布的左上角，到时候会减掉 offset */
  static getPointer(event: Event, upperCanvasEl: HTMLCanvasElement, scale = 1) {
    event || (event = window.event);

    let element: HTMLElement | Document = event.target as
        | Document
        | HTMLElement,
      body = document.body || { scrollLeft: 0, scrollTop: 0 },
      docElement = document.documentElement,
      orgElement = element,
      scrollLeft = 0,
      scrollTop = 0,
      firstFixedAncestor;

    while (element && element.parentNode && !firstFixedAncestor) {
      element = element.parentNode as Document | HTMLElement;
      if (
        element !== document &&
        Util.getElementPosition(element as HTMLElement) === "fixed"
      )
        firstFixedAncestor = element;

      if (
        element !== document &&
        orgElement !== upperCanvasEl &&
        Util.getElementPosition(element as HTMLElement) === "absolute"
      ) {
        scrollLeft = 0;
        scrollTop = 0;
      } else if (element === document && orgElement !== upperCanvasEl) {
        scrollLeft = body.scrollLeft || docElement.scrollLeft || 0;
        scrollTop = body.scrollTop || docElement.scrollTop || 0;
      } else {
        scrollLeft += (element as HTMLElement).scrollLeft || 0;
        scrollTop += (element as HTMLElement).scrollTop || 0;
      }
    }

    return {
      x: Util.pointerX(event) / scale + scrollLeft,
      y: Util.pointerY(event) / scale + scrollTop,
    };
  }
  /** 根据矩阵反推出具体变换数值 */
  static qrDecompose(m: number[]): Transform {
    let angle = Math.atan2(m[1], m[0]),
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
      translateY: m[5],
    };
  }
  static invertTransform(t) {
    let a = 1 / (t[0] * t[3] - t[1] * t[2]),
      r = [a * t[3], -a * t[1], -a * t[2], a * t[0]],
      o = Util.transformPoint({ x: t[4], y: t[5] }, r, true);
    r[4] = -o.x;
    r[5] = -o.y;
    return r;
  }
  static transformPoint(p, t, ignoreOffset: boolean = false) {
    if (ignoreOffset) {
      return new Point(t[0] * p.x + t[2] * p.y, t[1] * p.x + t[3] * p.y);
    }
    return new Point(
      t[0] * p.x + t[2] * p.y + t[4],
      t[1] * p.x + t[3] * p.y + t[5]
    );
  }
  static multiplyTransformMatrices(a, b, is2x2 = false) {
    // Matrix multiply a * b
    return [
      a[0] * b[0] + a[2] * b[1],
      a[1] * b[0] + a[3] * b[1],
      a[0] * b[2] + a[2] * b[3],
      a[1] * b[2] + a[3] * b[3],
      is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4],
      is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5],
    ];
  }
  static makeBoundingBoxFromPoints(points) {
    let xPoints = [points[0].x, points[1].x, points[2].x, points[3].x],
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
      height: height,
    };
  }
  static pointerX(event) {
    return event.clientX || 0;
  }
  static pointerY(event) {
    return event.clientY || 0;
  }
  /** 获取元素位置 */
  static getElementPosition(element: HTMLElement) {
    return window.getComputedStyle(element, null).position;
  }
  /** 角度转弧度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */
  static degreesToRadians(degrees: number): number {
    return degrees * PiBy180;
  }
  /** 弧度转角度，注意 canvas 中用的都是弧度，但是角度对我们来说比较直观 */
  static radiansToDegrees(radians: number): number {
    return radians / PiBy180;
  }
  /**
   * 将 point 绕 origin 旋转 radians 弧度
   * @param {Point} point 要旋转的点
   * @param {Point} origin 旋转中心点
   * @param {number} radians 注意 canvas 中用的都是弧度
   * @returns
   */
  static rotatePoint(point: Point, origin: Point, radians: number): Point {
    const sin = Math.sin(radians),
      cos = Math.cos(radians);

    point.subtractEquals(origin);

    const rx = point.x * cos - point.y * sin;
    const ry = point.x * sin + point.y * cos;

    return new Point(rx, ry).addEquals(origin);
  }
  /** 单纯的创建一个新的 canvas 元素 */
  static createCanvasElement() {
    const canvas = document.createElement("canvas");
    return canvas;
  }
  /** 给元素添加类名 */
  static addClass(element: HTMLElement, className: string) {
    if ((" " + element.className + " ").indexOf(" " + className + " ") === -1) {
      element.className += (element.className ? " " : "") + className;
    }
  }
  /** 计算元素偏移值 */
  static getElementOffset(element): Offset {
    let valueT = 0,
      valueL = 0;
    do {
      valueT += element.offsetTop || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return { left: valueL, top: valueT };
  }
  /** 包裹元素并替换 */
  static wrapElement(
    element: HTMLElement,
    wrapper: HTMLElement | string,
    attributes
  ) {
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
  static makeElement(tagName: string, attributes) {
    let el = document.createElement(tagName);
    for (let prop in attributes) {
      if (prop === "class") {
        el.className = attributes[prop];
      } else {
        el.setAttribute(prop, attributes[prop]);
      }
    }
    return el;
  }
  /** 给元素设置样式 */
  static setStyle(element: HTMLElement, styles) {
    let elementStyle = element.style;

    if (typeof styles === "string") {
      element.style.cssText += ";" + styles;
      return styles.indexOf("opacity") > -1
        ? Util.setOpacity(element, styles.match(/opacity:\s*(\d?\.?\d*)/)[1])
        : element;
    }
    for (let property in styles) {
      if (property === "opacity") {
        Util.setOpacity(element, styles[property]);
      } else {
        elementStyle[property] = styles[property];
      }
    }
    return element;
  }
  /** 设置元素透明度 */
  static setOpacity(element: HTMLElement, value: string) {
    element.style.opacity = value;
    return element;
  }
  /** 设置 css 的 userSelect 样式为 none，也就是不可选中的状态 */
  static makeElementUnselectable(element: HTMLElement): HTMLElement {
    element.style.userSelect = "none";
    return element;
  }
  static addListener(element, eventName, handler) {
    element.addEventListener(eventName, handler, false);
  }
  static removeListener(element, eventName, handler) {
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
  static composeMatrix(options) {
    var matrix = [1, 0, 0, 1, options.translateX || 0, options.translateY || 0],
      multiply = Util.multiplyTransformMatrices;
    if (options.angle) {
      matrix = multiply(matrix, Util.calcRotateMatrix(options));
    }
    if (
      options.scaleX !== 1 ||
      options.scaleY !== 1 ||
      options.skewX ||
      options.skewY ||
      options.flipX ||
      options.flipY
    ) {
      matrix = multiply(matrix, Util.calcDimensionsMatrix(options));
    }
    return matrix;
  }
  static calcDimensionsMatrix(options) {
    var scaleX = typeof options.scaleX === "undefined" ? 1 : options.scaleX,
      scaleY = typeof options.scaleY === "undefined" ? 1 : options.scaleY,
      scaleMatrix = [
        options.flipX ? -scaleX : scaleX,
        0,
        0,
        options.flipY ? -scaleY : scaleY,
        0,
        0,
      ],
      multiply = Util.multiplyTransformMatrices,
      degreesToRadians = Util.degreesToRadians;
    if (options.skewX) {
      scaleMatrix = multiply(
        scaleMatrix,
        [1, 0, Math.tan(degreesToRadians(options.skewX)), 1],
        true
      );
    }
    if (options.skewY) {
      scaleMatrix = multiply(
        scaleMatrix,
        [1, Math.tan(degreesToRadians(options.skewY)), 0, 1],
        true
      );
    }
    return scaleMatrix;
  }
  static calcRotateMatrix(options) {
    if (!options.angle) {
      return iMatrix.concat();
    }
    var theta = Util.degreesToRadians(options.angle),
      cos = Math.cos(theta),
      sin = Math.sin(theta);
    return [cos, sin, -sin, cos, 0, 0];
  }
  static matrixToSVG(transform) {
    return (
      "matrix(" +
      transform
        .map((value) => {
          return Util.toFixed(value, 2);
        })
        .join(" ") +
      ")"
    );
  }
  // 洋葱任务模型
  static compose(middleware: Array<(context, next) => Promise<any>>) {
    return function (context, next?) {
      let index = -1;
      return dispatch(0);

      function dispatch(i) {
        if (i <= index)
          return Promise.reject(new Error("next() called multiple times"));
        index = i;
        let fn = middleware[i];

        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();
        try {
          return Promise.resolve(
            fn(context, function next() {
              return dispatch(i + 1);
            })
          );
        } catch (err) {
          return Promise.reject(err);
        }
      }
    };
  }

  static getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
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
      x =
        mt * mt * mt * x0 +
        3 * mt * mt * t * x1 +
        3 * mt * t * t * x2 +
        t * t * t * x3;
      bounds[0][j] = x;

      y =
        mt * mt * mt * y0 +
        3 * mt * mt * t * y1 +
        3 * mt * t * t * y2 +
        t * t * t * y3;
      bounds[1][j] = y;
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    var result = [
      {
        x: min.apply(null, bounds[0]),
        y: min.apply(null, bounds[1]),
      },
      {
        x: max.apply(null, bounds[0]),
        y: max.apply(null, bounds[1]),
      },
    ];
    return result;
  }

  static calcVectorAngle(ux, uy, vx, vy) {
    var ta = Math.atan2(uy, ux),
      tb = Math.atan2(vy, vx);
    if (tb >= ta) {
      return tb - ta;
    } else {
      return 2 * Math.PI - (ta - tb);
    }
  }

  static sin(angle: number) {
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

  static cos(angle: number) {
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

  static segmentToBezier(
    th2,
    th3,
    cosTh,
    sinTh,
    rx,
    ry,
    cx1,
    cy1,
    mT,
    fromX,
    fromY
  ) {
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

  static arcToSegments(toX, toY, rx, ry, large, sweep, rotateX) {
    var PI = Math.PI,
      th = (rotateX * PI) / 180,
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
      root =
        (large === sweep ? -1.0 : 1.0) *
        Math.sqrt(pl / (rx2 * py2 + ry2 * px2));
    }

    var cx = (root * rx * py) / ry,
      cy = (-root * ry * px) / rx,
      cx1 = cosTh * cx - sinTh * cy + toX * 0.5,
      cy1 = sinTh * cx + cosTh * cy + toY * 0.5,
      mTheta = Util.calcVectorAngle(1, 0, (px - cx) / rx, (py - cy) / ry),
      dtheta = Util.calcVectorAngle(
        (px - cx) / rx,
        (py - cy) / ry,
        (-px - cx) / rx,
        (-py - cy) / ry
      );

    if (sweep === 0 && dtheta > 0) {
      dtheta -= 2 * PI;
    } else if (sweep === 1 && dtheta < 0) {
      dtheta += 2 * PI;
    }

    // Convert into cubic bezier segments <= 90deg
    var segments = Math.ceil(Math.abs((dtheta / PI) * 2)),
      result = [],
      mDelta = dtheta / segments,
      mT =
        ((8 / 3) * Math.sin(mDelta / 4) * Math.sin(mDelta / 4)) /
        Math.sin(mDelta / 2),
      th3 = mTheta + mDelta;

    for (var i = 0; i < segments; i++) {
      result[i] = Util.segmentToBezier(
        mTheta,
        th3,
        cosTh,
        sinTh,
        rx,
        ry,
        cx1,
        cy1,
        mT,
        fromX,
        fromY
      );
      fromX = result[i][5];
      fromY = result[i][6];
      mTheta = th3;
      th3 += mDelta;
    }
    return result;
  }

  static fromArcToBeziers(fx, fy, coords) {
    var rx = coords[1],
      ry = coords[2],
      rot = coords[3],
      large = coords[4],
      sweep = coords[5],
      tx = coords[6],
      ty = coords[7],
      segsNorm = Util.arcToSegments(
        tx - fx,
        ty - fy,
        rx,
        ry,
        large,
        sweep,
        rot
      );

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

  static makePathSimpler(path) {
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
      switch (
        current[0] // first letter
      ) {
        case "l": // lineto, relative
          current[0] = "L";
          current[1] += x;
          current[2] += y;
        // falls through
        case "L":
          x = current[1];
          y = current[2];
          break;
        case "h": // horizontal lineto, relative
          current[1] += x;
        // falls through
        case "H":
          current[0] = "L";
          current[2] = y;
          x = current[1];
          break;
        case "v": // vertical lineto, relative
          current[1] += y;
        // falls through
        case "V":
          current[0] = "L";
          y = current[1];
          current[1] = x;
          current[2] = y;
          break;
        case "m": // moveTo, relative
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
        case "c": // bezierCurveTo, relative
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
        case "s": // shorthand cubic bezierCurveTo, relative
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
          current[2] = controlY;
          // current[3] and current[4] are NOW the second control point.
          // we keep it for the next reflection.
          controlX = current[3];
          controlY = current[4];
          break;
        case "q": // quadraticCurveTo, relative
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
        case "t": // shorthand quadraticCurveTo, relative
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
          destinationPath = destinationPath.concat(
            Util.fromArcToBeziers(x, y, current)
          );
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

  // static parsePath(pathString) {
  //   var result = [],
  //       coords = [],
  //       currentPath,
  //       parsed,
  //       re = fabric.rePathCommand,
  //       rNumber = '[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?\\s*',
  //       rNumberCommaWsp = '(' + rNumber + ')' + fabric.commaWsp,
  //       rFlagCommaWsp = '([01])' + fabric.commaWsp + '?',
  //       rArcSeq = rNumberCommaWsp + '?' + rNumberCommaWsp + '?' + rNumberCommaWsp + rFlagCommaWsp + rFlagCommaWsp +
  //         rNumberCommaWsp + '?(' + rNumber + ')',
  //       regArcArgumentSequence = new RegExp(rArcSeq, 'g'),
  //       match,
  //       coordsStr,
  //       // one of commands (m,M,l,L,q,Q,c,C,etc.) followed by non-command characters (i.e. command values)
  //       path;
  //   if (!pathString || !pathString.match) {
  //     return result;
  //   }
  //   path = pathString.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);

  //   for (var i = 0, coordsParsed, len = path.length; i < len; i++) {
  //     currentPath = path[i];

  //     coordsStr = currentPath.slice(1).trim();
  //     coords.length = 0;

  //     var command = currentPath.charAt(0);
  //     coordsParsed = [command];

  //     if (command.toLowerCase() === 'a') {
  //       // arcs have special flags that apparently don't require spaces so handle special
  //       for (var args; (args = regArcArgumentSequence.exec(coordsStr));) {
  //         for (var j = 1; j < args.length; j++) {
  //           coords.push(args[j]);
  //         }
  //       }
  //     }
  //     else {
  //       while ((match = re.exec(coordsStr))) {
  //         coords.push(match[0]);
  //       }
  //     }

  //     for (var j = 0, jlen = coords.length; j < jlen; j++) {
  //       parsed = parseFloat(coords[j]);
  //       if (!isNaN(parsed)) {
  //         coordsParsed.push(parsed);
  //       }
  //     }

  //     var commandLength = commandLengths[command.toLowerCase()],
  //         repeatedCommand = repeatedCommands[command] || command;

  //     if (coordsParsed.length - 1 > commandLength) {
  //       for (var k = 1, klen = coordsParsed.length; k < klen; k += commandLength) {
  //         result.push([command].concat(coordsParsed.slice(k, k + commandLength)));
  //         command = repeatedCommand;
  //       }
  //     }
  //     else {
  //       result.push(coordsParsed);
  //     }
  //   }

  //   return result;
  // };
}
