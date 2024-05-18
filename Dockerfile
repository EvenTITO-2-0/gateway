FROM node:18

WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY ./app ./app
CMD ["node", "app/index.js"]
