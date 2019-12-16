const path = require('path');

const { spawnAsPromise } = require('./util');

module.exports = async (component) => {

  const absPath = path.resolve(__dirname,  `../packages/${component}/dist`);

  await spawnAsPromise('rm', '-rf', absPath);

}
