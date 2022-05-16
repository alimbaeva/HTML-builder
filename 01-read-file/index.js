'use strict';
const fs = require('fs');
const path = require('path');
const file = path.join('01-read-file', 'text.txt');
fs.readFile(`${file}`, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});