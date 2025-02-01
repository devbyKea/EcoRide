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


# 📌 Exposer le port 80 pour Apache
EXPOSE 80

# 📌 Démarrer Apache
CMD ["apache2-foreground"]
