define(function(require) {

    var Protoplast = require('protoplast'),
        Input = require('component/control/input'),
        SettingsGroup = require('module/settings/model/settings-group'),
        SettingsEntry = require('module/settings/model/settings-entry');

    var SettingsConfigProvider = Protoplast.extend([Protoplast.Dispatcher], {

        /**
         * Return list of groups used by settings addon
         */
        getSettingGroups: function() {
            return Protoplast.Collection.create([
                this.getPrintGroup()
            ]);
        },
        
        getPrintGroup: function() {
            var printGroup = SettingsGroup.create('Print');
            printGroup.addEntry(SettingsEntry.create('print_profile', 'Print profile', this.getInputControl()));
            return printGroup;
        },
        
        getInputControl: function() {
            return Input.create();
        }
        
    });

    return SettingsConfigProvider;
});