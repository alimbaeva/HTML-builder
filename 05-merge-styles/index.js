

const fs = require('fs');
const path = require('path');
// const fsPromises = fs.promises;


const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

const folder = path.join(__dirname);
function write(folder) {
  fs.readdir(folder, (err, data) => {
    if (err) console.error(err.message);
    data.forEach(item => {
      const itemFolder = path.join(folder, `${item}`);

      fs.stat(itemFolder, (error, stats) => {
        if (error) {
          console.log(error);

        } else {
          if (!stats.isFile()) {
            // console.log(itemFolder);
            write(itemFolder);
          } else {
            if (path.extname(itemFolder) === '.css') {
              console.log(path.extname(itemFolder));

              fs.readFile(itemFolder, 'utf8', function (err, data) {
                // st += data;
                if (!err) {
                  fs.writeFile(bundle, data, function (err) {
                    if (err) {
                      console.log('ошибка записи файла');
                    }
                  });
                } else {
                  console.log('ошибка чтения файла');
                }
              });



              // console.log(itemFolder);

              //   let textread = fs.createReadStream(itemFolder);
              //   let text = fs.createWriteStream(bundle);
              //   text.write(textread);
              //   textread.pipe(text);
              //   textread.on('datatext', datatext => {
              //     text.write(datatext, err => {
              //       if (err) {
              //         console.error(err.message);
              //       } else {
              //         console.log('good');

              //       }
              //     });

              //   });

            }
          }
        }
      });

    });
  });
}

write(folder);