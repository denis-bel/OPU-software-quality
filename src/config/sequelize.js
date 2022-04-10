const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_HOST } = require('./env');

const config = {
	'username': POSTGRES_USER,
	'password': POSTGRES_PASSWORD,
	'database': POSTGRES_DB,
	'host': POSTGRES_HOST,
	'dialect': 'postgres'
};

module.exports = {
	'local': config,
	'development': config,
	'production': config
};
