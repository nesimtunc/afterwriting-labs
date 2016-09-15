define(function(require) {
   
    var Protoplast = require('protoplast'),
        SettingsPanelItem = require('view/settings-panel-item');

    var SettingsPanelSection = Protoplast.Component.extend({
        
        html: '<tbody><tr><th colspan="2" data-prop="header"></th></tr></tbody>',

        /**
         * Section to be displayed
         */
        section: null,

        init: function() {
            Protoplast.utils.bind(this, 'section', this.render.bind(this));
        },
        
        render: function() {
            this.header.innerHTML = this.section.title;
            
            (this.section.controls || []).forEach(this.addRow, this);
        },

        addRow: function(controlConfig) {
            var item = SettingsPanelItem.create();
            item.label = controlConfig.label;
            item.control = controlConfig.type.create();
            item.control.id = controlConfig.key;
            if (controlConfig.initialValue) {
                item.control.value = controlConfig.initialValue;
            }
            if (controlConfig.options) {
                item.control.options = controlConfig.options;
            }
            item.key = controlConfig.key;

            item.on('configValueChanged', function(event) {
                this.dispatch('configValueChanged', event);
            }.bind(this));
            this.add(item);
        }
        
    });
    
    return SettingsPanelSection;
});