'use strict';
let webpack = require('webpack');

module.exports = {
  context: __dirname + '/frontend',
  entry:   {
    app: './tsmvc.ts',
  },
  output:  {
    path:     __dirname + '/public',
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
      },{
        test: /\.json?$/,
        use: {
          loader:'json-loader'
        },
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
}