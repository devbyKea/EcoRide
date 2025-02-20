<?php
// Autoriser les requêtes provenant de ton frontend sur Vercel
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Permettre les méthodes HTTP spécifiques
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gestion de la requête OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config.php'; // ✅ La session est déjà gérée dans config.php

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Debugging avancé
error_log("✅ Données reçues pour update: " . json_encode($data));

try {
    $stmt = $pdo->prepare("UPDATE utilisateurs SET username = ?, phone = ?, role = ?, plaque = ?, date_immatriculation = ?, marque = ?, modele = ?, couleur = ?, places_disponibles = ?, fumeur = ?, animaux = ?, preferences = ? WHERE id = ?");
    
    $stmt->execute([
        $data['username'], $data['phone'], $data['role'], $data['plaque'], 
        $data['date_immatriculation'], $data['marque'], $data['modele'], 
        $data['couleur'], $data['places_disponibles'], 
        $data['fumeur'], $data['animaux'], $data['preferences'], $user_id
    ]);

    echo json_encode(["message" => "Profil mis à jour"]);
} catch (PDOException $e) {
    error_log("❌ Erreur SQL: " . $e->getMessage());
    echo json_encode(["error" => "Erreur lors de la mise à jour du profil"]);
}
?>
