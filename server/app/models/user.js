var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
            },
            message: '{VALUE} is not a email address!'
        }
    },
    password: String,
    roles: [{ id: String}]
})

module.exports = mongoose.model('User', UserSchema);
