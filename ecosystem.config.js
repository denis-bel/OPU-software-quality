const ignore_watch = [
	'node_modules',
	'data',
	'.git'
];

module.exports = {
	apps: [
		{
			name: 'api',
			script: 'entry.js',
			watch: 'src',
			exec_interpreter: 'babel-node',
			ignore_watch,
			args: '--extensions ".ts,.js"'
		}
	]
};