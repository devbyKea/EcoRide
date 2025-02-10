<?php
// Activer CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';
require __DIR__ . '/../../vendor/autoload.php'; // Charger PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';

        // Vérifier si l'utilisateur existe
        $stmt = $pdo->prepare("SELECT utilisateur_id FROM Utilisateur WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(["error" => "Aucun utilisateur trouvé avec cet email."]);
            exit;
        }

        // Générer un token unique
        $resetToken = bin2hex(random_bytes(32));

        // Enregistrer le token en base
        $stmt = $pdo->prepare("UPDATE Utilisateur SET reset_token = ? WHERE email = ?");
        $stmt->execute([$resetToken, $email]);

        // 🔹 Configurer l’email
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Serveur SMTP (utiliser un autre si besoin)
            $mail->SMTPAuth = true;
            $mail->Username = 'ecoride38@gmail.com'; // Remplace par ton adresse Gmail
            $mail->Password = 'mtwo tcrr vznb knbf'; // Remplace par ton mot de passe Gmail (ou un App Password)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Configurer l’email
            $mail->setFrom('ecoride38@gmail.com', 'EcoRide');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = "Réinitialisation de votre mot de passe - EcoRide";
            
            // Lien de réinitialisation
            $resetLink = "http://localhost:8000/reset_password.php?token=" . $resetToken;
            
            $mail->Body = "
                <p>Bonjour,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
                <p><a href='$resetLink'>Cliquez ici pour réinitialiser votre mot de passe</a></p>
                <p>Ce lien expirera après un certain temps.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
                <p>Cordialement,</p>
                <p>L'équipe EcoRide</p>
            ";

            $mail->send();
            echo json_encode(["message" => "Un email de réinitialisation a été envoyé à $email."]);

        } catch (Exception $e) {
            echo json_encode(["error" => "Échec de l'envoi de l'email : " . $mail->ErrorInfo]);
        }
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}


