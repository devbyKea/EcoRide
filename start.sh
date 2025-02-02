#!/bin/bash

# 🔹 Activer MPM Prefork (indispensable pour Apache)
a2dismod mpm_event
a2enmod mpm_prefork

# 🔹 Activer mod_rewrite (important pour `.htaccess`)
a2enmod rewrite

# 🔹 Démarrer Apache au premier plan
apache2ctl -D FOREGROUND
