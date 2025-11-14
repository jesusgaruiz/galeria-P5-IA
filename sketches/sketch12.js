export class Sketch12 {
  constructor() {
    this.apples = [];
    this.gravity = 0.1;
  }

  setup(p) {
    p.createCanvas(400, 400);
    for (let i = 0; i < 5; i++) {
      this.apples.push({
        x: p.random(p.width),
        y: p.random(-200, -50),
        size: p.random(20, 40),
        speed: p.random(1, 3)
      });
    }
  }

  draw(p) {
    p.background(200, 240, 255);
    
    for (let apple of this.apples) {
      apple.y += apple.speed * this.gravity;
      
      if (apple.y > p.height) {
        apple.y = p.random(-200, -50);
        apple.x = p.random(p.width);
      }
      
      p.fill(255, 0, 0);
      p.ellipse(apple.x, apple.y, apple.size);
    }
  }
}