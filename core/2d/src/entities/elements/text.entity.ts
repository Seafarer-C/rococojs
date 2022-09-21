import { Shape } from "../../base/shape";

/** 文字类 */
export class Text extends Shape {
  constructor(text: string, options) {
    super(options);
    this.text = text;
  }
  type = "text";

  // 文字内容
  text: string;
  // 行高
  lineHeight: number;

  _render(ctx: CanvasRenderingContext2D) {
    ctx.font = "22px sans-serif";
    // 字符分隔为数组
    let arrText = this.text.split("");
    let line = "";
    let x = -(this.width / 2);
    let y = -(this.height / 2);

    let lineNumber = 1;
    // 用来处理分行逻辑
    for (let n = 0; n < arrText.length; n++) {
      let textLine = line + arrText[n];
      let metrics = ctx.measureText(textLine);
      let textWidth = metrics.width;
      if (textWidth > this.width && n > 0) {
        ctx.fillText(line, x, y);
        line = arrText[n];
        y += this.lineHeight;
        lineNumber++;
      } else {
        line = textLine;
      }
    }
    ctx.fillText(line, x, y);
    // 从新计算高度
    this.height = lineNumber * this.lineHeight;
  }
}
