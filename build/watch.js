const { spawnAsPromise } = require('./util');

const watch = require('node-watch');
const path = require('path');

const { spawn } = require('child_process');

function getDependencies(...args) {
    const subprocess = spawn(args.shift(), args, {
        shell: true,
    });

    return new Promise(resolve => {
        subprocess.stdout.on('data', (data) => {
            resolve(JSON.parse(data.toString()));
        });
    })
}

function getDependents(component, dependencies) {
    const list = [component];

    Object.keys(dependencies).forEach(k => {
        if (dependencies[k].includes(component)) list.push(k);
    });

    return list.join(', ');
}

module.exports = async () => {

    const dependencies = await getDependencies('lerna', 'ls', '--graph', '--all');

    console.log('\n👀  start watching....\n');

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
            const component = packagePath[1];

            console.log(`\n👛  ${splitPath[1]} changed. Rebuilding ${getDependents(component, dependencies)}\n`);

            spawnAsPromise('lerna', 'run', 'start', '--stream', `--scope=${component}`, '--include-dependents');
        }
    )

}
