import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getAllMiddlewares from './getAll';
import createMiddlewares from './create'

const router = express.Router();

router.use(authorizeUser);
router.get('/all', ...getAllMiddlewares);
router.post('/', ...createMiddlewares);

export default router;