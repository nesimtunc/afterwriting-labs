define(function(require) {

    var Protoplast = require('protoplast'),
        SettingsModule = require('module/settings/settings-module'),
        SettingsPanel = require('module/settings/view/settings-panel'),
        SettingsConfigProvider = require('addon/settings-config-provider');

    var SettingsAddon = Protoplast.extend({

        name: 'settings',

        theme: {
            inject: 'theme'
        },

        appModel: {
            inject: 'app-model'
        },
        
        settingsPanel: null,
        
        $create: function() {
            var settingsModule = SettingsModule.create();
            var settingsPanel = SettingsPanel.create();

            settingsModule.use(settingsPanel);

            var settingsConfigProvider = SettingsConfigProvider.create();
            settingsModule.setGroups(settingsConfigProvider.getSettingGroups());

            settingsModule.on('valuesChanged', function() {
                console.log('Config values changed. Saving...');
            });
            
            this.settingsPanel = settingsPanel;
        },
        
        init: {
            injectInit: true,
            value: function() {
                var section = this.theme.getOrCreateSection('settings');
                section.shortTitle = 'setup';
                section.title = 'Settings';
                section.description = 'You can change configuration here. Some settings (e.g. page size, double space between scenes) may affect statistics which are based on assumption that 1 page = 1 minute of a movie.';
                section.smallIcon = this.appModel.staticPath + 'gfx/icons/settings.svg';
                section.mainContent = this.settingsPanel;
            }
        }
        
    });

    return SettingsAddon;
});