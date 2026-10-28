
FROM nginxinc/nginx-unprivileged:stable-alpine

COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
