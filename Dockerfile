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

# Télécharger phpMyAdmin
RUN wget -O /tmp/phpmyadmin.zip https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip \
    && unzip /tmp/phpmyadmin.zip -d /var/www/ \
    && mv /var/www/phpMyAdmin-* /var/www/phpmyadmin \
    && rm /tmp/phpmyadmin.zip

# Copier la config phpMyAdmin
COPY php/phpmyadmin.config.inc.php /var/www/phpmyadmin/config.inc.php

# Définir les bons droits d'accès
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

# Copier le projet
COPY . /var/www/html/

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
