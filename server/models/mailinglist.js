const mongoose = require('mongoose');

const mailingListSchema = new mongoose.Schema({
	Name: String,
	Email: String,
	ActivelySubscribed: Boolean,
	SubscriptionType: String,
	LastPurchase: Date
});

const MailingList = mongoose.model('MailingList', mailingListSchema);

module.exports = {
	model: MailingList,
	Schema: mailingListSchema
};
