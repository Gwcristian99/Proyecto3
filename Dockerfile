FROM php:8.2-apache



# Crea el directorio} si no existe (previene el error de /var/www/html not found)

RUN mkdir -p /var/www/html



# Copia todos los archivos del proyecto

COPY . /var/www/html/



# Da permisos correctos a los archivos

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html



# Instala y habilita mysqli (para conexión a base de datos)

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli



# Expone el puerto 80

EXPOSE 80