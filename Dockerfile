# Utilisation de l'image officielle PHP avec Apache intégré
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

# 🔥 Désactiver MPM event et activer MPM prefork (CORRECTION MAJEURE)
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Vérifier que le MPM est bien chargé après activation
RUN apachectl -M | grep mpm

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 S'assurer qu'Apache écoute bien sur 8080
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName pour éviter l’erreur
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copier la configuration Apache personnalisée
COPY apache2.conf /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code source du projet
COPY . /var/www/html/

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# 🔥 Supprimer la ligne qui causait une erreur de redémarrage Apache
CMD ["apache2-foreground"]

