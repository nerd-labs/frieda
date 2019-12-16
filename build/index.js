(async () => {

    const angular = require('./angular');
    const clean = require('./clean');
    const style = require('./style');

    const taskList = {
        angular,
        style
    };

    const argv = require('yargs')
        .option('tasks', {
            alias: 't',
            type: 'array',
            description: 'Which tasks need to run? [style / angular / stencil]'
        })
        .option('component', {
            alias: 'c',
            type: 'string',
            description: 'Which component?'
        })
        .demandOption(['component', 'tasks'], 'Please provide both component and tasks arguments to work with this tool')
        .help()
        .argv;

    await clean(argv.component);

    const tasks = argv.tasks.map(async task => {
        try {
            await taskList[task](argv.component)
        } catch (e) {
            console.log(`${argv.component} in ${task}: \n${e}`);
        }
    });

    await Promise.all(tasks);
})();
