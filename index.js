
const dotenv = require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dbFunctions = require('./dbFunctions.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


/* database connection */

mongoose.connect(process.env.DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));



let dari = dbFunctions.createUser("anto");
console.log(JSON.stringify({username: dari.username, _id: dari._id.toHexString()}));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
