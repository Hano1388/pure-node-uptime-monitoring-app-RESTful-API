/*
*
* This is a library for storing and editing data
*
*
*
*/

// Dependencies
const fs = require('fs');
const path = require('path');

// container for the module to export
const lib = {};

// base directory of .data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to a file
lib.create = function(dir, file, data, callback) {
  // open the file for writing
  const filePath = lib.baseDir+'/'+dir;

  // Make directory
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (!err || !fs.exists(filePath)) {
      // Open file in directory
      fs.open(filePath+`/${file}.json`, 'wx', (err, fd) => {
        if(!err && fd) {
          // convert data to string
          const dataString = JSON.stringify(data);
          // write to file
          fs.writeFile(fd, dataString, (err) => {
            if (!err) {
              // close file
              fs.close(fd, (err) => {
                if(!err) {
                  callback(null);
                } else {
                  callback('Error closing new file');
                };
              });
            } else {
              callback('Error writing to new file');
            };
          });
        } else {
          callback('Error creating new file, it may already exist');
        };
      });
    } else {
      callback('Error creating directory');
    };
  });
};

// read data from a file
lib.read = function(dir, file, callback) {
  // read file
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err, data) => {
    callback(err, data);
  });
};

// Update data inside a file
lib.update = function(dir, file, data, callback) {
    // Open file to update
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err, fd) => {
      if (!err && fd) {
        // convert data to string
        const stringData = JSON.stringify(data);

        // truncate the file
        fs.truncate(fd, (err) => {
          if (!err) {
            // write to file
            fs.writeFile(fd, stringData, (err) => {
              if (!err) {
                  // close file
                  fs.close(fd, (err) => {
                    if (!err) {
                      callback(null);
                    } else {
                      callback('Error closing file');
                    };
                  });
              } else {
                callback('Error writing to file');
              };
            });
          } else {
            callback('Error trancating file');
          };
        });
      } else {
        callback('Could not open the file to update, it may not exist yet');
      };
    });
};

// Delete a file
lib.delete = function(dir, file, callback) {
  // Unlink the file (removing the file from the file system)
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) => {
    if(!err) {
      callback(null)
    } else {
      callback('Error deleting file');
    };
  });
};

// export module
module.exports = lib;
