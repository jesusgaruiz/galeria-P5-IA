export class Sketch6 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [255, 204, 0];
    p.background(...bg);

    let time = p.frameCount * 0.05;
    p.noFill();
    for (let i = 0; i < 10; i++) {
      p.stroke(255 - i * 25, 100 + i * 15, 0);
      p.beginShape();
      for (let j = 0; j < 360; j += 5) {
        let angle = p.radians(j);
        let radius = 100 + i * 10 + p.sin(time + j * 0.1) * 20;
        let x = p.width / 2 + p.cos(angle) * radius;
        let y = p.height / 2 + p.sin(angle) * radius;
        p.vertex(x, y);
      }
      p.endShape();
    }
  }
}