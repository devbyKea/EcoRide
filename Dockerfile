# Utilisation de l'image PHP 8.2 avec Apache intégré
FROM php:8.2-apache

# Mettre à jour les paquets et installer les extensions PHP/MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# Désactiver MPM event et activer MPM prefork
RUN a2dismod mpm_event && a2enmod mpm_prefork

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Forcer Apache à écouter sur 8080
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copier la configuration Apache personnalisée
COPY apache2.conf /etc/apache2/apache2.conf

# Charger la nouvelle configuration Apache
RUN a2ensite 000-default && service apache2 restart

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code source du projet
COPY . /var/www/html/

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# Démarrer Apache en mode foreground
CMD ["apache2-foreground"]


