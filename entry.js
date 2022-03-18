const { ESLint } = require('eslint');

lint()
	.then(lintErrors => {
		if (lintErrors)
			if (lintErrors && !(process.env.NODE_ENV !== 'local' || process.env.NODE_ENV !== 'development'))
				throw new Error('Linter error');
	})
	.then(async () => await import('./src/index.js'))
	.catch(console.error);

async function lint() {
	const eslint = new ESLint({ fix: true });
	
	const results = await eslint.lintFiles(['src/**/*.js']);
	
	await ESLint.outputFixes(results);
	
	const formatter = await eslint.loadFormatter('stylish');
	const resultText = formatter.format(results);
	console.log(resultText);
	return resultText;
}