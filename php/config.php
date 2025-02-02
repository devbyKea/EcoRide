<?php
// ✅ Connexion à MySQL via PDO
$host = getenv("MYSQLHOST") ?: "localhost";  // Utilisation d'une valeur par défaut pour le local
$dbname = getenv("MYSQLDATABASE") ?: "EcoRideDB"; 
$username = getenv("MYSQLUSER") ?: "root"; 
$password = getenv("MYSQLPASSWORD") ?: ""; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("❌ Erreur de connexion à MySQL : " . $e->getMessage());
}

// ✅ Connexion à MongoDB via MongoDB\Client (via Composer)
require 'vendor/autoload.php'; // Charge MongoDB via Composer

$mongoUri = getenv("MONGODB_URI") ?: "mongodb://localhost:27017";  // Valeur par défaut pour le local
$mongoDatabaseName = getenv("MONGODB_DATABASE") ?: "ecoride_mongo"; // Nom de la base MongoDB

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $mongoDb = $mongoClient->selectDatabase($mongoDatabaseName);
} catch (Exception $e) {
    die("❌ Erreur de connexion à MongoDB : " . $e->getMessage());
}

// ✅ Affichage d'un message de succès (à commenter après test)
echo "<p>✅ Connexion réussie à MySQL et MongoDB !</p>";
?>


