
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


const pathFile = path.join(path.join(__dirname), 'files-copy');
fs.stat(pathFile, (error) => {
  if (error) {
    console.log('error');
    fsPromises.mkdir(pathFile).then(function () {
      console.log('Directory created successfully');
    }).catch(function () {
      console.log('failed to create directory');
    });

  }
  copy();
});


function copy() {
  fs.readdir(path.join(__dirname, 'files'), (err, data) => {
    data.forEach(file => {
      let f1 = path.join(__dirname, 'files', `${file}`);
      let f2 = path.join(__dirname, 'files-copy', `${file}`);
      try {
        fsPromises.copyFile(f1, f2);
        console.log('Good job');
      } catch {
        console.log('The file could not be copied');
      }
    });
  });
}

