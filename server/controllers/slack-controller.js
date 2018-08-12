let Slack = require('slack-node');
let slack = new Slack();

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

module.exports.handleRequest = function(req, res) {
	res.send();

	slack.token = process.env.SLACK_OAUTH_TOKEN;
	slack.setWebhook(process.env.SLACK_WEBHOOK_URL);

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
};
