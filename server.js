var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const SERVER_PORT = 1337;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(SERVER_PORT, '0.0.0.0', function (error) {
  if (error) {
    console.log(error);
  }

  console.log(`Listening at localhost:${SERVER_PORT}`);
});
