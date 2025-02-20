<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_set_cookie_params([
    'lifetime' => 86400, // 🔥 Expire après 1 jour
    'path' => '/',
    'domain' => 'eco-ride-one.vercel.app', // 🔥 IMPORTANT : même domaine que ton frontend
    'secure' => true, // 🔥 Obligatoire si HTTPS
    'httponly' => true,
    'samesite' => 'None' // 🔥 Obligatoire pour CORS
]);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

session_start(); // Démarrer la session pour stocker l'utilisateur connecté

$_SESSION["utilisateur_id"] = $user["utilisateur_id"]; // Stocke l'ID utilisateur

// 🔥 Debug
error_log("✅ SESSION ID après connexion : " . session_id());
error_log("✅ Contenu SESSION après connexion : " . json_encode($_SESSION));


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
    SELECT u.utilisateur_id, u.pseudo, u.nom, u.email, u.mot_de_passe, u.telephone, r.libelle AS role
    FROM utilisateur u
    JOIN possede p ON u.utilisateur_id = p.utilisateur_id
    JOIN role r ON p.role_id = r.role_id
    WHERE u.email = ?
");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    error_log("Aucun utilisateur trouvé avec cet email : " . $email);
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    exit;
}

error_log("Utilisateur trouvé : " . json_encode($user));
error_log("Mot de passe hashé en BDD : " . $user["mot_de_passe"]);
error_log("Mot de passe fourni : " . $password);

if (password_verify($password, $user["mot_de_passe"])) {
    error_log("Mot de passe vérifié avec succès !");
} else {
    error_log("Échec de la vérification du mot de passe !");
}


if (!password_verify($password, $user["mot_de_passe"])) {
    error_log("Le mot de passe ne correspond pas !");
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
