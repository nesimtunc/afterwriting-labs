define(function(require) {

    var Protoplast = require('protoplast'),
        SettingsPanelPresenter = require('presenter/settings-panel-presenter'),
        SettingsPanelSection = require('view/settings-panel-section');

    var SettingsPanel = Protoplast.Component.extend({

        $meta: {
            presenter: SettingsPanelPresenter
        },

        html: '<div class="settings-panel"><table data-comp="table"></table></div>',

        /**
         * Describes how settings are displayed
         * Example:
         * [section, section]
         * section = {title: 'Title', controls: [control, control]}
         * control = {key: 'config.key',label: 'Label', type: ControlClass, initialValue: ''}
         */
        config: null,

        table: {
            component: Protoplast.Component.extend({tag:'table'})
        },

        layoutReady: false,

        $create: function() {
            this.config = Protoplast.Collection.create([]);
        },

        init: function() {
            Protoplast.utils.renderList(this, 'config', {
                parent: this.table,
                renderer: SettingsPanelSection,
                rendererDataProperty: 'section',
                create: function(parent, data, renderer, propertyName) {
                    var child = renderer.create();
                    child[propertyName] = data;
                    child.on('configValueChanged', function(event) {
                        parent.dispatch('configValueChanged', event);
                    });
                    parent.add(child);
                }
            });

            this.table.on('configValueChanged', function(event) {
                this.dispatch('configValueChanged', event);
            }.bind(this))
        }

    });

    return SettingsPanel;
});