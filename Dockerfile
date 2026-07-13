# Site institucional AngelCode — servido como estático por nginx.
# Build context = esta pasta (/site). EasyPanel: Caminho de Build = /site.
FROM nginx:alpine

# Remove a página default do nginx e copia o site
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

# nginx já serve /usr/share/nginx/html na porta 80 com index.html
EXPOSE 80
