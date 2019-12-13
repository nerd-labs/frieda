const { spawnAsPromise } = require('./util');

module.exports = async (component) => {

  await spawnAsPromise('ng', 'lint', component);
  await spawnAsPromise('ng', 'build', component);

}
