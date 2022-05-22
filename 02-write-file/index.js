
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let fileText = fs.createWriteStream(path.join('02-write-file', 'text.txt'));

function write() {

  rl.question('Что небудь напишите-', text => {
    console.log(text);
    if (text.toLocaleLowerCase() === 'exit') {
      console.log("Пока!!");
      rl.close();
      return;
    }
    fileText.write(text + '\n', err => {
      if (err) {
        console.log(err.message);
      } else {
        write();
      }


    });
  });
}

write();