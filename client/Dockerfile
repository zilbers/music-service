FROM node:12

WORKDIR /usr/app/client

ADD /package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]