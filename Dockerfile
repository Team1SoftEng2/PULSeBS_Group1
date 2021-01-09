FROM ubuntu:20.04

RUN apt update
RUN snap install node --classic
RUN apt-get install -y npm 

COPY . /app

EXPOSE 3000 8080

WORKDIR /app

CMD ["/bin/bash", "/app/start.sh"]
