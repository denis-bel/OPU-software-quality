import express from 'express';
import path from 'path';
import cors from 'cors';

import authRouter from '@routers/auth';
import { API_PORT, NODE_ENV } from '@config/env';
import errorHandler from '@middlewares/errorHandler';
import logger from '@lib/logger';

const app = express();

if (NODE_ENV === 'development') {
	app.use(cors());
}
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front', 'index.html'));
});

app.use(authRouter);
app.use(errorHandler);

app.listen(API_PORT, () => {
	logger.info(`Server started on port: ${API_PORT}`);
});