
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


app.post('/api/users',async function(req, res) {
  
  try {

      const username = req.body.username;
      var newUser = dbFunctions.createUser(username);
      await newUser.save();
      res.json({username: newUser.username, _id: newUser._id.toHexString()});
      
   } catch (error) {
       console.log(error);
       res.send(error.toString());
   }

});

app.get('/api/users',async function(req, res) {
  
  try {

      var usuarios = await dbFunctions.usuarios();
      
      let data = usuarios.map(function(element){
      return {username: element.username, _id: element._id.toHexString()};
      });   
      res.send(data);
      
   } catch (error) {
       console.log(error);
       res.send("Error consultando usuarios");
   }

});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
