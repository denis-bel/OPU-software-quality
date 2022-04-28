import * as env from './env'

for (const [key, value] of Object.entries(env)) {
	if (typeof value === 'undefined') {
		console.log(`\x1B[31m[process.env]: ${key} is not defined\x1B[39m`);
	}
}

export * from './env'