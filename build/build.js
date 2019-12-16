const { spawnAsPromise } = require('./util');
const watch = require('./watch');

(async () => {

    const argv = require('yargs')
        .option('watch', {
            alias: 'w',
            type: 'boolean',
            description: 'Start watch after completion'
        })
        .help()
        .argv;

    console.log('WATCH', argv.watch);

    await spawnAsPromise('lerna', 'bootstrap');
    await spawnAsPromise('lerna', 'run', 'start', '--stream');

    if (argv.watch) await watch();

})();
