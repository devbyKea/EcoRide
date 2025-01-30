<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['utilisateur']) || !$_SESSION['utilisateur']['estConnecte']) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté"]);
    exit;
}

// ✅ Récupérer les données envoyées en JSON
$data = json_decode(file_get_contents("php://input"), true);
$userId = $_SESSION['utilisateur']['id'];
$trajetId = $data['trajetId'];

// ✅ Simuler la base de données
$trajets = [
    1 => ["placesRestantes" => 2, "prix" => 25]
];

// ✅ Vérifier que le trajet existe
if (!isset($trajets[$trajetId]) || $trajets[$trajetId]["placesRestantes"] <= 0) {
    echo json_encode(["success" => false, "message" => "Trajet complet"]);
    exit;
}

// ✅ Vérifier le crédit
if ($_SESSION['utilisateur']['credit'] < $trajets[$trajetId]["prix"]) {
    echo json_encode(["success" => false, "message" => "Crédit insuffisant"]);
    exit;
}

// ✅ Mettre à jour le crédit et les places restantes
$_SESSION['utilisateur']['credit'] -= $trajets[$trajetId]["prix"];
$trajets[$trajetId]["placesRestantes"]--;

echo json_encode(["success" => true, "message" => "Participation confirmée"]);
?>
