const express = require('express');
const router = express.Router();
const slackController = require('../controllers/slack-controller');
const authenticator = require('../services/authenticator');
const {createMessageAdapter} = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
const bodyParser = require('body-parser');

router.get('/authorize', authenticator.authorize);
router.post('/command', bodyParser.urlencoded(
	{
		extended: true,
		verify: function(req, res, buf) {
			req.rawBody = buf;
		}
	}
), authenticator.verifySignature, slackController.handleCommand);
router.post('/actions', slackInteractions.expressMiddleware());

slackInteractions.action('shake_ball', slackController.handleShakeAction);
slackInteractions.action('ask', slackController.handleAskAction);

module.exports = router;

