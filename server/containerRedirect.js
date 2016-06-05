const CONFIG = require('./config.js');

exports.redirect = (serverURL = CONFIG.DEFAULT_SERVER_URL, prID) => {
  const id = prID.split('-')[1];
  const port = CONFIG.PORT_START + (id % CONFIG.PORT_LENGTH);
  return `${serverURL}:${port}`;
};
