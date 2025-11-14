export class Sketch7 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    p.background(255);
    p.fill(0, 255, 0);
    p.rect(100, 100, 200, 200);
  }
}