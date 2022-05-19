

const fs = require('fs');
const path = require('path');
// const fsPromises = fs.promises;






const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

const folder = path.join(__dirname, 'styles');
function write(folder) {
  fs.access(bundle, fs.F_OK, (err) => {
    if (err) {
      fs.readdir(folder, (err, data) => {
        if (err) console.error(err.message);
        data.forEach(item => {
          const itemFolder = path.join(folder, `${item}`);

          fs.stat(itemFolder, (error, stats) => {
            if (error) {
              console.log(error);

            } else {
              if (!stats.isFile()) {
                write(itemFolder);
              } else {
                if (path.extname(itemFolder) === '.css') {

                  fs.readFile(itemFolder, 'utf8', function (err, data) {
                    if (!err) {

                      const ws = fs.createWriteStream(bundle, {
                        flags: 'a+'
                      });
                      ws.write(data);
                    } else {
                      console.log('ошибка чтения файла');
                    }
                  });


                }
              }
            }
          });

        });
      });
    } else {
      fs.unlink(bundle, () => {
        write(folder);
      });
    }
  });
}

write(folder);
