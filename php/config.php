<?php
$host = "junction.proxy.rlwy.net";  // Host de Railway
$dbname = "railway";  // Remplace par le nom de ta base si différent
$username = "root";  // Remplace par l'utilisateur Railway
$password = "ton_mot_de_passe";  // Remplace par le mot de passe Railway
$port = "58446";  // Assure-toi que c'est bien ce port

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connexion à la base de données réussie !";
} catch (PDOException $e) {
    die("❌ Erreur de connexion à MySQL : " . $e->getMessage());
}
?>
