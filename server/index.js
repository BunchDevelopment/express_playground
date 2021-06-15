const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mailingListController = require('./controllers/mailingList');
const userController = require('./controllers/user');

const app = express();
mongoose.connect('mongodb://localhost/test');

app.use(express.json());
app.use(cors());
app.use('/mailingList', mailingListController);
app.use('/user', userController);

const db = mongoose.connection;

let db_status = 'Ey, i aint connected to the db';

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => (db_status = 'WE GOT THIS CONNECTION. LETS GOOOOOOOO'));

app.get('/', (req, res) => {
	console.log('ERROR AT WHATEVER SOMETHING');
	res.status(200).send(db_status);
});

app.listen(2000, () => console.log('listening on 2000 my dude'));
