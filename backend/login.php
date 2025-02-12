<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["message" => "Veuillez remplir tous les champs."]);
    http_response_code(400);
    exit;
}

$email = trim($data->email);
$password = trim($data->password);

try {
    $stmt = $pdo->prepare("SELECT id, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        echo json_encode(["message" => "Connexion réussie", "user" => ["id" => $user["id"], "email" => $user["email"]]]);
    } else {
        echo json_encode(["message" => "Email ou mot de passe incorrect."]);
        http_response_code(401);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
    http_response_code(500);
}
?>
