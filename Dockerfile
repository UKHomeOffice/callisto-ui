FROM nginx:alpine

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY dist /var/www/data/
#COPY dist /usr/share/nginx/html/

#ENV NGINX_CONFIG_FILE=/etc/nginx/nginx.conf
