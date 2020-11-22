FROM node:12

ADD /package.json /usr/app/client

WORKDIR /usr/app/client

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
