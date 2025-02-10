<?php
// Activer CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';
        $email = $data['email'] ?? '';
        $pseudo = $data['pseudo'] ?? '';
        $telephone = $data['telephone'] ?? '';
        $adresse = $data['adresse'] ?? '';
        $password = !empty($data['password']) ? password_hash($data['password'], PASSWORD_BCRYPT) : null;

        $sql = "UPDATE Utilisateur SET email = ?, pseudo = ?, telephone = ?, adresse = ?";
        $params = [$email, $pseudo, $telephone, $adresse];

        if ($password) {
            $sql .= ", mot_de_passe = ?";
            $params[] = $password;
        }

        $sql .= " WHERE utilisateur_id = ?";
        $params[] = $id;

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(["message" => "Profil mis à jour avec succès"]);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}
?>
