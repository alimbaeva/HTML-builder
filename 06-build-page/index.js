
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;



const mainFolder = path.join(__dirname, 'project-dist');
const mainFolderindex = path.join(__dirname, 'project-dist', 'index.html');
const mainFolderstyle = path.join(__dirname, 'project-dist', 'style.css');
fsPromises.mkdir(mainFolder).then(function () {
  console.log('Directory created successfully');
}).catch(function () {
  console.log('failed to create directory');
});


const folderHtml = path.join(__dirname, 'components');
fs.readdir(folderHtml, (err, datas) => {
  //   console.log(datas);

  fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function (err, data) {
    if (!err) {
      datas.forEach(file => {
        if (path.extname(file) === '.html') {
          const fileNamehtml = path.join(__dirname, 'components', `${file}`);
          fs.readFile(fileNamehtml, 'utf8', function (err, data2) {
            const ws = fs.createWriteStream(mainFolderindex);
            data = data.replace(`{{${path.parse(fileNamehtml).name}}}`, data2);
            //   console.log(data);
            ws.write(data);
          });

        }
      });
    } else {
      console.log('ошибка чтения файла');
    }
  });

});


const folderStyles = path.join(__dirname, 'styles');
fs.readdir(folderStyles, (err, data) => {
  if (err) console.error(err.message);
  data.forEach(file => {
    if (path.extname(file) === '.css') {
      const itemFolder = path.join(folderStyles, `${file}`);
      fs.readFile(itemFolder, 'utf8', function (err, data) {
        if (!err) {

          const ws = fs.createWriteStream(mainFolderstyle, {
            flags: 'a+'
          });
          ws.write(data + '\n');
        } else {
          console.log('ошибка чтения файла');
        }
      });

    }

  });
});




const folderAssets = path.join(__dirname, 'assets');
const mainfolderAssets = path.join(__dirname, 'project-dist', 'assets');

createFolder(mainfolderAssets);
function createFolder(fol) {
  fs.stat(fol, (error) => {
    if (error) {
      console.log('error');
      fsPromises.mkdir(fol).then(function () {
        console.log('Directory created successfully');
      }).catch(function () {
        console.log('failed to create directory');
      });

    }
  });

}



readFolders(folderAssets);

function readFolders(derictory) {

  fs.readdir(derictory, (err, data) => {
    if (err) console.error(err.message);
    // console.log(data);
    data.forEach(el => {
      const folder = path.join(derictory, `${el}`);
      fs.stat(folder, (error, stats) => {
        if (error) console.error(error.message);
        if (!stats.isFile()) {
          // console.log('folder-------', folder);
          fs.stat(path.join(mainfolderAssets, `${el}`), (error) => {
            if (error) console.error(error.message);
            // console.log('нету');
            createFolder(path.join(mainfolderAssets, `${el}`));
          });
          readFolders(folder);
        } else {
          // console.log('file-------', folder);
          let f1 = path.join(folder);
          let f2 = path.join(mainfolderAssets, path.dirname(folder).split('\\')[path.dirname(folder).split('\\').length - 1], `${path.basename(folder)}`);

          // console.log(f1, '=========f1');
          // console.log(f2, '=========f2');
          try {
            fsPromises.copyFile(f1, f2);
            // console.log('Good job');
          } catch {
            console.log('The file could not be copied');
          }
        }
      });

    });
  });
}

