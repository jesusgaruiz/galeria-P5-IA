export class Sketch3{
  setup(p) {
    p.createCanvas(300, 240);
  }
  
  draw(p) {
    p.background(0, 250, 255);
    p.fill(155);
    p.ellipse(p.width / 2, p.height / 2, 100 + 50 * p.sin(p.frameCount * 0.05));
  }
}