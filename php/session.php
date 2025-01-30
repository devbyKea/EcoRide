<?php
session_start();

// ✅ Simuler un utilisateur connecté (remplace ceci par ta base de données plus tard)
if (!isset($_SESSION['utilisateur'])) {
    $_SESSION['utilisateur'] = [
        'estConnecte' => false, // false = visiteur, true = utilisateur connecté
        'credit' => 30, // Crédit en euros
        'id' => null, // ID utilisateur (null si visiteur)
        'nom' => null // Nom de l'utilisateur
    ];
}

// ✅ Retourner les infos sous forme de JSON
header('Content-Type: application/json');
echo json_encode($_SESSION['utilisateur']);
?>
