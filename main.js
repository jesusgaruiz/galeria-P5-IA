let sketches = ['sketch1.js', 'sketch2.js', 'sketch3.js'];
let currentIndex = 0;
let currentSketch = null;
let currentInstance = null;
let nextBtn, prevBtn;

function setup() {
  createCanvas(600, 400);
  noLoop();

  // Controles con p5
  prevBtn = createButton('⟵ Anterior');
  nextBtn = createButton('Siguiente ⟶');
  prevBtn.mousePressed(() => cambiarSketch(-1));
  nextBtn.mousePressed(() => cambiarSketch(1));

  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);

  loadSketch(sketches[currentIndex]);
}

function draw() {
  background(0);
  text("Cargando sketch...", width / 2, height / 2);
}

async function loadSketch(file) {
  // Eliminar el sketch anterior
  if (currentInstance) {
    currentInstance.remove();
    currentInstance = null;
  }

  try {
    const code = await loadStrings(`sketches/${file}`);
    const joined = code.join('\n');

    // Crear instancia p5 aislada
    const sketch = new Function('p', `
      ${joined.replaceAll('function ', 'p.')}
    `);

    const container = createDiv();
    container.id('subsketch');
    container.parent(document.body);

    currentInstance = new p5(sketch, container.elt);
    currentSketch = file;
  } catch (e) {
    console.error(e);
  }
}

function cambiarSketch(dir) {
  currentIndex = (currentIndex + dir + sketches.length) % sketches.length;
  loadSketch(sketches[currentIndex]);
}

function createGPTInterface() {
  const gptContainer = createDiv();
  gptContainer.id('gpt-interface');

  const input = createInput('');
  input.attribute('placeholder', 'Escribe tu pregunta aquí...');
  input.parent(gptContainer);

  const sendBtn = createButton('Enviar a GPT-4o-mini');
  sendBtn.parent(gptContainer);

  const responseDiv = createDiv('');
  responseDiv.id('gpt-response');
  responseDiv.parent(gptContainer);

  sendBtn.mousePressed(async () => {
    const message = input.value();
    if (message.trim() === '') return;

    responseDiv.html('Enviando...');
    const response = await callGPT4Mini(message);
    responseDiv.html(response || 'Error en la respuesta');
    input.value('');
  });
}
