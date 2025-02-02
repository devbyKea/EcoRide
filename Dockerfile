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

# 🔥 Désactiver MPM event et activer MPM prefork (OBLIGATOIRE)
RUN a2dismod mpm_event && a2enmod mpm_prefork

# Activer mod_rewrite pour .htaccess
RUN a2enmod rewrite

# 🔥 Vérifier si Apache est bien configuré (affichera des logs dans Railway)
RUN apache2ctl configtest

# Définir le ServerName pour éviter les erreurs
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code source du projet
COPY . /var/www/html/

# Donner les bons droits aux fichiers
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

# Exposer le port 8080 (Railway écoute sur ce port)
EXPOSE 8080

# Lancer Apache en mode foreground
CMD ["apache2-foreground"]
