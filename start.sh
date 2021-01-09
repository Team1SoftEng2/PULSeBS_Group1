#!/bin/bash

# starting server
cd server
npm start &

# starting client
cd ../pulsebs_frontend
npm install
npm start

