<?php
require 'vendor/autoload.php'; // Charger l'auto-loader de Composer

$mongoUri = getenv('MONGODB_URI') ?: 'mongodb://mongo:NemIqICBzwDngGvpIBBmZHyrqgqGgRaZ@mongodb.railway.internal:27017';

try {
    $client = new MongoDB\Client($mongoUri);
    $database = $client->selectDatabase('railway');
    $collection = $database->selectCollection('avis');
} catch (Exception $e) {
    die("Erreur de connexion à MongoDB : " . $e->getMessage());
}
?>
