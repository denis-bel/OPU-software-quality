import express from 'express';
import roleAccess from '@middlewares/roleAccess';
import authorizeUser from '@middlewares/authorizeUser';
import { USER_ROLE_SUPER_ADMIN } from '@constants/User';
import getAllMiddlewares from '@routers/user/getAll';
import updateMiddlewares from '@routers/user/update';

const router = express.Router();

router.use(authorizeUser);
router.use(roleAccess([USER_ROLE_SUPER_ADMIN]));

router.get('/getAll', ...getAllMiddlewares);
router.post('/update', ...updateMiddlewares);

export default router;