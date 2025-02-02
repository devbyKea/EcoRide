#!/bin/sh
apachectl -f /app/apache-config.conf -D FOREGROUND
apache2-foreground
