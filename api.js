async function consultarOpenAI() {
  const prompt = document.getElementById("pregunta").value;

  const resp = await fetch("/galeria-P5-IA/api/openai.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await resp.json();

  if (data.success) {
    // Actualizar interfaz
    document.getElementById("respuesta").innerText =
      "Sketch generado: " + data.file;

    // Añadir el nuevo sketch a la lista
    sketches.push(data.file);

  } else {
    document.getElementById("respuesta").innerText = data.error;
  }
}
