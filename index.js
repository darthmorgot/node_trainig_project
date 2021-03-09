// const args = process.argv.slice(2);

// switch (args[0]) {
//   case `--help`:
//     console.log(`Available commands:\n` +
//       `--author - shows author name;\n` +
//       `--version - shows program version;\n` +
//       `--help - prints this help;`);
//     break;
//   case `--version`:
//     console.log(`v1.0.0`);
//     break;
//   default:
//     console.log(`This application doesn\`t anything helpful. Just prints some info and version.`);
//     console.error(`To list possible options use \`--help\``);
//     process.exit(1);
// }

require('./src/cli.js');
