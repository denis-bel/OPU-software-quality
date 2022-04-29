import authRouter from '@routers/auth';
import userRouter from '@routers/user';
import userLogRouter from '@routers/userLog';
import brigadeRouter from '@routers/brigade';
import employeeRouter from '@routers/employee';
import materialRouter from '@routers/material';
import toolRouter from '@routers/tool';
import transportRouter from '@routers/transport';

export default app => {
	app.use('/', authRouter);
	app.use('/user', userRouter);
	app.use('/userLogs', userLogRouter);
	app.use('/brigade', brigadeRouter);
	app.use('/employee', employeeRouter);
	app.use('/material', materialRouter);
	app.use('/tool', toolRouter);
	app.use('/transport', transportRouter);
}