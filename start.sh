#!/bin/bash
apt update
apt -y upgrade
apt update
apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | -E bash -
apt -y install nodejs
apt-get install -y npm 
# starting server
cd server
npm start &

# starting client
cd ../pulsebs_frontend
npm install
npm start

