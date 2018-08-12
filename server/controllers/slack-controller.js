let Slack = require('slack-node');
let slack = new Slack();

let request = require('request');
let WebhookKey = require('../models/webhook-key');

let responses = [
	{type: 'affirmative', text: 'It is certain'},
	{type: 'affirmative', text: 'As I see it, yes'},
	{type: 'affirmative', text: 'It is decidedly so'},
	{type: 'affirmative', text: 'Most likely'},
	{type: 'affirmative', text: 'Without a doubt'},
	{type: 'affirmative', text: 'Outlook good'},
	{type: 'affirmative', text: 'Yes - definitely'},
	{type: 'affirmative', text: 'You may rely on it'},
	{type: 'affirmative', text: 'Yes'},
	{type: 'affirmative', text: 'Signs point to yes'},
	{type: 'non-committal', text: 'Reply hazy, try again'},
	{type: 'non-committal', text: 'Ask again later'},
	{type: 'non-committal', text: 'Better not tell you now'},
	{type: 'non-committal', text: 'Cannot predict now'},
	{type: 'non-committal', text: 'Concentrate and ask again'},
	{type: 'negative', text: 'Don\'t count on it'},
	{type: 'negative', text: 'My reply is no'},
	{type: 'negative', text: 'My reply is no'},
	{type: 'negative', text: 'My sources say no'},
	{type: 'negative', text: 'My reply is no'},
	{type: 'negative', text: 'Outlook not so good'},
	{type: 'negative', text: 'Very doubtful'},
];

module.exports.authorize = function(req, res) {
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
			let webwookKey = new WebhookKey();

			webwookKey.teamId = JSONresponse['team_id'];
			webwookKey.channelId = JSONresponse['incoming_webhook']['channel_id'];
			webwookKey.URL = JSONresponse['incoming_webhook']['url'];

			webwookKey.save().then(() => {
				res.send();
			});
		}
	});
};

module.exports.handleRequest = function(req, res) {
	res.send();

	slack.token = process.env.SLACK_OAUTH_TOKEN;

	WebhookKey.findOne({
		teamId: req.body['team_id']
	}).exec().then(webhook => {
		slack.setWebhook(webhook.URL);

		let response = responses[Math.floor(Math.random() * responses.length)];

		let getColor = function(type) {
			switch (type) {
				case 'affirmative':
					return 'good';
				case 'non-commital':
					return 'warning';
				case 'negative':
					return 'danger';
			}
		};

		slack.webhook({
			text: `*${req.body.user_name}* asked ${req.body.text}`,
			attachments: [
				{
					text: response.text,
					color: getColor(response.type)
				}
			]
		}, function(err) {
			console.log(err);
		});
	});

};
