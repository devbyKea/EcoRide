<?php
$host = getenv("MYSQLHOST");
$dbname = getenv("MYSQLDATABASE");
$username = getenv("MYSQLUSER");
$password = getenv("MYSQLPASSWORD");
$port = getenv("MYSQLPORT");

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connexion réussie à MySQL !<br>";

    // Vérifier si les tables existent
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    if ($tables) {
        echo "📌 Tables trouvées dans la base de données :<br>";
        foreach ($tables as $table) {
            echo "➡️ " . $table . "<br>";
        }
    } else {
        echo "⚠️ Aucune table trouvée dans la base de données.";
    }
} catch (PDOException $e) {
    die("❌ Erreur de connexion à MySQL : " . $e->getMessage());
}
?>
