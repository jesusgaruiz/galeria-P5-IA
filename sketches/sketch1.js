export class Sketch1 {
  setup(p) {
    p.createCanvas(300, 240);
    p.noLoop();
  }
  
  draw(p) {
    p.background(255, 200, 0);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.text("Sketch 1", p.width / 2, p.height / 2);
  }
}
  
