'use strict';
let webpack = require('webpack');

module.exports = {
  context: __dirname + '/frontend',
  entry:   {
    app: './tsmvc.ts',
  },
  output:  {
    path:     __dirname + '/docs',
    filename: '[name].js'
  },
  module:{
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
          options: {
            fix: true,
          },
			  loader: 'tslint-loader',
			  exclude: /node_modules/,
		  },{
        test: /\.ts?$/,
        use: {
          loader:'awesome-typescript-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
   plugins: [
    new webpack.ProvidePlugin({
          $:'jquery',
          jQuery:'jquery',
          'window.jQuery':'jquery'
      })
  ],

  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  watch:true,
  watchOptions:{
    aggregateTimeout:300
  }
}