FROM node:16.15.0-alpine
MAINTAINER Scarlet

RUN mkdir /app
WORKDIR /app
RUN chmod -R 777 /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install -g npm@8.9.0
RUN npm install -g react-scripts
RUN npm install -g react-router-dom
RUN apk add --no-cache git


COPY . /app
CMD ["npm", "start"]
