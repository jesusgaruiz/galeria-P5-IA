
// <initialize variables>
let circles = []; // Array to hold circle objects
let numCircles = 10; // Number of circles to draw

function setup() {
  createCanvas(400, 400); // Set up the canvas size
  for (let i = 0; i < numCircles; i++) {
    // Create random positions and colors for each circle
    let x = random(width);
    let y = random(height);
    let c = color(random(255), random(255), random(255)); // Random color
    circles.push({ x, y, c }); // Push circle object into the array
  }
}

function draw() {
  background(220); // Clear the background
  for (let circle of circles) {
    fill(circle.c); // Set the fill color
    noStroke(); // No outline
    ellipse(circle.x, circle.y, 50, 50); // Draw the circle
  }
}
