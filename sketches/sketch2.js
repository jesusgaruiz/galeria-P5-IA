export class Sketch2 {
  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [135, 206, 235]; // Sky blue
    p.background(...bg);

    // House
    p.fill(210, 180, 140); // House color
    p.rect(300, 300, 200, 150); // House body

    // Roof
    p.fill(178, 34, 34); // Roof color
    p.triangle(250, 300, 400, 200, 550, 300); // Roof

    // Door
    p.fill(139, 69, 19); // Door color
    p.rect(375, 350, 50, 100); // Door

    // Window
    p.fill(255); // Window color
    p.rect(325, 325, 40, 40); // Left window
    p.rect(435, 325, 40, 40); // Right window

    // Tree
    p.fill(139, 69, 19); // Tree trunk color
    p.rect(150, 400, 30, 70); // Trunk
    p.fill(0, 128, 0); // Tree leaves color
    p.ellipse(165, 370, 100, 100); // Leaves
  }
}