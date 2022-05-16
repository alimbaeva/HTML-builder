
const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, data) => {
  console.log('===', data);
  data.forEach(file => {
    const pathFile = path.join(folder, `${file}`);
    fs.stat(pathFile, (error, stats) => {
      if (error) {
        console.log(error);
      } else {
        if (stats.isFile()) {
          const ext = path.extname(pathFile);
          console.log(path.basename(pathFile, ext) + ' - ' + ext.slice(1, ext.length) + ' - ' + stats.size + 'b');

        }

      }
    });

  });

});