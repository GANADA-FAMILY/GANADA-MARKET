FROM node:16.15.0-alpine
MAINTAINER Scarlet

RUN mkdir /app
RUN chmod -R 777 /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --legacy-peer-deps
RUN npm install -g react-scripts
RUN npm install -g react-router-dom
RUN apk add --no-cache git

COPY . /app
RUN chmod -R 777 /app/node_modules
CMD ["yarn", "start"]




