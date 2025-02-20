# Utiliser l'image officielle PHP avec MySQL et PDO
FROM php:8.2-cli

# Installer les extensions PDO et MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Définir le dossier de travail
WORKDIR /app

# Copier tout le contenu du backend dans /app
COPY backend/ /app/

# Exposer le port utilisé par PHP
EXPOSE 8000

# Lancer PHP en mode serveur sur le port Railway
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/app"]
