const fs = require('fs-extra');
const path = require('path');

const { spawnAsPromise } = require('./util');

async function copyDist(component) {

    const src = path.resolve(__dirname,  `../dist/${component}`);
    const dist = path.resolve(__dirname,  `../packages/${component}/dist`);

    await fs.copy(src, dist);

}

module.exports = async (component) => {

    /**
     * TODO: when upgrading to Angular 9, we need to specify the --prod flag on the ng build command
     * -> spawnAsPromise('ng', 'build', component, `--prod=${process.env.mode==='build'}`),
     */
    const promises = [
        spawnAsPromise('ng', 'lint', component),
        spawnAsPromise('ng', 'build', component),
    ];

    if (process.env.mode === 'build') {
        promises.push(copyDist(component));
    }

    await Promise.all(promises)
}
