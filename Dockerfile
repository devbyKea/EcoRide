# Utilisation d'une image PHP avec Apache intégré
FROM php:8.2-apache

# Installation des extensions PHP/MySQL et des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    wget \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# 🔥 FORCER L’INSTALLATION DU MODULE MPM PREFORK
RUN apt-get install -y apache2-bin
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Vérifier que MPM Prefork est bien activé
RUN apachectl -M | grep mpm

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Installation de phpMyAdmin
RUN wget -O /tmp/phpmyadmin.zip https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip \
    && unzip /tmp/phpmyadmin.zip -d /var/www/ \
    && mv /var/www/phpMyAdmin-* /var/www/phpmyadmin \
    && rm /tmp/phpmyadmin.zip

# 🔥 Ajouter un alias Apache pour phpMyAdmin
RUN echo "Alias /phpmyadmin /var/www/phpmyadmin" >> /etc/apache2/apache2.conf

# 🔥 Configurer les permissions
RUN chown -R www-data:www-data /var/www/phpmyadmin \
    && chmod -R 755 /var/www/phpmyadmin


# Exposer le port spécifique à phpMyAdmin
EXPOSE 8081

# 🔥 Ajouter "Listen 8080" pour Apache
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier uniquement le contenu PHP sans écraser les configurations système
COPY php /var/www/html/php
COPY vendor /var/www/html/vendor
COPY composer.json /var/www/html/composer.json
COPY composer.lock /var/www/html/composer.lock
COPY php/index.php /var/www/html/index.php



# Installer Composer dans Docker
RUN apt-get update && apt-get install -y unzip curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installer les bibliothèques nécessaires pour MongoDB avec SSL
RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config \
    && pecl install mongodb \
    && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini

# Supprimer `vendor/` pour éviter les erreurs de cache
RUN rm -rf /var/www/html/vendor

# Installer les dépendances Composer sans erreur de plateforme
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs


# Copier index.php et config.php séparément
COPY php/index.php /var/www/html/index.php
COPY php/config.php /var/www/html/config.php

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Expose le port Apache
EXPOSE 8080

# 🔥 Démarrer Apache
CMD ["apache2-foreground"]
