export class Sketch5 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [255, 204, 0];
    p.background(...bg);

    // Drawing the sand
    p.fill(194, 178, 128);
    p.rect(0, 400, 800, 200);

    // Drawing the oasis water
    p.fill(0, 102, 204);
    p.ellipse(p.width / 2, p.height / 2 + 50, 300, 150);

    // Drawing palm trees
    p.fill(139, 69, 19);
    p.rect(100, 300, 20, 100); // trunk left
    p.rect(600, 300, 20, 100); // trunk right

    p.fill(34, 139, 34);
    for (let i = 0; i < 5; i++) {
      p.triangle(70, 300, 130, 200 + i * 10, 50, 200 + i * 10); // left palm leaves
      p.triangle(570, 300, 630, 200 + i * 10, 650, 200 + i * 10); // right palm leaves
    }
  }
}