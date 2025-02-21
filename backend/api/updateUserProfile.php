<?php
// Activer les erreurs pour debug temporaire (désactiver en prod)
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Gérer les en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Gérer la requête préflight `OPTIONS`
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Connexion à la base de données
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erreur de connexion à la base de données"]);
    exit;
}

// Lire les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Données invalides"]);
    exit;
}

// Vérifier les champs obligatoires
if (empty($data["user_id"]) || empty($data["pseudo"]) || empty($data["email"])) {
    echo json_encode(["status" => "error", "message" => "Tous les champs sont obligatoires"]);
    exit;
}

$user_id = intval($data["user_id"]);
$pseudo = htmlspecialchars(trim($data["pseudo"]));
$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);

// Vérifier email valide
if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email invalide"]);
    exit;
}

// Vérifier si l'utilisateur existe
$stmt = $pdo->prepare("SELECT utilisateur_id FROM utilisateur WHERE utilisateur_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["status" => "error", "message" => "Utilisateur introuvable"]);
    exit;
}

// Mise à jour des informations
$stmt = $pdo->prepare("UPDATE utilisateur SET pseudo = ?, email = ? WHERE utilisateur_id = ?");
if ($stmt->execute([$pseudo, $email, $user_id])) {
    echo json_encode(["status" => "success", "message" => "Profil mis à jour"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de la mise à jour"]);
}
?>
