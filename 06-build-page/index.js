
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const fsPromises = fs.promises;



const mainFolder = path.join(__dirname, 'project-dist');
const mainFolderindex = path.join(__dirname, 'project-dist', 'index.html');
// console.log(mainFolder);
fsPromises.mkdir(mainFolder).then(function () {
    console.log('Directory created successfully');
}).catch(function () {
    console.log('failed to create directory');
});





const folderHtml = path.join(__dirname, 'components');
fs.readdir(folderHtml, (err, datas) => {
    console.log(datas);

    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function (err, data) {
        if (!err) {
            datas.forEach(file => {
                const fileNamehtml = path.join(__dirname, 'components', `${file}`);
                fs.readFile(fileNamehtml, 'utf8', function (err, data2) {
                    const ws = fs.createWriteStream(mainFolderindex);
                    data = data.replace(`{{${path.parse(fileNamehtml).name}}}`, data2);
                    console.log(data);
                    ws.write(data);


                });
            });
        } else {
            console.log('ошибка чтения файла');
        }
    });

});





