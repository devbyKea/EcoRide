# 📌 Utiliser une image PHP 8 avec Apache
FROM php:8.0-apache

# 📌 Installer les extensions nécessaires
RUN docker-php-ext-install pdo pdo_mysql

# 📌 Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 📌 Copier tous les fichiers du projet dans /var/www/html
COPY . /var/www/html/

# 📌 Définir le dossier de travail
WORKDIR /var/www/html

# 📌 Installer les dépendances PHP
RUN composer install

# 📌 Exposer le port 80 pour le serveur web Apache
EXPOSE 80

# 📌 Lancer Apache
CMD ["apache2-foreground"]
