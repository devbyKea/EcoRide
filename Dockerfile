# Utilisation d'une image officielle PHP avec Apache déjà installé
FROM php:8.2-apache

# Mise à jour des paquets et installation des extensions PHP nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# Activer mod_rewrite pour Apache (nécessaire pour .htaccess)
RUN a2enmod rewrite

# Correction du problème MPM Prefork
RUN a2dismod mpm_event && a2enmod mpm_prefork

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet vers le serveur Apache
COPY . /var/www/html/

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# Lancer Apache au démarrage du container
CMD ["apache2-foreground"]
