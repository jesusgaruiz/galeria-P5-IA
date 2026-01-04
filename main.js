const sketches = [];
let currentIndex = 0;
let currentSketch;
let pInstance;
let presentationMode = false;
let presentationInterval = null;
let museumMusic = null;
let showControls = false;
let controlsPanel = null;
let inputFocused = false;

/*Permite escribir el prompt sin generar conflictos con las teclas de control*/
document.addEventListener('DOMContentLoaded', () => {
  const preguntaInput = document.getElementById('pregunta');
  
  if (preguntaInput) {
    preguntaInput.addEventListener('focus', () => {
      inputFocused = true;
    });
    
    preguntaInput.addEventListener('blur', () => {
      inputFocused = false;
    });
  }
});

pInstance = new p5((p) => {
  p.preload = () => {
    // Cargar música antes de setup
    museumMusic = p.loadSound('assets/museum-music.mp3', 
      () => {
        museumMusic.setVolume(0.3);
      },
      (err) => {
        console.warn('No se pudo cargar la música:', err);
      }
    );
  };

  p.setup = async () => {
    p.createCanvas(400, 300);
    await loadAllSketches();
    loadSketch(currentIndex, p);
    toggleControlsPanel(p);
  };

  p.draw = () => {
    if (currentSketch && currentSketch.draw) {
      currentSketch.draw(p);
    }
  };

  //Controles de teclado
  p.keyPressed = () => {
    if (inputFocused) {
      return;
    }
    if (p.key === 'p' || p.key === 'P') {
      togglePresentationMode();
    }
    if(p.key === 'b' || p.key === 'B') {
      currentParams.background = randomColor();
    }
    if (p.key === 'c' || p.key === 'C') {
      toggleControlsPanel(p);
    }
    if (p.keyCode === p.LEFT_ARROW) {
      changeSketch(-1);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      changeSketch(1);
    }
  };
});

function toggleControlsPanel(p) {
  showControls = !showControls;
  
  if (showControls) {
    if (!controlsPanel) {
      createControlsPanel(p);
    } else {
      controlsPanel.style('display', 'flex');
    }
  } else {
    if (controlsPanel) {
      controlsPanel.style('display', 'none');
    }
  }
}

function createControlsPanel(p) {
  controlsPanel = p.createDiv();
  controlsPanel.id('controlsPanel');

  // Título
  let title = p.createDiv('<h3>Controles</h3>');
  title.parent(controlsPanel);

  // Controles
  p.createDiv('P  -  Modo presentación').parent(controlsPanel);
  p.createDiv('C  -  Mostrar/ocultar controles').parent(controlsPanel);
  p.createDiv('B  -  Cambiar color de fondo').parent(controlsPanel);
  p.createDiv('←|→  -  Cambiar sketch').parent(controlsPanel);
}

function togglePresentationMode() {
  presentationMode = !presentationMode;
  
  const controls = document.querySelectorAll('h1, #controlsPanel, #controls, #pregunta, #btnConsultar, #changeBg, #respuesta');
  
  if (presentationMode) {
    // Ocultar controles
    controls.forEach(el => el.style.display = 'none');
    
    // Reproducir música con p5.sound
    if (museumMusic && !museumMusic.isPlaying()) {
      museumMusic.loop();
    }
    
    // Iniciar cambio automático cada 2 segundos
    presentationInterval = setInterval(() => {
      changeSketch(1);
    }, 2000);
    
  } else {
    // Mostrar controles
    controls.forEach(el => el.style.display = '');
    
    // Parar música
    if (museumMusic && museumMusic.isPlaying()) {
      museumMusic.stop();
    }
    
    // Detener cambio automático
    if (presentationInterval) {
      clearInterval(presentationInterval);
      presentationInterval = null;
    }
  }
}

function changeSketch(dir) {
  currentIndex = (currentIndex + dir + sketches.length) % sketches.length;
  loadSketch(currentIndex, pInstance);
  currentParams.background = null;
  document.getElementById("respuesta").innerText =""
}

let currentParams = {
  background: null
};

function loadSketch(index, p) {
  const SketchClass = sketches[index];
  currentSketch = new SketchClass(currentParams);

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

async function loadLastSketch() {
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

function randomColor() {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ];
}

window.sketches = sketches;
window.currentIndex = currentIndex;
window.loadSketch = loadSketch;
window.loadLastSketch = loadLastSketch;
window.pInstance = pInstance;
