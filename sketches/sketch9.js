export class Sketch9 {
  constructor() {
    // initialize variables here
    this.lineColor = [128, 0, 128]; // purple color
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    p.background(255);
    p.stroke(this.lineColor);
    p.strokeWeight(4);
    for (let i = 0; i < p.width; i += 20) {
      p.line(i, 0, i, p.height); // vertical lines
    }
    for (let j = 0; j < p.height; j += 20) {
      p.line(0, j, p.width, j); // horizontal lines
    }
  }
}