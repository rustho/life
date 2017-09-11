// Karma configuration
// Generated on Tue Aug 22 2017 13:34:39 GMT+0700 (+07)

var webpackConfig = require ('./webpack.config.js');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','sinon'],


    // list of files / patterns to load in the browser
    files: [
      'frontend/**/*spec.js'
    ],

    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'frontend/**/*s':['webpack']
    },
    webpack:{
      module: webpackConfig.module,
      resolve:webpackConfig.resolve
    },

    plugins:[
      require('karma-typescript'),
       require('karma-typescript-preprocessor'),
      require('karma-webpack'),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-mocha"),
      require('karma-mocha-reporter'),
      require('karma-sinon'),
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
