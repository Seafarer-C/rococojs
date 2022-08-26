import type { ISuperMarker } from "../interfaces/base.interface";
import { contextValue } from "../context";
import { ShapeType } from "../interfaces/shapes/shape.interface";

export type ActionType = "default" | "mark" | "drag" | "move";

export class ActionService<T extends ISuperMarker> {
  // 画布操纵类对象
  private superMarker: T;
  // 当前操作类型
  private currentActionType: ActionType;
  // 当前标注的类型
  private currentMarkType: ShapeType;

  @contextValue("mousePosition")
  mousePosition: {
    x: number;
    y: number;
  };

  // 偏移量
  @contextValue("offset")
  offset: {
    x: number;
    y: number;
  };
  @contextValue("currentOffset")
  currentOffset: {
    x: number;
    y: number;
  };

  // 初始化
  load(vm) {
    this.superMarker = vm;
    this.setAction("default");
    this.installDragEvent();
    this.installMoveEvent();
  }

  // 调整当前操作类型
  setAction(type: ActionType) {
    this.currentActionType = type;
    switch (type) {
      case "default":
        this.superMarker.containView.style.cursor = "default";
        break;
      case "drag":
        this.superMarker.containView.style.cursor = "grab";
        break;
      case "mark":
        this.superMarker.containView.style.cursor = "crosshair";
        break;
      case "move":
        this.superMarker.containView.style.cursor = "move";
        break;
    }
  }
  // 调整当前的标注类型
  setMarkType(type: ShapeType) {
    this.currentMarkType = type;
  }

  // 注册拖拽事件
  private installDragEvent() {
    const vm = this;
    vm.superMarker.containView.addEventListener("mousedown", dragStart, true);

    let x = 0;
    let y = 0;

    function dragMove(e) {
      vm.superMarker.clearCanvas();
      vm.offset.x = vm.currentOffset.x + (e.x - x);
      vm.offset.y = vm.currentOffset.y + (e.y - y);
      vm.superMarker.drawCanvas();
    }
    function dragEnd() {
      vm.currentOffset.x = vm.offset.x;
      vm.currentOffset.y = vm.offset.y;
      window.removeEventListener("mousemove", dragMove);
      window.removeEventListener("mouseup", dragEnd);
    }
    function dragStart(e) {
      if (vm.currentActionType !== "drag") return;
      x = e.x;
      y = e.y;
      window.addEventListener("mousemove", dragMove);
      window.addEventListener("mouseup", dragEnd);
    }
  }

  // 注册拖拽事件
  private installMoveEvent() {
    const vm = this;
    vm.superMarker.canvasAgent.canvas.addEventListener(
      "mousedown",
      dragStart,
      true
    );

    // let x = 0;
    // let y = 0;

    function dragMove(e) {
      vm.mousePosition.x = e.x;
      vm.mousePosition.y = e.y;
      console.log(e.x, e.y);
      vm.superMarker.canvasAgent.heightLightTarget.move({
        x: e.x,
        y: e.y,
      });
      vm.superMarker.clearCanvas();
      vm.superMarker.drawCanvas();
    }
    function dragEnd(e) {
      vm.mousePosition.x = e.x;
      vm.mousePosition.y = e.y;
      vm.superMarker.canvasAgent.canvas.removeEventListener(
        "mousemove",
        dragMove
      );
      vm.superMarker.canvasAgent.canvas.removeEventListener("mouseup", dragEnd);
    }
    function dragStart(e) {
      vm.mousePosition.x = e.x;
      vm.mousePosition.y = e.y;
      if (vm.currentActionType !== "move") return;
      // if (!vm.superMarker.canvasAgent.heightLightTarget.hover) return;
      // x = e.x;
      // y = e.y;
      vm.superMarker.canvasAgent.canvas.addEventListener("mousemove", dragMove);
      vm.superMarker.canvasAgent.canvas.addEventListener("mouseup", dragEnd);
    }
  }
}
