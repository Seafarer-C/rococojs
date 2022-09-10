import { Line } from "../entities/elements/line.entity";
import { Widget } from "./widget";

const brushSvg =
  '<svg focusable="false" class="" data-icon="highlight" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M957.6 507.4L603.2 158.2a7.9 7.9 0 00-11.2 0L353.3 393.4a8.03 8.03 0 00-.1 11.3l.1.1 40 39.4-117.2 115.3a8.03 8.03 0 00-.1 11.3l.1.1 39.5 38.9-189.1 187H72.1c-4.4 0-8.1 3.6-8.1 8V860c0 4.4 3.6 8 8 8h344.9c2.1 0 4.1-.8 5.6-2.3l76.1-75.6 40.4 39.8a7.9 7.9 0 0011.2 0l117.1-115.6 40.1 39.5a7.9 7.9 0 0011.2 0l238.7-235.2c3.4-3 3.4-8 .3-11.2zM389.8 796.2H229.6l134.4-133 80.1 78.9-54.3 54.1zm154.8-62.1L373.2 565.2l68.6-67.6 171.4 168.9-68.6 67.6zM713.1 658L450.3 399.1 597.6 254l262.8 259-147.3 145z"></path></svg>';

export class BrushWidget extends Widget {
  innerHTML: string = `
      <style>
      .widget-btn {
          height: 36px;
          width: 36px;
          color: #8638e5;
          background-color: #ffffff;
          font-weight: 400;
          font-size: 16px;
          border-radius: 50%;
          cursor: pointer;
          line-height: 1.499;
          position: relative;
          display: inline-block;
          font-weight: 500;
          white-space: nowrap;
          text-align: center;
          background-image: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all .3s cubic-bezier(.645,.045,.355,1);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          touch-action: manipulation;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px;
          box-shadow: 0 0 3px #000000;
      }
      .widget-btn:hover{
          background-color: #f0f0f0;
      }
    </style>
    <button id="brush-widget" class="widget-btn">
      ${brushSvg}
    </button>
  `;
  onMounted() {
    (this.dom.querySelector("#brush-widget") as HTMLElement).onclick =
      this.onClick.bind(this);
  }

  isDrawingLine = false;

  line: Line;

  mouseDown({ rococo2d, pointer }, next) {
    if (this.isDrawingLine) {
      // 让所有元素失去激活状态
      rococo2d.deactivateAllWithDispatch();
      rococo2d.renderAll();
      const { x, y } = pointer;
      this.line = new Line([0, 0, 0, 0], {
        top: y,
        left: x,
        strokeWidth: 2,
        originX: "left",
        originY: "top",
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

  mouseMove({ pointer, rococo2d }, next) {
    if (this.isDrawingLine && this.line) {
      const { x, y } = pointer;
      this.line.setEnd(x - this.line.left, y - this.line.top);
      rococo2d.renderTop([this.line]);
      return;
    } else {
      next();
    }
  }

  mouseUp({ rococo2d }, next) {
    if (this.isDrawingLine) {
      rococo2d._shapes.push(this.line);

      rococo2d.renderAll();
      this.line = null;
      // 取消高亮
      rococo2d.renderTop();
      this.rococo2d._activeGroup = null;
      this.onClick();
      return;
    } else {
      next();
    }
  }

  onClick() {
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
}
