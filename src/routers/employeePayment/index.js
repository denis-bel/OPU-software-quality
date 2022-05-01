import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getEmployeePaymentsMiddlewares from './getEmployeePayments';
import createMiddlewares from './create';

const router = express.Router();

router.use(authorizeUser);

router.get('/:employeeId', ...getEmployeePaymentsMiddlewares);
router.post('/', ...createMiddlewares);

export default router;