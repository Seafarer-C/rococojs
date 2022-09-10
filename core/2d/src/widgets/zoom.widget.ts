import { Util } from "../base/utils";
import { Widget } from "./widget";

const zoomInSvg =
  '<svg focusable="false" class="" data-icon="zoom-in" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>';

const zoomOutSvg =
  '<svg focusable="false" class="" data-icon="zoom-out" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>';
/**
 * 矩形绘制挂件
 */
export class ZoomWidget extends Widget {
  innerHTML = `
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
            box-shadow: 0 0 2px #000000;
        }
        .widget-btn:hover{
            background-color: #f0f0f0;
        }
    </style>
    <button id="zoom-in-widget" class="widget-btn" title="放大">
        ${zoomInSvg}
    </button>
    <button id="zoom-out-widget" class="widget-btn" title="缩小">
        ${zoomOutSvg}
    </button>
  `;

  // 挂件成功挂载，为挂件 dom 元素绑定事件
  onMounted() {
    (this.dom.querySelector("#zoom-in-widget") as HTMLElement).onclick =
      this.zoomIn.bind(this);

    (this.dom.querySelector("#zoom-out-widget") as HTMLElement).onclick =
      this.zoomOut.bind(this);
  }
  mouseDown({ e }, next) {
    next();
  }

  zoomIn() {
    this.rococo2d.zoomIn();
  }
  zoomOut() {
    this.rococo2d.zoomOut();
  }
}
