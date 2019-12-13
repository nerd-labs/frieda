const watch = require('node-watch');
const path = require('path');
const util = require('util');
const spawn = util.promisify(require('child_process').spawn);

console.log('start watching....');

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

		console.log(`\n %s changed. so we are going to re-build the component ${packagePath[1]} including all the dependencies`, splitPath[1]);

		spawn('lerna', ['run', 'start', '--stream', `--scope=${packagePath[1]}`, '--include-dependents'], {
			stdio: ["pipe", process.stdout, process.stderr]
		});
	}
);
