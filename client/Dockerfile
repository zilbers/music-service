FROM node:12

RUN mkdir -p /src/client

WORKDIR /src/client

COPY package.json /src/client/package.json

RUN npm i --silent

EXPOSE 3000

COPY . /src/client

CMD ["npm", "run", "start"]