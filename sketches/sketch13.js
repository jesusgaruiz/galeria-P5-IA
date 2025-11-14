export class Sketch13 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 300);
    p.noLoop();
  }

  draw(p) {
    p.background(135, 206, 250);
    p.fill(255, 215, 0);
    p.ellipse(p.width / 2, p.height / 2, 150, 150);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.text('Sketch 13', p.width / 2, p.height / 2);
  }
}