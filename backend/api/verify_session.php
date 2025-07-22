<?php
// Activer les erreurs pour debug temporaire (désactiver en prod)
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Gérer les en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Vérifier si l'user_id est passé en paramètre
if (!isset($_GET["user_id"]) || empty($_GET["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Aucun utilisateur spécifié"]);
    exit;
}

$user_id = intval($_GET["user_id"]);

// Vérifier si l'utilisateur existe
$stmt = $pdo->prepare("SELECT utilisateur_id, pseudo, email FROM utilisateur WHERE utilisateur_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["status" => "error", "message" => "Session invalide"]);
    exit;
}

// Si l'utilisateur existe, retour des infos
echo json_encode([
    "status" => "success",
    "message" => "Session valide",
    "user" => [
        "id" => $user["utilisateur_id"],
        "pseudo" => $user["pseudo"],
        "email" => $user["email"]
    ]
]);
?>
