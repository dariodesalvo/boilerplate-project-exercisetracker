const { log } = require('console');
var mongoose = require('mongoose');

/* modelo de usuario */

const userSchema = new mongoose.Schema({
  username: String,
});

const UserModel = mongoose.model('User', userSchema);

function createUser (username) {

  var user = new UserModel({username: username});

    user.save()
      .then(doc => {
        console.log('Creación de usuario ok');
      })
      .catch(error => {
        console.error('Error saving test document:', error);
      });

    return user;
};

module.exports = { 
    createUser: createUser
}