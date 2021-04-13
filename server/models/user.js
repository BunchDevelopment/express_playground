const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	Name: String,
	Email: String,
	Password: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	model: User,
	Schema: userSchema
};
