(function(app) {
    app.AppComponent = ng.core
        .Component({
            selector: 'my-app',
            templateUrl: './components/app/app.html'
        })
        .Class({
          constructor: function() {
              this.name = "test123";
          }
        });
})(window.app || (window.app = {}));
