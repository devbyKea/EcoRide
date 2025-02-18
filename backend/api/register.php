<?php
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app"); // Autoriser uniquement ton frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Autoriser les requêtes POST et OPTIONS
header("Access-Control-Allow-Headers: Content-Type"); // Autoriser l'envoi de JSON

// Gérer les pré-requêtes CORS (Preflight)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once "config.php"; // Inclusion de la connexion à la BDD


// Vérifier si on a reçu une requête POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du JSON envoyé
    $data = json_decode(file_get_contents("php://input"), true);

    // Vérifier que tous les champs sont remplis
    if (!isset($data["name"], $data["email"], $data["password"], $data["confirm_password"])) {
        echo json_encode(["status" => "error", "message" => "Tous les champs sont requis."]);
        exit;
    }

    $name = htmlspecialchars(trim($data["name"]));
    $email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
    $password = trim($data["password"]);
    $confirm_password = trim($data["confirm_password"]);

    // Vérifier que l'email est valide
    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Adresse email invalide."]);
        exit;
    }

    // Vérifier que les mots de passe correspondent
    if ($password !== $confirm_password) {
        echo json_encode(["status" => "error", "message" => "Les mots de passe ne correspondent pas."]);
        exit;
    }

    // Vérifier si l'email est déjà utilisé
    $stmt = $pdo->prepare("SELECT utilisateur_id FROM Utilisateur WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Cet email est déjà utilisé."]);
        exit;
    }

    // Hasher le mot de passe
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insérer le nouvel utilisateur
    $stmt = $pdo->prepare("INSERT INTO Utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)");
    if ($stmt->execute([$name, $email, $hashed_password])) {
        echo json_encode(["status" => "success", "message" => "Inscription réussie !"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'inscription."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
