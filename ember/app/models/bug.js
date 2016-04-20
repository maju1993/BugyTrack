import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    key: attr(),
    groupId: attr(),
    assignedToId: attr(),
    //assigendTo:body.results[0].user.name.first + " " + body.results[0].user.name.last,
    severity: attr(),
    status:attr(),
    creationTimestamp: attr(),
    deltaTimestamp: attr(),
    summary: attr(),
    operationSystemId: attr(),
    priority: attr(),
    productId: attr(),
    repPlatformId: attr(),
    votesCount: attr()
});
