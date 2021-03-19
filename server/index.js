const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./users');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/NodePlayground');
const db = mongoose.connection;

let db_status = 'MongoDB connection not successful.';
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => (db_status = 'Successfully opened connection to Mongo!'));

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/users', users);

app.get('/', (req, res) => {
	res.send(db_status);
});

app.listen(4000, () => {
	console.log('Running from the year 4000');
});

module.exports = db;
