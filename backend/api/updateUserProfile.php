<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Utilisateur non connecté"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("UPDATE utilisateurs SET username = ?, phone = ?, role = ?, plaque = ?, date_immatriculation = ?, marque = ?, modele = ?, couleur = ?, places_disponibles = ?, fumeur = ?, animaux = ?, preferences = ? WHERE id = ?");
    
    $stmt->execute([
        $data['username'], $data['phone'], $data['role'], $data['plaque'], 
        $data['date_immatriculation'], $data['marque'], $data['modele'], 
        $data['couleur'], $data['places_disponibles'], 
        $data['fumeur'], $data['animaux'], $data['preferences'], $user_id
    ]);

    echo json_encode(["message" => "Profil mis à jour"]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
