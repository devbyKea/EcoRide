#!/bin/sh
apache2-foreground

apachectl -f /app/apache-config.conf -D FOREGROUND
