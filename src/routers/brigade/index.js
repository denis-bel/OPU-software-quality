import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getAllMiddlewares from './getAll';
import createMiddlewares from './create';
import updateMiddlewares from './update';
import deleteMiddlewares from './delete';
import bestEmployeesMiddleware from './getAllWithBestEmployees'

const router = express.Router();

router.use(authorizeUser);

router.get('/all', ...getAllMiddlewares);
router.get('/bestEmployees', ...bestEmployeesMiddleware);
router.post('/', ...createMiddlewares);
router.put('/', ...updateMiddlewares);
router.delete('/:id', ...deleteMiddlewares);

export default router;