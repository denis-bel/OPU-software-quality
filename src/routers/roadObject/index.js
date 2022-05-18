import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getAllMiddlewares from './getAll';
import createMiddlewares from './create';
import updateMiddlewares from './update';

const router = express.Router();

router.use(authorizeUser);

router.get('/all', ...getAllMiddlewares);
router.post('/', ...createMiddlewares);
router.put('/', ...updateMiddlewares);

export default router;