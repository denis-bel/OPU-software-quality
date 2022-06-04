import express from 'express';
import roleAccess from '@middlewares/roleAccess';
import authorizeUser from '@middlewares/authorizeUser';
import { USER_ROLE_ACCOUNTANT, USER_ROLE_ADMIN } from '@constants/User';
import getAllMiddlewares from '@routers/user/getAll';
import updateMiddlewares from '@routers/user/update';
import deleteMiddlewares from '@routers/user/delete';
import createMiddlewares from '@routers/user/create';

const router = express.Router();

router.use(authorizeUser);

router.get('/all', roleAccess([USER_ROLE_ADMIN, USER_ROLE_ACCOUNTANT]), ...getAllMiddlewares);

router.use(roleAccess([USER_ROLE_ADMIN]));
router.put('/', ...updateMiddlewares);
router.delete('/:id', ...deleteMiddlewares);
router.post('/', ...createMiddlewares);

export default router;