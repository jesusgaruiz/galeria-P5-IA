export class Sketch5 {
  constructor() {
    this.triangulos = [];
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.noLoop();
    this.createTriangles(p);
  }

  draw(p) {
    p.background(255);
    this.triangulos.forEach(triangle => {
      p.fill(255, 255, 0);
      p.triangle(triangle.x1, triangle.y1, triangle.x2, triangle.y2, triangle.x3, triangle.y3);
    });
  }

  createTriangles(p) {
    for (let i = 0; i < 10; i++) {
      this.triangulos.push({
        x1: p.random(p.width),
        y1: p.random(p.height),
        x2: p.random(p.width),
        y2: p.random(p.height),
        x3: p.random(p.width),
        y3: p.random(p.height)
      });
    }
  }
}