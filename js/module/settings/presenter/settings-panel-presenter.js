define(function(require) {

    var Protoplast = require('protoplast');

    var SettingsPanelPresenter = Protoplast.Object.extend({

        settings: {
            inject: 'settings-model'
        },
        
        controller: {
            inject: 'settings-controller'
        },
        
        init: function() {
            Protoplast.utils.bindProperty(this, 'settings.groups', this.view, 'config');

            this.settings.on('valuesChanged', function(event) {
                var entry = this.settings.getSettingEntry(event.key);
                if (entry) {
                    entry.control.value = event.value;
                }
            }.bind(this));
            
            this.view.on('configValueChanged', function(event) {
                this.controller.updateValue(event.key, event.value);
            }.bind(this));
        }

    });

    return SettingsPanelPresenter;
});