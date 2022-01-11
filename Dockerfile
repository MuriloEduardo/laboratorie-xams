FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN npx knex migrate:rollback && \
#     npx knex migrate:latest

EXPOSE 3000

CMD [ "npm", "start" ]