FROM ubuntu:20.04

RUN apt update
RUN apt -y install nodejs
RUN apt -y install npm

COPY . /app

EXPOSE 3000

ENTRYPOINT [ "/bin/bash", "" ]