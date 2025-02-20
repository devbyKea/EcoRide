<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

// 🔥 Assure que PHP enregistre bien les sessions dans un dossier accessible sur Railway
ini_set('session.save_path', '/tmp'); 
error_log("✅ [DEBUG] Dossier de session accessible ? " . (is_writable(session_save_path()) ? 'OUI' : 'NON'));


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

    session_start();
    error_log("✅ [CONFIG] Liste des fichiers de session : " . json_encode(scandir(session_save_path())));

    
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
