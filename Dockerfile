FROM node:15.6-buster as dev
WORKDIR /usr/src/app

FROM dev as build
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM sebp/lighttpd as run
COPY --from=build /usr/src/app/build /var/www/localhost/htdocs/
RUN chmod 440 /var/www/localhost/htdocs/

EXPOSE 80