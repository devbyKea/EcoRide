<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

session_start();
require_once 'config.php'; // Assure-toi que ce fichier contient la connexion à la base de données

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT email, username, phone, role, plaque, date_immatriculation, marque, modele, couleur, places_disponibles, fumeur, animaux, preferences FROM utilisateurs WHERE id = ?");
    $stmt->execute([$user_id]);
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(["error" => "Utilisateur introuvable"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
