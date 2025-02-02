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

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Ajouter "Listen 8080" pour s'assurer qu'Apache écoute sur le bon port
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName pour éviter l’erreur
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier tout le projet sauf index.php
COPY backend/ /var/www/html/

# Copier index.php et config.php séparément
COPY backend/php/index.php /var/www/html/index.php
COPY backend/php/config.php /var/www/html/config.php

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# 🔥 INSTALLATION DE PHPMYADMIN
RUN wget -O /tmp/phpmyadmin.zip https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip \
    && unzip /tmp/phpmyadmin.zip -d /var/www/ \
    && mv /var/www/phpMyAdmin-* /var/www/phpmyadmin \
    && rm /tmp/phpmyadmin.zip

# Copier la configuration personnalisée de phpMyAdmin
COPY backend/config/phpmyadmin.config.inc.php /var/www/phpmyadmin/config.inc.php

# Donner les bons droits d'accès à phpMyAdmin
RUN chown -R www-data:www-data /var/www/phpmyadmin \
    && chmod -R 755 /var/www/phpmyadmin

# Exposer le port spécifique à phpMyAdmin
EXPOSE 8081

# Exposer le port spécifique à Apache
EXPOSE 8080

# 🔥 Démarrer Apache avec phpMyAdmin
CMD ["apache2-foreground"]



