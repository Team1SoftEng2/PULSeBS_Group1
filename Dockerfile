FROM ubuntu:20.04

RUN apt update
RUN apt get -y nodejs
RUN apt get -y npm 

COPY . /app

EXPOSE 3000 8080

CMD ["/bin/bash", "/app/start.sh"]
