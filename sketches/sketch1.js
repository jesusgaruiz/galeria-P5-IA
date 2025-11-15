export class Sketch1 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(600, 400);
  }

  draw(p) {
    const bg = this.params.background || [0, 250, 255];
    p.background(...bg);

    // Draw the sea
    p.fill(0, 0, 255);
    p.rect(0, p.height / 2, p.width, p.height / 2);

    // Draw the boat
    p.fill(139, 69, 19); // brown color
    p.beginShape();
    p.vertex(p.width / 2 - 30, p.height / 2);
    p.vertex(p.width / 2, p.height / 2 - 30);
    p.vertex(p.width / 2 + 30, p.height / 2);
    p.endShape(p.CLOSE);

    // Draw the birds
    p.fill(255); // white color
    for (let i = 0; i < 5; i++) {
      let x = p.random(0, p.width);
      let y = p.random(0, p.height / 2);
      p.ellipse(x, y, 10, 5); // simple bird shape
    }
  }
}