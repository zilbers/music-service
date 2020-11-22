FROM node:12

WORKDIR /usr/app/server

ADD /package.json .
RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3001

CMD ["npm", "run", "docker"]