const router = require('express').Router();
const mailingList = require('../models/mailinglist').model;
const User = require('../models/user').model;

router.get('/', (req, res) => {
	try {
		mailingList.find({}).then((stuff) => {
			res.status(200).send(stuff);
		});
	} catch (err) {
		console.log(err);
	}
});

router.post('/new', async (req, res) => {
	try {
		const newSub = new mailingList(req.body);
		await newSub.save();
		const newList = await mailingList.find({});
		res.status(200).send(newList);
	} catch (err) {
		res.status(500).send('Error at POST mailingList/new');
		console.log(err, 'Error at POST mailingList/new');
	}
});

router.post('/newUser', async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		const userInfo = await User.find({});
		res.status(200).send(userInfo);
	} catch (err) {
		res.status(500).send('Error at POST mailingList/new');
		console.log(err, 'Error at POST mailingList/new');
	}
});

router.put('/unsubscribe', async (req, res) => {
	const { Email, ActivelySubscribed } = req.body;
	if (!Email || ActivelySubscribed === undefined) {
		res.status(400).send({ message: 'Ey you are missing yo info, FIX IT NOW.' });
	}
	try {
		const results = await mailingList.updateOne({ Email }, { ActivelySubscribed });
		res.status(200).send(results);
	} catch (error) {
		res.status(500).send('Error at PUT mailingList/unsubscribe');
		console.log(err, 'Error at PUT mailingList/unsubscribe');
	}
});

router.delete('/removeAccount/:Email', async (req, res) => {
	const { Email } = req.params;
	try {
		const results = await mailingList.deleteOne({ Email });
		if (results.deletedCount) {
			res.status(200).send({ message: 'Awe, i really enjoyed spamming your email :(' });
		}
		res.status(200).send({ message: "We couldn't find your email to delete, so like. wanna sub?" });
	} catch (error) {
		res.status(500).send('Error at DELETE mailingList/removeAccount');
		console.log(err, 'Error at DELETE mailingList/removeAccount');
	}
});

module.exports = router;
