FROM python:3.12.1

WORKDIR /data/app

COPY ./app /data/app

RUN mkdir /sh
COPY ./sh /sh
RUN chmod +x /sh/entrypoint.sh
RUN chmod +x /sh/init.sh

RUN /sh/init.sh


EXPOSE 8000