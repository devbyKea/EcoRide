<?php
session_start();
require_once "../config.php";

// 🔧 Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 🚨 Sécurisation des erreurs PHP (évite d'envoyer des erreurs en JSON)
error_reporting(0);
ini_set('display_errors', 0);

// Gestion requête OPTIONS (CORS)
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

// ✅ Vérification de l'utilisateur connecté
$user_id = $_SESSION["user_id"] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Utilisateur non authentifié"]);
    http_response_code(401);
    exit;
}

try {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        // 🔍 Récupérer les infos du profil utilisateur
        $stmt = $pdo->prepare("
            SELECT u.utilisateur_id, u.nom, u.prenom, u.email, u.telephone, u.statut, u.pseudo,
                   r.libelle AS role
            FROM Utilisateur u
            LEFT JOIN possede p ON u.utilisateur_id = p.utilisateur_id
            LEFT JOIN Role r ON p.role_id = r.role_id
            WHERE u.utilisateur_id = ?
        ");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(["error" => "Utilisateur introuvable"]);
            http_response_code(404);
            exit;
        }

        // 🚗 Si utilisateur = chauffeur, récupérer ses véhicules
        if ($user["role"] === "chauffeur" || $user["role"] === "chauffeur_passager") {
            $stmtVehicules = $pdo->prepare("
                SELECT v.voiture_id, v.modele, v.immatriculation, v.energie, v.couleur, v.date_premiere_immatriculation, 
                       m.libelle AS marque
                FROM Voiture v
                LEFT JOIN detient d ON v.voiture_id = d.voiture_id
                LEFT JOIN Marque m ON d.marque_id = m.marque_id
                WHERE d.utilisateur_id = ?
            ");
            $stmtVehicules->execute([$user_id]);
            $user["vehicules"] = $stmtVehicules->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($user);
        http_response_code(200);
    } 
    
    elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        // 📥 Récupérer les données envoyées par le client
        $data = json_decode(file_get_contents("php://input"), true);

        // 🔄 Mise à jour des informations utilisateur
        $stmt = $pdo->prepare("
            UPDATE Utilisateur 
            SET nom = :nom, prenom = :prenom, email = :email, telephone = :telephone
            WHERE utilisateur_id = :id
        ");
        $stmt->execute([
            "nom" => $data["nom"] ?? "",
            "prenom" => $data["prenom"] ?? "",
            "email" => $data["email"] ?? "",
            "telephone" => $data["telephone"] ?? "",
            "id" => $user_id
        ]);

        // 🚗 Mise à jour des véhicules (si chauffeur)
        if (isset($data["vehicules"]) && ($data["role"] === "chauffeur" || $data["role"] === "chauffeur_passager")) {
            foreach ($data["vehicules"] as $vehicule) {
                if (!empty($vehicule["voiture_id"])) {
                    // Mise à jour véhicule existant
                    $stmtVehicule = $pdo->prepare("
                        UPDATE Voiture 
                        SET modele = :modele, immatriculation = :immatriculation, energie = :energie, couleur = :couleur, 
                            date_premiere_immatriculation = :date_immatriculation
                        WHERE voiture_id = :voiture_id AND voiture_id IN (SELECT voiture_id FROM detient WHERE utilisateur_id = :user_id)
                    ");
                    $stmtVehicule->execute([
                        "modele" => $vehicule["modele"] ?? "",
                        "immatriculation" => $vehicule["immatriculation"] ?? "",
                        "energie" => $vehicule["energie"] ?? "",
                        "couleur" => $vehicule["couleur"] ?? "",
                        "date_immatriculation" => $vehicule["date_premiere_immatriculation"] ?? "",
                        "voiture_id" => $vehicule["voiture_id"],
                        "user_id" => $user_id
                    ]);
                } else {
                    // 🚗 Ajouter un nouveau véhicule
                    $stmtVehicule = $pdo->prepare("
                        INSERT INTO Voiture (modele, immatriculation, energie, couleur, date_premiere_immatriculation) 
                        VALUES (:modele, :immatriculation, :energie, :couleur, :date_immatriculation)
                    ");
                    $stmtVehicule->execute([
                        "modele" => $vehicule["modele"] ?? "",
                        "immatriculation" => $vehicule["immatriculation"] ?? "",
                        "energie" => $vehicule["energie"] ?? "",
                        "couleur" => $vehicule["couleur"] ?? "",
                        "date_immatriculation" => $vehicule["date_premiere_immatriculation"] ?? ""
                    ]);
                    $voiture_id = $pdo->lastInsertId();

                    // 🚗 Lier la voiture à l'utilisateur
                    $stmtLien = $pdo->prepare("INSERT INTO detient (utilisateur_id, voiture_id) VALUES (?, ?)");
                    $stmtLien->execute([$user_id, $voiture_id]);
                }
            }
        }

        echo json_encode(["success" => "Profil mis à jour"]);
        http_response_code(200);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur BDD : " . $e->getMessage()]);
    http_response_code(500);
}
exit;
?>
