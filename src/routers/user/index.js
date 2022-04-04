import express from 'express';
import roleAccess from '@middlewares/roleAccess';
import authorizeUser from '@middlewares/authorizeUser';
import { USER_ROLE_SUPER_ADMIN } from '@constants/User';
import getAllMiddlewares from '@routers/user/getAll';
import updateMiddlewares from '@routers/user/update';
import deleteMiddlewares from '@routers/user/delete';

const router = express.Router();

router.use(authorizeUser);
router.use(roleAccess([USER_ROLE_SUPER_ADMIN]));

router.get('/all', ...getAllMiddlewares);
router.put('/', ...updateMiddlewares);
router.delete('/:id', ...deleteMiddlewares);

export default router;