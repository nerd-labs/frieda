const { spawnAsPromise } = require('./util');

const createDist = require('./create-dist');

module.exports = async (component) => {

    await Promise.all([
        spawnAsPromise('ng', 'lint', component),
        spawnAsPromise('ng', 'build', component),
        createDist(component),
    ])
}
