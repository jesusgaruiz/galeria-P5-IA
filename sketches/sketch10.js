export class Sketch10 {
  constructor() {
    this.x = 0;
    this.speed = 2;
  }

  setup(p) {
    p.createCanvas(600, 400);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
  }

  draw(p) {
    p.background(255);
    p.fill(0);
    p.text('Letras en Movimiento', this.x, p.height / 2);
    this.x += this.speed;

    if (this.x > p.width || this.x < 0) {
      this.speed *= -1;
    }
  }
}