define(function(require) {

    var _ = require('lodash'),
        Protoplast = require('protoplast'),
        SettingsModule = require('module/settings/settings-module'),
        SettingsPanel = require('module/settings/view/settings-panel'),
        DefaultSettingsProvider = require('addon/settings-addon/default-settings-provider'),
        SettingsConfigProvider = require('addon/settings-addon/settings-config-provider');

    var SettingsAddon = Protoplast.extend({

        name: 'settings',

        theme: {
            inject: 'theme'
        },

        storage: {
            inject: 'storage'
        },

        appModel: {
            inject: 'app-model'
        },

        settingsModule: null,

        settingsPanel: null,
        
        $create: function() {
            var settingsModule = SettingsModule.create();
            var settingsPanel = SettingsPanel.create();

            settingsModule.use(settingsPanel);

            var settingsConfigProvider = SettingsConfigProvider.create();
            settingsModule.setGroups(settingsConfigProvider.getSettingGroups());
            
            this.settingsModule = settingsModule;
            this.settingsPanel = settingsPanel;
        },
        
        init: {
            injectInit: true,
            value: function() {
                this._createThemeSection();
                this._loadSettings();
            }
        },

        _createThemeSection: function() {
            var section = this.theme.getOrCreateSection('settings');
            section.shortTitle = 'setup';
            section.title = 'Settings';
            section.description = 'You can change configuration here. Some settings (e.g. page size, double space between scenes) may affect statistics which are based on assumption that 1 page = 1 minute of a movie.';
            section.smallIcon = this.appModel.staticPath + 'gfx/icons/settings.svg';
            section.mainContent = this.settingsPanel;
        },

        _loadSettings: function() {
            var defaultSettings = DefaultSettingsProvider.getConfig(),
                settings = {};

            this.storage.load('settings', function(userSettings) {
                _.assign(settings, defaultSettings, userSettings);
                this.settingsModule.setValues(settings);
                this._bindSettingsChanges();
            }.bind(this));
        },
        
        _bindSettingsChanges: function() {
            this.settingsModule.on('valuesChanged', this._saveCurrentSettings, this);
        },

        _saveCurrentSettings: function() {
            this.storage.save('settings', this.settingsModule.getValues());
        }
        
    });

    return SettingsAddon;
});