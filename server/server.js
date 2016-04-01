var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var uuid = require('node-uuid');
var io = require('socket.io');
var http = require('http');

var jwt = require('jsonwebtoken');
var config = require('./config');
var accountManager=require('./app/modules/account-manager');
var User=require('./app/models/user');

var port = process.env.PORT || 8080;
var mediaPath=path.join(__dirname, 'media');


var app = express()
    , server = http.createServer(app)
    , io = io.listen(server);


app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(busboy());
app.use('/media', express.static(mediaPath));

function allowCrossDomain(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    //
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //
    //var origin = req.headers.origin;
    //if (_.contains(app.get('allowed_origins'), origin)) {
    //    res.setHeader('Access-Control-Allow-Origin', origin);
    //}
    //
    //if (req.method === 'OPTIONS') {
    //    res.send(200);
    //} else {
    //    next();
    //}
}

app.use(morgan('dev'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later or contact system administrator');
});

app.use(allowCrossDomain);

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.post('/authenticate', function(req, res) {
    // console.log(req.body);
    // User.findOne({
    //         email: req.body.email
    //     }, function(err, user) {
    //     var token = jwt.sign(user, app.get('secret'), {
    //         expiresInMinutes: 1440 // expires in 24 hours
    //     });

    //     res.json({
    //         success: true,
    //         message: 'Enjoy your token!',
    //         token: token
    //     });
    // });
    var user={};
    var token = jwt.sign(user, app.get('secret'), {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    
    //// find the user
    //User.findOne({
    //    email: req.body.name
    //}, function(err, user) {
    //    if (err) throw err;
    //    if (!user) {
    //        res.json({ success: false, message: 'Authentication failed. User not found.' });
    //    } else if (user) {
    //        if(accountManager.manualLogin(user, req.body.password,undefined)) {
    //            // if user is found and password is right
    //            // create a token
    //            var token = jwt.sign(user, app.get('superSecret'), {
    //                expiresInMinutes: 1440 // expires in 24 hours
    //            });
    //
    //            res.json({
    //                success: true,
    //                message: 'Enjoy your token!',
    //                token: token
    //            });
    //        }
    //    }
    //});
});

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
});

apiRoutes.get('/projects',function(req, res) {
    var projects = [{id:1, name:"Produkt1"},{id:2, name:"Produkt2"}];
    res.json(projects);
});

apiRoutes.post('/account/register', function(req,res){
    //res.status(400).send('error')
    var registerModel=req.body;
    accountManager.addNewAccount(registerModel);
    res.send(200);
});

apiRoutes.post('/upload', function (req,res,next) {
    console.log('Post processing... ');

    var fstream;
    var projectId;
    req.pipe(req.busboy);
    req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        switch (fieldname){
            case 'projectId':
                console.log(fieldname);
                projectId=val;
                break;
            default:
                break;
        }
    });
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        var dir = mediaPath +'/' + projectId + '/';
        if (!fs.existsSync(dir)){
            mkdirp.sync(dir);
        }
        var fileExtension = path.extname(filename);
        var fileGuid=uuid.v4()+fileExtension;
        var filePath=dir + fileGuid;
        fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        var fullUrl = req.protocol + '://' + req.get('host')+'/media/' + projectId + '/'+fileGuid;
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.json({url:fullUrl});
        });
    });
})

app.start = app.listen = function () {
    return server.listen.apply(server,arguments);
}

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
