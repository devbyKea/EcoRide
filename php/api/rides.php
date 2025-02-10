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
        $utilisateur_id = $data['utilisateur_id'] ?? '';
        $depart = $data['depart'] ?? '';
        $destination = $data['destination'] ?? '';
        $date = $data['date'] ?? '';

        $stmt = $pdo->prepare("INSERT INTO Trajets (utilisateur_id, depart, destination, date) VALUES (?, ?, ?, ?)");
        $stmt->execute([$utilisateur_id, $depart, $destination, $date]);

        echo json_encode(["message" => "Trajet ajouté avec succès"]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("SELECT * FROM Trajets");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}
?>
