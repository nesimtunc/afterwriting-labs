define(function(require) {

    var Protoplast = require('protoplast');

    var SettingsModel = Protoplast.Model.extend({

        settingsLoaded: false,
        
        settings: null

    });

    return SettingsModel;
});