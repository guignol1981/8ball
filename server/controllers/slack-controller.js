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

			});

		// res.send();
	}

	static handleAction(req, res) {
		switch (req['callback_id']) {
			case 'shake_ball':
				TeamAccessToken.findByTeamId(req['team']['id'])
					.exec()
					.then(teamAccessToken => {
						console.log(teamAccessToken);

						if (!teamAccessToken) {
							return;
						}

						const answer = medium.getRandomAnswers();
						const web = new WebClient(teamAccessToken.getAccessToken());

						web.chat.update({
							as_user: false,
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

		// res.send();
	}
};


