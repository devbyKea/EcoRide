# 📌 Utiliser PHP 8.2 avec Apache
FROM php:8.2-apache

# 📌 Installer les extensions nécessaires
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli zip

# 📌 Installer l'extension MongoDB
RUN pecl install mongodb \
    && echo "extension=mongodb.so" >> /usr/local/etc/php/conf.d/mongodb.ini

# 📌 Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 📌 Définir le dossier de travail
WORKDIR /app

# 📌 Copier les fichiers du projet dans le conteneur
COPY . /app

ENV COMPOSER_ALLOW_SUPERUSER=1

# 📌 Supprimer les anciens fichiers et le cache Composer avant installation
RUN rm -rf /app/vendor /app/composer.lock \
    && composer clear-cache \
    && composer install --no-dev --optimize-autoloader --no-interaction --no-plugins
# Copier le fichier de config Apache
COPY apache2.conf /etc/apache2/apache2.conf

# Activer le module rewrite
RUN a2enmod rewrite

# Remplace le port 80 par 8080 dans la configuration d'Apache
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8080>/' /etc/apache2/sites-available/000-default.conf

# 📌 Exposer le port 80 pour Apache
EXPOSE 8080
RUN echo "ServerName 0.0.0.0" >> /etc/apache2/apache2.conf
# Installer Apache MPM Prefork pour éviter l'erreur
RUN apt-get update && apt-get install -y apache2 libapache2-mod-php

# Activer le module MPM Prefork
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 📌 Démarrer Apache
CMD ["apache2-foreground, bash, /app/start.sh"]
