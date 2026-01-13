<?php
header("Content-Type: application/json");

// Leer la API key desde .env
$env = parse_ini_file(__DIR__ . "/../.env");
$apiKey = $env["OPENAI_API_KEY"] ?? null;

if (!$apiKey) {
    echo json_encode(["error" => "API key missing"]);
    exit;
}

// Leer prompt enviado por fetch()
$input = json_decode(file_get_contents("php://input"), true);
$prompt = $input["prompt"] ?? "";

if (!$prompt) {
    echo json_encode(["error" => "no prompt provided"]);
    exit;
}

/* ---------------------------------------------
   CALCULAR EL SIGUIENTE NOMBRE sketchX.js
----------------------------------------------*/

$filesJsonPath = __DIR__ . "/../files.json";
$filesList = [];

if (file_exists($filesJsonPath)) {
    $json = json_decode(file_get_contents($filesJsonPath), true);
    if (is_array($json)) {
        $filesList = $json;
    }
}

$numbers = [];
foreach ($filesList as $file) {
    if (preg_match('/sketch(\d+)\.js$/', $file, $m)) {
        $numbers[] = intval($m[1]);
    }
}

$nextNumber = empty($numbers) ? 1 : max($numbers) + 1;

// Nombre final del archivo
$filename = "sketch$nextNumber.js";
$filepath = __DIR__ . "/../sketches/" . $filename;

/* ---------------------------------------------
   CONSTRUIR PROMPT A ENVIAR A LA IA
----------------------------------------------*/

$fullPrompt = "
Generate ONLY valid JavaScript code for a p5.js sketch used inside a dynamic loader system.

❗ IMPORTANT REQUIREMENTS:
- The sketch MUST be a class exported as 'Sketch$nextNumber'.
- The sketch size canvas MUST be 800x600.
- constructor(params = {}) { this.params = params; }
- NO global setup()/draw(). Use 'p' instance methods.
- NO global variables.

✨ NEW INTERACTIVE FEATURES (IMPLEMENT THESE):

1. **AUDIO REACTIVITY**:
   - The sketch receives live audio data in 'this.params.audio'.
   - Structure: { bass: 0-255, mid: 0-255, treble: 0-255, level: 0-255 }.
   - Use these values to animate elements (size, color, movement).
   - Example: let r = 50 + this.params.audio.bass;

2. **CUSTOM GUI PARAMETERS**:
   - You MUST define a 'static get config()' method.
   - It returns an object defining sliders for the user.
   - Access values in draw() via 'this.params.custom.paramName'.
   
   Config Structure Example:
   static get config() {
     return {
       speed: { value: 1, min: 0.1, max: 10, step: 0.1 },
       radius: { value: 50, min: 10, max: 200 }
     };
   }

Valid example output:

export class Sketch$nextNumber {
  static get config() {
    return {
      sensitivity: { value: 1.0, min: 0.1, max: 5.0, step: 0.1 },
      lineColor: { value: 200, min: 0, max: 255 }
    };
  }

  constructor(params = {}) {
    this.params = params;
  }

  setup(p) {
    p.createCanvas(800, 600);
  }

  draw(p) {
    const bg = this.params.background || [30, 30, 30];
    p.background(...bg);
    
    // Audio & GUI usage
    let bass = (this.params.audio ? this.params.audio.bass : 0);
    let sens = this.params.custom.sensitivity;
    let col = this.params.custom.lineColor;

    let size = 100 + bass * sens;
    
    p.fill(col, 100, 150);
    p.ellipse(p.width/2, p.height/2, size);
  }
}

Only use the previous example as a reference. Now, create a completely different sketch based on the following
User request:
\"\"\"
$prompt
\"\"\"
";

/* ---------------------------------------------
   ENVIAR SOLICITUD A OPENAI
----------------------------------------------*/

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model" => "gpt-4o-mini",
    "messages" => [
        ["role" => "user", "content" => $fullPrompt]
    ],
    "max_tokens" => 900
]));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}
curl_close($ch);

// Parsear respuesta
$result = json_decode($response, true);
if (!isset($result['choices'][0]['message']['content'])) {
    echo json_encode(["error" => "No se recibió respuesta de OpenAI"]);
    exit;
}

$code = $result['choices'][0]['message']['content'];

/* ---------------------------------------------
   LIMPIAR POSIBLES MARCAS DE MARKDOWN
----------------------------------------------*/

$code = preg_replace('/```(js|javascript)?/i', '', $code);
$code = str_replace("```", "", $code);

/* ---------------------------------------------
   GUARDAR ARCHIVO sketchX.js
----------------------------------------------*/

file_put_contents($filepath, $code);

/* ---------------------------------------------
   ACTUALIZAR files.json
----------------------------------------------*/

if (!in_array($filename, $filesList)) {
    $filesList[] = $filename;
}

file_put_contents($filesJsonPath, json_encode($filesList, JSON_PRETTY_PRINT));

/* ---------------------------------------------
   RESPUESTA
----------------------------------------------*/

echo json_encode([
    "success" => true,
    "file" => $filename,
    "class" => "Sketch$nextNumber"
]);
?>