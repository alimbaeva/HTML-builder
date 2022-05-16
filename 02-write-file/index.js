
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let fileText = fs.createWriteStream('.\\file.txt');

function write() {

  rl.question('Что небудь напишите-', text => {
    console.log(text);
    if (text === 'exit') {
      rl.close();
      return;
    }
    fileText.write(text, err => {
      if (err) {
        console.log(err.message);
      } else {
        write();
      }


    });
  });
}

write();