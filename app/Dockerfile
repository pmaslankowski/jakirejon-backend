FROM node:12

RUN apt-get update && apt-get install -y less vim 

WORKDIR /workspace/app

ENV PATH /workspace/app/node_modules/.bin:$PATH

COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install

CMD npm start | 2>&1 tee ./app.log

