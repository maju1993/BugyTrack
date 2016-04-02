var uuid = require('node-uuid');
var request = require('request');
var q=require('q');

exports.bugs = function(count)
{
    var defer = q.defer();
    var options = {
        uri: 'https://randomuser.me/api/?nat=us',
        // port: app.get('port'),
        // path: '/users',
        method: 'GET',
        json:true
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var randomUserData={};
            var bugs=[];
            for(i=0;i<count;i++){
                bugs.push({
                    id: generateId(),
                    key: generateKey(),
                    groupId: generateGroupId(),
                    assignedToId: generateAssignedToId(),
                    assigendTo:body.results[0].user.name.first + " " + body.results[0].user.name.last,
                    severity: generateSeverity(),
                    status: generateStatus(),
                    creationTimestamp: generateCreationTimestamp(),
                    deltaTimestamp: generateDeltaTimestamp(),
                    summary: generateSummary(),
                    operationSystemId: generateOperationSystemId(),
                    priority: generatePriority(),
                    productId: generateProductId(),
                    repPlatformId: generateRepPlatformId(),
                    votesCount: generateVotesCount()
                })
            }
            return defer.resolve(bugs);
            //return bugs;
        }
        return defer.reject(error);
    });
    return defer.promise;
    // var randomUserData={};
    // var bugs=[];
	// for(i=0;i<count;i++){
    //     bugs.push({
    //         id: generateId(),
    //         groupId: generateGroupId(),
    //         assignedToId: generateAssignedToId(),
    //         assigendTo:getRandomUserName(),
    //         severity: generateSeverity(),
    //         status: generateStatus(),
    //         creationTimestamp: generateCreationTimestamp(),
    //         deltaTimestamp: generateDeltaTimestamp(),
    //         shortDesc: generateShortDesc(),
    //         operationSystemId: generateOperationSystemId(),
    //         priority: generatePriority(),
    //         productId: generateProductId(),
    //         repPlatformId: generateRepPlatformId()
    //     })
    // }
    // return bugs;
}

exports.projects = function (count) {
    var projects=[];
    for(i=0;i<count;i++){
        projects.push({
            id: generateId(),
            name: "Test proj "+i,
            imgUrl : generateProjectImageUrl()
        })
    }
    return projects;
}

// id: '72ada242-bb84-466c-8d78-517e84182be3',
// groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
// assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
// severity: '1',
// status: 'new',
// creationTimestamp: new Date(),
// DeltaTimestamp: new Date(),
// ShortDesc: 'short desc',
// operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
// priority: '1',
// productId: '1',
// repPlatformId: '1'

//         id: '72ada242-bb84-466c-8d78-517e84182be3',
//         groupId: '081e105e-a66f-4e71-be06-c8acc7bd7601',
//         assignedToId: '6bfcd9f5-137e-400d-85ce-11080766b7b6',
//         severity: '1',
//         status: 'Nowy',
//         creationTimestamp: new Date(),
//         DeltaTimestamp: new Date(),
//         key: 'BUGYTRACK-001',
//         summary: 'Mail podczas rejestracji nie został wysłany',
//         assigendTo: 'Adam Abacki',
//         reporter: 'Andrzej Kowalski',
//         operationSystemId: 'osfcd9f5-137e-400d-85ce-11080766b7b6',
//         priority: 'Niski',
//         productId: '1',
//         repPlatformId: '1'

function generateProjectImageUrl(){
    var urls=[
        "http://www.deftune.com/wp-content/uploads/2010/10/thexx-400x400.jpg",
        "http://artisticthings.com/wp-content/uploads/2009/08/gilmore6-400x400.jpg",
        "http://www.artlimited.net/user/0/0/1/4/9/7/9/artlimited_img175960.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Wappen-ober-ingelheim-400x400.png",
        "http://i307.photobucket.com/albums/nn307/ohjoycie/backgrounds/cosmos-star-background-400x400.jpg",
        "http://img.ffffound.com/static-data/assets/6/6492fdaf5161c0c3eda7ae233662a471cd101769_m.jpg"
    ];
    return urls[getRandomInt(0,urls.length-1)];
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function generateKey(){
    return 'BUGYTRACK-'+zeroPad(getRandomInt(1,100),3);
}

function generateVotesCount() {
    return getRandomInt(0,30);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomDate(start) {
    return randomDate(start, new Date());
}

function randomDate() {
    return new Date(2012, 0, 1);
    //return randomDate(new Date(2012, 0, 1), new Date());
}

function generateId() {
    return uuid.v4();
}

function generateGroupId() {
    return uuid.v4();
}

function generateAssignedToId() {
    return uuid.v4();
}

function generateSeverity() {
    return getRandomInt(1,5);
}

function generateStatus() {
    var statuses=['new','done','reopened','testing'];
    return statuses[getRandomInt(0,3)];
}

function generateCreationTimestamp() {
    return randomDate();
}

function generateDeltaTimestamp() {
    return randomDate();
}

function generateSummary() {
    return Math.random().toString(36).substring(7);
    // return uuid.v4();
}

function generateOperationSystemId() {
    return uuid.v4();
}

function generatePriority() {
    return uuid.v4();
}

function generateProductId() {
    return uuid.v4();
}

function generateRepPlatformId() {
    return uuid.v4();
}