<?php
session_start();
require_once "../config.php";

// 🔧 Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 🚨 Désactiver l'affichage des erreurs pour éviter les sorties parasites
error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

// 📥 Récupération des données de connexion envoyées par le client
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["error" => "Veuillez remplir tous les champs."]);
    http_response_code(400);
    exit;
}

$email = trim($data["email"]);
$password = trim($data["password"]);

try {
    // 🔍 Vérification de l'utilisateur dans la base de données
    $stmt = $pdo->prepare("SELECT id, nom, email, telephone, password, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 🔑 Vérification du mot de passe
    if ($user && password_verify($password, $user["password"])) {
        unset($user["password"]); // ❌ Ne jamais retourner le mot de passe !

        // ✅ Stocker l'utilisateur en session
        $_SESSION["user_id"] = $user["id"];

        // ✅ Répondre avec les infos utilisateur
        echo json_encode(["success" => "Connexion réussie", "user" => $user]);
        http_response_code(200);
    } else {
        echo json_encode(["error" => "Email ou mot de passe incorrect."]);
        http_response_code(401);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
    http_response_code(500);
}

exit;
?>

