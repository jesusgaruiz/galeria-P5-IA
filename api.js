document.getElementById("btnConsultar").addEventListener("click", async () => {
  const prompt = document.getElementById("pregunta").value;
  const respuesta = document.getElementById("respuesta");

  respuesta.innerText = "Generando... espera unos segundos.";

  const resp = await fetch("api/openai.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await resp.json();

  if (data.success) {
    respuesta.innerText = "¡Generado! Cargando sketch...";

    // Usar la función modificada que devuelve { sketchClass, prompt }
    const result = await window.loadLastSketch();

    if (!result || !result.sketchClass) {
      respuesta.innerText = "Error: No se pudo cargar el nuevo sketch.";
      return;
    }

    // Agregar a los arrays globales
    window.sketches.push(result.sketchClass);
    window.sketchPrompts.push(result.prompt); // Guardamos el prompt
    
    window.currentIndex = window.sketches.length - 1;
    window.loadSketch(window.currentIndex, window.pInstance);

    respuesta.innerText = "";
  } else {
    respuesta.innerText = "Error: " + (data.error || "Desconocido");
  }
});