# Etapa de build com todas as dependências
FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install

FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache \
    python3 \
    bash \
    openjdk17-jdk \
    g++ \
    git

COPY . .

RUN chmod +x ./scripts/*.sh || true

RUN mkdir -p tmp

EXPOSE 4000

CMD ["node", "index.js"]