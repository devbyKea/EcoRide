<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_start(); // ✅ Capture toute sortie parasite avant qu'elle ne casse les headers

// 🔧 Configuration des en-têtes CORS (⚠️ Doit être AVANT toute sortie)
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// ✅ Gérer la requête OPTIONS pour CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once "../config.php"; // ✅ Connexion BDD et gestion de session (session_start() déjà appelé ici)

// ✅ Supprimer le session_start() qui causait un conflit ❌ (déjà dans config.php)
// if (session_status() === PHP_SESSION_NONE) {
//     session_start();
// }

session_regenerate_id(true); // 🔥 Régénérer l'ID de session après connexion pour éviter fixation de session

error_log("✅ [login.php] Session ID après connexion: " . session_id());
error_log("✅ [login.php] SESSION avant authentification: " . json_encode($_SESSION));

// ✅ Vérifier que la requête est en POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
    http_response_code(405);
    exit;
}

// ✅ Lire les données envoyées
$data = json_decode(file_get_contents("php://input"), true);
$email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
$password = trim($data["password"] ?? "");

// ✅ Vérifier que l'email et le mot de passe sont remplis
if (!$email || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email et mot de passe requis"]);
    http_response_code(400);
    exit;
}

// ✅ Vérifier si l'utilisateur existe
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
    error_log("❌ Aucun utilisateur trouvé avec cet email : " . $email);
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    http_response_code(401);
    exit;
}

error_log("✅ Utilisateur trouvé : " . json_encode($user));

// ✅ Vérification du mot de passe
if (!password_verify($password, $user["mot_de_passe"])) {
    error_log("❌ Mot de passe incorrect !");
    echo json_encode(["status" => "error", "message" => "Identifiants incorrects"]);
    http_response_code(401);
    exit;
}

error_log("✅ Mot de passe vérifié avec succès !");

// ✅ Stocker l'utilisateur en session
$_SESSION["user_id"] = $user["utilisateur_id"];
$_SESSION["email"] = $user["email"];
$_SESSION["pseudo"] = $user["pseudo"];

error_log("✅ SESSION APRÈS CONNEXION : " . json_encode($_SESSION));

// ✅ Forcer PHP à écrire la session avant la réponse (évite les sessions perdues)
session_write_close();

// ✅ Nettoyer toute sortie parasite avant d'envoyer le JSON
ob_end_clean();

// ✅ Retourner les informations utilisateur
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
http_response_code(200);
exit;
