<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

// 🔥 Assure que PHP enregistre bien les sessions dans un dossier accessible sur Railway
ini_set('session.save_path', '/tmp'); 
error_log("✅ [DEBUG] Dossier de session accessible ? " . (is_writable(session_save_path()) ? 'OUI' : 'NON'));

if (!extension_loaded('session')) {
    die(json_encode(["error" => "L'extension PHP 'session' n'est pas activée sur ce serveur."]));
}

// ✅ Récupérer l'ID de session depuis le cookie PHPSESSID
if (isset($_COOKIE['PHPSESSID'])) {
    session_id($_COOKIE['PHPSESSID']); // 🔥 Forcer PHP à utiliser le même ID de session
}

// ✅ Vérifier si une session est déjà active avant de la démarrer
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 86400, 
        'path' => '/',
        'domain' => '.vercel.app', // 🔥 Permet à toutes les sous-domaines de partager la session
        'secure' => true, 
        'httponly' => true,
        'samesite' => 'None'
    ]);

    session_commit(); // 🔥 Sauvegarde la session avant de la rouvrir
    session_start();  // 🔥 Recharge la session

    error_log("✅ [CONFIG] Liste des fichiers de session : " . json_encode(scandir(session_save_path())));

    $session_file = session_save_path() . "/sess_" . session_id();
if (file_exists($session_file)) {
    error_log("✅ [CONFIG] Contenu du fichier de session : " . file_get_contents($session_file));
} else {
    error_log("❌ [CONFIG] Fichier de session non trouvé !");
}

    error_log("✅ [CONFIG] Fichier de session attendu : " . $session_file);
    error_log("✅ [CONFIG] Fichier de session lisible ? " . (is_readable($session_file) ? 'OUI' : 'NON'));
    error_log("✅ [CONFIG] Propriétaire du fichier de session : " . fileowner($session_file));
    error_log("✅ [CONFIG] Droits du fichier de session : " . substr(sprintf('%o', fileperms($session_file)), -4));

    
    // 🔥 Régénérer l'ID UNIQUEMENT si l'utilisateur n'est pas déjà connecté
    if (!isset($_SESSION['user_id'])) { 
        session_regenerate_id(true);
    }
}

// ✅ Debugging avancé pour suivre les sessions
error_log("✅ [CONFIG] Session Save Path: " . session_save_path());
error_log("✅ [CONFIG] Session ID: " . session_id());
error_log("✅ [CONFIG] Contenu de SESSION: " . json_encode($_SESSION));

// 🚀 Connexion à la base de données
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false, // 🔥 Sécurise contre les injections SQL
    ]);

} catch (PDOException $e) {
    error_log("❌ Erreur de connexion BDD: " . $e->getMessage());
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
