<?php
require_once '/var/www/html/vendor/autoload.php';

use Dotenv\Dotenv;

// Charger les variables d'environnement
$dotenv = Dotenv::createImmutable('/var/www/html');

$dotenv->load();

// Connexion à MySQL
try {
    $pdo = new PDO(
        "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";port=" . $_ENV['DB_PORT'] . ";charset=utf8",
        $_ENV['DB_USER'],
        $_ENV['DB_PASSWORD']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Connexion réussie, pas besoin d'afficher du texte ici

} catch (Exception $e) {
    die("❌ Erreur de connexion MySQL : " . $e->getMessage());
}
