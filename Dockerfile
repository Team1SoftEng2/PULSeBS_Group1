FROM ubuntu:20.04

COPY . /app

EXPOSE 3000 8080

WORKDIR /app

CMD ["/bin/bash", "/app/start.sh"]
