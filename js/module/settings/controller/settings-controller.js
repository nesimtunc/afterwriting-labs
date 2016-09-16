define(function(require) {

    var Protoplast = require('protoplast');

    var SettingsController = Protoplast.extend({
        
        settingsModel: {
            inject: 'settings-model'
        },

        setGroups: function(groups) {
            this.settingsModel.groups = groups;
        },
        
        updateValue: function(key, value) {
            this.settingsModel.update(key, value);
        },
        
        setValues: function(map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    this.updateValue(key, map[key]);
                }
            }
        }
        
    });

    return SettingsController;
});