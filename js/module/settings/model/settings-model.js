define(function(require) {

    var Protoplast = require('protoplast');

    var SettingsModel = Protoplast.Model.extend({

        /**
         * @type {SettingGroup]} 
         */
        groups: null,
        
        values: null,
        
        $create: function() {
            this.values = {};
            this.groups = Protoplast.Collection.create([]);
        },
        
        update: function(key, value) {
            this.values[key] = value;
        }
        
    });

    return SettingsModel;
});