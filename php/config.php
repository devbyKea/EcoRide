<?php
$host = getenv("mysql.railway.internal");  // Railway fournit ces variables automatiquement
$dbname = getenv("railway");
$username = getenv("root");
$password = getenv("hbdBKLksPtwzoEqeupeFGMEoYwvXnnLT");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
