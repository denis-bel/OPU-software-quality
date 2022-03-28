import express from 'express';
import loginMiddlewares from './login';
import registerMiddlewares from '@routers/auth/register';
import authorizeUser from '@middlewares/authorizeUser';
import roleAccess from '@middlewares/roleAccess';

const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', ...loginMiddlewares);
router.post('/register', ...registerMiddlewares);

router.get('/auth', authorizeUser, roleAccess(['admin', 'user']), (req, res) => {
	res.send('Auth');
});

export default router;