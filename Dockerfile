
FROM nginxinc/nginx-unprivileged:stable-alpine

USER root

RUN apk update && \
    apk upgrade --no-cache brotli-libs curl libcurl

COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
