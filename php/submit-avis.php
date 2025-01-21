<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $nom = htmlspecialchars($_POST['nom']);
    $note = htmlspecialchars($_POST['note']);
    $avis = htmlspecialchars($_POST['avis']);

    // Structure de l'avis
    $nouvelAvis = [
        'nom' => $nom,
        'note' => $note,
        'avis' => $avis,
        'date' => date('Y-m-d H:i:s') // Ajout de la date
    ];

    // Chargement des avis existants
    $fichier = 'avis.json';
    if (file_exists($fichier)) {
        $avisExistants = json_decode(file_get_contents($fichier), true);
    } else {
        $avisExistants = [];
    }

    // Ajout du nouvel avis
    $avisExistants[] = $nouvelAvis;

    // Sauvegarde dans le fichier JSON
    file_put_contents($fichier, json_encode($avisExistants, JSON_PRETTY_PRINT));

    // Redirection vers la page des avis
    header('Location: avis.html');
    exit();
}
?>
