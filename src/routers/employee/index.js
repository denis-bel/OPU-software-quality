import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getAllMiddlewares from './getAll';

const router = express.Router();

router.use(authorizeUser);

router.get('/all', ...getAllMiddlewares);

export default router;