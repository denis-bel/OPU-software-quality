import authRouter from '@routers/auth';
import userRouter from '@routers/user';
import userLogRouter from '@routers/userLog';
import brigadeRouter from '@routers/brigade';

export default app => {
	app.use('/', authRouter);
	app.use('/user', userRouter);
	app.use('/userLogs', userLogRouter);
	app.use('/brigade', brigadeRouter);
}