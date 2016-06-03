const metadata = require('web-metadata');
const Q = require('q');

const SERVER_URL = 'http://h-p9hofn01-sta-1b.use01.ho.priv';
const PORT_START = 4000;
const PORT_LENGTH = 20;

const checkPort = (option) => {
  console.log('Checking: ', option);
  const deferred = Q.defer();
  try {
    metadata(option, (err, data) => {
      if (err) {
        deferred.reject(err);
      } else {
        const metaResult = {
          port: option.port,
          id: data.meta['app-pr-id'],
          title: data.meta['app-pr-title'],
          prBuildLink: option.url,
          link: data.meta['app-pr-link'],
          author: data.meta['app-pr-author'],
        };
        deferred.resolve(metaResult);
      }
    });
  } catch (err) {
    deferred.reject(err);
  }

  return deferred.promise;
};

const checkPortList = (portList) => (
  portList.map((port) => (
    checkPort({
      url: `${SERVER_URL}:${port}`,
      port,
    })
  ))
);

exports.checkStatus = () => {
  const ports = Array.from(new Array(PORT_LENGTH), (x, i) => PORT_START + i);
  return checkPortList(ports);
};

exports.deletePRBuild = (prID) => {
  console.log('Deleting PR Container : ', prID);
};
