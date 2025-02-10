<?php
require_once __DIR__ . '/../config/cors.php';

header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // Vérifier si l'utilisateur existe
        $stmt = $pdo->prepare("SELECT utilisateur_id, pseudo, email, mot_de_passe, statut, token FROM Utilisateur WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(["error" => "Utilisateur introuvable en base de données", "email_reçu" => $email]);
            exit;
        }

        if (!password_verify($password, $user['mot_de_passe'])) {
            echo json_encode(["error" => "Mot de passe incorrect"]);
            exit;
        }

        // Si l'utilisateur a déjà un token, on le réutilise
        if ($user['token']) {
            $token = $user['token'];
        } else {
            // Sinon, on génère un nouveau token et on l'enregistre en base
            $token = bin2hex(random_bytes(32));
            $updateTokenStmt = $pdo->prepare("UPDATE Utilisateur SET token = ? WHERE utilisateur_id = ?");
            $updateTokenStmt->execute([$token, $user['utilisateur_id']]);
        }

        echo json_encode([
            "message" => "Connexion réussie",
            "user" => [
                "id" => $user['utilisateur_id'],
                "pseudo" => $user['pseudo'],
                "email" => $user['email'],
                "statut" => $user['statut']
            ],
            "token" => $token
        ]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}


