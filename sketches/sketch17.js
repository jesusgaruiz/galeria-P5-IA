export class Sketch17 {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.speed = 2;
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.background(255);
  }

  draw(p) {
    p.background(255);
    p.fill(100, 150, 250);
    p.ellipse(this.x, this.y, 50, 30); // drawing a bicycle
    this.x += this.speed;
    if (this.x > p.width) {
      this.x = 0;
    }
  }
}