<?php
require 'config.php';

echo "<h2>✅ Connexion établie avec succès !</h2>";

// Tester MySQL
try {
    $stmt = $pdo->query("SHOW TABLES;");
    echo "<h3>📌 Tables MySQL disponibles :</h3><ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<li>" . implode("", $row) . "</li>";
    }
    echo "</ul>";
} catch (PDOException $e) {
    echo "❌ Erreur MySQL : " . $e->getMessage();
}

// Tester MongoDB
try {
    $collections = $mongoDb->listCollections();
    echo "<h3>📌 Collections MongoDB disponibles :</h3><ul>";
    foreach ($collections as $collection) {
        echo "<li>" . $collection->getName() . "</li>";
    }
    echo "</ul>";
} catch (Exception $e) {
    echo "❌ Erreur MongoDB : " . $e->getMessage();
}
?>
