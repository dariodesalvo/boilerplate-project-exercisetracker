const { log } = require('console');
var mongoose = require('mongoose');

/* modelo de usuario */

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', userSchema);

function createUser (username) {


  var user = new UserModel({username: username});

  return user;

};

async function usuarios(){
  return await UserModel.find();
}

module.exports = { 
    createUser: createUser,
    usuarios: usuarios
}