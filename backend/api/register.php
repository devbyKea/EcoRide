<?php
// Activer les erreurs pour debug temporaire (désactiver en prod)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Gérer les en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app"); // Autoriser ton frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autoriser JSON et Auth

// Gérer la requête préflight (OPTIONS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204); // Réponse vide mais valide pour CORS
    exit;
}

require_once "config.php"; // Connexion BDD

// Vérifier si la requête est en POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
    exit;
}

// Lire les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Données invalides"]);
    exit;
}

// Vérifier les champs
if (empty($data["name"]) || empty($data["email"]) || empty($data["password"]) || empty($data["confirm_password"])) {
    echo json_encode(["status" => "error", "message" => "Tous les champs sont obligatoires"]);
    exit;
}

$name = htmlspecialchars(trim($data["name"]));
$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
$password = trim($data["password"]);
$confirm_password = trim($data["confirm_password"]);

// Vérifier email valide
if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email invalide"]);
    exit;
}

// Vérifier que les mots de passe correspondent
if ($password !== $confirm_password) {
    echo json_encode(["status" => "error", "message" => "Les mots de passe ne correspondent pas"]);
    exit;
}

// Vérifier si l'email est déjà utilisé
$stmt = $pdo->prepare("SELECT utilisateur_id FROM Utilisateur WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(["status" => "error", "message" => "Cet email est déjà utilisé"]);
    exit;
}

// Hasher le mot de passe
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Insérer l'utilisateur
$stmt = $pdo->prepare("INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)");
if ($stmt->execute([$name, $email, $hashed_password])) {
    echo json_encode(["status" => "success", "message" => "Inscription réussie"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de l'inscription"]);
}
?>
