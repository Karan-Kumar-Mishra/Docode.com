FROM ubuntu:20.04
COPY . .
RUN  apt-get update -y
RUN  apt-get upgrade -y
RUN  apt-get install g++ -y
RUN  apt-get install python3 -y
RUN  apt-get install wget -y
RUN wget https://nodejs.org/dist/v20.15.1/node-v20.15.1-linux-x64.tar.xz
RUN tar -xvf node-v20.15.1-linux-x64.tar.xz
RUN cp node-v20.15.1-linux-x64/bin/*  /bin
CMD ["node","server.js"]
