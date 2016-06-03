const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config.js');
const portStatus = require('./src/models/portStatus.js');
const Q = require('q');

const DEVELOPMENT = !(process.env.NODE_ENV === 'production');
const PORT = 4020;
const IP = '0.0.0.0';

const app = express();
app.set('view engine', 'jade');
app.use(express.static('server'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// only use the webpack middleware during development mode
if (DEVELOPMENT) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));
}

// Handle GET request
// check status endpoint
app.get('/status', (req, res) => {
  const portStatusResult = portStatus.checkStatus();
  Q.allSettled(portStatusResult)
    .then((results) => {
      res.json(results);
    });
});

// redirect to container port endpoint
app.get('/prbuild', (req, res) => {
  res.json({
    params: req.params,
    query: req.query,
  });
});

// everything else
app.get('*', (req, res) => {
  res.render('index', { pageTitle: 'Welcome to Carson, PR Deployment Dashboard' });
});

// start the server
const appServer = app.listen(PORT, IP, (err) => {
  if (err) { console.error(err); }
  console.info(`Carson 🎩  is running at http://${appServer.address().address}:${appServer.address().port}`);
});
