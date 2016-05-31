FROM docker-dev.ops.tune.com/itops/baseimages-centos7:latest

RUN yum -y update && \
    yum -y install tar && \
    yum -y install gcc-c++ && \
    yum -y install make && \
    yum -y clean all && \
    curl -o /tmp/node-v5.8.0-linux-x64.tar.gz https://nodejs.org/dist/v5.8.0/node-v5.8.0-linux-x64.tar.gz && \
    tar xzf /tmp/node-v5.8.0-linux-x64.tar.gz && \
    cp -rp node-v5.8.0-linux-x64 /usr/local/ && \
    ln -s /usr/local/node-v5.8.0-linux-x64 /usr/local/node

env PATH /usr/local/node/bin:$PATH

ADD package.json /tmp/package.json
ADD .npmrc /tmp/.npmrc
RUN cd /tmp && \
    npm install && \
    mkdir -p /data/www/carson && cp -a /tmp/node_modules /data/www/admin_interface/

COPY . /data/www/carson/
WORKDIR /data/www/carson

ENTRYPOINT ["npm"]
CMD ["start"]
EXPOSE 1337
