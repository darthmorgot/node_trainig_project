const fs = require('fs');
const {generate} = require('../generator/wizards-generator.js');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {
  encoding: 'utf-8',
  mode: 0o644
};
const data = generate();

// const fileCreated = (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('File created successfully');
// };

module.exports = {
  name: 'generate',
  description: 'Generates data for project',
  execute(filePath = `${process.cwd()}/wizards-data.json`) {
    return writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  }
};
