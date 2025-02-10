<?php
require_once __DIR__ . '/../config/cors.php';
header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';


try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $token = $data['token'] ?? '';
        $newPassword = $data['password'] ?? '';

        // Vérifier si le token est bien reçu
        if (empty($token) || empty($newPassword)) {
            echo json_encode([
                "error" => "Le token et le mot de passe sont obligatoires.",
                "token_reçu" => $token,
                "password_reçu" => !empty($newPassword) ? "OK" : "Manquant"
            ]);
            exit;
        }

        // Vérifier si le token existe en base
        $stmt = $pdo->prepare("SELECT utilisateur_id, reset_token FROM Utilisateur WHERE reset_token = ?");
        $stmt->execute([$token]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // 🔍 DEBUG : Vérification du token en base
        if (!$user) {
            echo json_encode([
                "error" => "Token invalide ou expiré.",
                "token_reçu" => $token,
                "tokens_en_base" => $pdo->query("SELECT reset_token FROM Utilisateur WHERE reset_token IS NOT NULL")->fetchAll(PDO::FETCH_ASSOC)
            ]);
            exit;
        }

        // Hacher le nouveau mot de passe
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Mettre à jour le mot de passe et supprimer le token
        $updateStmt = $pdo->prepare("UPDATE Utilisateur SET mot_de_passe = ?, reset_token = NULL WHERE utilisateur_id = ?");
        $updateStmt->execute([$hashedPassword, $user['utilisateur_id']]);

        // Vérifier si la mise à jour a bien eu lieu
        if ($updateStmt->rowCount() > 0) {
            echo json_encode([
                "message" => "Mot de passe réinitialisé avec succès.",
                "utilisateur_id" => $user['utilisateur_id']
            ]);
        } else {
            echo json_encode([
                "error" => "Échec de la réinitialisation du mot de passe."
            ]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
