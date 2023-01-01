FROM ubuntu:latest
RUN apt-get update && apt-get install -y nodejs && apt-get install -y npm
WORKDIR /server
COPY . .
RUN npm i
EXPOSE 3000
CMD npx webpack build && npm start
