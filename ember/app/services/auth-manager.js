import Ember from 'ember';

export default Ember.Service.extend({
    accessToken:null,
    authenticate(login,password){
        return Ember.$.ajax({
            method: "POST",
            url: "http://localhost:8080/api/authenticate",
            data: {username: login, password: password}
        }).then((response)=>{
            this.set('accessToken', response.token)
        });
    },    
    invalidate(){
        this.set('accessToken', null);
    },
    isAuthenticated: Ember.computed.bool('accessToken')    
});
