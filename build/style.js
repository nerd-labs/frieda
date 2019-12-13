const stylelint = require('stylelint');
const path = require('path');
const _sass = require('node-sass');
const _fs = require('fs-extra');

const postCss = require('postcss');
const mqPacker = require('css-mqpacker');
const cssnano = require('cssnano');
const reporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');

async function lint(component) {
	const absPath = path.resolve(__dirname,  `../packages/${component}/src/${component}.scss`);
	const absConfigPath = path.resolve(__dirname,  `../.stylelintrc`);

	const result = await stylelint.lint({
		configFile: absConfigPath,
		files: absPath,
		formatter: 'string'
	});

	if (result.output) throw new Error(result.output);

	return result;
}

async function sass(component) {
	const absPath = path.resolve(__dirname,  `../packages/${component}/src/${component}.scss`);
	const absDistPath = path.resolve(__dirname,  `../packages/${component}/dist/${component}.css`);
	const absNMPath = path.resolve(__dirname,  `../packages/${component}/node_modules`);

	const cssResult = await new Promise((resolve, reject) => {
		_sass.render({
			file: absPath,
			outFile: absDistPath,
			includePaths: [absNMPath]
		}, (error, result) => {
			if (error) {
				throw new Error(error.formatted);
			}

			return resolve(result.css);
		});
	})

	const postCssResult = await postCss([
		autoprefixer,
		mqPacker({
			sort: true
		}),
		cssnano({
			preset: 'default',
			calc: false,
			discardUnused: false,
			reduceIdents: false,
			zindex: false
		}),
		reporter()
	])
	.process(cssResult, {
		from: absDistPath,
		map: {
			inline: false
		},
	});

	return writeResultAsync(absDistPath, postCssResult);
}

function writeResultAsync(cssFilePath, result) {
    let promises = [_fs.writeFile(cssFilePath, result.css)];
    if (result.map) promises.push(_fs.writeFile(`${cssFilePath}.map`, result.map));
    return Promise.all(promises);
}

function init(component) {
	return Promise.all([
		lint(component),
		sass(component)
	]);
}

module.exports = init;
