FROM node:10-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci
RUN npm install mysql

COPY . .

CMD ["npm", "start"]
