import express from 'express';
import path from 'path';
import cors from 'cors'
import { API_PORT, NODE_ENV } from './config/env';
const app = express();

if(NODE_ENV === 'development') {
	app.use(cors())
}
app.use(express.json())
app.use(express.static(path.join(__dirname, '../front')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front', 'index.html'));
});

app.get('/test', (req, res) => {
	res.send('Test')
});


app.listen(API_PORT, () => {
	console.log(`Server started on port: ${API_PORT}`);
})