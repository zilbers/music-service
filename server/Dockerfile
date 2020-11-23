FROM node:12

RUN mkdir -p /src/server

WORKDIR /src/server

COPY package.json /src/app/package.json

RUN npm i --silent

EXPOSE 3001

COPY . /src/server

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "docker"]