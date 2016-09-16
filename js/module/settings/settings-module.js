define(function(require) {

    var Protoplast = require('protoplast'),
        SettingsController = require('module/settings/controller/settings-controller'),
        SettingsModel = require('module/settings/model/settings-model');

    var SettingsModule = Protoplast.extend([Protoplast.Dispatcher], {
        
        context: null,
        
        settingsModel: null,
        
        $create: function() {
            var context = Protoplast.Context.create();
            
            this.settingsModel = SettingsModel.create();
            this.settingsController = SettingsController.create();
            context.register('settings-controller', this.settingsController);
            context.register('settings-model', this.settingsModel);
            context.build();
            
            this.context = context;
        },
        
        use: function(view) {
            this.context.register(view);
        },
        
        setGroups: function(groups) {
            this.settingsController.setGroups(groups);
        }
        
    });

    return SettingsModule;
});