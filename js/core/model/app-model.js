define(function(require) {

    var Protoplast = require('protoplast');

    var AppModel = Protoplast.Model.extend({
        
        env: "prod",
        
        staticPath: {
            get: function() {
                return this.env === "prod" ? 'bundle/' : '';
            }
        },
        
        version: '2.0.0-alpha',
        
        lastUpdated: '2016/09/16'
        
    });

    return AppModel;
});