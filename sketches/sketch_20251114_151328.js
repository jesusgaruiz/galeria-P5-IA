
// Initialize variables for rectangle properties
let rectWidth = 100;  // Width of the rectangles
let rectHeight = 50;  // Height of the rectangles
let numRects = 5;     // Number of rectangles to draw
let spacing = 20;     // Space between rectangles

function setup() {
  createCanvas(400, 400); // Set canvas size
  noLoop();               // Only draw once
}

// Draw function to render the rectangles
function draw() {
  background(255);        // Set background color to white
  fill(255, 0, 0);       // Set fill color to red
  
  // Loop to draw multiple rectangles
  for (let i = 0; i < numRects; i++) {
    rect(i * (rectWidth + spacing), height / 2 - rectHeight / 2, rectWidth, rectHeight);
    // Each rectangle is drawn at a position determined by the loop index
  }
}
