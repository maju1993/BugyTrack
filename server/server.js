var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var accountManager=require('./app/modules/account-manager');
var User=require('./app/models/user');

var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later or contact system administrator');
});

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.get('/',function(req, res){
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

apiRoutes.get('/users',function(req, res){
  User.find({}, function(err, users) {
    res.json(users);
  });
});

apiRoutes.get('/bugs',function(req, res) {
    var bugs = [
        {
            id: '72ada242-bb84-466c-8d78-517e84182be3',
            groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
            assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
            severity: '1',
            status: 'new',
            creationTimestamp: new Date(),
            DeltaTimestamp: new Date(),
            ShortDesc: 'short desc',
            operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
            priority: '1',
            productId: '1',
            repPlatformId: '1'
        },
        {
            id: '72ada242-bb84-466c-8d78-517e84182be3',
            groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
            assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
            severity: '1',
            status: 'new',
            creationTimestamp: new Date(),
            DeltaTimestamp: new Date(),
            ShortDesc: 'short desc 2',
            operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
            priority: '1',
            productId: '1',
            repPlatformId: '1'
        }
    ];
    res.json(bugs);
})

apiRoutes.post('/account/register', function(req,res){
res.status(400).send('error')
  var registerModel=req.body;
  accountManager.addNewAccount(registerModel);
  res.send(200);
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
