export class Sketch15 {
  constructor() {
    this.redColor = 255;
    this.blueColor = 0;
  }

  setup(p) {
    p.createCanvas(400, 300);
    p.noLoop();
  }

  draw(p) {
    p.background(this.blueColor);
    p.fill(this.redColor);
    p.ellipse(p.width / 2, p.height / 2, 100, 100);
  }
}