FROM node:18.16.1

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ["node", "src/index.js"]