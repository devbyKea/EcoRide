<?php
$host = "mysql.railway.internal"; // Hôte interne Railway
$dbname = "railway"; // Nom de la base de données
$user = "root"; // Identifiant par défaut de Railway
$password = getenv("PMA_PASSWORD"); // On récupère la variable d’environnement

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}
?>
