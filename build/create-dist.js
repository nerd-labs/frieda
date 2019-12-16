const path = require('path');
const { spawnAsPromise } = require('./util');

module.exports = async function createDist(component) {

    const absPath = path.resolve(__dirname,  `../packages/${component}/dist`);

    await spawnAsPromise('mkdir', absPath);

}
