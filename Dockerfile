# Utilisation d'une image PHP avec Apache intégré
FROM php:8.2-apache

# Installation des extensions PHP/MySQL et des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev unzip wget curl \
    libssl-dev pkg-config apache2-bin \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    && pecl install mongodb \
    && echo "extension=mongodb.so" > /usr/local/etc/php/conf.d/mongodb.ini \
    && a2enmod rewrite

# 🔥 Vérifier que MPM Prefork est bien activé
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 🔥 Installation de phpMyAdmin
RUN wget -O /tmp/phpmyadmin.zip https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip \
    && unzip /tmp/phpmyadmin.zip -d /var/www/ \
    && mv /var/www/phpMyAdmin-* /var/www/phpmyadmin \
    && rm /tmp/phpmyadmin.zip \
    && chown -R www-data:www-data /var/www/phpmyadmin \
    && chmod -R 755 /var/www/phpmyadmin

# 🔥 Ajouter un alias Apache pour phpMyAdmin
RUN echo "Alias /phpmyadmin /var/www/phpmyadmin" >> /etc/apache2/apache2.conf

# 🔥 Ajouter "Listen 8080" pour Apache
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet dans le conteneur
COPY .env /var/www/html/.env
COPY php /var/www/html/php
COPY composer.json /var/www/html/composer.json
COPY composer.lock /var/www/html/composer.lock
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf


# Rediriger Apache vers le bon dossier pour le frontend
RUN echo "<Directory /var/www/html>" >> /etc/apache2/apache2.conf
RUN echo "    Options Indexes FollowSymLinks" >> /etc/apache2/apache2.conf
RUN echo "    AllowOverride All" >> /etc/apache2/apache2.conf
RUN echo "    Require all granted" >> /etc/apache2/apache2.conf
RUN echo "</Directory>" >> /etc/apache2/apache2.conf

# Configurer Apache pour que `/` affiche le bon index.html
RUN echo "<IfModule mod_dir.c>" >> /etc/apache2/apache2.conf
RUN echo "    DirectoryIndex html/index.html" >> /etc/apache2/apache2.conf
RUN echo "</IfModule>" >> /etc/apache2/apache2.conf

# Appliquer la nouvelle configuration Apache
RUN a2ensite 000-default.conf

# 🔥 Installer les dépendances Composer sans erreur de plateforme
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ && chmod -R 755 /var/www/html/

# Exposer les ports Apache et phpMyAdmin
EXPOSE 8080 8081

# 🔥 Démarrer Apache
CMD ["apache2-foreground"]
