<?php
// Activer les erreurs PHP pour voir ce qui se passe
error_reporting(E_ALL);
ini_set("display_errors", 1);

// Vérifier si PHP écoute bien sur le port 80
echo "Test de connexion : ";
echo file_get_contents("http://0.0.0.0:80");

// Vérifier les variables d'environnement
echo "<h2>Variables d'environnement :</h2>";
print_r($_ENV);
?>
