let crypto = require('crypto');
let request = require('request');

module.exports = class Authenticator {
	static authorize(req, res) {
		let options = {
			uri: 'https://slack.com/api/oauth.access?code='
			+ req.query.code +
			'&client_id=' + process.env.SLACK_CLIENT_ID +
			'&client_secret=' + process.env.SLACK_CLIENT_SECRET,
			method: 'GET'
		};
		request(options, (error, response, body) => {
			let JSONresponse = JSON.parse(body);

			if (!JSONresponse.ok) {

			} else {
				res.send();
			}
		});
	}

	static verifySignature(req, res, next) {
		const version = 'v0';
		const signature = req.headers['x-slack-signature'];
		const timestamp = req.headers['x-slack-request-timestamp'];
		let rawBody = req.rawBody.toString();

		if (Math.abs(Date.now() / 1000 - timestamp) > 60 * 5) {
			return;
		}

		const basestring = [version, timestamp, rawBody].join(':');
		const app_signature = 'v0=' + crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET).update(basestring).digest('hex');

		if (app_signature === signature) {
			next();
		}
	}
};