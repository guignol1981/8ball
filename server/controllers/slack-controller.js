const {WebClient} = require('@slack/client');
const medium = require('../business/medium');
const TeamAccessToken = require('../models/team-access-token');

module.exports = class SlackController {
	static handleCommand(req, res) {
		TeamAccessToken.findByTeamId(req.body['team_id'])
			.exec()
			.then(teamAccessToken => {
				if (!teamAccessToken) {
					return;
				}

				const answer = medium.getRandomAnswers();
				const web = new WebClient(teamAccessToken.getAccessToken());

				web.chat.postMessage({
					as_user: false,
					channel: req.body['channel_id'],
					text: `*${req.body['user_name']}* asked *${req.body['text']}*`,
					attachments: [
						{
							text: answer.text,
							color: medium.typeToTextColor(answer.type),
							callback_id: 'shake_ball',
							actions: [
								{
									name: "shake",
									text: "Shake",
									type: "button",
									value: "shake"
								}
							]
						}
					]
				})
					.then((res) => {
					})
					.catch(console.error);

				res.send();

			});
	}

	static handleAction(req, res) {
		switch (req['callback_id']) {
			case 'shake_ball':
				TeamAccessToken.findByTeamId(req['team']['id'])
					.exec()
					.then(teamAccessToken => {
						if (!teamAccessToken) {
							return;
						}

						const answer = medium.getRandomAnswers();
						const web = new WebClient(teamAccessToken.getAccessToken());

						web.chat.update({
							channel: req['channel']['id'],
							ts: req['message_ts'],
							text: req['original_message']['text'],
							attachments: [
								{
									text: answer.text,
									color: medium.typeToTextColor(answer.type),
									callback_id: 'shake_ball',
									actions: [
										{
											name: "shake",
											text: "Shake",
											type: "button",
											value: "shake"
										}
									]
								}
							]
						})
							.then((res) => {
							})
							.catch(console.error);
					});
				break;
			default:
				throw new Error('Unknown action callback_id');
		}

		res.send();
	}
};

// { type: 'interactive_message',
// 	actions: [ { name: 'shake', type: 'button', value: 'shake' } ],
// 	callback_id: 'shake_ball',
// 	team: { id: 'TBZQ25QBB', domain: 'slackappplayground' },
// 	channel: { id: 'CBZQ264EM', name: 'random' },
// 	user: { id: 'UC1LBDH4N', name: 'vincentguillemette198' },
// 	action_ts: '1536541793.709672',
// 		message_ts: '1536541769.000100',
// 	attachment_id: '1',
// 	token: 'PUvtkr9YJZHZjYNRaI8n4gWA',
// 	is_app_unfurl: false,
// 	original_message:
// 	{ text: '*vincentguillemette198* asked *test*',
// 		username: 'SlackBall',
// 		bot_id: 'BCQ288S10',
// 		attachments: [ [Object] ],
// 		type: 'message',
// 		subtype: 'bot_message',
// 		ts: '1536541769.000100' },
// 	response_url:
// 		'https://hooks.slack.com/actions/TBZQ25QBB/432082587554/u8IGeUHF0UQ0N1nqHVUI2JhP',
// 			trigger_id: '431359294464.407818194385.fde947f8e1d54b72c1381b26556e728c' }
