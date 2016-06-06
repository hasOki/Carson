const TOKEN = '88297c534db89a0b0d08a9f8e622c88a';
const CONFIG = require('./config');

const jenkinsEndpoint = `-k -s -X POST --user oki:${TOKEN} ${CONFIG.DEFAULT_JENKINS_SERVER_URL}ho-fn-admin-interface-close-pr/build/`;

exports.deleteContainerByPRID = (prID) => (jenkinsEndpoint);
