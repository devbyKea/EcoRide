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

// Vérifier les champs requis
if (empty($data["email"]) || empty($data["password"])) {
    echo json_encode(["status" => "error", "message" => "Email et mot de passe obligatoires"]);
    exit;
}

$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
$password = trim($data["password"]);

// Vérifier email valide
if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email invalide"]);
    exit;
}

// Récupérer l'utilisateur depuis la base de données
$stmt = $pdo->prepare("SELECT u.utilisateur_id, u.pseudo, u.email, u.mot_de_passe, p.role_id 
                        FROM utilisateur u
                        LEFT JOIN possede p ON u.utilisateur_id = p.utilisateur_id
                        WHERE u.email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    exit;
}

// Vérifier le mot de passe
if (!password_verify($password, $user["mot_de_passe"])) {
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    exit;
}

// Réponse avec les infos utilisateur
echo json_encode([
    "status" => "success",
    "message" => "Connexion réussie",
    "user" => [
        "id" => $user["utilisateur_id"],
        "pseudo" => $user["pseudo"],
        "email" => $user["email"],
        "role" => $user["role_id"] 
    ]
]);
?>
