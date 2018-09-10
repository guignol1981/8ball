const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class TeamAccessToken {

	getTeamId() {
		return this['teamId'];
	}

	getTeamName() {
		return this['teamName'];
	}

	getAccessToken() {
		return this['accessToken'];
	}

	static findByTeamId(teamId) {
		return this.findOne({
			teamId: teamId
		});
	}

}

let schema = new Schema({
	teamId: {type: String, required: true},
	teamName: {type: String, required: true},
	accessToken: {type: String, required: true}
});

schema.loadClass(TeamAccessToken);

const model = mongoose.model('TeamAccessToken', schema);

module.exports = model;

