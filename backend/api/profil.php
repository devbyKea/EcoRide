<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

error_reporting(0);
ini_set('display_errors', 0);

require_once __DIR__ . "/../config.php";

// 🔧 Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ Gestion de la requête OPTIONS pour éviter les erreurs CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// ✅ Vérifier si la session est déjà active avant de l'initialiser
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}



error_log("📌 DEBUG SESSION ID : " . session_id());
error_log("📌 Contenu de SESSION : " . json_encode($_SESSION));


// ✅ Vérification de l'utilisateur connecté
$user_id = $_SESSION["utilisateur_id"] ?? null;

if (!$user_id) {
    ob_end_clean(); // 🔥 Supprimer toute sortie avant d'envoyer la réponse JSON propre
    http_response_code(401);
    echo json_encode(["error" => "Utilisateur non authentifié"]);
    exit;
}


try {
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        // 🔍 Récupérer les infos du profil utilisateur
        $stmt = $pdo->prepare("
            SELECT u.utilisateur_id, u.nom, u.prenom, u.email, u.telephone, u.pseudo,
                   r.libelle AS role
            FROM utilisateur u
            LEFT JOIN possede p ON u.utilisateur_id = p.utilisateur_id
            LEFT JOIN Role r ON p.role_id = r.role_id
            WHERE u.utilisateur_id = ?
        ");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            ob_end_clean();
            echo json_encode(["error" => "Utilisateur introuvable"]);
            http_response_code(404);
            exit;
        }

        // 🚗 Récupérer les véhicules si l'utilisateur est chauffeur
        $stmtVehicules = $pdo->prepare("
            SELECT v.voiture_id, v.modele, v.immatriculation, v.energie, v.couleur, 
                   v.date_premiere_immatriculation, m.libelle AS marque
            FROM Voiture v
            LEFT JOIN detient d ON v.voiture_id = d.voiture_id
            LEFT JOIN marque m ON d.marque_id = m.marque_id
            WHERE d.utilisateur_id = ?
        ");
        $stmtVehicules->execute([$user_id]);
        $user["vehicules"] = $stmtVehicules->fetchAll(PDO::FETCH_ASSOC);

        $debug_output = ob_get_contents();
        ob_end_clean();
        
        if (!empty($debug_output)) {
            error_log("⚠️ Sortie parasite détectée : " . $debug_output);
        }
        
        // 🔥 Vérification du JSON avant envoi
        $json_output = json_encode($user);
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("❌ Erreur JSON : " . json_last_error_msg());
            echo json_encode(["error" => "Erreur JSON: " . json_last_error_msg()]);
            http_response_code(500);
            exit;
        }
        
        echo $json_output;
        http_response_code(200);
        exit;
    } 
    
    elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        // 📥 Récupérer les données envoyées par le client
        $data = json_decode(file_get_contents("php://input"), true);

        // 🔄 Mise à jour des informations utilisateur
        $stmt = $pdo->prepare("
            UPDATE utilisateur 
            SET nom = ?, prenom = ?, email = ?, telephone = ?, pseudo = ?
            WHERE utilisateur_id = ?
        ");
        $stmt->execute([
            $data["nom"] ?? "",
            $data["prenom"] ?? "",
            $data["email"] ?? "",
            $data["telephone"] ?? "",
            $data["pseudo"] ?? "",
            $user_id
        ]);

        // 🚗 Gestion des véhicules (si chauffeur)
        if (!empty($data["vehicules"])) {
            foreach ($data["vehicules"] as $vehicule) {
                if (!empty($vehicule["voiture_id"])) {
                    // Mise à jour véhicule existant
                    $stmtVehicule = $pdo->prepare("
                        UPDATE voiture 
                        SET modele = ?, immatriculation = ?, energie = ?, couleur = ?, 
                            date_premiere_immatriculation = ?
                        WHERE voiture_id = ? AND voiture_id IN 
                            (SELECT voiture_id FROM detient WHERE utilisateur_id = ?)
                    ");
                    $stmtVehicule->execute([
                        $vehicule["modele"] ?? "",
                        $vehicule["immatriculation"] ?? "",
                        $vehicule["energie"] ?? "",
                        $vehicule["couleur"] ?? "",
                        $vehicule["date_premiere_immatriculation"] ?? "",
                        $vehicule["voiture_id"],
                        $user_id
                    ]);
                } else {
                    // 🚗 Ajouter un nouveau véhicule
                    $stmtVehicule = $pdo->prepare("
                        INSERT INTO voiture (modele, immatriculation, energie, couleur, date_premiere_immatriculation) 
                        VALUES (?, ?, ?, ?, ?)
                    ");
                    $stmtVehicule->execute([
                        $vehicule["modele"] ?? "",
                        $vehicule["immatriculation"] ?? "",
                        $vehicule["energie"] ?? "",
                        $vehicule["couleur"] ?? "",
                        $vehicule["date_premiere_immatriculation"] ?? ""
                    ]);
                    $voiture_id = $pdo->lastInsertId();

                    // 🚗 Lier la voiture à l'utilisateur
                    $stmtLien = $pdo->prepare("INSERT INTO detient (utilisateur_id, voiture_id) VALUES (?, ?)");
                    $stmtLien->execute([$user_id, $voiture_id]);
                }
            }
        }

        ob_end_clean();
        echo json_encode(["success" => "Profil mis à jour"]);
        http_response_code(200);
        exit;
    }
} catch (PDOException $e) {
    ob_end_clean();
    echo json_encode(["error" => "Erreur BDD : " . $e->getMessage()]);
    http_response_code(500);
    exit;
}
?>
