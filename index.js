let express = require('express');
let app = express();
let path = require('path');
let http = require('http');
let api = require('./server/routes/api');
let bodyParser = require('body-parser');
let port = process.env.PORT || '3000';
let mongoose = require('mongoose');

//keep heroku dyno awake
setInterval(function() {
	http.get("https://slackeightball.herokuapp.com");
}, 300000);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

if (process.env.DB) {
	mongoose.connect(process.env.DB, {useNewUrlParser: true});
} else {
	mongoose.connect('mongodb://localhost:27017/8ball', {useNewUrlParser: true});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.set('port', port);
let server = http.createServer(app);

server.listen(port, () => console.log(`8Ball api running on localhost:${port}`));