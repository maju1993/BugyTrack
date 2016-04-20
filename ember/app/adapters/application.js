//import JSONAPIAdapter from 'ember-data/adapters/json-api';
//import RESTAdapter from 'ember-data/adapters/'
import DS from 'ember-data'

export default DS.RESTAdapter.extend({
    
    host: 'http://localhost:8080',
    namespace: 'api',
    
    authManager: Ember.inject.service(),
    
    headers: Ember.computed('authManager.accesToken', function(){
        return {
            "Authorization": 'Bearer ${this.get("authManager.accessToken")}'
        }
    })
});
