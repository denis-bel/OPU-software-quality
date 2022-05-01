import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getAllMiddleware from './getAll';

const router = express.Router();

router.use(authorizeUser);
router.get('/all', ...getAllMiddleware);

export default router;