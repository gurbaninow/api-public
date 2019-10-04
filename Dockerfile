FROM node:10-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "start"]
