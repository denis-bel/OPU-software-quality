import express from 'express';
import loginMiddlewares from './login';
const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', ...loginMiddlewares);

export default router;