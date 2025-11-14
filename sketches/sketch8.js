export class Sketch8 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(400, 400);
    p.background(255);
    p.noLoop();
  }

  draw(p) {
    p.stroke(128, 0, 128);  // Set stroke color to purple
    p.strokeWeight(4);      // Set line weight
    p.line(50, 50, 350, 50); // Draw a horizontal purple line
    p.line(50, 150, 350, 150); // Draw another horizontal purple line
    p.line(50, 250, 350, 250); // Draw another horizontal purple line
    p.line(50, 350, 350, 350); // Draw another horizontal purple line
  }
}