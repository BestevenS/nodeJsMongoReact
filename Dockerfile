# FROM node:16

COPY andraxestate /app/
COPY server /app/ 


WORKDIR /app

RUN npm install

CMD ["node", "server/server.js"]