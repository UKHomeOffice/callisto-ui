FROM nginx:alpine

#FROM quay.io/ukhomeofficedigital/docker-nginx

COPY config/nginx.conf /etc/nginx/nginx.conf

COPY config/http.js /etc/nginx/http.js

COPY dist /var/www/data/