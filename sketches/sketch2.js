
export class Sketch2 {
  static get config() {
    return {
      crabSize: { value: 50, min: 10, max: 100, step: 5 },
      waveAmplitude: { value: 20, min: 0, max: 50, step: 1 }
    };
  }

  constructor(params = {}) {
    this.params = params;
    this.crabs = [];
  }

  setup(p) {
    p.createCanvas(800, 600);
    this.positionCrabs(p);
  }

  positionCrabs(p) {
    const numCrabs = 10;
    for (let i = 0; i < numCrabs; i++) {
      this.crabs.push({
        x: p.random(0, p.width),
        y: p.random(p.height - 50, p.height - 10), // positioning crabs on the sand
        size: this.params.custom.crabSize
      });
    }
  }

  draw(p) {
    const bg = [135, 206, 235]; // sky blue
    p.background(...bg);
    this.drawSand(p);
    this.drawWaves(p);
    this.drawCrabs(p);
  }

  drawSand(p) {
    const sandColor = [222, 184, 135]; // sandy brown
    p.fill(...sandColor);
    p.noStroke();
    p.rect(0, p.height - 100, p.width, 100); // sand rectangle
  }

  drawWaves(p) {
    const waveColor = [255, 255, 255]; // white
    p.fill(...waveColor);
    p.noStroke();
    
    for (let x = 0; x < p.width; x += 10) {
      const waveY = p.height - 100 - this.params.custom.waveAmplitude * Math.sin(x * 0.05 + p.frameCount * 0.1);
      p.ellipse(x, waveY, 30, 10); // waves
    }
  }

  drawCrabs(p) {
    for (const crab of this.crabs) {
      p.fill(255, 0, 0); // red color for crabs
      p.ellipse(crab.x, crab.y, crab.size, crab.size); // draw crab
    }
  }
}
