FROM node:12

COPY ./server /server
RUN cd /server && npm install

COPY ./pulsebs_frontend /client
RUN cd /client && npm install

EXPOSE 3000 8081

# Run the app (both client and server)
CMD npm start --prefix ./server & npm start --prefix ./client
