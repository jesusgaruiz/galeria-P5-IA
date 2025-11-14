export class Sketch4 {
    constructor() {
      this.x = 0;
      this.y = 150;
      this.speed = 3;
      this.dir = 1;
    }
  
    setup(p) {
      // ❌ No crear otro canvas aquí — ya existe
      p.loop(); // activar animación
    }
  
    draw(p) {
      p.background(30, 30, 60);
  
      // Actualización de posición
      this.x += this.speed * this.dir;
  
      // Rebote en los bordes
      if (this.x > p.width - 25 || this.x < 25) {
        this.dir *= -1;
      }
  
      // Dibujar círculo
      p.noStroke();
      p.fill(100, 200, 255);
      p.circle(this.x, this.y, 50);
  
      // Texto informativo
      p.fill(255);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.textSize(16);
      p.text("Sketch 4 (animado)", p.width / 2, p.height - 10);
    }
  }
  