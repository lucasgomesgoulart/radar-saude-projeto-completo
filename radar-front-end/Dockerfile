FROM node:16.17-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3001

CMD ["npm", "start"]