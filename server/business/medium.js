let answers = [
	{type: 'affirmative', text: 'It is certain'},
	{type: 'affirmative', text: 'As I see it, yes'},
	{type: 'affirmative', text: 'It is decidedly so'},
	{type: 'affirmative', text: 'Msost likely'},
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
	{type: 'negative', text: 'Very doubtful'}
];

module.exports = class Medium {
	static getRandomAnswers() {
		return answers[Math.floor(Math.random() * answers.length)]
	}

	static typeToTextColor(type) {
		switch (type) {
			case 'affirmative':
				return 'good';
			case 'non-committal':
				return 'warning';
			case 'negative':
				return 'danger';
		}
	}
};