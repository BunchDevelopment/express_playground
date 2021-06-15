const router = require('express').Router();
const user = require('../models/user').model;

router.get('/', (req, res) => {
	user.find({}).then((users) => {
		res.status(200).send(users);
	});
});

router.post('/newUser', async (req, res) => {
	try {
		const newSub = new user(req.body);
		await newSub.save();
		const newList = await user.find({});
		res.status(200).send(newList);
	} catch (err) {
		res.status(500).send('Error at POST user/new');
		console.log(err, 'Error at POST user/new');
	}
});

router.get('/getByID/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const result = await user.findById(id);
		res.status(200).send(result);
	} catch (err) {
		res.status(500).send('Error at GET user/findByID');
		console.log(err, 'Error at GET user/findByID');
	}
});

router.put('/login', async (req, res) => {
	const { Email, Password } = req.body;
	try {
		if (!Email || !Password) {
			res.status(200).send({ message: 'missing yo login info homiequan' });
		} else {
			const newList = await user.find({ Email, Password });
			if (newList.length === 0) {
				res.status(200).send({ message: 'YOU AINT EXISTING' });
			} else {
				res.status(200).send(newList);
			}
		}
	} catch (err) {
		res.status(500).send('Error at POST user/new');
		console.log(err, 'Error at POST user/new');
	}
});

// router.post('/newUser', async (req, res) => {
// 	try {
// 		const newUser = new User(req.body);
// 		await newUser.save();
// 		const userInfo = await User.find({});
// 		res.status(200).send(userInfo);
// 	} catch (err) {
// 		res.status(500).send('Error at POST user/new');
// 		console.log(err, 'Error at POST user/new');
// 	}
// });

// router.put('/unsubscribe', async (req, res) => {
// 	const { Email, ActivelySubscribed } = req.body;
// 	if (!Email || ActivelySubscribed === undefined) {
// 		res.status(400).send({ message: 'Ey you are missing yo info, FIX IT NOW.' });
// 	}
// 	try {
// 		const results = await user.updateOne({ Email }, { ActivelySubscribed });
// 		res.status(200).send(results);
// 	} catch (error) {
// 		res.status(500).send('Error at PUT user/unsubscribe');
// 		console.log(err, 'Error at PUT user/unsubscribe');
// 	}
// });

// router.delete('/removeAccount/:Email', async (req, res) => {
// 	const { Email } = req.params;
// 	try {
// 		const results = await user.deleteOne({ Email });
// 		if (results.deletedCount) {
// 			res.status(200).send({ message: 'Awe, i really enjoyed spamming your email :(' });
// 		}
// 		res.status(200).send({ message: "We couldn't find your email to delete, so like. wanna sub?" });
// 	} catch (error) {
// 		res.status(500).send('Error at DELETE user/removeAccount');
// 		console.log(err, 'Error at DELETE user/removeAccount');
// 	}
// });

module.exports = router;
