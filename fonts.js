var path         = require('path');
var childProcess = require('child_process');
var phantomjs    = require('phantomjs');
var binPath      = phantomjs.path;
var Promise      = require('bluebird');

var getFonts = function(url, testedFont) {
  return new Promise(function(resolve, reject) {
    var childArgs = [
      path.join(__dirname, 'fonts_phantom.js'),
      url,
      testedFont || ''
    ];

    var options = {
      maxBuffer: 1024 * 1024
    };

    var execFile = Promise.promisify(childProcess.execFile);

    execFile(binPath, childArgs, options)
      .then(function(execOut) {
        var result;
        var stdout = execOut[0] || '';

        try {
          result = JSON.parse(stdout);
          resolve(result);
        } catch(parseError) {
          console.log(stdout);
          reject(parseError);
        }
      })
    .catch(function(err) {
      reject(err);
    });
  });
};

module.exports = {
  getFonts: getFonts
};
