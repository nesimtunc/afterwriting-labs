define(function(require) {

    var _ = require('lodash'),
        Protoplast = require('protoplast');

    var SaveSettingsAddon = Protoplast.extend([Protoplast.Dispatcher], {

        name: 'save-settings',

        settings: {
            inject: 'settings'
        },

        storage: {
            inject: 'storage'
        },

        init: {
            injectInit: true,
            value: function() {
                Protoplast.utils.bind(this, 'settings.defaultSettings', this._loadSettings.bind(this));
            }
        },

        _loadSettings: function() {
            var defaultSettings = this.settings.defaultSettings,
                settings = {};

            this.storage.load('settings', function(userSettings) {
                _.assign(settings, defaultSettings, userSettings);
                console.log(settings);
                this.settings.setValues(settings);
                this._bindSettingsChanges();
            }.bind(this));
        },

        _bindSettingsChanges: function() {
            this.settings.on('valuesChanged', this._saveCurrentSettings, this);
        },

        _saveCurrentSettings: function() {
            console.log('saveing')
            this.storage.save('settings', this.settings.getValues());
        }
        
    });

    return SaveSettingsAddon;
});