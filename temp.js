const fs = require('fs');
const path = require('path');

const lib = {};

const baseDir = path.join(__dirname, '/../.data/');

lib.create = function(dir, file, data, callback) {
  // open file
  fs.open(baseDir+'/'+dir+file+'.json', 'wx', function(err, fileDescriptor) {
    if (!err) {
      const stringData = JSON.stringify(data);
      // write to it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if(!err) {
          // close the file
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          })
        } else {
          callback('Error writing to new file');
        }
      })
    } else {
      callback('Error opening new file');
    }
  });

};
