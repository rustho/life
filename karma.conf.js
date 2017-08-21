module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'frontend/*.js',
      'test/*.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch:false, 
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false
  });
};