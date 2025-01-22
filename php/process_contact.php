<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupération des données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Adresse email de destination
    $to = "contact@ecoride.com";
    
    // Sujet de l'email
    $email_subject = "Nouveau message de : $name - $subject";
    
    // Contenu de l'email
    $email_body = "Vous avez reçu un nouveau message depuis le formulaire de contact.\n\n" .
                  "Nom : $name\n" .
                  "Email : $email\n\n" .
                  "Message :\n$message";
    
    // En-têtes de l'email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Envoi de l'email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message envoyé avec succès. Nous vous répondrons rapidement.";
    } else {
        echo "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
