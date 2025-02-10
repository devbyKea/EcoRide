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
require_once __DIR__ . '/../config/mongodb.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $user_id = $data['user_id'] ?? '';
        $message = $data['message'] ?? '';

        $newNotification = [
            "user_id" => $user_id,
            "message" => $message,
            "status" => "non-lu",
            "date" => new MongoDB\BSON\UTCDateTime()
        ];

        $collectionNotifications->insertOne($newNotification);

        echo json_encode(["message" => "Notification envoyée avec succès"]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
        $notifications = $collectionNotifications->find(["user_id" => $user_id, "status" => "non-lu"]);
        echo json_encode(iterator_to_array($notifications));
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur MongoDB : " . $e->getMessage()]);
}
?>
