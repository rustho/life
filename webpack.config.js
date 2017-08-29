'use strict';
let webpack = require('webpack');

module.exports = {
  context: __dirname + '/frontend',
  entry:   {
    app: './appmvc.js'
  },
  output:  {
    path:     __dirname + '/docs',
    filename: '[name].js'
  },
  plugin: [
    new webpack.ProvidePlugin({
          $:'jquery',
          jQuery:'jquery',
          'window.jQuery':'jquery'
      })
  ],
  watch:true,
  watchOptions:{
    aggregateTimeout:300
  }
};