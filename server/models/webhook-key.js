let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WebhookKeySchema = new Schema({
	teamId: {type: String, required: true},
	channelId: {type: String, required: true},
	URL: {type: String, required: true}
});

let WebhookKey = mongoose.model('WebhookKey', WebhookKeySchema);

module.exports = WebhookKey;
