import express from 'express';
import login from '@lib/routers/auth/login';
const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', login);

export default router;