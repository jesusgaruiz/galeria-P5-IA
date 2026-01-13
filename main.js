const sketches = [];
let currentIndex = 0;
let currentSketch;
let pInstance;
let presentationMode = false;
let presentationInterval = null;
let museumMusic = null;
let showControls = false; // Empezará mostrándose tras el setup
let controlsPanel = null;
let inputFocused = false;

// Variables de Audio y GUI
let audioEnabled = false;
let fft;
// Ya no necesitamos guiContainer global porque lo buscaremos dentro del panel

let currentParams = {
  background: null,
  audio: { bass: 0, mid: 0, treble: 0, level: 0 },
  custom: {}
};

document.addEventListener('DOMContentLoaded', () => {
  const preguntaInput = document.getElementById('pregunta');

  if (preguntaInput) {
    preguntaInput.addEventListener('focus', () => { inputFocused = true; });
    preguntaInput.addEventListener('blur', () => { inputFocused = false; });
  }
});

pInstance = new p5((p) => {
  p.preload = () => {
    museumMusic = p.loadSound('assets/museum-music.mp3', 
      () => { museumMusic.setVolume(0.5); },
      (err) => { console.warn('Error música:', err); }
    );
  };

  p.setup = async () => {
    p.createCanvas(800, 600);
    fft = new p5.FFT(0.8, 1024);
    
    // Creamos el panel de controles al inicio
    createControlsPanel(p);
    
    // Lo mostramos por defecto
    showControls = true;
    controlsPanel.style('display', 'flex');

    await loadAllSketches();
    loadSketch(currentIndex, p);
  };

  p.draw = () => {
    // 1. Lógica de Audio
    if (audioEnabled && museumMusic && museumMusic.isPlaying()) {
      fft.analyze();
      currentParams.audio = {
        bass: fft.getEnergy("bass"),
        mid: fft.getEnergy("mid"),
        treble: fft.getEnergy("treble"),
        level: fft.getEnergy(20, 20000)
      };
    } else {
      currentParams.audio = { bass: 0, mid: 0, treble: 0, level: 0 };
    }

    // 2. Dibujar Sketch
    if (currentSketch && currentSketch.draw) {
      currentSketch.draw(p);
    }
  };

  p.keyPressed = () => {
    if (inputFocused) return;

    if (p.key === 'p' || p.key === 'P') togglePresentationMode();
    if (p.key === 'b' || p.key === 'B') currentParams.background = randomColor();
    if (p.key === 'c' || p.key === 'C') toggleControlsPanel();
    if (p.keyCode === p.LEFT_ARROW) changeSketch(-1);
    else if (p.keyCode === p.RIGHT_ARROW) changeSketch(1);
  };
});

// --- LÓGICA DE INTERFAZ ---

function createControlsPanel(p) {
  controlsPanel = p.createDiv();
  controlsPanel.id('controlsPanel');

  // 1. Título
  let title = p.createDiv('<h3>Controles</h3>');
  title.parent(controlsPanel);

  // 2. Botón de Audio Integrado
  let btnAudio = p.createButton('🔇 Activar Música/Audio');
  btnAudio.class('panel-btn');
  btnAudio.parent(controlsPanel);
  btnAudio.mousePressed(() => {
    toggleAudioReactivity();
    if (audioEnabled) {
      btnAudio.html('🔊 Desactivar Música/Audio');
      btnAudio.addClass('active');
    } else {
      btnAudio.html('🔇 Activar Música/Audio');
      btnAudio.removeClass('active');
    }
  });

  // 3. Contenedor para Sliders (GUI)
  let guiDiv = p.createDiv();
  guiDiv.id('guiContainerInternal'); // ID específico para encontrarlo luego
  guiDiv.parent(controlsPanel);

  // 4. Separador
  p.createDiv('<hr style="border: 0; border-top: 1px solid #555; margin: 10px 0;">').parent(controlsPanel);

  // 5. Ayuda de Teclado
  let helpDiv = p.createDiv();
  helpDiv.parent(controlsPanel);
  helpDiv.style('font-size', '0.85em');
  helpDiv.style('color', '#aaa');
  helpDiv.html(`
    <div><b>P</b> : Modo presentación</div>
    <div><b>C</b> : Ocultar este panel</div>
    <div><b>B</b> : Color de fondo</div>
    <div><b>← / →</b> : Navegar</div>
  `);
}

function toggleAudioReactivity() {
  audioEnabled = !audioEnabled;
  
  if (audioEnabled) {
    if (museumMusic && !museumMusic.isPlaying()) {
      museumMusic.loop();
    }
  } else {
    // CAMBIO SOLICITADO: Parar la música al desactivar
    if (museumMusic && museumMusic.isPlaying()) {
      museumMusic.pause();
    }
  }
}

function toggleControlsPanel() {
  showControls = !showControls;
  if (controlsPanel) {
    controlsPanel.style('display', showControls ? 'flex' : 'none');
  }
}

function togglePresentationMode() {
  presentationMode = !presentationMode;
  
  const controls = document.querySelectorAll('h1, #controlsPanel, #controls, #respuesta');
  
  if (presentationMode) {
    controls.forEach(el => el.style.display = 'none');
    
    // En modo presentación, activamos audio automáticamente si se desea
    if (museumMusic && !museumMusic.isPlaying()) {
      museumMusic.loop();
      audioEnabled = true;
    }
    
    presentationInterval = setInterval(() => { changeSketch(1); }, 3000);
    
  } else {
    controls.forEach(el => el.style.display = ''); // Restaurar display original (flex/block)
    
    // Restaurar visibilidad correcta del panel según estado previo
    if (controlsPanel) {
      controlsPanel.style('display', showControls ? 'flex' : 'none');
    }

    if (presentationInterval) {
      clearInterval(presentationInterval);
      presentationInterval = null;
    }
  }
}

function changeSketch(dir) {
  currentIndex = (currentIndex + dir + sketches.length) % sketches.length;
  loadSketch(currentIndex, pInstance);
  document.getElementById("respuesta").innerText = "";
}

function loadSketch(index, p) {
  const SketchClass = sketches[index];
  currentParams.custom = {}; 
  
  // Buscar el contenedor dentro del panel
  const guiDiv = document.getElementById('guiContainerInternal');
  
  // GENERAR GUI DINÁMICA DENTRO DEL PANEL
  if (guiDiv) {
    guiDiv.innerHTML = ''; // Limpiar anterior
    if (SketchClass.config) {
      createGUI(SketchClass.config, guiDiv);
    } else {
      guiDiv.innerHTML = '<div style="color:#777; font-style:italic; padding:5px;">Sin parámetros configurables</div>';
    }
  }

  currentSketch = new SketchClass(currentParams);
  p.clear();
  if (currentSketch.setup) currentSketch.setup(p);
  p.loop();
}

function createGUI(config, container) {
  const title = document.createElement('div');
  title.innerHTML = '<strong>Parámetros del Sketch</strong>';
  title.style.marginBottom = '10px';
  title.style.color = '#00d26a';
  container.appendChild(title);

  for (const [key, settings] of Object.entries(config)) {
    currentParams.custom[key] = settings.value;

    const wrapper = document.createElement('div');
    wrapper.className = 'gui-item-internal';

    const labelRow = document.createElement('div');
    labelRow.style.display = 'flex';
    labelRow.style.justifyContent = 'space-between';
    labelRow.innerHTML = `<span>${key}</span> <span id="val-${key}" style="color:#00d26a">${settings.value}</span>`;
    
    const input = document.createElement('input');
    input.type = 'range';
    input.min = settings.min;
    input.max = settings.max;
    input.step = settings.step || 1;
    input.value = settings.value;
    input.style.width = '100%';
    input.style.marginTop = '5px';

    input.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      currentParams.custom[key] = val;
      container.querySelector(`#val-${key}`).innerText = val;
    });

    wrapper.appendChild(labelRow);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  }
}

// Funciones auxiliares (con el try/catch que añadimos antes para seguridad)
async function loadAllSketches() {
  try {
    const response = await fetch("files.json");
    if(!response.ok) return;
    const files = await response.json();
    for (const file of files) {
      const num = file.match(/sketch(\d+)\.js$/)?.[1];
      if (num) {
        try {
          const module = await import(`./sketches/${file}`);
          sketches.push(module[`Sketch${num}`]);
        } catch (e) { console.warn(`Saltando ${file}:`, e); }
      }
    }
  } catch(e) { console.error(e); }
}

// Reemplaza tu función loadLastSketch en main.js por esta versión más inteligente:

async function loadLastSketch() {
  try {
    const response = await fetch("files.json?cache=" + Date.now());
    const files = await response.json();
    
    if (!files.length) return null;

    // Intentamos cargar desde el último hacia atrás hasta encontrar uno que funcione
    for (let i = files.length - 1; i >= 0; i--) {
        const item = files[i];
        const filename = (typeof item === 'object') ? item.file : item;
        const promptText = (typeof item === 'object') ? item.prompt : "Desconocido";
        const num = filename.match(/sketch(\d+)\.js$/)?.[1];

        if (!num) continue;

        try {
            const module = await import(`./sketches/${filename}?cache=${Date.now()}`);
            
            // Si funciona, devolvemos este y salimos
            return {
                sketchClass: module[`Sketch${num}`],
                prompt: promptText
            };
        } catch (err) {
            console.warn(`El archivo ${filename} está en la lista pero no existe. Ignorando...`);
            // El bucle continuará con el siguiente (i--)
        }
    }
    
    return null; // Si no encontró ninguno válido

  } catch(e) { 
      console.error(e);
      return null; 
  }
};

function randomColor() {
  return [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
}

window.sketches = sketches;
window.currentIndex = currentIndex;
window.loadSketch = loadSketch;
window.loadLastSketch = loadLastSketch;
window.pInstance = pInstance;