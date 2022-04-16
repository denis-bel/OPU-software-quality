import express from 'express';
import path from 'path';
import cors from 'cors';
import authRouter from '@routers/auth';
import userRouter from '@routers/user';
import { API_PORT, NODE_ENV } from '@config/env';
import errorHandler from '@middlewares/errorHandler';
import logger from '@lib/logger';
import log from '@middlewares/log';
import userLogRouter from '@routers/userLog';

const app = express();

app.use(log);

if (NODE_ENV === 'development') {
	app.use(cors());
}
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front', 'index.html'));
});

app.use(authRouter);
app.use('/user', userRouter);
app.use(errorHandler);
app.use('/userLogs', userLogRouter);

app.listen(API_PORT, () => {
	logger.info(`Server started on port: ${API_PORT}`);
});