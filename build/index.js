(async () => {
	const style = require('./style');

	const tasks = {
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

	const taskss = argv.tasks.map(task => {
		return tasks[task](argv.component)
			.catch((e) => console.log(`${argv.component} in ${task}: \n${e}`));
	});

	await Promise.all(taskss);
})();
