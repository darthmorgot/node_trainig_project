// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const {promisify} = require('util');
// const path = require('path');

// const stat = promisify(fs.stat);
// const readdir = promisify(fs.readdir);
// const readfile = promisify(fs.readFile);

// const EXTENSION_MAP = {
//   '.css': 'text/css',
//   '.html': 'text/html',
//   '.jpeg': 'image/jpeg',
//   '.jpg': 'image/jpeg',
//   '.png': 'image/png',
//   '.gif': 'image/gif',
//   '.ico': 'image/x-icon'
// };

// const HOSTNAME = `127.0.0.1`;
// const PORT = 3000;

// const printDirectory = (path, files) => {
//   return `<!doctype html>
// <html lang="ru">
// <head>
//   <meta charset="utf-8">
//   <title>Directory content</title>
// </head>
// <body>
//   <ul>
//     ${files.map((it) => `<li><a href="${it}">${it}</a></li>`).join(``)}
//   </ul>
// </body>
// </html>`;
// };

// const readFile = async (filepath, res) => {
//   const data = await readfile(filepath);
//   const extension = path.extname(filepath);
//   res.setHeader(`content-type`, EXTENSION_MAP[extension] || `text/plain`);
//   res.setHeader(`content-length`, Buffer.byteLength(data));
//   res.end(data);
// };

// const readDir = async (path, res) => {
//   const files = await readdir(path);
//   res.setHeader(`content-type`, `text/html`);
//   const content = printDirectory(path, files);
//   res.setHeader(`content-length`, Buffer.byteLength(content));
//   res.end(content);
// };

// const staticFolder = `${process.cwd()}/static`;

// const server = http.createServer((req, res) => {
//   const absolutePath = staticFolder + url.parse(req.url).pathname;

//   (async () => {
//     try {
//       const pathStat = await stat(absolutePath);

//       res.statusCode = 200;
//       res.statusMessage = `OK`;

//       if (pathStat.isDirectory()) {
//         await readDir(absolutePath, res);
//       } else {
//         await readFile(absolutePath, res);
//       }
//     } catch (e) {
//       res.writeHead(404, `Not found`);
//       res.end(`Error`);
//     }
//   })().catch((e) => {
//     res.writeHead(500, e.message, {
//       'content-type': 'text/plain'
//     });
//     res.end(e.message);
//   });
// });

// const serverAddress = `http://${HOSTNAME}:${PORT}`;

// module.exports = {
//   run() {
//     server.listen(PORT, HOSTNAME, () => {
//       console.log(`Server runing at ${serverAddress}/`);
//     });
//   }
// };

// ------------------------------------------------------------

// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const {generate: generateWizards} = require('./generator/wizards-generator.js');

// const app = express();
// app.use(express.static('static'));
// app.use(bodyParser.json());

// const upload = multer({storage: multer.memoryStorage()});

// const wizards = generateWizards();

// app.get('/api/wizards', (req, res) => {
//   res.send(wizards);
// });

// app.get('/api/wizards:name', (req, res) => {
//   const name = req.params['name'].toLowerCase();
//   const wizard = wizards.find((it) => it.name.toLowerCase() === name);
//   if (!wizard) {
//     res.status(404).end();
//   } else {
//     res.send(wizard);
//   }
// });

// app.post('/api/wizards', upload.single('avatar'), (req, res) => {
//   res.send(req.body);
// });

// const HOSTNAME = `127.0.0.1`;
// const PORT = 3000;

// const serverAddress = `http://${HOSTNAME}:${PORT}`;

// module.exports = {
//   run() {
//     app.listen(PORT, HOSTNAME, () => {
//       console.log(`Server runing at ${serverAddress}/`);
//     });
//   }
// };

// ---------------------------------------------------------------

const express = require(`express`);
const wizardStore = require('./wizards/store.js');
const imageStore = require('./images/store.js');
const wizardsRouter = require(`./wizards/route`)(wizardStore, imageStore);
const logger = require('../logger.js');

const app = express();
app.use(express.static(`static`));

app.use(`/api/wizards`, wizardsRouter);

const HOSTNAME = process.env.SERVER_HOST || `127.0.0.1`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      logger.info(`Server running at ${serverAddress}/`);
    });
  },
  app
};
