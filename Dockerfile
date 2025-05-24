
FROM node:18

WORKDIR /app

# Instalar dependências do sistema (Python, Java, C++, etc.)
RUN apt-get update && apt-get install -y \
    python3 \
    bash \
    openjdk-17-jdk \
    g++ \
    git \
    && apt-get clean

COPY . .

RUN chmod +x ./scripts/*.sh || true

RUN mkdir -p tmp

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]


