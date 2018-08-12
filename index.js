let express = require('express');
let app = express();
let api = require('./server/routes/api');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

app.use('/api', api);
app.get('*', (req, res) => res.send('8ball'));

app.listen(3000, () => console.log('8ball listening on port 3000!'));