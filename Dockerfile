FROM ubuntu:20.04
COPY . .
RUN  apt-get update -y
RUN  apt-get upgrade -y
RUN  apt-get install g++ -y
RUN  apt-get install python -y
RUN  apt-get install python2 -y
RUN  apt-get install python3 -y
RUN  apt-get install wget -y
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_DB_NAME=DOcode    
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    software-properties-common \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list \
    && apt-get update && apt-get install -y \
    mongodb-org \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN wget https://nodejs.org/dist/v20.15.1/node-v20.15.1-linux-x64.tar.xz
RUN tar -xvf node-v20.15.1-linux-x64.tar.xz
RUN cp node-v20.15.1-linux-x64/bin/*  /bin
RUN mkdir -p /data/db 
CMD ["sh", "-c", "mongod --bind_ip_all & node server.js"]
