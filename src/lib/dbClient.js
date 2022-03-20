import { Pool } from 'pg';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from '@config/env';

const pool = new Pool({
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
	port: 5432
});

pool.connect();

export default pool;
