# Utilisation de l'image PHP 8.2 avec Apache intégré
FROM php:8.2-apache

# Mise à jour des paquets et installation des extensions PHP/MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    apache2 \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql

# 🔥 Vérifier que les modules MPM sont bien installés
RUN ls -l /etc/apache2/mods-available/

# 🔥 Désactiver MPM event et activer MPM prefork proprement
RUN a2dismod mpm_event && a2enmod mpm_prefork

# 🔥 Vérifier que le MPM Prefork est bien activé
RUN apachectl -M | grep mpm

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Forcer Apache à écouter sur le bon port 8080
RUN echo "Listen 8080" >> /etc/apache2/ports.conf

# Définir le ServerName pour éviter les erreurs
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

# 🔥 Démarrer Apache uniquement une fois que tout est bien configuré
CMD ["apache2-foreground"]

