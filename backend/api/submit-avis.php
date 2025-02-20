<?php
require '../mongo_config.php'; // Fichier qui gère la connexion à MongoDB

// Vérifier si la requête est bien en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $nom = htmlspecialchars($_POST['nom']);
    $note = (int) $_POST['note']; // Convertir la note en entier
    $commentaire = htmlspecialchars($_POST['avis']);
    
    // Vérification des champs
    if (empty($nom) || empty($note) || empty($commentaire)) {
        echo json_encode(["error" => "Tous les champs sont requis"]);
        exit;
    }

    // Création de l'avis sous forme d'un document MongoDB
    $avis = [
        "nom" => $nom,
        "note" => $note,
        "commentaire" => $commentaire,
        "date" => new MongoDB\BSON\UTCDateTime()
    ];

    // Insérer l'avis dans la collection "avis"
    try {
        $insertResult = $collection->insertOne($avis);
        header("Location: avis-form.html?success=1"); // Redirection avec succès
        exit();
    } catch (Exception $e) {
        echo "Erreur lors de l'insertion : " . $e->getMessage();
    }
} else {
    echo "Méthode non autorisée.";
}
?>

