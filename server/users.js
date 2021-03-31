const { Router } = require('express');
const User = require('./schemas/User');

const router = Router();
router.route('/newUser').post((req, res) => {
	// {"name": "Brandon", "email": "whateve@notEmail.com", "password": "eyyyoooo", "Bio": "new bio"}
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

router.route('/test').put((req, res) => {
	const { email, password } = req.body;
    // const result = Schema.find({email,password })
    // if(result || result.length > 0) => send back "a ok to let user be logged in" also send back result to save to user state.
    // if(!result || result.length === 0) => send back "Ey yo crap is wrong, try again."
	res.status(200).send({ message: 'eyyo we testin' });
});

module.exports = router;
