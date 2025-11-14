export class Sketch6 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    p.background(255);
    p.fill(255, 0, 0);
    for (let i = 0; i < 10; i++) {
      p.ellipse(p.random(p.width), p.random(p.height), 50, 50);
    }
  }
}