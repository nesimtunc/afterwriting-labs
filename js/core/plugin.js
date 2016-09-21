define(function(require) {
    
    var Module = require('core/module'),
        Handlebars = require('handlebars');

    /**
     * @alias Plugin
     * @extends Module
     * @deprecated
     */
    var Plugin = Module.extend({
        
        is_plugin: true,

        title: '',

        template: null,

        data: null,

        context: null,

        $create: function(name, title, template) {
            this.title = this.title || title;
            if (this.template || template) {
                this.template = Handlebars.compile(this.template || template);
            }
            this.class = this.class || 'inactive';
            this.data = {};
            this.context = {};
        },

        activate: function() {
        },

        deactivate: function() {
        }

    });
    
    return Plugin;

});