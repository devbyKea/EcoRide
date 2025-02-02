<?php
declare(strict_types=1);

$cfg['blowfish_secret'] = 'RandomSecretKey123!'; // Clé secrète pour les cookies
$i = 0;
$i++;
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = getenv("PMA_HOST");
$cfg['Servers'][$i]['port'] = getenv("PMA_PORT");
$cfg['Servers'][$i]['user'] = getenv("PMA_USER");
$cfg['Servers'][$i]['password'] = getenv("PMA_PASSWORD");
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;
?>
