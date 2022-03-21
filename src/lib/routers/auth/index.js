import express from 'express';
import login from '@lib/routers/auth/login';
import middlewareWrapper from '@lib/middlewareWrapper';
const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', middlewareWrapper(login));

export default router;