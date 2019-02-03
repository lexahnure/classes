const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routing = require('./router');

const app = express();
const CONNECTION_URL = 'mongodb+srv://newUser:1234@cluster0-m9kh1.mongodb.net/myapi?retryWrites=true';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Hello there is Messaging Service`);
});

routing(app);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

app.listen(1488, () => {
  console.log('API app started');
});