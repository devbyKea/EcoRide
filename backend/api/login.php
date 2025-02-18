<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

session_start(); // Démarrer la session pour stocker l'utilisateur connecté
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once "../config.php"; // Connexion BDD

// Gérer la requête OPTIONS pour CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Vérifier que la requête est en POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
    exit;
}

// Lire les données envoyées
$data = json_decode(file_get_contents("php://input"), true);
$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
$password = trim($data["password"] ?? "");

// Vérifier que l'email et le mot de passe sont remplis
if (!$email || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email et mot de passe requis"]);
    exit;
}

// Vérifier si l'utilisateur existe
$stmt = $pdo->prepare("
    SELECT u.utilisateur_id, u.pseudo, u.nom, u.email, u.mot_de_passe, u.telephone, r.nom AS role
    FROM utilisateur u
    JOIN role r ON u.role_id = r.role_id
    WHERE u.email = ?
");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);


if (!$user || !password_verify($password, $user["mot_de_passe"])) {
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    exit;
}

// Stocker l'utilisateur en session
$_SESSION["user_id"] = $user["utilisateur_id"];
$_SESSION["email"] = $user["email"];
$_SESSION["pseudo"] = $user["pseudo"];

// Retourner les informations utilisateur
echo json_encode([
    "status" => "success",
    "message" => "Connexion réussie",
    "user" => [
        "pseudo" => $user["pseudo"],
        "nom" => $user["nom"],
        "email" => $user["email"],
        "telephone" => $user["telephone"],
        "role" => $user["role"]
    ]
]);
