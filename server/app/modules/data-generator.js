var uuid = require('node-uuid');

exports.bugs = function(count)
{
    var bugs=[];
	for(i=0;i<count;i++){
        bugs.push({
            id: generateId(),
            groupId: generateGroupId(),
            assignedToId: generateAssignedToId(),
            severity: generateSeverity(),
            status: generateStatus(),
            creationTimestamp: generateCreationTimestamp(),
            DeltaTimestamp: generateDeltaTimestamp(),
            ShortDesc: generateShortDesc(),
            operationSystemId: generateOperationSystemId(),
            priority: generatePriority(),
            productId: generateProductId(),
            repPlatformId: generateRepPlatformId()
        })
    }
    return bugs;
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

function generateId() {
    return uuid.v1();
}

function generateGroupId() {
    return uuid.v1();
}

function generateAssignedToId() {
    return uuid.v1();
}

function generateSeverity() {
    return uuid.v1();
}

function generateStatus() {
    return uuid.v1();
}

function generateCreationTimestamp() {
    return uuid.v1();
}

function generateDeltaTimestamp() {
    return uuid.v1();
}

function generateShortDesc() {
    return uuid.v1();
}

function generateOperationSystemId() {
    return uuid.v1();
}

function generatePriority() {
    return uuid.v1();
}

function generateProductId() {
    return uuid.v1();
}

function generateRepPlatformId() {
    return uuid.v1();
}