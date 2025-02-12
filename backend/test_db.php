<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT 'Connexion réussie !' AS message");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo $row['message'];
} catch (PDOException $e) {
    echo "Erreur SQL : " . $e->getMessage();
}
?>
