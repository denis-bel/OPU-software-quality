import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getEmployeePaymentsMiddlewares from './getEmployeePayments';
import createMiddlewares from './create';
import updateMiddlewares from './update';
import deleteMiddlewares from './delete';
import getInRangeMiddlewares from './getInRange';
import getCountMiddlewares from './count';

const router = express.Router();

router.use(authorizeUser);

router.get('/range', ...getInRangeMiddlewares);
router.get('/count/:employeeId', ...getCountMiddlewares);
router.get('/:employeeId', ...getEmployeePaymentsMiddlewares);
router.post('/', ...createMiddlewares);
router.put('/', ...updateMiddlewares);
router.delete('/:id', ...deleteMiddlewares);

export default router;