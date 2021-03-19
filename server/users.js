const { Router } = require('express');
const User = require('./schemas/User');

const router = Router();
router.route('/newUser').post((req, res) => {
	const user = new User(req.body);
	user.save((err, results) => {
		return err ? res.status(500).send(err) : res.status(200).send(results);
	});
});

router.route('/allUsers').get((req, res) => {
	User.find({})
		.then(results => {
			res.status(200).send(results);
		})
		.catch(err => {
			res.status(500).send({ err });
		});
});

router.route('/userByName/:name').get((req, res) => {
	const { name } = req.params;
	User.find({ name }, (err, results) => {
		console.log(err);
		return err ? res.status(500).send(err) : res.status(200).send(results);
	});
});

module.exports = router;
