var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

var salt = bcrypt.genSaltSync(10);
userSchema.methods.encryptPassword = password =>
    bcrypt.hashSync(password, salt);

userSchema.methods.validPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

var User = mongoose.model('User', userSchema);

module.exports = User;