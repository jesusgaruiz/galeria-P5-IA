export class Sketch13 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  draw(p) {
    const bg = this.params.background || [200, 220, 255];
    p.background(...bg);

    const fillColor = this.params.fill || [150, 75, 0];
    p.fill(...fillColor);
    
    // Draw house base (square)
    p.rect(150, 200, 100, 100);

    // Draw roof (triangle)
    p.fill(255, 0, 0);
    p.triangle(140, 200, 260, 200, 200, 120);

    // Draw windows (circles)
    p.fill(255, 255, 0);
    p.ellipse(175, 230, 30, 30);
    p.ellipse(225, 230, 30, 30);
    
    // Draw door (rectangle)
    p.fill(100, 50, 0);
    p.rect(190, 250, 20, 50);
  }
}