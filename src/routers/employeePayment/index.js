import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getEmployeePaymentsMiddlewares from './getEmployeePayments';
import createMiddlewares from './create';
import updateMiddlewares from './update';

const router = express.Router();

router.use(authorizeUser);

router.get('/:employeeId', ...getEmployeePaymentsMiddlewares);
router.post('/', ...createMiddlewares);
router.put('/', ...updateMiddlewares);

export default router;