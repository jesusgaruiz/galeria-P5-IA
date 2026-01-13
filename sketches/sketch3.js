
export class Sketch3 {
  static get config() {
    return {
      eyeSize: { value: 40, min: 10, max: 100 },
      mouthWidth: { value: 100, min: 50, max: 200 },
      smileIntensity: { value: 20, min: 0, max: 50 }
    };
  }

  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [255, 255, 255];
    p.background(...bg);
    
    // Audio & GUI usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let eyeSize = this.params.custom.eyeSize;
    let mouthWidth = this.params.custom.mouthWidth;
    let smileIntensity = this.params.custom.smileIntensity;

    // Face parameters
    let faceColor = [255 - bass, 204, 0]; // Base skin tone changes with bass
    let headRadius = 200 + bass * 0.2; // Size of the face changes with bass
    
    // Draw face
    p.fill(...faceColor);
    p.ellipse(p.width / 2, p.height / 2, headRadius);

    // Draw eyes
    p.fill(0);
    p.ellipse(p.width / 2 - headRadius / 4, p.height / 2 - headRadius / 8, eyeSize, eyeSize);
    p.ellipse(p.width / 2 + headRadius / 4, p.height / 2 - headRadius / 8, eyeSize, eyeSize);

    // Draw mouth (smile)
    p.noFill();
    p.stroke(0);
    p.arc(p.width / 2, p.height / 2 + headRadius / 8, mouthWidth, mouthWidth * 0.5, 0, p.PI + smileIntensity / 100);
  }
}
