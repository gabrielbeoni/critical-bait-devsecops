# Etapa 1: preparar o conteudo estatico da aplicacao
FROM alpine:3.21 AS builder
WORKDIR /app
COPY index.html ./index.html
COPY assets/ ./assets/

# Etapa 2: imagem final enxuta, com Nginx sem privilegios
FROM nginxinc/nginx-unprivileged:stable-alpine
USER root
RUN apk upgrade --no-cache brotli-libs curl libcurl
COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/assets/ /usr/share/nginx/html/assets/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
