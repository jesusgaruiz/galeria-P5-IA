function setup() {
    createCanvas(300, 240);
  }
  
  function draw() {
    background(0, 250, 255);
    fill(155);
    ellipse(width / 2, height / 2, 100 + 50 * sin(frameCount * 0.05));
  }
  