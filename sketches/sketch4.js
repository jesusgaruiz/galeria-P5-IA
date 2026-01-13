
export class Sketch4 {
  static get config() {
    return {
      mountainHeight: { value: 120, min: 50, max: 300 },
      snowColor: { value: 255, min: 200, max: 255 }
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
    const bg = this.params.background || [135, 206, 250]; // Sky blue
    p.background(...bg);
    
    // Audio usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let mountainHeight = this.params.custom.mountainHeight;
    let snowColor = this.params.custom.snowColor;

    // Draw mountains
    for (let i = 0; i < 5; i++) {
      let x = (i * p.width) / 5;
      let height = mountainHeight + bass * 0.1; // Adjust mountain height with bass
      p.fill(100, 100, 100);
      p.triangle(x, p.height, x + 100, p.height - height, x + 200, p.height);
      
      // Draw snow caps on mountains
      p.fill(snowColor, snowColor, snowColor);
      p.triangle(x + 20, p.height - height + 30, x + 100, p.height - height - 20, x + 180, p.height - height + 30);
    }
  }
}
