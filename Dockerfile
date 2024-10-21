FROM node:18-alpine as build

WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . /app
RUN npm run build -- --output-path=dist

FROM nginx:alpine
COPY nginx.conf  /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html