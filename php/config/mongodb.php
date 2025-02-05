<?php

require __DIR__ . '/../../vendor/autoload.php'; // Charger Composer

use Dotenv\Dotenv;
use MongoDB\Client;

// Charger les variables d'environnement
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..'); 
$dotenv->load();

// Vérifier si la variable MONGO_URI est bien chargée
var_dump($_ENV['MONGO_URI']); // DEBUG

// Récupérer l'URI MongoDB depuis .env
$mongoUri = $_ENV['MONGO_URI'];

try {
    $client = new Client($mongoUri);
    $database = $client->selectDatabase('EcoRideDB'); // Remplace par ton nom de base
    echo "Connexion réussie à MongoDB !";
} catch (Exception $e) {
    die("Erreur de connexion à MongoDB : " . $e->getMessage());
}

