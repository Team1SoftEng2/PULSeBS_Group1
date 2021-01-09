FROM ubuntu:20.04

RUN apt update
RUN apt -y upgrade
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm 

COPY . /app

EXPOSE 3000 8080

WORKDIR /app

CMD ["/bin/bash", "/app/start.sh"]
