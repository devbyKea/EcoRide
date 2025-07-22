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




require_once __DIR__ . '/../config.php'; // La session est déjà gérée dans config.php

// Debug temporaire : voir si la session est bien récupérée
error_log("✅ Session ID: " . session_id());
error_log("✅ Contenu de SESSION: " . json_encode($_SESSION));

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("SELECT email, username, phone, role, plaque, date_immatriculation, marque, modele, couleur, places_disponibles, fumeur, animaux, preferences FROM utilisateurs WHERE id = ?");
    $stmt->execute([$user_id]);
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(["error" => "Utilisateur introuvable"]);
    }
} catch (PDOException $e) {
    error_log("❌ Erreur SQL: " . $e->getMessage());
    echo json_encode(["error" => "Erreur lors de la récupération des données"]);
}
?>

