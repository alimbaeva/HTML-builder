
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let fileText = fs.createWriteStream(path.join('02-write-file', 'text.txt'));

readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name == 'c') {
    console.log('\nПока!! Вы пожелали выйти и остановить запись!');
  }
});

function write() {

  rl.question('Что небудь напишите-', text => {
    console.log(text);
    if (text.toLocaleLowerCase() === 'exit') {
      console.log('\nПока!! Вы пожелали выйти и остановить запись!');
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