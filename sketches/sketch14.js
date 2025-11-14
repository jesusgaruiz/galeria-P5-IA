export class Sketch14 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    p.background(0, 255, 0); // verde
    p.fill(255, 0, 0); // rojo
    p.ellipse(p.width / 2, p.height / 2, 100, 100);
  }
}