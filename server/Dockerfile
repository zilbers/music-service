FROM node:12

ADD /package.json /usr/app/server

WORKDIR /usr/app/server

RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3001

CMD ["npm", "run", "docker"]