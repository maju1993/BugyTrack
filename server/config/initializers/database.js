var mongoose = require('mongoose');
var nconf = require('nconf');

module.exports = function (callback) {
    mongoose.connect(nconf.get('database'));
    callback();
}