FROM node:12

WORKDIR /usr/app/server

COPY . .

RUN npm install

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3001

CMD ["npm", "run", "dev"]