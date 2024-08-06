FROM node:18 AS build

WORKDIR /app

RUN npm install -g npm@latest

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g @ionic/cli

COPY . .

EXPOSE 8100

CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100", "--nobrowser"]
