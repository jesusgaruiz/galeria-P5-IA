export class Sketch16 {
  constructor() {
    this.redColor = [255, 0, 0];
    this.blueColor = [0, 0, 255];
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    p.background(this.blueColor);
    p.fill(this.redColor);
    p.ellipse(p.width / 2, p.height / 2, 200, 200);
  }
}