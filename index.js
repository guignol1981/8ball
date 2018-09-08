if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

let express = require('express');
let app = express();
let path = require('path');
let http = require('http');
let api = require('./server/routes/api');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', api);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.set('port', process.env.PORT);

let server = http.createServer(app);

server.listen(process.env.PORT, () => console.log(`8Ball api running on localhost:${process.env.PORT}`));