const args = process.argv.slice(2);

switch (args[0]) {
  case `--help`:
    console.log(`This application does nothing. Accessible params:\n` +
      `--help - prints this info;\n` +
      `--version - prints application version;`);
    break;
  case `--version`:
    console.log(`v1.0.0`);
    break;
  default:
    console.log(`This application doesn\`t anything helpful. Just prints some info and version.`);
    console.error(`To list possible options use \`--help\``);
    process.exit(1);
}
