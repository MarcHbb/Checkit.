const mongoose = require('mongoose'),
      bcrypt   = require('bcryptjs');

var UserSchema = mongoose.Schema({
  username : {type: String},
  password: {type: String}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
  // Fuunction to crypt the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = (username, callback) => {
  var query = {username : username};
  User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}
