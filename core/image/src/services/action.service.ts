import type { MarkType } from "../interfaces/shapes/mark.interface";
import type { ISuperMarker } from "../interfaces/base.interface";

export type ActionType = "default" | "mark" | "drag" | "move";

export class ActionService<T extends ISuperMarker> {
  // 画布操纵类对象
  private superMarker: T;
  // 当前操作类型
  private currentActionType: ActionType;
  // 当前标注的类型
  private currentMarkType: MarkType;

  // 初始化
  load(vm) {
    this.superMarker = vm;
    this.setAction("default");
    this.installDragEvent();
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
  setMarkType(type: MarkType) {
    this.currentMarkType = type;
  }

  // 注册拖拽事件
  private installDragEvent() {
    const vm = this;
    const agent = vm.superMarker.canvasAgent;
    vm.superMarker.containView.addEventListener("mousedown", dragStart, true);

    let x = 0;
    let y = 0;

    function dragMove(e) {
      vm.superMarker.clearCanvas();
      agent.offset.x = agent.currentOffset.x + (e.x - x);
      agent.offset.y = agent.currentOffset.y + (e.y - y);
      vm.superMarker.drawCanvas();
    }
    function dragEnd() {
      agent.currentOffset.x = agent.offset.x;
      agent.currentOffset.y = agent.offset.y;
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
}
