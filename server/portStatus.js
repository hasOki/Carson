const metadata = require('web-metadata');
const Q = require('q');
const CONFIG = require('./config');

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

const checkPortList = (serverURL, portList) => (
  portList.map((port) => (
    checkPort({
      url: `${serverURL}:${port}`,
      port,
    })
  ))
);

exports.checkStatus = (serverURL = CONFIG.DEFAULT_SERVER_URL) => {
  const ports = Array.from(new Array(CONFIG.PORT_LENGTH), (x, i) => CONFIG.PORT_START + i);
  return Q.allSettled(checkPortList(serverURL, ports));
};

exports.deletePRBuild = (prID) => {
  console.log('Deleting PR Container : ', prID);
};
