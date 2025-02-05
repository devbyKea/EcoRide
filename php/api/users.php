<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

try {
    // Si un ID utilisateur est fourni dans l'URL
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $pdo->prepare("SELECT utilisateur_id, prenom, nom, email, telephone, adresse, pseudo, statut FROM Utilisateur WHERE utilisateur_id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Utilisateur non trouvé"]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
