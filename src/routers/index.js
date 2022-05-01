import authRouter from '@routers/auth';
import userRouter from '@routers/user';
import userLogRouter from '@routers/userLog';
import brigadeRouter from '@routers/brigade';
import employeeRouter from '@routers/employee';
import materialRouter from '@routers/material';
import toolRouter from '@routers/tool';
import transportRouter from '@routers/transport';
import workTypeRouter from '@routers/workType';
import roadObjectRouter from '@routers/roadObject';
import employeePaymentRouter from '@routers/employeePayment';
import activityRouter from '@routers/activity';
import usedTransportRouter from '@routers/usedTransport';
import workRouter from '@routers/work';
import usedMaterialRouter from '@routers/usedMaterial';

export default app => {
	app.use('/', authRouter);
	app.use('/user', userRouter);
	app.use('/userLogs', userLogRouter);
	app.use('/brigade', brigadeRouter);
	app.use('/employee', employeeRouter);
	app.use('/material', materialRouter);
	app.use('/tool', toolRouter);
	app.use('/transport', transportRouter);
	app.use('/workType', workTypeRouter);
	app.use('/roadObject', roadObjectRouter);
	app.use('/employeePayment', employeePaymentRouter);
	app.use('/activity', activityRouter);
	app.use('/usedTransport', usedTransportRouter);
	app.use('/work', workRouter);
	app.use('/usedMaterial', usedMaterialRouter);
}