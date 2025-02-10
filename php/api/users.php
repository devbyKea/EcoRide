<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . '/../config/database.php';

// Test pour voir si PHP envoie bien les headers
header("Content-Type: application/json");
echo json_encode(["message" => "Headers CORS envoyés"]);
exit();




try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['id'])) {
            // Récupérer un seul utilisateur par son ID
            $id = $_GET['id'];
            $stmt = $pdo->prepare("SELECT utilisateur_id, prenom, nom, email, telephone, adresse, pseudo, statut FROM Utilisateur WHERE utilisateur_id = ?");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode($user, JSON_PRETTY_PRINT);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Utilisateur non trouvé"]);
            }
        } else {
            // Récupérer tous les utilisateurs si aucun ID n'est fourni
            $stmt = $pdo->query("SELECT utilisateur_id, prenom, nom, email, telephone, adresse, pseudo, statut FROM Utilisateur");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($users) {
                echo json_encode($users, JSON_PRETTY_PRINT);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Aucun utilisateur trouvé"]);
            }
        }
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}


