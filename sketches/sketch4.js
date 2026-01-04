export class Sketch4 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235]; // default sky blue
    p.background(...bg);

    // Draw mountains
    p.fill(139, 69, 19); // brown color for mountains
    p.triangle(100, 400, 300, 100, 500, 400); // left mountain
    p.triangle(400, 400, 600, 50, 800, 400); // right mountain

    // Draw grass
    p.fill(34, 139, 34); // forest green
    p.rect(0, 400, p.width, 200);

    // Draw sun
    p.fill(255, 255, 0); // yellow color for sun
    p.ellipse(700, 100, 80, 80); // sun
  }
}