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


    /**
     * Set the mode based on the watch flag.
     * This can be used in underlying tasks to enable/disable certain features.
     */
    process.env.mode = argv.watch ? 'serve' : 'build';

    console.log(`🏃‍♂️  Running in ${process.env.mode} mode\n`);

    await spawnAsPromise('lerna', 'bootstrap');
    await spawnAsPromise('lerna', 'run', 'start', '--stream');

    if (argv.watch) await watch();

})();
