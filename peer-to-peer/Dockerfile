FROM node:20.5.0

WORKDIR /app

COPY package-lock.json ./

RUN npm ci
ENV NODE_ENV production

COPY . .

CMD ["node", "index.js"]
