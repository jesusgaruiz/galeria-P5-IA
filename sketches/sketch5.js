
export class Sketch5 {
  static get config() {
    return {
      speed: { value: 2, min: 0.1, max: 5, step: 0.1 },
      carColor: { value: 255, min: 0, max: 255 },
      size: { value: 50, min: 20, max: 100 }
    };
  }

  constructor(params = {}) {
    this.params = params;
    this.position = 0;
  }

  setup(p) {
    p.createCanvas(800, 600);
    p.noStroke();
  }

  draw(p) {
    const bg = this.params.background || [50, 50, 50];
    p.background(...bg);

    // Audio & GUI usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let speed = this.params.custom.speed;
    let col = this.params.custom.carColor;
    let size = this.params.custom.size;

    // Update position based on bass and speed
    this.position += speed * (bass / 255) * p.deltaTime;

    // Loop the car when it goes off-screen
    if (this.position > p.width + size) {
      this.position = -size;
    }

    // Draw the car (simple rectangle for this example)
    p.fill(col, 0, 0);
    p.rect(this.position, p.height / 2, size, size / 2);
  }
}
