var mongoose = require('mongoose');
var bccrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    surname: String,
    adress: String,
    city: String,
    password: String,
    role: String,
    number : String
});

// userSchema.hashPasword = function hashPassword(password) {
//     return bccrypt.hashSync(password, 10);
// }
//
// userSchema.isValid =

var userdb = mongoose.model('User', userSchema);

module.exports = userdb;

module.exports.hashPassword = function (password) {
    return bccrypt.hashSync(password, 10);
}



module.exports.comparePassword = function (condidatePassword, hash, callback) {
// Load hash from your password DB.
    bccrypt.compare(condidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}