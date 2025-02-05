<?php

require_once '/var/www/html/vendor/autoload.php';



use MongoDB\Client;
use Dotenv\Dotenv;

// Charger les variables d'environnement
$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

// Récupérer l'URI MongoDB
$mongoUri = $_ENV['MONGO_URI'] ?? getenv('MONGO_URI') ?? null;


try {
    $client = new Client($mongoUri);
    $database = $client->selectDatabase('EcoRideDB'); // Remplace par le nom de ta base
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

echo "✅ Notification ajoutée avec l'ID : " . $resultNotif->getInsertedId();


$userId = "654321";  // Remplace par l'ID réel de l'utilisateur

$notifications = $collectionNotifications->find([
    "user_id" => $userId,
    "status" => "non-lu"
]);

foreach ($notifications as $notif) {
    echo "[" . $notif['status'] . "] " . $notif['message'] . " - " . $notif['date']->toDateTime()->format('d/m/Y H:i') . "\n";
}

$collectionNotifications->updateOne(
    ["user_id" => "654321", "status" => "non-lu"], 
    ['$set' => ["status" => "lu"]]
);

echo "✅ Notification marquée comme lue !";


$olderThan30Days = new MongoDB\BSON\UTCDateTime((time() - (30 * 24 * 60 * 60)) * 1000);

$collectionNotifications->deleteMany(["date" => ['$lt' => $olderThan30Days]]);

echo "✅ Anciennes notifications supprimées !";


// Sélectionner la collection "logs"
$collectionLogs = $database->selectCollection('logs');

// Ajouter un log d'activité
$newLog = [
    "user_id" => "654321",
    "action" => "Connexion réussie",
    "date" => new MongoDB\BSON\UTCDateTime()
];

$resultLog = $collectionLogs->insertOne($newLog);

echo "✅ Log ajouté avec l'ID : " . $resultLog->getInsertedId();

$userId = "654321";

$logs = $collectionLogs->find(["user_id" => $userId]);

foreach ($logs as $log) {
    echo "[" . $log['date']->toDateTime()->format('d/m/Y H:i') . "] " . $log['action'] . "\n";
}

$olderThan6Months = new MongoDB\BSON\UTCDateTime((time() - (180 * 24 * 60 * 60)) * 1000);

$collectionLogs->deleteMany(["date" => ['$lt' => $olderThan6Months]]);

echo "✅ Logs anciens supprimés !";

$collectionStats = $database->selectCollection('stats');

// Enregistrer le nombre de trajets du jour
$newStat = [
    "date" => new MongoDB\BSON\UTCDateTime(),
    "trajets" => 150  // Nombre de trajets du jour
];

$collectionStats->insertOne($newStat);
echo "✅ Statistiques mises à jour !";

$stats = $collectionStats->find([]);

foreach ($stats as $stat) {
    echo "[" . $stat['date']->toDateTime()->format('d/m/Y') . "] Trajets : " . $stat['trajets'] . "\n";
}
