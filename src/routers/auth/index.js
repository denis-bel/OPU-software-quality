import express from 'express';
import loginMiddlewares from './login';
import registerMiddlewares from '@routers/auth/register';
import authorizeUser from '@middlewares/authorizeUser';
import roleAccess from '@middlewares/roleAccess';
import logoutMiddlewares from '@routers/auth/logout';

const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', ...loginMiddlewares);
router.post('/register', ...registerMiddlewares);

router.get('/auth', authorizeUser, roleAccess(['admin', 'user', 'super-admin']), (req, res) => {
	res.send('Auth');
});

router.use(authorizeUser);
router.post('/logout', ...logoutMiddlewares);

export default router;