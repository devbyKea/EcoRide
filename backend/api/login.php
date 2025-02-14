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
    $stmt = $pdo->prepare("
        SELECT u.utilisateur_id, u.prenom, u.nom, u.email, u.telephone, u.pseudo, u.statut, u.mot_de_passe, 
               r.libelle AS role
        FROM Utilisateur u
        LEFT JOIN possede p ON u.utilisateur_id = p.utilisateur_id
        LEFT JOIN Role r ON p.role_id = r.role_id
        WHERE u.email = ?
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 🔑 Vérification du mot de passe
    if ($user && password_verify($password, $user["mot_de_passe"])) {
        unset($user["mot_de_passe"]); // ❌ Ne jamais retourner le mot de passe !

        // ✅ Stocker l'utilisateur en session
        $_SESSION["user_id"] = $user["utilisateur_id"];

        // ✅ Récupérer les véhicules du chauffeur si applicable
        if ($user["role"] === "chauffeur" || $user["role"] === "chauffeur_passager") {
            $stmtVehicules = $pdo->prepare("
                SELECT v.voiture_id, v.modele, v.immatriculation, v.energie, v.couleur, v.date_premiere_immatriculation, m.libelle AS marque
                FROM Voiture v
                LEFT JOIN detient d ON v.voiture_id = d.voiture_id
                LEFT JOIN Marque m ON d.marque_id = m.marque_id
                WHERE d.utilisateur_id = ?
            ");
            $stmtVehicules->execute([$user["utilisateur_id"]]);
            $user["vehicules"] = $stmtVehicules->fetchAll(PDO::FETCH_ASSOC);
        }

        // ✅ Répondre avec les infos utilisateur et véhicules
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
