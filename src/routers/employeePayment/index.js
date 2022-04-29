import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getEmployeePaymentsMiddlewares from './getEmployeePayments';

const router = express.Router();

router.use(authorizeUser);

router.get('/:employeeId', ...getEmployeePaymentsMiddlewares);

export default router;