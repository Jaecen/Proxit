FROM sebp/lighttpd
COPY src/* /var/www/localhost/htdocs/
RUN chmod 440 /var/www/localhost/htdocs/