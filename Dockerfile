FROM nginx:alpine

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY dist /var/www/data/