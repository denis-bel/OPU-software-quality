import express from 'express';
import authorizeUser from '@middlewares/authorizeUser';
import getUserLogsMiddlewares from '@routers/userLog/getUserLogs';
import roleAccess from '@middlewares/roleAccess';
import { USER_ROLE_SUPER_ADMIN } from '@constants/User';

const router = express.Router();

router.use(authorizeUser);
router.use(roleAccess([USER_ROLE_SUPER_ADMIN]));
router.get('/:userId', ...getUserLogsMiddlewares);

export default router;