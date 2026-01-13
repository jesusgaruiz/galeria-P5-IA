
export class Sketch1 {
  static get config() {
    return {
      windowColor: { value: 255, min: 0, max: 255 },
      houseSize: { value: 200, min: 100, max: 400, step: 10 }
    };
  }

  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235]; // Sky blue
    p.background(...bg);

    // Audio & GUI usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let winColor = this.params.custom.windowColor;
    let houseSize = this.params.custom.houseSize;

    // House base
    p.fill(150, 75, 0); // Brown color for house
    p.rect(p.width / 2 - houseSize / 2, p.height / 2, houseSize, houseSize * 0.6);

    // Roof
    p.fill(255, 0, 0); // Red color for roof
    p.triangle(
      p.width / 2 - houseSize / 2, p.height / 2,
      p.width / 2 + houseSize / 2, p.height / 2,
      p.width / 2, p.height / 2 - houseSize * 0.3
    );

    // Windows
    let winSize = houseSize * 0.15;
    p.fill(winColor);
    p.rect(p.width / 2 - houseSize / 4, p.height / 2 + houseSize * 0.1, winSize, winSize);
    p.rect(p.width / 2 + houseSize / 4 - winSize, p.height / 2 + houseSize * 0.1, winSize, winSize);
    
    // Animate windows based on audio data
    let windowY = p.height / 2 + houseSize * 0.1 + bass * 0.2;
    p.rect(p.width / 2 - houseSize / 4, windowY, winSize, winSize);
    p.rect(p.width / 2 + houseSize / 4 - winSize, windowY, winSize, winSize);
  }
}
