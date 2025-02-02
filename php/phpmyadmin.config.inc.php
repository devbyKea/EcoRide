<?php 
declare(strict_types=1);

// 🔐 Clé secrète pour l'authentification des cookies (doit être longue et aléatoire)
$cfg['blowfish_secret'] = getenv("PMA_BLOWFISH_SECRET") ?: 'RandomSecretKey123!ChangeThisNow'; 

// Initialisation des serveurs
$i = 0;
$i++;

// 🔑 Authentification par cookie pour la sécurité
$cfg['Servers'][$i]['auth_type'] = 'cookie';

// 🌐 Connexion à MySQL via les variables d'environnement Railway
$cfg['Servers'][$i]['host'] = getenv("PMA_HOST") ?: 'mysql-production-0e86.up.railway.app'; // Vérifie bien l'URL dans Railway
$cfg['Servers'][$i]['port'] = getenv("PMA_PORT") ?: 3306;
$cfg['Servers'][$i]['user'] = getenv("PMA_USER") ?: 'root';
$cfg['Servers'][$i]['password'] = getenv("PMA_PASSWORD") ?: 'hbdBKLksPtwzoEqeupeFGMEoYwvXnnLT';

// 🚀 Optimisation de la connexion
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false; // On interdit la connexion sans mot de passe

// 📌 Options avancées (Facultatif, mais recommandé pour Railway)
$cfg['Servers'][$i]['connect_type'] = 'tcp'; // Force la connexion TCP (évite certains bugs)
$cfg['PmaAbsoluteUri'] = '/phpmyadmin/'; // Assure le bon fonctionnement de l'interface
?>

