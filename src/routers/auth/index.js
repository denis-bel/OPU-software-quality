import express from 'express';
import loginMiddlewares from './login';
import registerMiddlewares from '@routers/auth/register';

const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', ...loginMiddlewares);
router.post('/register', ...registerMiddlewares);

export default router;