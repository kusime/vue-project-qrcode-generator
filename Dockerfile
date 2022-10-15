FROM nginx
WORKDIR /dist/
COPY /dist/ /dist/
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8001