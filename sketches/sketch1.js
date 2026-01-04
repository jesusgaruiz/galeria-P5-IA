export class Sketch1 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235];
    p.background(...bg);

    // Draw house
    p.fill(200, 150, 100); // house color
    p.rect(300, 300, 200, 200); // house body

    // Draw roof
    p.fill(150, 75, 0); // roof color
    p.triangle(250, 300, 400, 200, 550, 300); // roof

    // Draw door
    p.fill(100, 50, 0); // door color
    p.rect(370, 400, 60, 100); // door

    // Draw windows
    p.fill(255); // window color
    p.rect(320, 350, 50, 50); // left window
    p.rect(430, 350, 50, 50); // right window

    // Draw garden
    p.fill(34, 139, 34); // garden color
    p.rect(0, 500, 800, 100); // garden area

    // Draw pine tree
    p.fill(139, 69, 19); // trunk color
    p.rect(650, 450, 20, 50); // trunk
    p.fill(0, 128, 0); // pine color
    p.triangle(640, 450, 670, 350, 700, 450); // pine foliage
    p.triangle(645, 400, 670, 300, 695, 400); // pine foliage
  }
}