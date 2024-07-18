# Stufe 1: Bauen
FROM node:14 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

# Stufe 2: Servieren
FROM nginx:alpine

RUN apk add --update nodejs npm

COPY --from=build /app/build /usr/share/nginx/html

COPY  nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
