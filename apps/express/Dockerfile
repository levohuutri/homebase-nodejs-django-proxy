FROM node:18.19.0-alpine

WORKDIR /data/app

COPY ./app /data/app

RUN mkdir /sh
COPY ./sh /sh
RUN chmod +x /sh/entrypoint.sh


EXPOSE 3000