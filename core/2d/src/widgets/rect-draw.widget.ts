import { Widget } from "./widget";

const rectDrawSvg =
  '<svg focusable="false" class="" data-icon="border" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>';
/**
 * 矩形绘制挂件
 */
export class RectDrawWidget extends Widget {
  innerHTML = `
    <style>
        #rect-draw-widget {
            height: 36px;
            color: #fff;
            background-color: #2254f4;
            border-color: #2254f4;    
            font-weight: 400;
            line-height: 30px;
            padding: 0 16px;
            font-size: 14px;
            border-radius: 8px;
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
        }
        #rect-draw-widget:hover{
            color: #fff;
            background-color: #4972f6;
            border-color: #4972f6;
        }
    </style>
    <button id="rect-draw-widget">矩形</button>
  `;

  // 是否正在绘制巨星
  isDrawingRect = false;

  mouseDown({ e }, next) {
    // this.rococoCanvas
    next();
  }
  mouseMove({ e, pointer }, next) {
    next();
  }
  mouseUp({ e }, next) {
    next();
  }

  // 挂件成功挂载，为挂件 dom 元素绑定事件
  onMounted() {
    (this.dom.querySelector("#rect-draw-widget") as HTMLElement).onclick =
      this.onClick.bind(this);
  }

  onClick() {
    console.log("开始绘制");
    console.log(this.rococoCanvas);
    this.rococoCanvas._setCursor("crosshair");
  }
}
