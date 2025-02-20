# EcoRide - Plateforme de Covoiturage Écologique

## 🌍 À propos du projet
EcoRide est une plateforme web de covoiturage mettant en avant une démarche écologique en favorisant les trajets en véhicules électriques et en optimisant le partage des trajets.

🚀 **Statut du projet** : Développement en cours (seule la partie "Visiteur" est fonctionnelle, l'inscription est opérationnelle, mais la gestion des trajets est encore fictive).

## 📌 Prérequis
Avant d'installer et d'exécuter le projet, assurez-vous d'avoir installé :

- [Git](https://git-scm.com/)
- [PHP 8+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js 16+](https://nodejs.org/)
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
Actuellement, aucune configuration `.env` n'est fournie. Si nécessaire, créez un fichier `config.php` avec vos paramètres de base de données.


### 3️⃣ Installation Frontend
```bash
cd ../frontend
npm install  # Si un framework JS est utilisé (React, Vue...)
```
Si le projet est en HTML/CSS/JS classique, il suffit d’ouvrir `index.html` dans un navigateur.

## 🚀 Lancement du projet en local

### 1️⃣ Démarrer le serveur backend
```bash
cd backend
php -S localhost:8000 -t public
```
L'API sera accessible via `http://localhost:8000/`.

### 2️⃣ Démarrer le frontend (si applicable)
Si un framework JS est utilisé :
```bash
cd frontend
npm run dev
```
Sinon, ouvrez simplement `frontend/index.html` dans un navigateur.

## 🌍 Déploiement
Le projet est actuellement déployé sur :
- **Frontend (Vercel)** : [https://eco-ride-one.vercel.app/](https://eco-ride-one.vercel.app/)
- **Backend (Railway)** : [Railway Dashboard](https://railway.com/project/99f132f8-f54e-4419-89e2-6b262aeca367?environmentId=a059f975-b80c-401e-8cce-5d1a062854da)

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
