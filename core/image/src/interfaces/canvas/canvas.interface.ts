import { IShape } from "../shapes/shape.interface";

export interface ICanvasAgent {
  ctx;
  canvas;
  width: number;
  height: number;

  init: Function;
  draw: (shapes: Array<IShape>) => void;
  clearCanvas: Function;
  resetCanvas: Function;
  zoomIn: Function;
  zoomOut: Function;
}
