<?php

require '/var/www/html/vendor/autoload.php';

use MongoDB\Client;
use Dotenv\Dotenv;

// Charger les variables d'environnement
$dotenv = Dotenv::createImmutable('/var/www/html');
$dotenv->load();

// Vérifier toutes les sources possibles de la variable
$mongoUri = getenv('MONGO_URL') 
    ?: $_ENV['MONGO_URL'] 
    ?: getenv('MONGO_PUBLIC_URL') 
    ?: $_ENV['MONGO_PUBLIC_URL'] 
    ?: null;

// Vérifier que l'URI MongoDB est bien définie
if (!$mongoUri) {
    die("❌ Erreur : Aucune URL MongoDB trouvée. Vérifie tes variables d'environnement.");
}

// Ajouter les options pour Railway
$mongoUri .= "?ssl=true&retryWrites=true&w=majority";

try {
    $client = new Client($mongoUri);
    $database = $client->selectDatabase('EcoRideDB'); // Mets le bon nom ici si besoin
    echo "✅ Connexion réussie à MongoDB !";
} catch (Exception $e) {
    die("❌ Erreur de connexion à MongoDB : " . $e->getMessage());
}



// Sélectionner la collection "notifications"
$collectionNotifications = $database->selectCollection('notifications');

// Insérer une notification
$newNotification = [
    "user_id" => "654321",  // ID de l'utilisateur concerné
    "message" => "Votre covoiturage de Paris à Lyon a été confirmé !",
    "status" => "non-lu",    // Statut : "lu" ou "non-lu"
    "date" => new MongoDB\BSON\UTCDateTime()
];

$resultNotif = $collectionNotifications->insertOne($newNotification);


$userId = "654321";  // Remplace par l'ID réel de l'utilisateur

$notifications = $collectionNotifications->find([
    "user_id" => $userId,
    "status" => "non-lu"
]);


$collectionNotifications->updateOne(
    ["user_id" => "654321", "status" => "non-lu"], 
    ['$set' => ["status" => "lu"]]
);


$olderThan30Days = new MongoDB\BSON\UTCDateTime((time() - (30 * 24 * 60 * 60)) * 1000);

$collectionNotifications->deleteMany(["date" => ['$lt' => $olderThan30Days]]);

// Sélectionner la collection "logs"
$collectionLogs = $database->selectCollection('logs');

// Ajouter un log d'activité
$newLog = [
    "user_id" => "654321",
    "action" => "Connexion réussie",
    "date" => new MongoDB\BSON\UTCDateTime()
];

$resultLog = $collectionLogs->insertOne($newLog);

$userId = "654321";

$logs = $collectionLogs->find(["user_id" => $userId]);


$olderThan6Months = new MongoDB\BSON\UTCDateTime((time() - (180 * 24 * 60 * 60)) * 1000);

$collectionLogs->deleteMany(["date" => ['$lt' => $olderThan6Months]]);

$collectionStats = $database->selectCollection('stats');

// Enregistrer le nombre de trajets du jour
$newStat = [
    "date" => new MongoDB\BSON\UTCDateTime(),
    "trajets" => 150  // Nombre de trajets du jour
];

$collectionStats->insertOne($newStat);

$stats = $collectionStats->find([]);

