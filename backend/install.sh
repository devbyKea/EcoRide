#!/bin/sh

echo "🔧 Installation des extensions PHP manquantes..."
nix-env -iA nixpkgs.phpPackages.mbstring nixpkgs.phpPackages.iconv nixpkgs.phpPackages.mongodb

echo "✅ Vérification des extensions installées..."
php -m | grep -E 'iconv|mbstring|mongodb'

echo "🚀 Lancement de composer install..."
composer install --ignore-platform-reqs
