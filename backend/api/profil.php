<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config.php"; // Fichier de configuration de la BDD

$method = $_SERVER['REQUEST_METHOD'];

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Utilisateur non authentifié"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($method === "GET") {
        // 🔍 Récupérer les infos du profil utilisateur
        $stmt = $pdo->prepare("SELECT nom, email, telephone, role, preferences, plaque, immatriculation, marque, modele, couleur, places 
                               FROM utilisateurs WHERE id = :id");
        $stmt->execute(["id" => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Utilisateur introuvable"]);
        }
    } elseif ($method === "POST") {
        // 🔄 Mettre à jour le profil utilisateur
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $pdo->prepare("UPDATE utilisateurs SET nom = :nom, email = :email, telephone = :telephone, role = :role, 
                               preferences = :preferences, plaque = :plaque, immatriculation = :immatriculation, 
                               marque = :marque, modele = :modele, couleur = :couleur, places = :places WHERE id = :id");

        $stmt->execute([
            "nom" => $data["nom"] ?? "",
            "email" => $data["email"] ?? "",
            "telephone" => $data["telephone"] ?? "",
            "role" => $data["role"] ?? "",
            "preferences" => json_encode($data["preferences"] ?? []),
            "plaque" => $data["plaque"] ?? "",
            "immatriculation" => $data["immatriculation"] ?? "",
            "marque" => $data["marque"] ?? "",
            "modele" => $data["modele"] ?? "",
            "couleur" => $data["couleur"] ?? "",
            "places" => $data["places"] ?? 0,
            "id" => $user_id
        ]);

        echo json_encode(["success" => "Profil mis à jour"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur BDD : " . $e->getMessage()]);
}
