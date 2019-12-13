const { spawnAsPromise } = require('./util');

const watch = require('node-watch');
const path = require('path');

console.log('start watching....');

watch(
  path.resolve(__dirname, `../packages`),
  {
    recursive: true,
    filter: f => !/node_modules|dist/.test(f)
  },
  (evt, name) => {
    const dirPath = path.resolve(__dirname, '../packages/');
    const splitPath = name.split(dirPath);
    const packagePath = splitPath[1].split('/');
    console.log(`\n %s changed. Rebuilding the component ${packagePath[1]} including all the dependencies...`, splitPath[1]);

    spawnAsPromise('lerna', 'run', 'start', '--stream', `--scope=${packagePath[1]}`, '--include-dependents');
  }
);
