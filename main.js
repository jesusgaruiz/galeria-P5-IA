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

let currentParams = {
  background: null,
  fill: null
};

function loadSketch(index, p, params = {}) {
  const SketchClass = sketches[index];
  currentSketch = new SketchClass(params);

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

window.loadLastSketch = async function() {
  const response = await fetch("files.json");
  const files = await response.json();

  if (!files.length) return null;

  const lastFile = files[files.length - 1];
  const num = lastFile.match(/sketch(\d+)\.js$/)?.[1];
  if (!num) return null;

  const module = await import(`./sketches/${lastFile}`);
  const ClassName = module[`Sketch${num}`];

  return ClassName || null;
};

document.getElementById('changeBg').addEventListener('click', () => {
  // Cambiar fondo a rojo
  currentParams.background = [0, 0, 0];
  currentParams.fill = 255;

  // Recargar el sketch actual con los nuevos params
  loadSketch(currentIndex, pInstance, currentParams);
});

document.getElementById('next').addEventListener('click', () => changeSketch(1));
document.getElementById('prev').addEventListener('click', () => changeSketch(-1));
window.sketches = sketches;
window.currentIndex = currentIndex;
window.loadSketch = loadSketch;
window.pInstance = pInstance;
