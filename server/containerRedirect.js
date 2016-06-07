const CONFIG = require('./config.js');

exports.redirect = (serverURL = CONFIG.DEFAULT_SERVER_URL, prID) => {
  const port = CONFIG.PORT_START + (prID % CONFIG.PORT_LENGTH);
  return `${serverURL}:${port}`;
};
