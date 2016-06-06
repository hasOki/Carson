FROM docker-dev.ops.tune.com/itops/baseimages-centos7:latest

RUN yum -y update && \
    yum -y install tar && \
    yum -y install gcc-c++ && \
    yum -y install make && \
    yum -y clean all && \
    curl -o /tmp/node-v6.1.0-linux-x64.tar.gz https://nodejs.org/dist/v6.1.0/node-v6.1.0-linux-x64.tar.gz && \
    tar xzf /tmp/node-v6.1.0-linux-x64.tar.gz && \
    cp -rp node-v6.1.0-linux-x64 /usr/local/ && \
    ln -s /usr/local/node-v6.1.0-linux-x64 /usr/local/node

env PATH /usr/local/node/bin:$PATH

ADD package.json /tmp/package.json
ADD .npmrc /tmp/.npmrc
RUN cd /tmp && \
    npm install && \
    mkdir -p /data/www/carson && \
    cp -a /tmp/node_modules /data/www/carson/ && \
    cd /data/www/carson/

COPY . /data/www/carson/
WORKDIR /data/www/carson
RUN npm run build

ENTRYPOINT ["npm"]
CMD ["start"]
EXPOSE 4020
