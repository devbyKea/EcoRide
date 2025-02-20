# EcoRide - Plateforme de Covoiturage Écologique

## 🌍 À propos du projet
EcoRide est une plateforme web de covoiturage mettant en avant une démarche écologique en favorisant les trajets en véhicules électriques et en optimisant le partage des trajets.

🚀 **Statut du projet** : Développement en cours (seule la partie "Visiteur" est fonctionnelle, l'inscription est opérationnelle, mais la gestion des trajets est encore fictive).

## 📌 Prérequis
Avant d'installer et d'exécuter le projet, assurez-vous d'avoir installé :

- [Git](https://git-scm.com/)
- [PHP 8+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) et [MongoDB](https://www.mongodb.com/)
- Un serveur local comme **XAMPP**, **Laragon**, ou **WAMP** (pour exécuter l’application en local)
- Un navigateur web moderne

## 📂 Structure du projet
```
EcoRide/
│── backend/  # Contient les fichiers du backend (API en PHP)
│── frontend/ # Contient les fichiers du frontend (HTML/CSS/JS)
│── documentation/ # Documentation du projet
│── readme.md  # Ce fichier d'explication
│── vercel.json  # Configuration du déploiement frontend sur Vercel
```

## 🔧 Installation & Configuration

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/devbyKea/EcoRide.git
cd EcoRide
```

### 2️⃣ Installation Backend
```bash
cd backend
composer install
```
#### 📄 Configuration de la base de données
Un fichier `config.php` est déjà fourni pour la connexion à la base de données. Il utilise les variables d'environnement ou les valeurs par défaut suivantes :
```php
<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

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
    error_log("✅ [CONFIG] Connexion à la base de données réussie !");
} catch (PDOException $e) {
    error_log("❌ Erreur de connexion BDD: " . $e->getMessage());
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
```
Si vous souhaitez modifier ces valeurs en local, vous pouvez configurer vos propres variables d'environnement ou modifier directement ce fichier.

### 3️⃣ Installation Frontend
Le frontend est en HTML, CSS et JavaScript pur, il n'y a donc pas besoin d'installation supplémentaire. 

## 🚀 Lancement du projet en local

### 1️⃣ Démarrer le serveur backend
```bash
cd backend
php -S localhost:8000 -t public
```
L'API sera accessible via `http://localhost:8000/`.

### 2️⃣ Démarrer le frontend
Il suffit d'ouvrir le fichier `frontend/index.html` dans un navigateur.

## 🌍 Déploiement
Le projet est actuellement déployé sur :
- **Frontend (Vercel)** : [https://eco-ride-one.vercel.app/](https://eco-ride-one.vercel.app/)
- **Backend (Railway)** : [Railway Dashboard](https://railway.com/project/99f132f8-f54e-4419-89e2-6b262aeca367?environmentId=a059f975-b80c-401e-8cce-5d1a062854da)

## 💻 Mise en place de l'environnement de travail
Pour le développement de l'application **EcoRide**, j'ai choisi un environnement permettant de concilier rapidité de mise en place et compatibilité avec les contraintes de déploiement.

1. **Choix du backend : PHP avec MySQL**
   - PHP est un langage accessible, bien documenté et parfaitement adapté aux applications web.
   - MySQL est une base de données relationnelle robuste et bien supportée.
   - Utilisation de **PDO** pour sécuriser les requêtes SQL et éviter les injections.

2. **Choix du frontend : HTML/CSS/JS**
   - Pas d'utilisation de frameworks JS pour simplifier le développement et éviter une complexité inutile.
   - CSS est utilisé avec des principes de responsive design.

3. **Déploiement distant avec Railway et Vercel**
   - **Railway** pour héberger l'API et la base de données MySQL, permettant une mise en ligne rapide sans configurer un serveur dédié.
   - **Vercel** pour héberger le frontend, offrant une rapidité de déploiement et une gestion simplifiée des versions.

4. **Gestion du code avec GitHub**
   - Respect de bonnes pratiques avec une branche principale (`main`) et une branche de développement (`dev`).
   - Git permet une meilleure organisation et un suivi des modifications.

## ✨ Fonctionnalités
- 🌱 Page vitrine du projet
- 🛣️ Recherche fictive de trajets
- 📝 Inscription fonctionnelle
- ⚠️ Les espaces "Employé" et "Administrateur" ne sont pas encore développés

## 🛠️ Améliorations futures
- Implémentation réelle de la recherche et des réservations de trajets
- Gestion des utilisateurs (passager, chauffeur, employé, administrateur)
- Tableau de bord administrateur
- Sécurité et validation des entrées

## 💡 Contribution
Toute aide est la bienvenue ! Clonez le dépôt, créez une branche et proposez vos modifications via une pull request.

## 📜 Licence
Ce projet est sous licence MIT. Libre à vous de le modifier et l'améliorer.

