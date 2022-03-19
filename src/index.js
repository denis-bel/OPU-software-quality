import express from 'express';
import path from 'path';
const app = express();
app.use(express.static(path.join(__dirname, '../front')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front', 'index.html'));
});


app.listen(3000, () => {
	console.log('server started');
})