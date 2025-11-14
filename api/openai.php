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
- The sketch MUST be a class.
- The class MUST be exported.
- The class name MUST be exactly: Sketch$nextNumber
- All p5.js API calls MUST use instance mode: every p5 call MUST use the 'p' object (p.createCanvas, p.ellipse, p.background, etc).
- NO global variables unless they are inside the class.
- NO global setup() or draw() functions.
- The class must contain:
    - constructor() { ... }
    - setup(p) { ... }
    - draw(p) { ... }
- The code must run correctly when loaded externally: new Sketch$nextNumber().
- The output MUST contain ONLY the code.
- DO NOT wrap the code in Markdown (no ``` blocks).
- DO NOT include explanations outside comments inside the code.

Valid example structure:

export class Sketch1 {
  constructor() {
    // initialize variables here
  }

  setup(p) {
    p.createCanvas(300, 240);
    p.noLoop();
  }

  draw(p) {
    p.background(255, 200, 0);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.text('Sketch 1', p.width / 2, p.height / 2);
  }
}

❗ Your output MUST follow exactly this structure, but using class name Sketch$nextNumber.

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
    "max_tokens" => 800
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
