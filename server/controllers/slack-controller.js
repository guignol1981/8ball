const {WebClient} = require('@slack/client');
const web = new WebClient(process.env.SLACK_OAUTH_TOKEN);
const medium = require('../business/medium');

module.exports = class SlackController {
	static handleCommand(req, res) {
		const answer = medium.getRandomAnswers();

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
	}

	static handleAction(req, res) {
		switch (req['callback_id']) {
			case 'shake_ball':
				const answer = medium.getRandomAnswers();

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
				break;
			default:
				throw new Error('Unknown action callback_id');
		}

		res.send();
	}
};
