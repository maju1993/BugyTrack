import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service(),
    actions: {
        authenticate(){s
            const { login, password } = this.getProperties('login', 'password');
            this.get('authManager').authenticate(login,password).then(() =>{
                alert('zalogowano');
            }, (err)=>{
                alert('nie zalogowano: '+err);
            })
        }
    }
});
