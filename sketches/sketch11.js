export class Sketch11 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 300);
    p.background(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.fill(0);
  }

  draw(p) {
    p.background(255);
    p.fill(0);
    p.text('Caritas Sonrientes', p.width / 2, p.height / 2);
    p.ellipse(p.width / 2, p.height / 2 + 50, 50, 50); // smiley face
    p.fill(255, 204, 0);
    p.ellipse(p.width / 2, p.height / 2 + 50, 50, 50); // face
    p.fill(0);
    p.ellipse(p.width / 2 - 15, p.height / 2 + 45, 5, 5); // left eye
    p.ellipse(p.width / 2 + 15, p.height / 2 + 45, 5, 5); // right eye
    p.noFill();
    p.arc(p.width / 2, p.height / 2 + 50, 30, 30, 0, p.PI); // smile
  }
}