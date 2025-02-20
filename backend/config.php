<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

if (file_exists('/app/custom.ini')) {
    error_log("✅ [CONFIG] Chargement du fichier custom.ini");
    ini_set('session.save_path', '/tmp');
} else {
    error_log("❌ [CONFIG] Le fichier custom.ini n'existe pas.");
}

// 🔥 Vérifier si l'extension session est activée
if (!extension_loaded('session')) {
    error_log("❌ [CONFIG] L'extension PHP 'session' n'est pas activée !");
    die(json_encode(["error" => "L'extension PHP 'session' n'est pas activée sur ce serveur."]));
}

// ✅ Définir le dossier des sessions uniquement si l'extension est activée
ini_set('session.save_path', '/tmp'); 
error_log("✅ [DEBUG] Dossier de session accessible ? " . (is_writable(session_save_path()) ? 'OUI' : 'NON'));

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

    session_start();  // 🔥 Démarrer la session

    // ✅ Debugging avancé des sessions
    error_log("✅ [CONFIG] Session Save Path: " . session_save_path());
    error_log("✅ [CONFIG] Session ID: " . session_id());
    error_log("✅ [CONFIG] Contenu de SESSION: " . json_encode($_SESSION));

    // 🔥 Vérifier si le fichier de session existe et est lisible
    $session_file = session_save_path() . "/sess_" . session_id();
    if (file_exists($session_file)) {
        error_log("✅ [CONFIG] Contenu du fichier de session : " . file_get_contents($session_file));
    } else {
        error_log("❌ [CONFIG] Fichier de session non trouvé !");
    }

    error_log("✅ [CONFIG] Fichier de session attendu : " . $session_file);
    error_log("✅ [CONFIG] Fichier de session lisible ? " . (is_readable($session_file) ? 'OUI' : 'NON'));

    // 🔥 Régénérer l'ID UNIQUEMENT si l'utilisateur n'est pas déjà connecté
    if (!isset($_SESSION['user_id'])) { 
        session_regenerate_id(true);
    }
}

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
