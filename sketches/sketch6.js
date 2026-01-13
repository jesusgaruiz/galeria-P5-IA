
export class Sketch6 {
  static get config() {
    return {
      petalCount: { value: 5, min: 1, max: 10 },
      petalLength: { value: 50, min: 10, max: 100 },
      petalColor: { value: 150, min: 0, max: 255 }
    };
  }

  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [100, 150, 200];
    p.background(...bg);

    // Audio & GUI usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let petalCount = this.params.custom.petalCount;
    let petalLength = this.params.custom.petalLength;
    let petalColor = this.params.custom.petalColor;

    for (let i = 0; i < petalCount; i++) {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate((p.TWO_PI / petalCount) * i);
      p.fill(petalColor, 100 + bass * 0.5, 150);
      p.ellipse(0, petalLength + bass * 0.5, 30, petalLength);
      p.pop();
    }

    // Draw the center of the flower
    p.fill(255, 200, 0);
    p.ellipse(p.width / 2, p.height / 2, 50);
  }
}
