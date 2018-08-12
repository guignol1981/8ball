let express = require('express');
let router = express.Router();

let slackController = require('../controllers/slack-controller');

router.get('/authorize', slackController.authorize);
router.post('/request', slackController.handleRequest);

module.exports = router;