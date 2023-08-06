FROM node:16

WORKDIR /appdynamicload

COPY package.json .

RUN npm install

COPY . .

CMD npm start
