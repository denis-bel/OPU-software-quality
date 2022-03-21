import express from 'express';
import login, { validateLoginData } from './login';
import middlewareWrapper from '@lib/middlewareWrapper';
const router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test');
});

router.post('/login', validateLoginData, middlewareWrapper(login));

export default router;