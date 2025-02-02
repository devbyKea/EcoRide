# Utilisation d'une image officielle PHP avec Apache
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

# 🔥 Désactiver MPM event et activer MPM prefork pour éviter "No MPM loaded"
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Vérification que les modules MPM sont bien activés (debug)
RUN apachectl -M

# Définir le ServerName pour éviter l’erreur de configuration
RUN echo "ServerName ${RAILWAY_STATIC_URL}" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

# Définir le répertoire de travail
WORKDIR /app/EcoRide/php

# Copier les fichiers du projet vers le serveur Apache
COPY . /app/EcoRide/php/

# Copier la configuration Apache
COPY apache2.conf /etc/apache2/apache2.conf

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /app/EcoRide/php/ \
    && chmod -R 755 /app/EcoRide/php/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# 🔥 Activation des sites et rechargement d'Apache
RUN a2ensite 000-default

# Lancer Apache au démarrage du container
CMD ["apache2-foreground"]

