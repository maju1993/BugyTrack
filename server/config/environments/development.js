var nconf = require('nconf');
nconf.set('url', '');
nconf.set('database', 'mongodb://dev:dev@ds061787.mongolab.com:61787/bugytrackdb');

// nconf.set('database', {
//     secret: '123456',
//     database: 'mongodb://dev:dev@ds061787.mongolab.com:61787/bugytrackdb'
// });