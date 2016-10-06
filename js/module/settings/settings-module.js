define(function(require) {

    var Protoplast = require('protoplast'),
        SettingsController = require('module/settings/controller/settings-controller'),
        SettingsModel = require('module/settings/model/settings-model');

    var SettingsModule = Protoplast.Object.extend({
        
        context: null,
        
        settingsModel: null,
        
        $create: function() {
            var context = Protoplast.Context.create();
            
            this.settingsModel = SettingsModel.create();
            this.settingsController = SettingsController.create();
            context.register('settings-controller', this.settingsController);
            context.register('settings-model', this.settingsModel);
            context.build();

            this.settingsModel.on('valuesChanged', this._bubbleValuesChanged, this);
            
            this.context = context;
        },

        _bubbleValuesChanged: function(event) {
            this.dispatch('valuesChanged', event);
        },
        
        use: function(view) {
            this.context.register(view);
        },
        
        setGroups: function(groups) {
            this.settingsController.setGroups(groups);
        },
        
        getValues: function() {
            return this.settingsModel.values;
        },
        
        getValue: function(key) {
            return this.settingsModel.values[key];
        },
        
        setValues: function(values) {
            this.settingsController.setValues(values);
        }
        
    });

    return SettingsModule;
});