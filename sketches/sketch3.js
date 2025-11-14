export class Sketch3 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(300, 240);
  }

  draw(p) {
    // Usar params.background si existe, si no usar default
    const bg = this.params.background || [0, 250, 255];
    p.background(...bg);

    const fillColor = this.params.fill || 155;
    p.fill(fillColor);

    p.ellipse(
      p.width / 2,
      p.height / 2,
      100 + 50 * p.sin(p.frameCount * 0.05)
    );
  }
}
