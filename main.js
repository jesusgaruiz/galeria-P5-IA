const sketches = [];
let currentIndex = 0;
let currentSketch;
let pInstance;

pInstance = new p5((p) => {
  p.setup = async () => {
    p.createCanvas(400, 300);

    await loadAllSketches();
    loadSketch(currentIndex, p);
  };
});

function changeSketch(dir) {
  currentIndex = (currentIndex + dir + sketches.length) % sketches.length;
  loadSketch(currentIndex, pInstance);
}

function loadSketch(index, p) {
  const SketchClass = sketches[index];
  currentSketch = new SketchClass();

  p.clear();

  p.draw = () => {
    if (currentSketch && currentSketch.draw) {
      currentSketch.draw(p);
    }
  };

  if (currentSketch.setup) currentSketch.setup(p);

  p.loop();
}

async function loadAllSketches() {
  const response = await fetch("files.json");
  const files = await response.json();

  for (const file of files) {
    const num = file.match(/sketch(\d+)\.js$/)?.[1];
    if (num) {
      const module = await import(`./sketches/${file}`);

      // Clase correcta
      const ClassName = module[`Sketch${num}`];

      // Guardar CLASE, no instancia
      sketches.push(ClassName);
    }
  }
}

document.getElementById('next').addEventListener('click', () => changeSketch(1));
document.getElementById('prev').addEventListener('click', () => changeSketch(-1));
