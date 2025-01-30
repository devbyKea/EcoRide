<?php
$host = getenv("MYSQLHOST");  
$dbname = getenv("MYSQLDATABASE");
$username = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à MySQL : " . $e->getMessage());
}
?>


<?php
require 'vendor/autoload.php';  // Charge MongoDB via Composer

$mongoUri = getenv("MONGODB_URI");  // Railway injecte cette variable automatiquement

try {
    $mongoClient = new MongoDB\Client($mongoUri);
    $mongoDb = $mongoClient->selectDatabase(getenv("MONGODB_DATABASE")); // Variable d'environnement pour la base MongoDB
} catch (Exception $e) {
    die("Erreur de connexion à MongoDB : " . $e->getMessage());
}
?>

