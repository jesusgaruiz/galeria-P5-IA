
export class Sketch7 {
  static get config() {
    return {
      heartSize: { value: 100, min: 50, max: 200 },
      heartColor: { value: 150, min: 0, max: 255 },
      pulseSpeed: { value: 1, min: 0.1, max: 5, step: 0.1 }
    };
  }

  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
    p.noStroke();
  }

  draw(p) {
    const bg = this.params.background || [255, 255, 255];
    p.background(...bg);
    
    // Audio & GUI usage
    const bass = this.params.audio ? this.params.audio.bass : 0;
    const size = this.params.custom.heartSize + bass * this.params.custom.pulseSpeed;
    const colorValue = this.params.custom.heartColor;

    // Heart shape drawing
    p.fill(colorValue, 0, 150);
    this.drawHeart(p, p.width / 2, p.height / 2, size);
  }

  drawHeart(p, x, y, size) {
    p.beginShape();
    p.vertex(x, y);
    p.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    p.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    p.endShape(p.CLOSE);
  }
}
