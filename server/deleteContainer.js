const jenkinsapi = require('jenkins-api');
const Q = require('q');
const CONFIG = require('./config');
const TOKEN = '88297c534db89a0b0d08a9f8e622c88a';
const USER = 'oki';

exports.deleteByPRID = (prID) => {
  console.log('Deleting Container:', prID);
  const jenkins = jenkinsapi.init(
    `https://${USER}:${TOKEN}@${CONFIG.DEFAULT_JENKINS_SERVER_URL}`,
    { strictSSL: false }
  );
  const deferred = Q.defer();

  jenkins.build('ho-fn-admin-interface-close-pr', {
    ghprbPullId: prID,
  }, (err, data) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(data);
  });

  return deferred.promise;
};
