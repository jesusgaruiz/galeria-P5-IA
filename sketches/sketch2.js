export class Sketch2 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235]; // Default sky blue
    p.background(...bg);

    // Draw the sun
    p.fill(255, 204, 0);
    p.ellipse(700, 100, 100); // Positioning sun

    // Draw beach
    p.fill(255, 224, 178); // Sandy color
    p.rect(0, 400, p.width, 200); // Beach area

    // Draw umbrellas
    this.drawUmbrella(p, 100, 350);
    this.drawUmbrella(p, 300, 350);
    this.drawUmbrella(p, 500, 350);
  }

  drawUmbrella(p, x, y) {
    // Umbrella top
    p.fill(255, 0, 0); // Red color
    p.arc(x, y, 80, 80, p.PI, 0, p.CHORD);

    // Umbrella pole
    p.fill(139, 69, 19); // Brown color for the pole
    p.rect(x - 5, y, 10, 50);
  }
}