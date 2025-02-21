<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_start(); // Capture toute sortie parasite avant qu'elle ne casse les headers

// Configuration des en-têtes CORS (Doit être AVANT toute sortie)
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Gérer la requête OPTIONS pour CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once "../config.php"; // 

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? null;
$password = $data["password"] ?? null;

if (!$email || !$password) {
    echo json_encode(["error" => "Email et mot de passe requis."]);
    exit;
}

// Vérifier l'utilisateur
$stmt = $pdo->prepare("
    SELECT u.utilisateur_id, u.pseudo, u.nom, u.email, u.mot_de_passe, u.telephone, r.libelle AS role
    FROM utilisateur u
    JOIN possede p ON u.utilisateur_id = p.utilisateur_id
    JOIN role r ON p.role_id = r.role_id
    WHERE u.email = ?
");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user["mot_de_passe"])) {
    echo json_encode(["error" => "Identifiants incorrects"]);
    exit;
}

// Générer un token unique pour la session
$session_id = bin2hex(random_bytes(32));

// Insérer la session en base
$stmt = $pdo->prepare("
    INSERT INTO sessions (session_id, utilisateur_id, ip_address, user_agent) 
    VALUES (?, ?, ?, ?)
");
$stmt->execute([
    $session_id,
    $user["utilisateur_id"],
    $_SERVER["REMOTE_ADDR"],
    $_SERVER["HTTP_USER_AGENT"]
]);

// Retourner le token au client
echo json_encode([
    "session_id" => $session_id,
    "user" => [
        "pseudo" => $user["pseudo"],
        "nom" => $user["nom"],
        "email" => $user["email"],
        "telephone" => $user["telephone"],
        "role" => $user["role"]
    ]
]);
exit;

