let express = require('express');
let app = express();
let http = require('http');
let api = require('./server/routes/api');
let bodyParser = require('body-parser');
let port = process.env.PORT || '3000';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.get('*', (req, res) => res.send('8ball'));

app.set('port', port);
let server = http.createServer(app);

server.listen(port, () => console.log(`8Ball api running on localhost:${port}`));