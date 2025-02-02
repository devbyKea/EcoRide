# Utilisation d'une image PHP avec Apache intégré
FROM php:8.2-apache

# Installation des extensions PHP/MySQL et des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# 🔥 FORCER L’INSTALLATION DU MODULE MPM PREFORK
RUN apt-get install -y apache2-bin
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Vérifier que MPM Prefork est bien activé
RUN apachectl -M | grep mpm

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Ajouter "Listen 8080" pour s'assurer qu'Apache écoute sur le bon port
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName pour éviter l’erreur
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier tout le projet sauf index.php
COPY . /var/www/html/

# Copier index.php séparément dans /var/www/html/
COPY php/index.php /var/www/html/index.php

COPY php/config.php /var/www/html/config.php


# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# 🔥 Démarrer Apache une fois que tout est bien chargé
CMD ["apache2-foreground"]


