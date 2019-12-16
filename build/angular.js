const { spawnAsPromise } = require('./util');

module.exports = async (component) => {

    await Promise.all([
        spawnAsPromise('ng', 'lint', component),
        spawnAsPromise('ng', 'build', component),
    ])
}
