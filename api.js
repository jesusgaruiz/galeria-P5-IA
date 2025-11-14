document.getElementById("btnConsultar").addEventListener("click", async () => {
  const prompt = document.getElementById("pregunta").value;

  const resp = await fetch("/galeria-P5-IA/api/openai.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await resp.json();

  if (data.success) {

    document.getElementById("respuesta").innerText =
      "Sketch generado: " + data.file;

    // ⚡ Usar la función expuesta globalmente
    const LastSketchClass = await window.loadLastSketch();

    if (!LastSketchClass) {
      document.getElementById("respuesta").innerText =
        "Error: No se pudo cargar el nuevo sketch.";
      return;
    }

    window.sketches.push(LastSketchClass);
    window.currentIndex = window.sketches.length - 1;
    window.loadSketch(window.currentIndex, window.pInstance);

  } else {
    document.getElementById("respuesta").innerText = data.error;
  }
});
