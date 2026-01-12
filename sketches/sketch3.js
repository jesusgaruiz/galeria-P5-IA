export class Sketch3 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235];
    p.background(...bg);

    // Draw mountains
    p.fill(200);
    p.triangle(150, 300, 250, 100, 350, 300);
    p.triangle(400, 300, 500, 50, 600, 300);
    p.fill(255);
    p.triangle(250, 150, 300, 30, 350, 150);
    p.triangle(500, 200, 550, 80, 600, 200);

    // Draw pine trees
    this.drawPineTree(p, 100, 400);
    this.drawPineTree(p, 200, 450);
    this.drawPineTree(p, 300, 400);
    this.drawPineTree(p, 700, 450);
    this.drawPineTree(p, 600, 400);
  }

  drawPineTree(p, x, y) {
    // Draw trunk
    p.fill(139, 69, 19);
    p.rect(x - 10, y, 20, 40);

    // Draw leaves
    p.fill(0, 128, 0);
    p.triangle(x - 30, y, x, y - 60, x + 30, y);
    p.triangle(x - 25, y - 30, x, y - 90, x + 25, y - 30);
    p.triangle(x - 20, y - 60, x, y - 120, x + 20, y - 60);
  }
}