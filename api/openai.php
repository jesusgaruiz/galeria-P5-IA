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

// Construir prompt completo para GPT-4o-mini
$fullPrompt = "
Answer only in code, you can add explanations as comments within the code.

Your response must be in the following p5.js format:
// <initialize variables>

function setup() {
// <setup code>
}

// <other code>

function draw() {
// <draw code>
}

// <other code>

User text input:
\"\"\"
$prompt
\"\"\"
";

// Preparar la solicitud cURL
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

// Ejecutar solicitud
$response = curl_exec($ch);
if(curl_errno($ch)){
    echo json_encode(["error" => curl_error($ch)]);
    exit;
}
curl_close($ch);

// Parsear respuesta
$result = json_decode($response, true);
if(!isset($result['choices'][0]['message']['content'])){
    echo json_encode(["error" => "No se recibió respuesta de OpenAI"]);
    exit;
}

$code = $result['choices'][0]['message']['content'];

// Limpiar bloque de código de Markdown (``` y ```js)
$code = preg_replace('/```(js|javascript)?/i', '', $code);
$code = str_replace("```", "", $code);

// Crear archivo en /sketches/
$filename = "sketch_" . date("Ymd_His") . ".js";
$filepath = __DIR__ . "/../sketches/" . $filename;

file_put_contents($filepath, $code);

// Devolver nombre del archivo
echo json_encode([
    "success" => true,
    "file" => $filename
]);
