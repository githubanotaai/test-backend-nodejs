FROM node:lts-alpine

COPY . /usr/src
RUN true
WORKDIR /usr/src

EXPOSE 3000

CMD node dist/Main